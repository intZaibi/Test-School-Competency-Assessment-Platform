import mongoose from "mongoose";

const optionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  isCorrect: { type: Boolean, default: false }
});

const questionSchema = new mongoose.Schema({
  statement: { type: String, required: true },
  options: { type: [optionSchema], required: true }
});

const assessmentSchema = new mongoose.Schema({
  step1: {
    A1: { type: [questionSchema], default: [] },
    A2: { type: [questionSchema], default: [] }
  },
  step2: {
    B1: { type: [questionSchema], default: [] },
    B2: { type: [questionSchema], default: [] }
  },
  step3: {
    C1: { type: [questionSchema], default: [] },
    C2: { type: [questionSchema], default: [] }
  }
}, { timestamps: true });

export default mongoose.model("AssessmentQuestion", assessmentSchema);