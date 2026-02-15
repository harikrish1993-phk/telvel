# TELVEL IT Solutions — IT Recruitment Website

Professional recruitment website connecting Indian IT talent with European businesses.

**Stack:** React 18 + Vite (frontend) · Express + MongoDB (backend) · Multer (file uploads)

---

## Quick Start

### Prerequisites

- Node.js ≥ 18
- MongoDB ≥ 6 (running locally)

### Setup

```bash
npm install
cp .env.example .env     # Edit with your MongoDB URI and email credentials
npm run seed              # Populate jobs database
npm run dev               # Starts both backend (5000) and frontend (5173)
```

Open **http://localhost:5173**

### Production

```bash
npm run build
npm start                 # Serves everything from http://localhost:5000
```

---

## Project Structure

```
telvel-it-website/
├── server.js                    # Express entry point
├── server/
│   ├── config/
│   │   ├── company.js           # Company info (single source of truth)
│   │   ├── db.js                # MongoDB connection
│   │   └── email.js             # Nodemailer + templates
│   ├── middleware/
│   │   └── security.js          # Helmet, rate limiting, validation, multer
│   ├── models/
│   │   ├── Job.js               # Job postings
│   │   ├── Application.js       # Job applications (with resume path)
│   │   └── Contact.js           # Contact form submissions
│   ├── routes/
│   │   └── api.js               # All API endpoints
│   └── utils/
│       └── logger.js
├── src/                         # React frontend
│   ├── App.jsx                  # Router + layout
│   ├── components/              # Navigation, Footer, Logo, JobCard, WhatsApp
│   ├── pages/
│   │   ├── Home.jsx             # Hero, stats, roles, process, jobs, testimonials
│   │   ├── About.jsx            # Company, mission, values, achievements
│   │   ├── Recruitment.jsx      # Services, roles, hiring process
│   │   ├── Careers.jsx          # Job listings + apply form with file upload
│   │   ├── CandidateSupport.jsx # Resume/interview/visa guidance
│   │   ├── Contact.jsx          # Contact form (hire/general)
│   │   └── NotFound.jsx
│   └── services/api.js          # API client
├── uploads/                     # Resume files (gitignored)
├── scripts/seed.js              # Database seeder
└── tests/api.test.js            # Model tests
```

---

## API Endpoints

| Method | Path                 | Description                    |
|--------|----------------------|--------------------------------|
| GET    | `/health`            | Health check                   |
| GET    | `/api/company-info`  | Company data from config       |
| GET    | `/api/jobs`          | Active jobs (?featured=true)   |
| GET    | `/api/jobs/:slug`    | Single job by slug             |
| POST   | `/api/applications`  | Submit application + resume    |
| POST   | `/api/contact`       | Submit contact form            |
| GET    | `/api/stats`         | Site statistics                |

---

## MongoDB Collections

- **jobs** — title, slug, description, skills[], location, type, experience, status, featured
- **applications** — fullName, email, phone, coverLetter, resumePath, jobId, status
- **contacts** — fullName, email, phone, companyName, subject, message, type, status

---

## Customizing Colors (When Logo is Ready)

Edit `tailwind.config.js` → `theme.extend.colors`:

```js
accent: {
  DEFAULT: '#YOUR_PRIMARY_COLOR',
  light: '#YOUR_LIGHTER_SHADE',
  dark: '#YOUR_DARKER_SHADE',
}
```

The entire site palette adjusts automatically.

---

## Resume Upload

- Accepted: PDF, DOC, DOCX
- Max size: 5 MB (configurable in .env)
- Stored in: `uploads/` directory
- Filenames: `resume-{timestamp}-{random}.ext`
