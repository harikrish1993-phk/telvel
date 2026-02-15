import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const fade = (d = 0) => ({ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: d } });

const SUPPORT = [
  { icon: '📝', title: 'Resume Preparation', desc: 'Guidance on structuring your resume to meet European employer expectations — formatting, keywords, and relevance.' },
  { icon: '🎤', title: 'Interview Preparation', desc: 'Mock interviews, common questions, and tips tailored to the specific role and company you are applying for.' },
  { icon: '💼', title: 'Role Understanding', desc: 'Clear explanation of the job responsibilities, team structure, technology stack, and growth opportunities.' },
  { icon: '📋', title: 'Process Guidance', desc: 'Step-by-step walkthrough of the entire hiring process from application to offer to onboarding.' },
  { icon: '📄', title: 'Documentation Support', desc: 'Assistance with work permits, visa requirements, and relocation documentation for European positions.' },
];

const STEPS = [
  { n: '01', t: 'Apply', d: 'Submit your resume through our careers page or contact us directly.' },
  { n: '02', t: 'Prepare', d: 'We help you refine your resume and prepare for interviews.' },
  { n: '03', t: 'Get Hired', d: 'We coordinate interviews and support you through the offer process.' },
];

export default function CandidateSupport() {
  return (
    <>
      <section className="page-hero bg-gradient-to-br from-navy-50 to-accent/5">
        <div className="container text-center max-w-3xl mx-auto">
          <motion.h1 {...fade()} className="text-4xl md:text-5xl mb-6">Candidate <span className="text-accent">Support</span></motion.h1>
          <motion.p {...fade(0.1)} className="text-lg text-navy-500">We guide you throughout the recruitment process — from application to onboarding.</motion.p>
        </div>
      </section>

      {/* Support Areas */}
      <section className="section-padding bg-white">
        <div className="container max-w-4xl mx-auto">
          <h2 className="text-3xl mb-10 text-center">How We Help</h2>
          <div className="space-y-6">
            {SUPPORT.map((s, i) => (
              <motion.div key={s.title} {...fade(i * 0.08)} className="flex gap-5 bg-navy-50 p-6 rounded-xl hover:shadow-md transition-shadow">
                <div className="text-3xl flex-shrink-0">{s.icon}</div>
                <div>
                  <h3 className="font-display font-bold text-lg mb-1">{s.title}</h3>
                  <p className="text-navy-500 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section-padding bg-navy-50">
        <div className="container max-w-4xl mx-auto">
          <h2 className="text-3xl mb-10 text-center">Your Journey</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {STEPS.map((s, i) => (
              <motion.div key={s.n} {...fade(i * 0.1)} className="text-center">
                <div className="w-14 h-14 rounded-full bg-accent text-white font-display font-bold text-lg flex items-center justify-center mx-auto mb-4">{s.n}</div>
                <h3 className="font-display font-bold mb-2">{s.t}</h3>
                <p className="text-navy-500 text-sm">{s.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-white">
        <div className="container text-center max-w-xl mx-auto">
          <h2 className="text-3xl mb-4">Ready to Start?</h2>
          <p className="text-navy-500 mb-8">Browse our open positions and submit your application. We'll take it from there.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/careers" className="btn btn-primary">View Openings</Link>
            <Link to="/contact" className="btn btn-ghost">Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  );
}
