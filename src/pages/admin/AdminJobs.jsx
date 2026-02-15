import { useState, useEffect } from 'react';
import { adminApi } from '../../services/adminApi.js';

const EMPTY = { title: '', slug: '', description: '', skills: '', location: 'Europe', type: 'full-time', experience: '', salary: '', status: 'active', featured: false };

function slugify(str) { return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''); }

export default function AdminJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');

  const load = () => {
    setLoading(true);
    adminApi.getJobs().then((d) => setJobs(d.jobs || [])).catch((e) => setError(e.message)).finally(() => setLoading(false));
  };
  useEffect(load, []);

  const openNew = () => { setEditId(null); setForm(EMPTY); setShowForm(true); setError(''); setMsg(''); };
  const openEdit = (job) => {
    setEditId(job._id);
    setForm({ ...job, skills: Array.isArray(job.skills) ? job.skills.join(', ') : job.skills || '' });
    setShowForm(true); setError(''); setMsg('');
  };
  const close = () => { setShowForm(false); setEditId(null); };

  const set = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((p) => {
      const updated = { ...p, [name]: type === 'checkbox' ? checked : value };
      if (name === 'title' && !editId) updated.slug = slugify(value);
      return updated;
    });
  };

  const save = async (e) => {
    e.preventDefault();
    if (!form.title || !form.slug || !form.description) { setError('Title, slug, and description are required'); return; }
    setSaving(true); setError('');
    try {
      const payload = { ...form, skills: form.skills.split(',').map((s) => s.trim()).filter(Boolean) };
      if (editId) {
        await adminApi.updateJob(editId, payload);
        setMsg('Job updated successfully');
      } else {
        await adminApi.createJob(payload);
        setMsg('Job created successfully');
      }
      close(); load();
    } catch (err) { setError(err.message); }
    finally { setSaving(false); }
  };

  const del = async (id, title) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    try {
      await adminApi.deleteJob(id);
      setMsg('Job deleted');
      load();
    } catch (err) { setError(err.message); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-display font-bold text-navy-900">Jobs</h1>
        <button onClick={openNew} className="btn btn-primary text-sm">+ Add Job</button>
      </div>

      {msg && <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">{msg}</div>}
      {error && !showForm && <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">{error}</div>}

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-10 px-4 overflow-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-6 mb-10">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-display font-bold">{editId ? 'Edit Job' : 'New Job'}</h2>
              <button onClick={close} className="text-navy-400 hover:text-navy-700 text-2xl leading-none">&times;</button>
            </div>
            {error && <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">{error}</div>}
            <form onSubmit={save} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-navy-700 mb-1">Title *</label>
                  <input name="title" value={form.title} onChange={set} className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy-700 mb-1">Slug *</label>
                  <input name="slug" value={form.slug} onChange={set} className="input-field text-navy-500" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-navy-700 mb-1">Description *</label>
                <textarea name="description" rows="4" value={form.description} onChange={set} className="input-field resize-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy-700 mb-1">Skills (comma-separated)</label>
                <input name="skills" value={form.skills} onChange={set} className="input-field" placeholder="React, Node.js, Docker" />
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-navy-700 mb-1">Location</label>
                  <input name="location" value={form.location} onChange={set} className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy-700 mb-1">Type</label>
                  <select name="type" value={form.type} onChange={set} className="input-field">
                    <option value="full-time">Full-Time</option>
                    <option value="contract">Contract</option>
                    <option value="part-time">Part-Time</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy-700 mb-1">Experience</label>
                  <input name="experience" value={form.experience} onChange={set} className="input-field" placeholder="3+ years" />
                </div>
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-navy-700 mb-1">Salary</label>
                  <input name="salary" value={form.salary} onChange={set} className="input-field" placeholder="Optional" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy-700 mb-1">Status</label>
                  <select name="status" value={form.status} onChange={set} className="input-field">
                    <option value="active">Active</option>
                    <option value="draft">Draft</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
                <div className="flex items-end pb-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" name="featured" checked={form.featured} onChange={set} className="w-4 h-4 rounded accent-accent" />
                    <span className="text-sm text-navy-700">Featured</span>
                  </label>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={saving} className={`btn btn-primary ${saving ? 'opacity-60' : ''}`}>
                  {saving ? 'Saving…' : editId ? 'Update Job' : 'Create Job'}
                </button>
                <button type="button" onClick={close} className="btn btn-ghost">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Table */}
      {loading ? (
        <div className="text-center py-10"><div className="inline-block w-8 h-8 border-4 border-accent/30 border-t-accent rounded-full animate-spin" /></div>
      ) : jobs.length === 0 ? (
        <p className="text-navy-500 py-8 text-center">No jobs yet. Click "Add Job" to create one.</p>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-navy-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-navy-50 text-navy-600 text-left">
                <tr>
                  <th className="px-4 py-3 font-medium">Title</th>
                  <th className="px-4 py-3 font-medium">Location</th>
                  <th className="px-4 py-3 font-medium">Type</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Featured</th>
                  <th className="px-4 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-100">
                {jobs.map((j) => (
                  <tr key={j._id} className="hover:bg-navy-50/50">
                    <td className="px-4 py-3 font-medium text-navy-900">{j.title}</td>
                    <td className="px-4 py-3 text-navy-500">{j.location}</td>
                    <td className="px-4 py-3"><span className="badge bg-navy-100 text-navy-600">{j.type}</span></td>
                    <td className="px-4 py-3">
                      <span className={`badge ${j.status === 'active' ? 'bg-green-100 text-green-700' : j.status === 'draft' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>{j.status}</span>
                    </td>
                    <td className="px-4 py-3">{j.featured ? '⭐' : '—'}</td>
                    <td className="px-4 py-3 text-right">
                      <button onClick={() => openEdit(j)} className="text-accent hover:underline text-sm mr-3">Edit</button>
                      <button onClick={() => del(j._id, j.title)} className="text-red-500 hover:underline text-sm">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
