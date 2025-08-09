"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQuestionsByLevel = exports.getAllAssessments = exports.createAssessment = void 0;
const QuestionAssessmentSchema_js_1 = __importDefault(require("../models/QuestionAssessmentSchema.js"));
const createAssessment = async (req, res) => {
    try {
        const { step1, step2, step3 } = req.body;
        const doc = new QuestionAssessmentSchema_js_1.default({ step1, step2, step3 });
        const saved = await doc.save();
        res.status(201).json({ message: "Questions saved successfully", data: saved });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.createAssessment = createAssessment;
const getAllAssessments = async (_req, res) => {
    try {
        const questions = await QuestionAssessmentSchema_js_1.default.find();
        res.json(questions);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.getAllAssessments = getAllAssessments;
const getQuestionsByLevel = async (req, res) => {
    try {
        const { step, level } = req.params;
        const questionDoc = await QuestionAssessmentSchema_js_1.default.findOne({}, `${step}.${level}`);
        if (!questionDoc) {
            return res.status(404).json({ message: "No Question Found" });
        }
        res.json(questionDoc[step][level]);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.getQuestionsByLevel = getQuestionsByLevel;
