import nodemailer from 'nodemailer';
import { log } from '../utils/logger.js';
import cfg from './company.js';

let transporter = null;

function createTransporter() {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    log.warn('Email credentials not set — email disabled');
    return null;
  }
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT) || 587,
    secure: false,
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASSWORD },
    tls: { rejectUnauthorized: false },
  });
}

export async function initEmail() {
  transporter = createTransporter();
  if (!transporter) return false;
  try {
    await transporter.verify();
    log.info('Email service ready');
    return true;
  } catch (err) {
    log.warn('Email verification failed', err.message);
    return false;
  }
}

async function send(opts) {
  if (!transporter) { log.warn('Email skipped — not configured'); return { success: false }; }
  try {
    const info = await transporter.sendMail(opts);
    log.info(`Email sent → ${opts.to}`);
    return { success: true, messageId: info.messageId };
  } catch (err) {
    log.error('Email failed', err.message);
    return { success: false };
  }
}

const hdr = `<div style="background:linear-gradient(135deg,#122a3f,#1C619C);color:#fff;padding:24px;text-align:center;border-radius:8px 8px 0 0">
  <h2 style="margin:0">${cfg.company.name}</h2>
  <p style="margin:4px 0 0;opacity:.8;font-size:14px">${cfg.company.tagline}</p></div>`;
const ftr = `<div style="text-align:center;padding:16px;color:#999;font-size:12px">&copy; ${new Date().getFullYear()} ${cfg.company.name}</div>`;

export async function notifyContactSubmission(data) {
  const { fullName, email, phone, companyName, message } = data;
  return send({
    from: `"${cfg.company.shortName}" <${process.env.EMAIL_USER}>`,
    to: cfg.contact.email.info,
    subject: `New Inquiry: ${fullName}${companyName ? ` — ${companyName}` : ''}`,
    html: `${hdr}<div style="padding:24px;background:#f8fafc;border:1px solid #e2e8f0;border-top:0;border-radius:0 0 8px 8px;font-family:sans-serif;color:#334e68">
      <p><strong>Name:</strong> ${fullName}</p><p><strong>Email:</strong> ${email}</p>
      ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
      ${companyName ? `<p><strong>Company:</strong> ${companyName}</p>` : ''}
      <p><strong>Message:</strong><br/>${message}</p></div>${ftr}`,
  });
}

export async function notifyNewApplication(data, job) {
  return send({
    from: `"${cfg.company.shortName}" <${process.env.EMAIL_USER}>`,
    to: cfg.contact.email.hr,
    subject: `New Application: ${data.fullName} for ${job?.title || 'General'}`,
    html: `${hdr}<div style="padding:24px;background:#f8fafc;border:1px solid #e2e8f0;border-top:0;border-radius:0 0 8px 8px;font-family:sans-serif;color:#334e68">
      <p><strong>Name:</strong> ${data.fullName}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone || 'N/A'}</p>
      <p><strong>Position:</strong> ${job?.title || 'General Application'}</p>
      ${data.coverLetter ? `<p><strong>Cover Letter:</strong><br/>${data.coverLetter}</p>` : ''}
      <p><em>Resume attached to application — view in admin.</em></p></div>${ftr}`,
  });
}

export async function sendApplicationConfirmation(data) {
  return send({
    from: `"${cfg.company.shortName}" <${process.env.EMAIL_USER}>`,
    to: data.email,
    subject: `Application Received — ${cfg.company.shortName}`,
    html: `${hdr}<div style="padding:24px;background:#f8fafc;border:1px solid #e2e8f0;border-top:0;border-radius:0 0 8px 8px;font-family:sans-serif;color:#334e68;line-height:1.7">
      <p>Dear ${data.fullName},</p>
      <p>Thank you for applying. We've received your application and our recruitment team will review it within 2–3 business days.</p>
      <p>If your profile matches our requirements, we'll reach out to schedule the next steps.</p>
      <p>Best regards,<br/><strong>${cfg.company.shortName} Recruitment Team</strong></p>
      <p style="font-size:13px;color:#627d98">📧 ${cfg.contact.email.hr} · 📞 ${cfg.contact.phone}</p></div>${ftr}`,
  });
}
