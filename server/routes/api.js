import { Router } from 'express';
import Job from '../models/Job.js';
import Application from '../models/Application.js';
import Contact from '../models/Contact.js';
import { formLimiter, validateContact, validateApplication, handleUpload } from '../middleware/security.js';
import { notifyContactSubmission, notifyNewApplication, sendApplicationConfirmation } from '../config/email.js';
import { log } from '../utils/logger.js';
import cfg from '../config/company.js';

const router = Router();

// ── GET /api/company-info ───────────────────────────────────
router.get('/company-info', (req, res) => {
  res.json({
    success: true,
    data: {
      company: cfg.company,
      contact: cfg.contact,
      social: cfg.social,
      stats: cfg.stats,
      roles: cfg.roles,
      hiringProcess: cfg.hiringProcess,
      whyUs: cfg.whyUs,
      candidateSupport: cfg.candidateSupport,
    },
  });
});

// ── GET /api/jobs ───────────────────────────────────────────
router.get('/jobs', async (req, res, next) => {
  try {
    const filter = { status: 'active' };
    if (req.query.featured === 'true') filter.featured = true;

    const jobs = await Job.find(filter)
      .sort({ featured: -1, createdAt: -1 })
      .select('-__v')
      .lean();

    res.json({ success: true, jobs, total: jobs.length });
  } catch (err) { next(err); }
});

// ── GET /api/jobs/:slug ─────────────────────────────────────
router.get('/jobs/:slug', async (req, res, next) => {
  try {
    const job = await Job.findOne({ slug: req.params.slug, status: 'active' }).lean();
    if (!job) return res.status(404).json({ success: false, message: 'Job not found' });
    res.json({ success: true, job });
  } catch (err) { next(err); }
});

// ── POST /api/applications ─────────────────────────────────
router.post('/applications', formLimiter, handleUpload, validateApplication, async (req, res, next) => {
  try {
    const { fullName, email, phone, coverLetter, jobId } = req.body;

    let job = null;
    if (jobId) {
      job = await Job.findById(jobId).lean();
    }

    const application = await Application.create({
      fullName,
      email,
      phone,
      coverLetter,
      resumePath: req.file.path,
      resumeName: req.file.originalname,
      jobId: job?._id || null,
      jobTitle: job?.title || 'General Application',
      ipAddress: req.ip,
    });

    log.info(`New application #${application._id} from ${email} for ${job?.title || 'General'}`);

    // Emails in background
    Promise.allSettled([
      notifyNewApplication(req.body, job),
      sendApplicationConfirmation(req.body),
    ]).catch(() => {});

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully! We will review your profile and get back to you.',
    });
  } catch (err) { next(err); }
});

// ── POST /api/contact ───────────────────────────────────────
router.post('/contact', formLimiter, validateContact, async (req, res, next) => {
  try {
    const { fullName, email, phone, companyName, subject, message, type } = req.body;

    const contact = await Contact.create({
      fullName, email, phone, companyName, subject, message,
      type: type || 'general',
      ipAddress: req.ip,
    });

    log.info(`New contact #${contact._id} from ${email}`);

    // Email in background
    notifyContactSubmission(req.body).catch(() => {});

    res.status(201).json({
      success: true,
      message: 'Thank you for reaching out! We will respond within 24 hours.',
    });
  } catch (err) { next(err); }
});

// ── GET /api/stats ──────────────────────────────────────────
router.get('/stats', async (req, res, next) => {
  try {
    const [totalJobs, totalApplications] = await Promise.all([
      Job.countDocuments({ status: 'active' }),
      Application.countDocuments(),
    ]);
    res.json({ success: true, stats: { totalJobs, totalApplications, display: cfg.stats } });
  } catch (err) { next(err); }
});

export default router;
