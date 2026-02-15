import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import compression from 'compression';
import path from 'path';
import { fileURLToPath } from 'url';

import { connectDB, closeDB } from './server/config/db.js';
import { initEmail } from './server/config/email.js';
import { helmetMiddleware, apiLimiter, errorHandler } from './server/middleware/security.js';
import apiRoutes from './server/routes/api.js';
import adminRoutes from './server/routes/admin.js';
import { log } from './server/utils/logger.js';
import cfg from './server/config/company.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = parseInt(process.env.PORT) || 5000;
const isProd = process.env.NODE_ENV === 'production';

const app = express();

// ── Middleware ───────────────────────────────────────────────
app.use(helmetMiddleware);
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(compression());
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

// Serve uploaded resumes (protected in production via admin auth later)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ── Health ──────────────────────────────────────────────────
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', uptime: Math.floor(process.uptime()), ts: new Date().toISOString() });
});

// ── API ─────────────────────────────────────────────────────
app.use('/api', apiLimiter, apiRoutes);
app.use('/api/admin', apiLimiter, adminRoutes);

// ── Production: serve React build ───────────────────────────
if (isProd) {
  const dist = path.join(__dirname, 'dist');
  app.use(express.static(dist));
  app.get('*', (req, res) => res.sendFile(path.join(dist, 'index.html')));
}

// ── Error handler ───────────────────────────────────────────
app.use(errorHandler);

// ── Start ───────────────────────────────────────────────────
async function start() {
  await connectDB();
  await initEmail();

  app.listen(PORT, () => {
    log.info('═'.repeat(50));
    log.info(cfg.company.name);
    log.info(cfg.company.tagline);
    log.info('═'.repeat(50));
    log.info(`Environment : ${process.env.NODE_ENV || 'development'}`);
    log.info(`Server      : http://localhost:${PORT}`);
    log.info(`API         : http://localhost:${PORT}/api`);
    log.info(`Health      : http://localhost:${PORT}/health`);
    log.info('═'.repeat(50));
  });
}

async function shutdown(sig) {
  log.info(`${sig} — shutting down`);
  await closeDB();
  process.exit(0);
}
process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

start().catch((e) => { log.error('Startup failed', e.message); process.exit(1); });

export default app;
