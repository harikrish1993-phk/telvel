import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { log } from '../utils/logger.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ── Helmet ──────────────────────────────────────────────────
export const helmetMiddleware = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      fontSrc: ["'self'", 'https://fonts.gstatic.com'],
      imgSrc: ["'self'", 'data:', 'https:'],
      connectSrc: ["'self'", 'https://wa.me'],
    },
  },
});

// ── Rate limiters ───────────────────────────────────────────
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, max: 100, standardHeaders: true, legacyHeaders: false,
  message: { success: false, message: 'Too many requests' },
});

export const formLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, max: 10,
  message: { success: false, message: 'Too many submissions — wait 15 minutes' },
});

// ── File upload (resume) ────────────────────────────────────
const uploadsDir = path.resolve(__dirname, '../../uploads');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e6)}`;
    const ext = path.extname(file.originalname);
    cb(null, `resume-${uniqueSuffix}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = ['.pdf', '.doc', '.docx'];
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowed.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Only PDF, DOC, and DOCX files are allowed'), false);
  }
};

const maxSize = (parseInt(process.env.MAX_RESUME_SIZE_MB) || 5) * 1024 * 1024;

export const uploadResume = multer({
  storage,
  fileFilter,
  limits: { fileSize: maxSize },
}).single('resume');

// Multer error handler wrapper
export function handleUpload(req, res, next) {
  uploadResume(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ success: false, message: `File too large — max ${process.env.MAX_RESUME_SIZE_MB || 5}MB` });
      }
      return res.status(400).json({ success: false, message: err.message });
    }
    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
    next();
  });
}

// ── Validation helpers ──────────────────────────────────────
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NAME_RE = /^[a-zA-Z\s.''-]+$/;

export function validateContact(req, res, next) {
  const { fullName, email, phone, message } = req.body;
  const errors = [];

  if (!fullName || fullName.trim().length < 2 || !NAME_RE.test(fullName.trim()))
    errors.push({ field: 'fullName', message: 'Valid name is required (2+ characters)' });
  if (!email || !EMAIL_RE.test(email.trim()))
    errors.push({ field: 'email', message: 'Valid email is required' });
  if (!message || message.trim().length < 10)
    errors.push({ field: 'message', message: 'Message must be at least 10 characters' });

  if (errors.length) return res.status(400).json({ success: false, errors });

  req.body.fullName = fullName.trim();
  req.body.email = email.trim().toLowerCase();
  req.body.phone = (phone || '').trim();
  req.body.message = message.trim().replace(/<[^>]*>/g, '');
  req.body.companyName = (req.body.companyName || '').trim();
  req.body.subject = (req.body.subject || '').trim();
  next();
}

export function validateApplication(req, res, next) {
  const { fullName, email } = req.body;
  const errors = [];

  if (!fullName || fullName.trim().length < 2)
    errors.push({ field: 'fullName', message: 'Name is required' });
  if (!email || !EMAIL_RE.test(email.trim()))
    errors.push({ field: 'email', message: 'Valid email is required' });
  if (!req.file)
    errors.push({ field: 'resume', message: 'Resume file is required (PDF, DOC, or DOCX)' });

  if (errors.length) return res.status(400).json({ success: false, errors });

  req.body.fullName = fullName.trim();
  req.body.email = email.trim().toLowerCase();
  req.body.phone = (req.body.phone || '').trim();
  req.body.coverLetter = (req.body.coverLetter || '').trim().replace(/<[^>]*>/g, '');
  next();
}

// ── Error handler ───────────────────────────────────────────
export function errorHandler(err, req, res, _next) {
  log.error(`${req.method} ${req.path}`, err.message);
  res.status(err.statusCode || 500).json({
    success: false,
    message: process.env.NODE_ENV === 'production' ? 'An unexpected error occurred' : err.message,
  });
}
