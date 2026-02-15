import { Link } from 'react-router-dom';
import Logo from './Logo.jsx';

const QUICK = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/it-recruitment', label: 'IT Recruitment' },
  { to: '/careers', label: 'Careers' },
  { to: '/candidate-support', label: 'Candidate Support' },
  { to: '/contact', label: 'Contact' },
];

export default function Footer() {
  const y = new Date().getFullYear();
  return (
    <footer className="bg-navy-950 text-navy-400 mt-auto">
      <div className="container py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Logo color="light" />
            <p className="mt-4 text-sm leading-relaxed text-navy-400">
              Connecting top Indian IT talent with leading European businesses since 2014.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-display font-semibold mb-4 text-sm">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {QUICK.map((l) => (
                <li key={l.to}><Link to={l.to} className="hover:text-white transition-colors">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Roles */}
          <div>
            <h4 className="text-white font-display font-semibold mb-4 text-sm">Roles We Cover</h4>
            <ul className="space-y-2 text-sm">
              {['Software Developers', 'DevOps Engineers', 'QA Engineers', 'Data Analysts', 'Cloud Engineers'].map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-display font-semibold mb-4 text-sm">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2"><span>✉️</span><a href="mailto:info@telvel.com" className="hover:text-white">info@telvel.com</a></li>
              <li className="flex items-start gap-2"><span>📞</span><a href="tel:+919876543210" className="hover:text-white">+91 98765 43210</a></li>
              <li className="flex items-start gap-2"><span>📍</span><span>India — Serving Europe</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-navy-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-navy-500 gap-2">
          <p>© {y} TELVEL IT Solutions Pvt. Ltd. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
