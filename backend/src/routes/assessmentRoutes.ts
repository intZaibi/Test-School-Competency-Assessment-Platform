import { Router } from "express";
import { certificateGeneration, createAssessment, getAllAssessmentQuestions, getUserData, submitAssessment } from "../controllers/assessmentController.js";

const router = Router();

router.post("/", createAssessment);
router.get("/", getAllAssessmentQuestions);
router.get("/user-data", getUserData);
router.post("/submit", submitAssessment);
router.post("/certificate", certificateGeneration);

export default router;
