import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema(
  {
    fullName:    { type: String, required: true, trim: true, maxlength: 100 },
    email:       { type: String, required: true, lowercase: true, trim: true },
    phone:       { type: String, default: '' },
    coverLetter: { type: String, default: '', maxlength: 3000 },
    resumePath:  { type: String, required: true },
    resumeName:  { type: String, default: '' },
    jobId:       { type: mongoose.Schema.Types.ObjectId, ref: 'Job', default: null },
    jobTitle:    { type: String, default: 'General Application' },
    source:      { type: String, default: 'website' },
    status: {
      type: String,
      enum: ['new', 'screening', 'interview', 'offered', 'hired', 'rejected'],
      default: 'new',
    },
    ipAddress: { type: String },
  },
  { timestamps: true }
);

applicationSchema.index({ status: 1, createdAt: -1 });
applicationSchema.index({ jobId: 1 });

export default mongoose.model('Application', applicationSchema);
