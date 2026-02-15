import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../services/api.js';
import JobCard from '../components/JobCard.jsx';

const fade = (d = 0) => ({ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: d } });

const INIT = { fullName: '', email: '', phone: '', coverLetter: '' };

export default function Careers() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [form, setForm] = useState(INIT);
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null);
  const formRef = useRef(null);
  const fileRef = useRef(null);

  useEffect(() => {
    api.getJobs().then((d) => setJobs(d.jobs || [])).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const openApply = (job) => {
    setSelectedJob(job);
    setForm(INIT);
    setFile(null);
    setErrors({});
    setStatus(null);
    setTimeout(() => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
  };

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors((p) => { const c = { ...p }; delete c[e.target.name]; return c; });
  };

  const handleFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const ext = f.name.split('.').pop().toLowerCase();
    if (!['pdf', 'doc', 'docx'].includes(ext)) {
      setErrors((p) => ({ ...p, resume: 'Only PDF, DOC, DOCX allowed' }));
      return;
    }
    if (f.size > 5 * 1024 * 1024) {
      setErrors((p) => ({ ...p, resume: 'File must be under 5 MB' }));
      return;
    }
    setFile(f);
    setErrors((p) => { const c = { ...p }; delete c.resume; return c; });
  };

  const validate = () => {
    const e = {};
    if (form.fullName.trim().length < 2) e.fullName = 'Name is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = 'Valid email is required';
    if (!file) e.resume = 'Resume is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    if (!validate()) return;

    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append('fullName', form.fullName.trim());
      fd.append('email', form.email.trim());
      fd.append('phone', form.phone.trim());
      fd.append('coverLetter', form.coverLetter.trim());
      fd.append('resume', file);
      if (selectedJob?._id) fd.append('jobId', selectedJob._id);

      const data = await api.submitApplication(fd);
      setStatus({ type: 'success', message: data.message });
      setForm(INIT);
      setFile(null);
      if (fileRef.current) fileRef.current.value = '';
      setSelectedJob(null);
    } catch (err) {
      if (err.errors?.length) {
        const m = {};
        err.errors.forEach((x) => { m[x.field] = x.message; });
        setErrors(m);
      }
      setStatus({ type: 'error', message: err.message || 'Submission failed. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="page-hero bg-gradient-to-br from-navy-50 to-accent/5">
        <div className="container text-center max-w-3xl mx-auto">
          <motion.h1 {...fade()} className="text-4xl md:text-5xl mb-6">Join Our <span className="text-accent">Team</span></motion.h1>
          <motion.p {...fade(0.1)} className="text-lg text-navy-500">Explore international career opportunities in IT across Europe</motion.p>
        </div>
      </section>

      {/* Why Join */}
      <section className="section-padding bg-white">
        <div className="container max-w-4xl mx-auto">
          <h2 className="text-3xl mb-8 text-center">Why Join TELVEL IT</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: '🚀', t: 'Growth', d: 'International exposure and rapid career advancement' },
              { icon: '📚', t: 'Learning', d: 'Work with cutting-edge technologies and global teams' },
              { icon: '🌍', t: 'Global Reach', d: 'Opportunities across 8+ European countries' },
            ].map((v, i) => (
              <motion.div key={v.t} {...fade(i * 0.1)} className="bg-navy-50 p-6 rounded-xl text-center">
                <div className="text-3xl mb-3">{v.icon}</div>
                <h3 className="font-display font-bold mb-2">{v.t}</h3>
                <p className="text-navy-500 text-sm">{v.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Jobs */}
      <section className="section-padding bg-navy-50">
        <div className="container">
          <h2 className="text-3xl mb-8 text-center">Open Positions</h2>
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block w-10 h-10 border-4 border-accent/30 border-t-accent rounded-full animate-spin" />
            </div>
          ) : jobs.length === 0 ? (
            <p className="text-center text-navy-500 py-8">No open positions at the moment. Send us your resume for future opportunities.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {jobs.map((j, i) => <JobCard key={j._id || j.slug} job={j} index={i} showApply onApply={openApply} />)}
            </div>
          )}
        </div>
      </section>

      {/* Apply Form */}
      <section ref={formRef} className="section-padding bg-white">
        <div className="container max-w-2xl mx-auto">
          <h2 className="text-3xl mb-2 text-center">Apply Now</h2>
          <p className="text-navy-500 text-center mb-8">
            {selectedJob ? `Applying for: ${selectedJob.title}` : 'Send us your resume for consideration'}
          </p>

          <AnimatePresence>
            {status && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className={`mb-6 p-4 rounded-lg text-sm font-medium ${status.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                {status.message}
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-navy-700 mb-1.5">Full Name <span className="text-red-500">*</span></label>
                <input name="fullName" value={form.fullName} onChange={handleChange} className={`input-field ${errors.fullName ? 'border-red-400' : ''}`} />
                {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-navy-700 mb-1.5">Email <span className="text-red-500">*</span></label>
                <input name="email" type="email" value={form.email} onChange={handleChange} className={`input-field ${errors.email ? 'border-red-400' : ''}`} />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-navy-700 mb-1.5">Phone</label>
              <input name="phone" type="tel" value={form.phone} onChange={handleChange} className="input-field" />
            </div>

            <div>
              <label className="block text-sm font-medium text-navy-700 mb-1.5">Resume <span className="text-red-500">*</span></label>
              <input ref={fileRef} type="file" accept=".pdf,.doc,.docx" onChange={handleFile}
                className={`input-field file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-accent/10 file:text-accent hover:file:bg-accent/20 ${errors.resume ? 'border-red-400' : ''}`} />
              {file && <p className="text-sm text-navy-500 mt-1">📄 {file.name} ({(file.size / 1024 / 1024).toFixed(1)} MB)</p>}
              {errors.resume && <p className="text-red-500 text-xs mt-1">{errors.resume}</p>}
              <p className="text-navy-400 text-xs mt-1">PDF, DOC, or DOCX · Max 5 MB</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-navy-700 mb-1.5">Cover Letter / Message</label>
              <textarea name="coverLetter" rows="4" value={form.coverLetter} onChange={handleChange} className="input-field resize-none" placeholder="Tell us about yourself and why you're interested…" />
            </div>

            <button type="submit" disabled={submitting}
              className={`btn btn-primary w-full ${submitting ? 'opacity-60 cursor-not-allowed' : ''}`}>
              {submitting ? (
                <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Submitting…</span>
              ) : 'Submit Application'}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
