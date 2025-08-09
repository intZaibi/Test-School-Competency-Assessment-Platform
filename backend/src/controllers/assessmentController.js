import AssessmentQuestion from "../models/QuestionAssessmentSchema.js";

// Create / Update Questions
export const createAssessment = async (req, res) => {
  try {
    const { step1, step2, step3 } = req.body;
    const doc = new AssessmentQuestion({ step1, step2, step3 });
    const saved = await doc.save();
    res.status(201).json({ message: "Questions saved successfully", data: saved });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get All Questions
export const getAllAssessments = async (req, res) => {
  try {
    const questions = await AssessmentQuestion.find();
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Questions by Step & Level
export const getQuestionsByLevel = async (req, res) => {
  try {
    const { step, level } = req.params;
    const questionDoc = await AssessmentQuestion.findOne({}, `${step}.${level}`);

    if (!questionDoc) {
      return res.status(404).json({ message: "No Question Found" });
    }
    res.json(questionDoc[step][level]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
