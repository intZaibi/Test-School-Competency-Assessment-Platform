import { Router } from "express";
import { certificateGeneration, createAssessment, getAllAssessments, getQuestionsByLevel, submitAssessment } from "../controllers/assessmentController.js";

const router = Router();

router.post("/", createAssessment);
router.get("/", getAllAssessments);
router.get("/:step/:level", getQuestionsByLevel);
router.post("/submit", submitAssessment);
router.post("/certificate", certificateGeneration);

export default router;
