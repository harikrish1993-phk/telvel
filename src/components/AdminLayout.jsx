import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { clearToken } from '../services/adminApi.js';

const LINKS = [
  { to: '/admin', label: 'Dashboard', icon: '📊', end: true },
  { to: '/admin/jobs', label: 'Jobs', icon: '💼' },
  { to: '/admin/applications', label: 'Applications', icon: '📄' },
  { to: '/admin/contacts', label: 'Contacts', icon: '📧' },
];

export default function AdminLayout() {
  const nav = useNavigate();

  const logout = () => {
    clearToken();
    nav('/admin');
  };

  return (
    <div className="min-h-screen flex bg-navy-50">
      {/* Sidebar */}
      <aside className="w-60 bg-navy-900 text-white flex flex-col flex-shrink-0">
        <div className="p-5 border-b border-navy-700">
          <h2 className="font-display font-bold text-lg">TELVEL Admin</h2>
          <p className="text-navy-400 text-xs mt-0.5">Management Panel</p>
        </div>
        <nav className="flex-1 py-4">
          {LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-5 py-3 text-sm font-medium transition-colors ${
                  isActive ? 'bg-accent/20 text-accent-light border-r-2 border-accent-light' : 'text-navy-300 hover:bg-navy-800 hover:text-white'
                }`}>
              <span>{l.icon}</span>{l.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-navy-700">
          <button onClick={logout} className="w-full text-left text-sm text-navy-400 hover:text-white transition-colors py-2 px-2 rounded hover:bg-navy-800">
            🚪 Logout
          </button>
          <a href="/" className="block text-sm text-navy-500 hover:text-white transition-colors py-2 px-2 rounded hover:bg-navy-800 mt-1">
            ← Back to Website
          </a>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
