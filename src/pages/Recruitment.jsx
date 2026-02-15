import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const fade = (d = 0) => ({ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: d } });

const SERVICES = [
  { icon: '🔍', title: 'IT Recruitment', desc: 'End-to-end recruitment of skilled IT professionals for European companies.' },
  { icon: '📋', title: 'Candidate Screening', desc: 'Rigorous technical vetting, background checks, and skills assessment.' },
  { icon: '🗓️', title: 'Interview Coordination', desc: 'Full interview lifecycle management — scheduling, prep, and feedback.' },
  { icon: '🤝', title: 'Hiring Support', desc: 'Offer management, negotiation support, and onboarding assistance.' },
];

const ROLES = [
  'Software Developers', 'DevOps Engineers', 'QA Engineers', 'Data Analysts',
  'Cloud Engineers', 'Full-Stack Developers', 'Mobile Developers', 'UI/UX Designers',
  'Solution Architects', 'Project Managers',
];

const PROCESS = [
  { n: '01', t: 'Share Requirements', d: 'Tell us the role, skills, experience, and timeline you need.' },
  { n: '02', t: 'We Screen & Shortlist', d: 'Our team sources, vets, and presents top-matching candidates.' },
  { n: '03', t: 'You Interview', d: 'We coordinate interviews and handle all scheduling logistics.' },
  { n: '04', t: 'Hire & Onboard', d: 'We support the offer process and ensure smooth onboarding.' },
];

export default function Recruitment() {
  return (
    <>
      <section className="page-hero bg-gradient-to-br from-navy-50 to-accent/5">
        <div className="container text-center max-w-3xl mx-auto">
          <motion.h1 {...fade()} className="text-4xl md:text-5xl mb-6">IT <span className="text-accent">Recruitment</span></motion.h1>
          <motion.p {...fade(0.1)} className="text-lg text-navy-500">Providing top Indian IT talent for European companies — fast, reliable, and pre-screened.</motion.p>
        </div>
      </section>

      {/* What We Do */}
      <section className="section-padding bg-white">
        <div className="container">
          <h2 className="text-3xl md:text-4xl mb-10 text-center">What We Do</h2>
          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {SERVICES.map((s, i) => (
              <motion.div key={s.title} {...fade(i * 0.08)} className="bg-navy-50 p-6 rounded-xl hover:shadow-md transition-shadow">
                <div className="text-3xl mb-3">{s.icon}</div>
                <h3 className="text-lg font-display font-bold mb-2">{s.title}</h3>
                <p className="text-navy-500 text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Roles */}
      <section className="section-padding bg-navy-50">
        <div className="container">
          <h2 className="text-3xl md:text-4xl mb-10 text-center">Roles We Cover</h2>
          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {ROLES.map((r, i) => (
              <motion.span key={r} {...fade(i * 0.04)} className="badge bg-white text-navy-700 border border-navy-200 px-4 py-2 text-sm font-medium hover:border-accent hover:text-accent transition-colors cursor-default">
                {r}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section-padding bg-white">
        <div className="container">
          <h2 className="text-3xl md:text-4xl mb-10 text-center">Hiring Process</h2>
          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {PROCESS.map((p, i) => (
              <motion.div key={p.n} {...fade(i * 0.1)} className="text-center relative">
                <div className="w-14 h-14 rounded-full bg-accent text-white font-display font-bold text-lg flex items-center justify-center mx-auto mb-4">{p.n}</div>
                <h3 className="font-display font-bold text-sm mb-2">{p.t}</h3>
                <p className="text-navy-500 text-sm">{p.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-navy-900 to-accent-dark py-16">
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Hire IT Talent?</h2>
          <p className="text-white/70 mb-8 max-w-lg mx-auto">Share your requirements and we'll deliver shortlisted candidates within 48 hours.</p>
          <Link to="/contact" className="btn bg-white text-navy-900 font-bold hover:bg-gray-100 shadow-lg">Hire IT Talent →</Link>
        </div>
      </section>
    </>
  );
}
