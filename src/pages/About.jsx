import { motion } from 'framer-motion';

const fade = (d = 0) => ({ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: d } });

const VALUES = [
  { icon: '🎯', title: 'Quality First', desc: 'Every candidate is technically vetted — no shortcuts.' },
  { icon: '🤝', title: 'Integrity', desc: 'Transparent communication with clients and candidates alike.' },
  { icon: '⚡', title: 'Speed', desc: 'Shortlisted profiles within 48 hours of engagement.' },
  { icon: '🌍', title: 'Global Mindset', desc: 'Deep understanding of European markets and culture.' },
];

const ACHIEVEMENTS = [
  '1000+ IT professionals placed across Europe',
  'Active partnerships in 8+ European countries',
  '98% client satisfaction and retention rate',
  'Specialized in mid-to-senior technical roles',
  'End-to-end recruitment including visa support',
];

export default function About() {
  return (
    <>
      <section className="page-hero bg-gradient-to-br from-navy-50 to-accent/5">
        <div className="container text-center max-w-3xl mx-auto">
          <motion.h1 {...fade()} className="text-4xl md:text-5xl mb-6">About <span className="text-accent">TELVEL IT</span></motion.h1>
          <motion.p {...fade(0.1)} className="text-lg text-navy-500">IT recruitment specialists connecting Indian talent with European opportunity since 2014.</motion.p>
        </div>
      </section>

      {/* Overview */}
      <section className="section-padding bg-white">
        <div className="container max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <motion.div {...fade()}>
              <h2 className="text-3xl mb-6">Who We Are</h2>
              <p className="text-navy-600 leading-relaxed mb-4">TELVEL IT Solutions is a specialized IT recruitment company that bridges the talent gap between India and Europe. With over 10 years of experience, we understand both the technical demands of European employers and the aspirations of Indian IT professionals.</p>
              <p className="text-navy-600 leading-relaxed">We are not a generic staffing agency. We focus exclusively on IT roles — developers, engineers, analysts, and architects — ensuring deep domain expertise in every placement we make.</p>
            </motion.div>
            <div className="space-y-6">
              <motion.div {...fade(0.1)} className="bg-accent/5 p-8 rounded-2xl">
                <h3 className="text-2xl font-bold mb-3">🎯 Mission</h3>
                <p className="text-navy-600 leading-relaxed">To provide European businesses with job-ready, pre-screened IT professionals while creating meaningful international career opportunities for Indian talent.</p>
              </motion.div>
              <motion.div {...fade(0.2)} className="bg-navy-50 p-8 rounded-2xl">
                <h3 className="text-2xl font-bold mb-3">🔭 Vision</h3>
                <p className="text-navy-600 leading-relaxed">To become Europe's most trusted partner for IT talent sourced from India — known for quality, speed, and integrity.</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-navy-50">
        <div className="container">
          <h2 className="text-3xl md:text-4xl mb-10 text-center">Our Values</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {VALUES.map((v, i) => (
              <motion.div key={v.title} {...fade(i * 0.08)} whileHover={{ scale: 1.03 }}
                className="bg-white p-6 rounded-xl text-center hover:shadow-lg transition-all">
                <div className="text-3xl mb-3">{v.icon}</div>
                <h3 className="font-display font-bold mb-2">{v.title}</h3>
                <p className="text-navy-500 text-sm">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="section-padding bg-white">
        <div className="container max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl mb-8 text-center">Achievements</h2>
          <div className="space-y-4">
            {ACHIEVEMENTS.map((a, i) => (
              <motion.div key={i} {...fade(i * 0.06)} className="flex items-start gap-3 bg-navy-50 p-4 rounded-lg">
                <span className="text-accent font-bold mt-0.5">✓</span>
                <span className="text-navy-700">{a}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
