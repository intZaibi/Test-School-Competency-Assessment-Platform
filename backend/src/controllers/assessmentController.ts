import { Request, Response } from "express";
import AssessmentQuestion from "../models/QuestionAssessmentSchema.js";
import User from "../models/UserSchema.js";

export const createAssessment = async (req: Request, res: Response) => {
  try {
    const { step1, step2, step3 } = req.body;
    if (!step1 || !step2 || !step3) return res.status(400).json({ error: "Please provide all the steps." });
    
    const doc = new AssessmentQuestion({ step1, step2, step3 });
    const saved = await doc.save();
    res.status(201).json({ message: "Questions saved successfully", data: saved });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllAssessments = async (_req: Request, res: Response) => {
  try {
    const questions = await AssessmentQuestion.find();
    res.json(questions);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getQuestionsByLevel = async (req: Request, res: Response) => {
  try {
    const { step, level } = req.params;
    const questionDoc = await AssessmentQuestion.findOne({}, `${step}.${level}`);

    if (!questionDoc) {
      return res.status(404).json({ message: "No Question Found" });
    }
    res.json((questionDoc as any)[step][level]);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const submitAssessment = async (req: Request, res: Response) => {
  try {
    const { step, level, score } = req.body;
    // @ts-ignore
    await User.updateOne({ email: req.user.email }, {assessmentResults: {...req.user.assessmentResults, [step]: {[level]: { score }} }});
    res.status(200).json({ message: "Assessment submitted successfully" });

  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const certificateGeneration = async (req: Request, res: Response) => {
  try {
    const { id, status, score, certificateUrl } = req.body;
    // @ts-ignore
    await User.updateOne({ email: req.user.email }, { certificate: { id, status, score, certificateUrl } });
    res.status(200).json({ message: "Certificate generated successfully" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
