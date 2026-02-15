import { describe, it, before, after } from 'node:test';
import assert from 'node:assert';
import mongoose from 'mongoose';

const TEST_URI = 'mongodb://127.0.0.1:27017/telvel_test';

before(async () => {
  await mongoose.connect(TEST_URI);
  const cols = await mongoose.connection.db.collections();
  for (const c of cols) await c.deleteMany({});
});
after(async () => { await mongoose.connection.close(); });

describe('Job Model', () => {
  it('creates a valid job', async () => {
    const { default: Job } = await import('../server/models/Job.js');
    const job = await Job.create({ title: 'Test Dev', slug: 'test-dev', description: 'A test job', skills: ['JS'] });
    assert.ok(job._id);
    assert.strictEqual(job.status, 'active');
  });
});

describe('Application Model', () => {
  it('creates with required fields', async () => {
    const { default: Application } = await import('../server/models/Application.js');
    const app = await Application.create({ fullName: 'Test User', email: 'test@example.com', resumePath: '/uploads/test.pdf' });
    assert.ok(app._id);
    assert.strictEqual(app.status, 'new');
  });

  it('rejects missing resume', async () => {
    const { default: Application } = await import('../server/models/Application.js');
    await assert.rejects(() => Application.create({ fullName: 'No Resume', email: 'a@b.com' }));
  });
});

describe('Contact Model', () => {
  it('creates a valid contact', async () => {
    const { default: Contact } = await import('../server/models/Contact.js');
    const c = await Contact.create({ fullName: 'Test', email: 'test@test.com', message: 'Hello from the test suite.' });
    assert.ok(c._id);
  });
});
