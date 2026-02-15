/**
 * Admin Authentication Middleware
 * Simple password-based auth via environment variable.
 * For production, upgrade to JWT or session-based auth.
 */
import { log } from '../utils/logger.js';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'telvel-admin-2024';

export function adminAuth(req, res, next) {
  const token = req.headers['x-admin-token'];

  if (!token || token !== ADMIN_PASSWORD) {
    log.warn(`Unauthorized admin access attempt from ${req.ip}`);
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  next();
}

// Login endpoint handler — validates password, returns token
export function adminLogin(req, res) {
  const { password } = req.body;

  if (!password || password !== ADMIN_PASSWORD) {
    log.warn(`Failed admin login from ${req.ip}`);
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }

  log.info(`Admin login from ${req.ip}`);
  res.json({ success: true, token: ADMIN_PASSWORD });
}
