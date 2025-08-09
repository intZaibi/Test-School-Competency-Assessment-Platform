import { Router } from "express";
import { createAssessment, getAllAssessments, getQuestionsByLevel } from "../controllers/assessmentController.js";

const router = Router();

router.post("/", createAssessment);
router.get("/", getAllAssessments);
router.get("/:step/:level", getQuestionsByLevel);

export default router;
