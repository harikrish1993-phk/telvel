import 'dotenv/config';
import mongoose from 'mongoose';
import Job from '../server/models/Job.js';
import Contact from '../server/models/Contact.js';

const URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/telvel_db';

const jobs = [
  {
    title: 'Senior Frontend Developer',
    slug: 'senior-frontend-developer',
    description: "We are looking for a Senior Frontend Developer with strong React experience to join our client's team in Berlin. You will build modern, responsive web applications and mentor junior developers.",
    skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'REST APIs'],
    location: 'Brussles, Belgium',
    type: 'full-time',
    experience: '5+ years',
    status: 'active',
    featured: true,
  },
  {
    title: 'Backend Developer (Node.js)',
    slug: 'backend-developer-nodejs',
    description: 'Join a growing fintech startup in Amsterdam as a Backend Developer. You will design and build scalable microservices using Node.js and work with cloud-native technologies.',
    skills: ['Node.js', 'Express', 'MongoDB', 'Docker', 'AWS'],
    location: 'Amsterdam, Netherlands',
    type: 'full-time',
    experience: '3+ years',
    status: 'active',
    featured: true,
  },
  {
    title: 'DevOps Engineer',
    slug: 'devops-engineer',
    description: 'A leading healthcare company in Dublin seeks a DevOps Engineer to manage CI/CD pipelines, container orchestration, and cloud infrastructure on Azure.',
    skills: ['Azure', 'Kubernetes', 'Docker', 'Terraform', 'Jenkins', 'Linux'],
    location: 'Belgium',
    type: 'full-time',
    experience: '4+ years',
    status: 'active',
    featured: true,
  },
  {
    title: 'QA Engineer',
    slug: 'qa-engineer',
    description: 'Our client in Stockholm needs a QA Engineer to design test strategies, write automated tests, and ensure product quality across web and mobile platforms.',
    skills: ['Selenium', 'Cypress', 'Jest', 'API Testing', 'Agile'],
    location: 'Stockholm, Sweden',
    type: 'full-time',
    experience: '3+ years',
    status: 'active',
    featured: false,
  },
  {
    title: 'Data Analyst',
    slug: 'data-analyst',
    description: 'A logistics company in Paris is hiring a Data Analyst to transform raw data into actionable business insights using SQL, Python, and visualization tools.',
    skills: ['SQL', 'Python', 'Power BI', 'Excel', 'ETL'],
    location: 'Paris, France',
    type: 'contract',
    experience: '2+ years',
    status: 'active',
    featured: false,
  },
  {
    title: 'Full-Stack Developer',
    slug: 'full-stack-developer',
    description: 'An e-commerce company in London is looking for a Full-Stack Developer proficient in React and Python/Django to build customer-facing features and internal tools.',
    skills: ['React', 'Python', 'Django', 'PostgreSQL', 'Redis'],
    location: 'Belgium',
    type: 'full-time',
    experience: '4+ years',
    status: 'active',
    featured: false,
  },
];

async function seed() {
  try {
    await mongoose.connect(URI);
    console.log('✅ Connected to MongoDB');

    await Job.deleteMany({});
    await Contact.deleteMany({});
    console.log('🗑  Cleared existing data');

    const created = await Job.insertMany(jobs);
    console.log(`📦 Inserted ${created.length} jobs`);
    created.forEach((j) => console.log(`   • ${j.title} (${j.location}) ${j.featured ? '⭐' : ''}`));

    console.log('\n✅ Seed complete!');
  } catch (err) {
    console.error('❌ Seed failed:', err.message);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
  }
}

seed();
