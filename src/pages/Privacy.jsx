import { motion } from 'framer-motion';

const fade = (d = 0) => ({ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: d } });

export default function Privacy() {
  return (
    <>
      <section className="page-hero bg-gradient-to-br from-navy-50 to-accent/5">
        <div className="container text-center max-w-3xl mx-auto">
          <motion.h1 {...fade()} className="text-4xl md:text-5xl mb-4">Privacy Policy</motion.h1>
          <motion.p {...fade(0.1)} className="text-navy-500">Last updated: February 2026</motion.p>
        </div>
      </section>
      <section className="section-padding bg-white">
        <div className="container max-w-3xl mx-auto prose-navy">
          <motion.div {...fade()} className="space-y-8 text-navy-600 leading-relaxed">
            <div>
              <h2 className="text-xl font-display font-bold text-navy-900 mb-3">1. Introduction</h2>
              <p>TELVEL IT Solutions Pvt. Ltd. ("we", "us", "our") is committed to protecting the privacy of our website visitors, job applicants, and clients. This policy explains how we collect, use, and safeguard your personal information.</p>
            </div>
            <div>
              <h2 className="text-xl font-display font-bold text-navy-900 mb-3">2. Information We Collect</h2>
              <p>We collect information you provide directly to us including your name, email address, phone number, company name, resume/CV, cover letter, and any other information submitted through our forms. We also collect technical data such as IP address, browser type, and usage patterns.</p>
            </div>
            <div>
              <h2 className="text-xl font-display font-bold text-navy-900 mb-3">3. How We Use Your Information</h2>
              <p>We use collected information to process job applications and match candidates with opportunities, respond to inquiries and provide recruitment services, send relevant job opportunities and company updates (with your consent), improve our website and services, and comply with legal obligations.</p>
            </div>
            <div>
              <h2 className="text-xl font-display font-bold text-navy-900 mb-3">4. Data Sharing</h2>
              <p>We may share candidate information with prospective employers as part of our recruitment services — only with your explicit consent. We do not sell personal information to third parties.</p>
            </div>
            <div>
              <h2 className="text-xl font-display font-bold text-navy-900 mb-3">5. Data Retention</h2>
              <p>We retain candidate data for up to 2 years to match you with future opportunities unless you request earlier deletion. Contact form submissions are retained for 1 year.</p>
            </div>
            <div>
              <h2 className="text-xl font-display font-bold text-navy-900 mb-3">6. GDPR Compliance</h2>
              <p>For European clients and candidates, we comply with the General Data Protection Regulation (GDPR). You have the right to access, correct, delete, or port your personal data. You may withdraw consent at any time by contacting us at <a href="mailto:info@telvelit.com" className="text-accent hover:underline">info@telvelit.com</a>.</p>
            </div>
            <div>
              <h2 className="text-xl font-display font-bold text-navy-900 mb-3">7. Security</h2>
              <p>We implement appropriate technical and organisational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.</p>
            </div>
            <div>
              <h2 className="text-xl font-display font-bold text-navy-900 mb-3">8. Contact</h2>
              <p>For any privacy-related inquiries or to exercise your rights, contact us at <a href="mailto:info@telvelit.com" className="text-accent hover:underline">info@telvelit.com</a>.</p>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
