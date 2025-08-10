import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['admin', 'student', 'supervisor'] },
  token: { type: String, required: false },
  otp: {
    code: { type: String, required: true },
    expiresAt: { type: Date, required: true },
    isVerified: { type: Boolean, required: true, default: false },
  },
  assessmentResults: {
    step1: {
      A1: {
        score: { type: Number, required: true, default: 0 },
      },
      A2: {
        score: { type: Number, required: true, default: 0 },
      },
    },
    step2: {
      B1: {
        score: { type: Number, required: true, default: 0 },
      },
      B2: {
        score: { type: Number, required: true, default: 0 },
      },
    },
    step3: {
      C1: {
        score: { type: Number, required: true, default: 0 },
      },
      C2: {
        score: { type: Number, required: true, default: 0 },
      },
    },
    required: false,
  },
  certificate: {
    id: { type: String, required: true, unique: true, default: uuidv4() },
    score: { type: Number, required: true, default: 0 },
    status: { type: String, required: true, default: 'A1' },
    issueDate: { type: Date, required: true, default: new Date() },
    certificateUrl: { type: String, required: false },
    required: false,
  },
}, { timestamps: true });

export default mongoose.model('User', userSchema);