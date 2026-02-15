import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema(
  {
    title:       { type: String, required: true, trim: true },
    slug:        { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, required: true },
    skills:      [{ type: String, trim: true }],
    location:    { type: String, default: 'Europe' },
    type:        { type: String, enum: ['full-time', 'contract', 'part-time'], default: 'full-time' },
    experience:  { type: String, default: '' },
    salary:      { type: String, default: '' },
    status:      { type: String, enum: ['active', 'closed', 'draft'], default: 'active' },
    featured:    { type: Boolean, default: false },
  },
  { timestamps: true }
);

jobSchema.index({ status: 1, featured: -1, createdAt: -1 });

export default mongoose.model('Job', jobSchema);
