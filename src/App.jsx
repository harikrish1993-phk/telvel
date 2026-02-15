import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { isLoggedIn } from './services/adminApi.js';

// Public components
import Navigation from './components/Navigation.jsx';
import Footer from './components/Footer.jsx';
import WhatsAppButton from './components/WhatsAppButton.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';

// Public pages
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Recruitment from './pages/Recruitment.jsx';
import Careers from './pages/Careers.jsx';
import CandidateSupport from './pages/CandidateSupport.jsx';
import Contact from './pages/Contact.jsx';
import Privacy from './pages/Privacy.jsx';
import Terms from './pages/Terms.jsx';
import NotFound from './pages/NotFound.jsx';

// Admin
import AdminLayout from './components/AdminLayout.jsx';
import AdminLogin from './pages/admin/AdminLogin.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import AdminJobs from './pages/admin/AdminJobs.jsx';
import AdminApplications from './pages/admin/AdminApplications.jsx';
import AdminContacts from './pages/admin/AdminContacts.jsx';

function AdminGuard({ children }) {
  const loc = useLocation();
  if (!isLoggedIn()) return <Navigate to="/admin" state={{ from: loc }} replace />;
  return children;
}

function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/it-recruitment" element={<Recruitment />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/candidate-support" element={<CandidateSupport />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Admin routes — separate layout, no public nav/footer */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/*" element={
          <AdminGuard>
            <AdminLayout />
          </AdminGuard>
        }>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="jobs" element={<AdminJobs />} />
          <Route path="applications" element={<AdminApplications />} />
          <Route path="contacts" element={<AdminContacts />} />
          <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
        </Route>

        {/* Public routes */}
        <Route path="/*" element={<PublicLayout />} />
      </Routes>
    </BrowserRouter>
  );
}
