const BASE = '/api';

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' },
    ...options,
  });
  const data = await res.json();
  if (!res.ok) {
    const err = new Error(data.message || 'Request failed');
    err.status = res.status;
    err.errors = data.errors || [];
    throw err;
  }
  return data;
}

export const api = {
  getCompanyInfo: () => request('/company-info'),
  getJobs: (featured) => request(`/jobs${featured ? '?featured=true' : ''}`),
  getJob: (slug) => request(`/jobs/${slug}`),
  submitApplication: (formData) =>
    request('/applications', { method: 'POST', body: formData }),
  submitContact: (data) =>
    request('/contact', { method: 'POST', body: JSON.stringify(data) }),
  getStats: () => request('/stats'),
};
