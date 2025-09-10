// backend/routes/round3.js
import express from 'express';
import { submitRound3, getRound3Scores } from '../controllers/round3Controller.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Auth required for submitting scores
router.post("/submit", protect, submitRound3);

// Get all Round 3 scores (for admin dashboard)
router.get("/scores", getRound3Scores);

export default router;
