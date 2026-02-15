import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
  {
    fullName:    { type: String, required: true, trim: true, maxlength: 100 },
    email:       { type: String, required: true, lowercase: true, trim: true },
    phone:       { type: String, default: '' },
    companyName: { type: String, default: '' },
    subject:     { type: String, default: '' },
    message:     { type: String, required: true, minlength: 10, maxlength: 3000 },
    type:        { type: String, enum: ['hire', 'general', 'support'], default: 'general' },
    status:      { type: String, enum: ['new', 'replied', 'closed'], default: 'new' },
    ipAddress:   { type: String },
  },
  { timestamps: true }
);

contactSchema.index({ status: 1, createdAt: -1 });

export default mongoose.model('Contact', contactSchema);
