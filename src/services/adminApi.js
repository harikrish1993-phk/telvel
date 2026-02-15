const BASE = '/api/admin';

function getToken() {
  return sessionStorage.getItem('admin_token') || '';
}

export function setToken(token) {
  sessionStorage.setItem('admin_token', token);
}

export function clearToken() {
  sessionStorage.removeItem('admin_token');
}

export function isLoggedIn() {
  return !!getToken();
}

async function request(path, options = {}) {
  const headers = { 'Content-Type': 'application/json', 'x-admin-token': getToken(), ...options.headers };
  const res = await fetch(`${BASE}${path}`, { ...options, headers });
  const data = await res.json();
  if (!res.ok) {
    if (res.status === 401) { clearToken(); window.location.href = '/admin'; }
    const err = new Error(data.message || 'Request failed');
    err.status = res.status;
    throw err;
  }
  return data;
}

export const adminApi = {
  login: (password) => request('/login', { method: 'POST', body: JSON.stringify({ password }), headers: { 'Content-Type': 'application/json' } }),
  getDashboard: () => request('/dashboard'),
  // Jobs
  getJobs: () => request('/jobs'),
  createJob: (data) => request('/jobs', { method: 'POST', body: JSON.stringify(data) }),
  updateJob: (id, data) => request(`/jobs/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteJob: (id) => request(`/jobs/${id}`, { method: 'DELETE' }),
  // Applications
  getApplications: (params) => request(`/applications${params ? '?' + new URLSearchParams(params) : ''}`),
  updateApplication: (id, data) => request(`/applications/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteApplication: (id) => request(`/applications/${id}`, { method: 'DELETE' }),
  // Contacts
  getContacts: (params) => request(`/contacts${params ? '?' + new URLSearchParams(params) : ''}`),
  updateContact: (id, data) => request(`/contacts/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
};
