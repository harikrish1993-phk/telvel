import { Router } from 'express';
import Job from '../models/Job.js';
import Application from '../models/Application.js';
import Contact from '../models/Contact.js';
import { adminAuth, adminLogin } from '../middleware/admin.js';
import { log } from '../utils/logger.js';

const router = Router();

// ── Login ───────────────────────────────────────────────────
router.post('/login', adminLogin);

// All routes below require auth
router.use(adminAuth);

// ── Dashboard stats ─────────────────────────────────────────
router.get('/dashboard', async (req, res, next) => {
  try {
    const [totalJobs, activeJobs, totalApps, newApps, totalContacts, newContacts] = await Promise.all([
      Job.countDocuments(),
      Job.countDocuments({ status: 'active' }),
      Application.countDocuments(),
      Application.countDocuments({ status: 'new' }),
      Contact.countDocuments(),
      Contact.countDocuments({ status: 'new' }),
    ]);
    res.json({ success: true, stats: { totalJobs, activeJobs, totalApps, newApps, totalContacts, newContacts } });
  } catch (err) { next(err); }
});

// ── Jobs CRUD ───────────────────────────────────────────────
router.get('/jobs', async (req, res, next) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 }).lean();
    res.json({ success: true, jobs });
  } catch (err) { next(err); }
});

router.post('/jobs', async (req, res, next) => {
  try {
    const { title, slug, description, skills, location, type, experience, salary, status, featured } = req.body;
    if (!title || !slug || !description) {
      return res.status(400).json({ success: false, message: 'Title, slug, and description are required' });
    }
    const job = await Job.create({ title, slug, description, skills: skills || [], location, type, experience, salary, status, featured });
    log.info(`Admin created job: ${job.title}`);
    res.status(201).json({ success: true, job });
  } catch (err) {
    if (err.code === 11000) return res.status(400).json({ success: false, message: 'A job with this slug already exists' });
    next(err);
  }
});

router.put('/jobs/:id', async (req, res, next) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!job) return res.status(404).json({ success: false, message: 'Job not found' });
    log.info(`Admin updated job: ${job.title}`);
    res.json({ success: true, job });
  } catch (err) { next(err); }
});

router.delete('/jobs/:id', async (req, res, next) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).json({ success: false, message: 'Job not found' });
    log.info(`Admin deleted job: ${job.title}`);
    res.json({ success: true, message: 'Job deleted' });
  } catch (err) { next(err); }
});

// ── Applications ────────────────────────────────────────────
router.get('/applications', async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    if (req.query.jobId) filter.jobId = req.query.jobId;

    const apps = await Application.find(filter).sort({ createdAt: -1 }).populate('jobId', 'title slug').lean();
    res.json({ success: true, applications: apps });
  } catch (err) { next(err); }
});

router.put('/applications/:id', async (req, res, next) => {
  try {
    const { status } = req.body;
    const validStatuses = ['new', 'screening', 'interview', 'offered', 'hired', 'rejected'];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }
    const app = await Application.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!app) return res.status(404).json({ success: false, message: 'Application not found' });
    log.info(`Admin updated application ${app._id} status to ${status}`);
    res.json({ success: true, application: app });
  } catch (err) { next(err); }
});

router.delete('/applications/:id', async (req, res, next) => {
  try {
    const app = await Application.findByIdAndDelete(req.params.id);
    if (!app) return res.status(404).json({ success: false, message: 'Application not found' });
    log.info(`Admin deleted application ${app._id}`);
    res.json({ success: true, message: 'Application deleted' });
  } catch (err) { next(err); }
});

// ── Contacts ────────────────────────────────────────────────
router.get('/contacts', async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    const contacts = await Contact.find(filter).sort({ createdAt: -1 }).lean();
    res.json({ success: true, contacts });
  } catch (err) { next(err); }
});

router.put('/contacts/:id', async (req, res, next) => {
  try {
    const { status } = req.body;
    const contact = await Contact.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!contact) return res.status(404).json({ success: false, message: 'Contact not found' });
    res.json({ success: true, contact });
  } catch (err) { next(err); }
});

export default router;
