import { motion } from 'framer-motion';

const fade = (d = 0) => ({ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: d } });

export default function Terms() {
  return (
    <>
      <section className="page-hero bg-gradient-to-br from-navy-50 to-accent/5">
        <div className="container text-center max-w-3xl mx-auto">
          <motion.h1 {...fade()} className="text-4xl md:text-5xl mb-4">Terms & Conditions</motion.h1>
          <motion.p {...fade(0.1)} className="text-navy-500">Last updated: February 2026</motion.p>
        </div>
      </section>
      <section className="section-padding bg-white">
        <div className="container max-w-3xl mx-auto">
          <motion.div {...fade()} className="space-y-8 text-navy-600 leading-relaxed">
            <div>
              <h2 className="text-xl font-display font-bold text-navy-900 mb-3">1. Acceptance of Terms</h2>
              <p>By accessing and using the TELVEL IT Solutions website, you accept and agree to be bound by these Terms and Conditions. If you do not agree, please do not use this website.</p>
            </div>
            <div>
              <h2 className="text-xl font-display font-bold text-navy-900 mb-3">2. Services</h2>
              <p>TELVEL IT Solutions provides IT recruitment and staffing services connecting Indian IT professionals with European businesses. Our website provides information about our services and allows candidates to apply for positions and clients to submit hiring inquiries.</p>
            </div>
            <div>
              <h2 className="text-xl font-display font-bold text-navy-900 mb-3">3. Job Applications</h2>
              <p>Submitting a job application does not guarantee employment. All applications are reviewed by our recruitment team. We reserve the right to reject any application at our discretion. Information provided in applications must be accurate and truthful.</p>
            </div>
            <div>
              <h2 className="text-xl font-display font-bold text-navy-900 mb-3">4. Intellectual Property</h2>
              <p>All content on this website — including text, graphics, logos, and design — is the property of TELVEL IT Solutions Pvt. Ltd. and is protected by intellectual property laws. You may not reproduce, distribute, or modify any content without prior written consent.</p>
            </div>
            <div>
              <h2 className="text-xl font-display font-bold text-navy-900 mb-3">5. Limitation of Liability</h2>
              <p>TELVEL IT Solutions shall not be liable for any direct, indirect, incidental, or consequential damages arising from the use of this website or our services. We make no guarantees regarding job placement timelines or outcomes.</p>
            </div>
            <div>
              <h2 className="text-xl font-display font-bold text-navy-900 mb-3">6. Governing Law</h2>
              <p>These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in India.</p>
            </div>
            <div>
              <h2 className="text-xl font-display font-bold text-navy-900 mb-3">7. Contact</h2>
              <p>For questions about these terms, contact us at <a href="mailto:info@telvelit.com" className="text-accent hover:underline">info@telvelit.com</a>.</p>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
