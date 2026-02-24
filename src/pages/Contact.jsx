import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../services/api.js';

const fade = (d = 0) => ({ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: d } });
const INIT = { fullName: '', email: '', phone: '', companyName: '', subject: '', message: '', type: 'hire' };

const INFO = [
  { icon: '📧', title: 'Email', content: 'info@telvelit.com', link: 'mailto:info@telvelit.com' },
  { icon: '📱', title: 'Phone', content: '+91 98765 43210', link: 'tel:+919876543210' },
  { icon: '💬', title: 'WhatsApp', content: 'Chat with us', link: 'https://wa.me/919876543210', external: true },
  { icon: '📍', title: 'Location', content: 'Kukatpally,KPHB Colony,Hyderabad,Telangana,India' },
  { icon: '🕒', title: 'Hours', content: 'Mon–Fri 12 PM – 8 PM IST' },
];

function Field({ label, name, type = 'text', value, onChange, error, required }) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-navy-700 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input id={name} name={name} type={type} value={value} onChange={onChange}
        className={`input-field ${error ? 'border-red-400 focus:ring-red-200' : ''}`} />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState(INIT);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null);

  const set = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors((p) => { const c = { ...p }; delete c[e.target.name]; return c; });
  };

  const validate = () => {
    const e = {};
    if (form.fullName.trim().length < 2) e.fullName = 'Name is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = 'Valid email required';
    if (form.message.trim().length < 10) e.message = 'Min 10 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    setStatus(null);
    if (!validate()) return;
    setSubmitting(true);
    try {
      const data = await api.submitContact(form);
      setStatus({ type: 'success', message: data.message });
      setForm(INIT);
    } catch (err) {
      if (err.errors?.length) { const m = {}; err.errors.forEach((x) => { m[x.field] = x.message; }); setErrors(m); }
      setStatus({ type: 'error', message: err.message || 'Something went wrong.' });
    } finally { setSubmitting(false); }
  };

  return (
    <>
      <section className="page-hero bg-gradient-to-br from-navy-50 to-accent/5">
        <div className="container text-center max-w-3xl mx-auto">
          <motion.h1 {...fade()} className="text-4xl md:text-5xl mb-6">Get in <span className="text-accent">Touch</span></motion.h1>
          <motion.p {...fade(0.1)} className="text-lg text-navy-500">Hire IT talent for your European team or inquire about our services</motion.p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-12">
            <motion.div {...fade()} className="lg:col-span-3">
              <h2 className="text-2xl font-bold mb-6">Send us a message</h2>

              <AnimatePresence>
                {status && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className={`mb-6 p-4 rounded-lg text-sm font-medium ${status.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                    {status.message}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex gap-2 mb-6">
                {[['hire', 'Hire Talent'], ['general', 'General Inquiry']].map(([v, l]) => (
                  <button key={v} type="button" onClick={() => setForm((p) => ({ ...p, type: v }))}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${form.type === v ? 'bg-accent text-white' : 'bg-navy-50 text-navy-600 hover:bg-navy-100'}`}>{l}</button>
                ))}
              </div>

              <form onSubmit={submit} className="space-y-5" noValidate>
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="Full Name" name="fullName" value={form.fullName} onChange={set} error={errors.fullName} required />
                  <Field label="Email" name="email" type="email" value={form.email} onChange={set} error={errors.email} required />
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="Phone" name="phone" type="tel" value={form.phone} onChange={set} error={errors.phone} />
                  <Field label="Company" name="companyName" value={form.companyName} onChange={set} error={errors.companyName} />
                </div>
                <Field label="Subject" name="subject" value={form.subject} onChange={set} error={errors.subject} />
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-navy-700 mb-1.5">Message <span className="text-red-500">*</span></label>
                  <textarea id="message" name="message" rows="5" value={form.message} onChange={set}
                    className={`input-field resize-none ${errors.message ? 'border-red-400' : ''}`}
                    placeholder={form.type === 'hire' ? 'Describe the roles you need to fill, timeline, and any specific requirements…' : 'How can we help you?'} />
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                </div>
                <button type="submit" disabled={submitting} className={`btn btn-primary w-full ${submitting ? 'opacity-60 cursor-not-allowed' : ''}`}>
                  {submitting ? <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Sending…</span> : 'Send Message'}
                </button>
              </form>
            </motion.div>

            <motion.div {...fade(0.15)} className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              <div className="space-y-5">
                {INFO.map((c) => (
                  <div key={c.title} className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0 text-lg">{c.icon}</div>
                    <div>
                      <h4 className="font-semibold text-navy-800 text-sm">{c.title}</h4>
                      {c.link ? (
                        <a href={c.link} target={c.external ? '_blank' : undefined} rel={c.external ? 'noopener noreferrer' : undefined}
                          className="text-navy-500 text-sm hover:text-accent transition-colors">{c.content}</a>
                      ) : (
                        <p className="text-navy-500 text-sm">{c.content}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-br from-navy-50 to-accent/5 p-6 rounded-xl mt-8">
                <h4 className="font-display font-bold text-navy-800 mb-3">Quick Hire</h4>
                <p className="text-navy-500 text-sm mb-4">Need IT talent urgently? We deliver shortlisted candidates within 48 hours.</p>
                <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="btn btn-primary text-sm py-2">💬 WhatsApp Us</a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
