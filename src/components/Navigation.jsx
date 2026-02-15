import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo.jsx';

const NAV = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/it-recruitment', label: 'IT Recruitment' },
  { to: '/careers', label: 'Careers' },
  { to: '/candidate-support', label: 'Candidate Support' },
  { to: '/contact', label: 'Contact' },
];

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      {/* Top bar */}
      <div className="bg-navy-900 text-navy-300 text-xs py-1.5 hidden md:block">
        <div className="container flex justify-between items-center">
          <div className="flex gap-6">
            <span>📞 +91 98765 43210</span>
            <span>📧 info@telvel.com</span>
          </div>
          <span className="text-navy-400">🌍 Serving Europe · 10+ Years Experience</span>
        </div>
      </div>

      {/* Main nav */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-2' : 'bg-white py-3'}`}>
        <div className="container flex items-center justify-between">
          <Link to="/" aria-label="Home"><Logo /></Link>

          {/* Desktop */}
          <ul className="hidden lg:flex items-center gap-6">
            {NAV.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className={`relative py-1 text-sm font-medium transition-colors ${
                    pathname === l.to ? 'text-accent font-bold' : 'text-navy-600 hover:text-accent'
                  }`}
                >
                  {l.label}
                  {pathname === l.to && (
                    <motion.span layoutId="nav-ul" className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-accent rounded-full" />
                  )}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/contact" className="btn btn-hire text-sm">Hire IT Talent</Link>
            </li>
          </ul>

          {/* Mobile toggle */}
          <button className="lg:hidden p-2" onClick={() => setOpen((v) => !v)} aria-label="Menu" aria-expanded={open}>
            <div className="w-6 flex flex-col gap-1.5">
              <span className={`block h-0.5 bg-navy-800 rounded transition-transform ${open ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block h-0.5 bg-navy-800 rounded transition-opacity ${open ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 bg-navy-800 rounded transition-transform ${open ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="lg:hidden bg-white border-t overflow-hidden">
              <div className="container py-4 flex flex-col gap-1">
                {NAV.map((l) => (
                  <Link key={l.to} to={l.to} className={`py-3 px-3 rounded-lg text-sm font-medium ${pathname === l.to ? 'text-accent bg-accent-50' : 'text-navy-700 hover:bg-navy-50'}`}>{l.label}</Link>
                ))}
                <Link to="/contact" className="btn btn-hire mt-2 text-center">Hire IT Talent</Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
