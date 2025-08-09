import mongoose from 'mongoose';

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
}, { timestamps: true });

export default mongoose.model('User', userSchema);