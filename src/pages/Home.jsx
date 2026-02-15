import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { api } from '../services/api.js';
import JobCard from '../components/JobCard.jsx';

const fade = (d = 0) => ({ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: d } });

const STATS = [
  { value: '10+', label: 'Years Experience' },
  { value: '1000+', label: 'Professionals Placed' },
  { value: '50+', label: 'European Clients' },
  { value: '98%', label: 'Client Satisfaction' },
];

const ROLES = ['Software Developers', 'DevOps Engineers', 'QA Engineers', 'Data Analysts', 'Cloud Engineers', 'Full-Stack Developers'];

const PROCESS = [
  { n: '01', t: 'Requirement Understanding', d: 'We analyse your technical needs, team culture, and timeline.' },
  { n: '02', t: 'Candidate Screening', d: 'Our experts source and shortlist pre-screened candidates.' },
  { n: '03', t: 'Interview Coordination', d: 'We manage the entire interview lifecycle seamlessly.' },
  { n: '04', t: 'Hiring & Support', d: 'From offers to onboarding, we ensure a smooth transition.' },
];

const WHY = [
  { icon: '🔍', t: 'Pre-Screened Talent', d: 'Every candidate is technically vetted before you review.' },
  { icon: '⚡', t: 'Fast Turnaround', d: 'Shortlisted profiles within 48 hours.' },
  { icon: '🤝', t: 'Transparent Process', d: 'Real-time updates, no hidden costs.' },
  { icon: '🌍', t: 'Europe Expertise', d: 'Deep understanding of EU work culture & compliance.' },
];

const TESTIMONIALS = [
  { quote: 'TELVEL helped us hire 5 senior developers in under 3 weeks. Their screening quality is exceptional.', name: 'CTO, FinTech Startup', loc: 'Berlin' },
  { quote: 'The team understood our requirements perfectly and provided candidates who were interview-ready.', name: 'Head of Engineering', loc: 'Amsterdam' },
];

export default function Home() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    api.getJobs(true).then((d) => setJobs(d.jobs?.slice(0, 3) || [])).catch(() => {});
  }, []);

  return (
    <>
      {/* ── Hero ──────────────────────────────── */}
      <section className="relative pt-20 pb-20 md:pt-28 md:pb-28 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px]" />
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <motion.p {...fade(0)} className="text-accent-light font-display font-semibold text-sm tracking-widest uppercase mb-4">
              IT Recruitment · India → Europe
            </motion.p>
            <motion.h1 {...fade(0.1)} className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-6">
              Hire Skilled IT{' '}
              <span className="text-accent-light">Professionals</span>{' '}
              for Europe
            </motion.h1>
            <motion.p {...fade(0.2)} className="text-lg text-navy-300 mb-10 max-w-xl leading-relaxed">
              10+ years of IT recruitment expertise. We connect pre-screened Indian IT talent with leading European businesses.
            </motion.p>
            <motion.div {...fade(0.3)} className="flex flex-wrap gap-4">
              <Link to="/contact" className="btn btn-hire text-base px-8 py-4">Hire IT Talent</Link>
              <Link to="/careers" className="btn btn-outline text-base px-8 py-4">View Careers</Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Stats ─────────────────────────────── */}
      <section className="bg-white section-padding">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((s, i) => (
              <motion.div key={s.label} {...fade(i * 0.08)} className="text-center">
                <div className="text-3xl md:text-4xl font-display font-extrabold text-accent mb-1">{s.value}</div>
                <div className="text-navy-500 text-sm">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Roles ─────────────────────────────── */}
      <section className="section-padding bg-navy-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-4">IT Roles We Provide</h2>
            <p className="text-navy-500 max-w-lg mx-auto">Specialized recruitment across key technology domains</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {ROLES.map((r, i) => (
              <motion.div key={r} {...fade(i * 0.06)} className="bg-white rounded-xl p-5 text-center shadow-sm hover:shadow-md hover:border-accent/30 border border-transparent transition-all">
                <span className="text-navy-700 font-display font-semibold text-sm">{r}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ───────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-4">Our Hiring Process</h2>
            <p className="text-navy-500 max-w-lg mx-auto">A streamlined process that delivers results</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {PROCESS.map((p, i) => (
              <motion.div key={p.n} {...fade(i * 0.1)} className="relative text-center">
                <div className="w-12 h-12 rounded-full bg-accent/10 text-accent font-display font-bold flex items-center justify-center mx-auto mb-4 text-lg">{p.n}</div>
                <h3 className="text-base font-display font-bold mb-2">{p.t}</h3>
                <p className="text-navy-500 text-sm leading-relaxed">{p.d}</p>
                {i < 3 && <div className="hidden md:block absolute top-6 left-[60%] w-[80%] h-px bg-navy-200" />}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Us ────────────────────────────── */}
      <section className="section-padding bg-navy-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-4">Why Choose TELVEL IT</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {WHY.map((w, i) => (
              <motion.div key={w.t} {...fade(i * 0.08)} whileHover={{ y: -4 }}
                className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-lg transition-all">
                <div className="text-3xl mb-3">{w.icon}</div>
                <h3 className="font-display font-bold text-sm mb-2">{w.t}</h3>
                <p className="text-navy-500 text-sm">{w.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Candidate Support Teaser ─────────── */}
      <section className="section-padding bg-white">
        <div className="container max-w-4xl mx-auto text-center">
          <motion.div {...fade()}>
            <h2 className="text-3xl md:text-4xl mb-4">We Support Candidates Too</h2>
            <p className="text-navy-500 mb-6 max-w-xl mx-auto">
              We guide candidates throughout the hiring process — from resume improvement to interview preparation.
            </p>
            <Link to="/candidate-support" className="btn btn-ghost">Learn More →</Link>
          </motion.div>
        </div>
      </section>

      {/* ── Featured Jobs ─────────────────────── */}
      {jobs.length > 0 && (
        <section className="section-padding bg-navy-50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl mb-4">Featured Openings</h2>
              <p className="text-navy-500">Current opportunities for IT professionals</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {jobs.map((j, i) => <JobCard key={j._id || j.slug} job={j} index={i} />)}
            </div>
            <div className="text-center mt-10">
              <Link to="/careers" className="btn btn-primary">View All Jobs →</Link>
            </div>
          </div>
        </section>
      )}

      {/* ── Testimonials ──────────────────────── */}
      <section className="section-padding bg-white">
        <div className="container max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl mb-10 text-center">What Our Clients Say</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <motion.blockquote key={i} {...fade(i * 0.1)} className="bg-navy-50 rounded-xl p-8">
                <p className="text-navy-700 leading-relaxed mb-4 italic">"{t.quote}"</p>
                <footer className="text-sm text-navy-500 font-medium">— {t.name}, {t.loc}</footer>
              </motion.blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────── */}
      <section className="bg-gradient-to-r from-navy-900 to-accent-dark py-16">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Looking to Hire IT Talent or Join Our Team?
          </h2>
          <p className="text-white/70 mb-8 max-w-lg mx-auto">
            Whether you're a European company seeking skilled professionals or a candidate ready for international opportunities.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className="btn bg-white text-navy-900 font-bold hover:bg-gray-100 shadow-lg">Hire Talent</Link>
            <Link to="/careers" className="btn btn-outline">Apply Now</Link>
          </div>
        </div>
      </section>
    </>
  );
}
