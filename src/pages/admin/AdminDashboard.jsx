import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { adminApi } from '../../services/adminApi.js';

function StatCard({ icon, label, value, accent, to }) {
  const Wrapper = to ? Link : 'div';
  return (
    <Wrapper to={to} className={`bg-white rounded-xl p-6 shadow-sm border border-navy-100 ${to ? 'hover:shadow-md hover:border-accent/30 transition-all' : ''}`}>
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl ${accent ? 'bg-accent/10' : 'bg-navy-50'}`}>{icon}</div>
        <div>
          <p className="text-2xl font-display font-bold text-navy-900">{value ?? '—'}</p>
          <p className="text-navy-500 text-sm">{label}</p>
        </div>
      </div>
    </Wrapper>
  );
}

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    adminApi.getDashboard()
      .then((d) => setStats(d.stats))
      .catch((e) => setError(e.message));
  }, []);

  if (error) return <div className="p-4 bg-red-50 text-red-700 rounded-lg">{error}</div>;

  return (
    <div>
      <h1 className="text-2xl font-display font-bold text-navy-900 mb-6">Dashboard</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <StatCard icon="💼" label="Total Jobs" value={stats?.totalJobs} to="/admin/jobs" />
        <StatCard icon="✅" label="Active Jobs" value={stats?.activeJobs} accent to="/admin/jobs" />
        <StatCard icon="📄" label="Total Applications" value={stats?.totalApps} to="/admin/applications" />
        <StatCard icon="🆕" label="New Applications" value={stats?.newApps} accent to="/admin/applications" />
        <StatCard icon="📧" label="Total Contacts" value={stats?.totalContacts} to="/admin/contacts" />
        <StatCard icon="📩" label="New Contacts" value={stats?.newContacts} accent to="/admin/contacts" />
      </div>
    </div>
  );
}
