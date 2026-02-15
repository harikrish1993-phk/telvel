/**
 * TELVEL IT Solutions — Company Configuration
 * Single source of truth. Update here → reflects everywhere.
 */

const company = {
  name: 'TELVEL IT Solutions Pvt. Ltd.',
  shortName: 'TELVEL IT',
  tagline: 'Hire Skilled IT Professionals for Europe',
  description:
    'We connect top Indian IT talent with European businesses. 10+ years of recruitment expertise delivering pre-screened, job-ready professionals.',
  founded: 2014,
};

const contact = {
  email: {
    info: process.env.CONTACT_EMAIL || 'info@telvel.com',
    hr: process.env.ADMIN_EMAIL || 'hr@telvel.com',
    support: process.env.SUPPORT_EMAIL || 'support@telvel.com',
  },
  phone: process.env.CONTACT_PHONE || '+91 98765 43210',
  whatsapp: process.env.WHATSAPP_NUMBER || '+919876543210',
  address: {
    line1: 'India',
    display: 'India — Serving European Clients',
  },
  hours: 'Mon–Fri 12 PM – 8 PM IST',
};

const social = {
  linkedin: process.env.LINKEDIN_URL || '',
  twitter: process.env.TWITTER_URL || '',
};

const stats = [
  { value: '10+', label: 'Years Experience' },
  { value: '1000+', label: 'IT Professionals Placed' },
  { value: '50+', label: 'European Clients' },
  { value: '98%', label: 'Client Satisfaction' },
];

const roles = [
  'Software Developers',
  'DevOps Engineers',
  'QA Engineers',
  'Data Analysts',
  'Cloud Engineers',
  'Full-Stack Developers',
  'Mobile Developers',
  'UI/UX Designers',
];

const hiringProcess = [
  { step: '01', title: 'Requirement Understanding', desc: 'We analyse your technical needs, team culture, and timeline to build a precise candidate profile.' },
  { step: '02', title: 'Candidate Screening', desc: 'Our experts source, vet, and shortlist pre-screened candidates matching your requirements.' },
  { step: '03', title: 'Interview Coordination', desc: 'We schedule, prep candidates, and manage the entire interview lifecycle seamlessly.' },
  { step: '04', title: 'Hiring & Support', desc: 'From offer management to onboarding support, we ensure a smooth transition.' },
];

const whyUs = [
  { icon: '🔍', title: 'Pre-Screened Talent', desc: 'Every candidate is technically vetted before you see their profile.' },
  { icon: '⚡', title: 'Fast Turnaround', desc: 'Shortlisted profiles within 48 hours of requirement submission.' },
  { icon: '🤝', title: 'Transparent Process', desc: 'Real-time updates, clear communication, no hidden costs.' },
  { icon: '🌍', title: 'Europe Expertise', desc: 'Deep understanding of European work culture, visas, and compliance.' },
];

const candidateSupport = [
  'Resume preparation and improvement guidance',
  'Technical interview preparation',
  'Understanding European job roles and expectations',
  'Hiring process walkthrough and support',
  'Visa and relocation documentation guidance',
];

export default { company, contact, social, stats, roles, hiringProcess, whyUs, candidateSupport };
