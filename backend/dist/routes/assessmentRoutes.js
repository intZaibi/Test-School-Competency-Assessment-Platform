"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const assessmentController_js_1 = require("../controllers/assessmentController.js");
const router = (0, express_1.Router)();
router.post("/", assessmentController_js_1.createAssessment);
router.get("/", assessmentController_js_1.getAllAssessments);
router.get("/:step/:level", assessmentController_js_1.getQuestionsByLevel);
exports.default = router;
