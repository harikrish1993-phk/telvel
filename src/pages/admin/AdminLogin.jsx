import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminApi, setToken, isLoggedIn } from '../../services/adminApi.js';

export default function AdminLogin() {
  const nav = useNavigate();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (isLoggedIn()) { nav('/admin/dashboard', { replace: true }); return null; }

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    if (!password) { setError('Password is required'); return; }
    setLoading(true);
    try {
      const data = await adminApi.login(password);
      setToken(data.token);
      nav('/admin/dashboard', { replace: true });
    } catch (err) {
      setError(err.message || 'Invalid credentials');
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-navy-950 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <img src="/logo.jpeg" alt="TELVEL IT" className="h-12 mx-auto mb-4" />
          <h1 className="text-2xl font-display font-bold text-navy-900">Admin Panel</h1>
          <p className="text-navy-500 text-sm mt-1">Enter your admin password to continue</p>
        </div>

        {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">{error}</div>}

        <form onSubmit={submit} className="space-y-5">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-navy-700 mb-1.5">Password</label>
            <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}
              className="input-field" placeholder="Enter admin password" autoFocus />
          </div>
          <button type="submit" disabled={loading}
            className={`btn btn-primary w-full ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}>
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <a href="/" className="block text-center text-sm text-navy-400 hover:text-accent mt-6">← Back to Website</a>
      </div>
    </div>
  );
}
