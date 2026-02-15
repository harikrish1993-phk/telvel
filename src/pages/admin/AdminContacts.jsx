import { useState, useEffect } from 'react';
import { adminApi } from '../../services/adminApi.js';

const STATUSES = ['new', 'replied', 'closed'];
const STATUS_COLORS = { new: 'bg-blue-100 text-blue-700', replied: 'bg-green-100 text-green-700', closed: 'bg-navy-100 text-navy-600' };
const TYPE_LABELS = { hire: 'Hire Talent', general: 'General', support: 'Support' };

function fmtDate(d) { return new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }); }

export default function AdminContacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');
  const [detail, setDetail] = useState(null);

  const load = (statusFilter) => {
    setLoading(true);
    const params = statusFilter ? { status: statusFilter } : undefined;
    adminApi.getContacts(params).then((d) => setContacts(d.contacts || [])).catch((e) => setError(e.message)).finally(() => setLoading(false));
  };

  useEffect(() => { load(filter); }, [filter]);

  const updateStatus = async (id, status) => {
    try {
      await adminApi.updateContact(id, { status });
      setMsg(`Status updated to "${status}"`);
      load(filter);
      if (detail?._id === id) setDetail((p) => ({ ...p, status }));
    } catch (err) { setError(err.message); }
  };

  return (
    <div>
      <h1 className="text-2xl font-display font-bold text-navy-900 mb-6">Contact Submissions</h1>

      {msg && <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">{msg}</div>}
      {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">{error}</div>}

      <div className="flex flex-wrap gap-2 mb-6">
        <button onClick={() => setFilter('')}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${!filter ? 'bg-accent text-white' : 'bg-white text-navy-600 border border-navy-200 hover:border-accent'}`}>All</button>
        {STATUSES.map((s) => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium capitalize transition-all ${filter === s ? 'bg-accent text-white' : 'bg-white text-navy-600 border border-navy-200 hover:border-accent'}`}>{s}</button>
        ))}
      </div>

      {/* Detail Modal */}
      {detail && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-10 px-4 overflow-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 mb-10">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-display font-bold">Contact Details</h2>
              <button onClick={() => setDetail(null)} className="text-navy-400 hover:text-navy-700 text-2xl">&times;</button>
            </div>
            <div className="space-y-3 text-sm">
              <div><span className="font-medium text-navy-700">Name:</span> {detail.fullName}</div>
              <div><span className="font-medium text-navy-700">Email:</span> <a href={`mailto:${detail.email}`} className="text-accent hover:underline">{detail.email}</a></div>
              <div><span className="font-medium text-navy-700">Phone:</span> {detail.phone || '—'}</div>
              <div><span className="font-medium text-navy-700">Company:</span> {detail.companyName || '—'}</div>
              <div><span className="font-medium text-navy-700">Type:</span> {TYPE_LABELS[detail.type] || detail.type}</div>
              <div><span className="font-medium text-navy-700">Subject:</span> {detail.subject || '—'}</div>
              <div><span className="font-medium text-navy-700">Date:</span> {fmtDate(detail.createdAt)}</div>
              <div><span className="font-medium text-navy-700">Status:</span> <span className={`badge ml-1 ${STATUS_COLORS[detail.status]}`}>{detail.status}</span></div>
              <div>
                <span className="font-medium text-navy-700">Message:</span>
                <p className="mt-1 text-navy-600 bg-navy-50 p-3 rounded-lg whitespace-pre-wrap">{detail.message}</p>
              </div>
              <div className="pt-3">
                <label className="block text-sm font-medium text-navy-700 mb-1.5">Update Status</label>
                <div className="flex gap-2">
                  {STATUSES.map((s) => (
                    <button key={s} onClick={() => updateStatus(detail._id, s)} disabled={detail.status === s}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${detail.status === s ? 'bg-accent text-white' : 'bg-navy-50 text-navy-600 hover:bg-accent/10 hover:text-accent'}`}>{s}</button>
                  ))}
                </div>
              </div>
              <div className="pt-2">
                <a href={`mailto:${detail.email}?subject=Re: ${detail.subject || 'Your inquiry to TELVEL IT'}`}
                  className="btn btn-primary text-xs py-1.5 px-4">📧 Reply via Email</a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      {loading ? (
        <div className="text-center py-10"><div className="inline-block w-8 h-8 border-4 border-accent/30 border-t-accent rounded-full animate-spin" /></div>
      ) : contacts.length === 0 ? (
        <p className="text-navy-500 py-8 text-center">No contacts found.</p>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-navy-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-navy-50 text-navy-600 text-left">
                <tr>
                  <th className="px-4 py-3 font-medium">Name</th>
                  <th className="px-4 py-3 font-medium">Email</th>
                  <th className="px-4 py-3 font-medium">Type</th>
                  <th className="px-4 py-3 font-medium">Date</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-100">
                {contacts.map((c) => (
                  <tr key={c._id} className="hover:bg-navy-50/50 cursor-pointer" onClick={() => setDetail(c)}>
                    <td className="px-4 py-3 font-medium text-navy-900">{c.fullName}</td>
                    <td className="px-4 py-3 text-navy-500">{c.email}</td>
                    <td className="px-4 py-3 text-navy-500">{TYPE_LABELS[c.type] || c.type}</td>
                    <td className="px-4 py-3 text-navy-400">{fmtDate(c.createdAt)}</td>
                    <td className="px-4 py-3"><span className={`badge ${STATUS_COLORS[c.status]}`}>{c.status}</span></td>
                    <td className="px-4 py-3 text-right">
                      <a href={`mailto:${c.email}`} className="text-accent hover:underline text-xs" onClick={(e) => e.stopPropagation()}>Reply</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-3 bg-navy-50 text-navy-500 text-xs">{contacts.length} contact{contacts.length !== 1 ? 's' : ''}</div>
        </div>
      )}
    </div>
  );
}
