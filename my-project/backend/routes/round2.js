import express from 'express';
import mongoose from 'mongoose';
import Round2Team from '../models/Round2Team.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @desc    Create a new Round 2 team entry
// @route   POST /api/round2/teams
// @access  Private
const createRound2Team = async (req, res) => {
    try {
        const { teamName } = req.body;
        const teamId = req.team._id; // Use authenticated team's ID

        // Check if team already has a Round 2 entry
        const existingEntry = await Round2Team.findOne({ teamId });
        if (existingEntry) {
            return res.status(200).json({
                success: true,
                data: existingEntry
            });
        }

        const round2Team = new Round2Team({
            teamId,
            teamName: teamName || req.team.teamName
        });

        await round2Team.save();

        res.status(201).json({
            success: true,
            data: round2Team
        });
    } catch (error) {
        console.error('Create Round 2 team error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while creating Round 2 team entry'
        });
    }
};

// @desc    Get Round 2 team progress
// @route   GET /api/round2/teams/:teamId
// @access  Private
const getRound2TeamProgress = async (req, res) => {
    try {
        const { teamId } = req.params;

        const round2Team = await Round2Team.findOne({
            teamId: new mongoose.Types.ObjectId(teamId)
        });

        if (!round2Team) {
            return res.status(404).json({
                success: false,
                message: 'Round 2 team entry not found'
            });
        }

        res.status(200).json({
            success: true,
            data: round2Team
        });
    } catch (error) {
        console.error('Get Round 2 team progress error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching Round 2 team progress'
        });
    }
};

// @desc    Submit aptitude answer
// @route   POST /api/round2/aptitude/answer
// @access  Private
const submitAptitudeAnswer = async (req, res) => {
    try {
        const { teamId, questionIndex, answer } = req.body;

        const round2Team = await Round2Team.findOne({
            teamId: new mongoose.Types.ObjectId(teamId)
        });
        if (!round2Team) {
            return res.status(404).json({
                success: false,
                message: 'Round 2 team entry not found'
            });
        }

        const questionKey = `q${questionIndex + 1}`;
        const challengeKey = `q${questionIndex + 4}`;

        // Define correct answers
        const correctAnswers = ['1', '1', '0']; // Based on the aptitude questions
        const isCorrect = answer === correctAnswers[questionIndex];

        // Update attempts
        round2Team.aptitudeAttempts[questionKey] = (round2Team.aptitudeAttempts[questionKey] || 0) + 1;
        const attemptsLeft = 2 - round2Team.aptitudeAttempts[questionKey];

        // Update scores if correct
        if (isCorrect) {
            round2Team.scores[questionKey] = 10; // 10 points per correct answer
            round2Team.totalScore += 10;
            round2Team.completedQuestions[questionKey] = true;

            // Unlock next aptitude question
            if (questionIndex < 2) {
                round2Team.unlockedQuestions[`q${questionIndex + 2}`] = true;
            }

            // Unlock corresponding challenge
            round2Team.unlockedQuestions[challengeKey] = true;
        }

        // If no attempts left, unlock next question anyway
        if (attemptsLeft === 0 && !isCorrect) {
            if (questionIndex < 2) {
                round2Team.unlockedQuestions[`q${questionIndex + 2}`] = true;
            }
            round2Team.unlockedQuestions[challengeKey] = true;
        }

        await round2Team.save();

        res.status(200).json({
            success: true,
            message: 'Aptitude answer submitted successfully',
            isCorrect,
            attemptsLeft,
            score: round2Team.totalScore,
            unlockedNext: attemptsLeft === 0 || isCorrect
        });
    } catch (error) {
        console.error('Submit aptitude answer error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while submitting aptitude answer'
        });
    }
};

// @desc    Submit coding solution
// @route   POST /api/round2/coding/submit
// @access  Private
const submitCodingSolution = async (req, res) => {
    try {
        const { teamId, challengeType, solution, timeTaken } = req.body;

        const round2Team = await Round2Team.findOne({
            teamId: new mongoose.Types.ObjectId(teamId)
        });
        if (!round2Team) {
            return res.status(404).json({
                success: false,
                message: 'Round 2 team entry not found'
            });
        }

        // Map challenge types to question keys
        const challengeMap = {
            'debug': 'q4',
            'trace': 'q5',
            'program': 'q6'
        };
        const questionKey = challengeMap[challengeType];

        // Award points for coding challenge
        const points = 20; // 20 points per coding challenge
        round2Team.scores[questionKey] = points;
        round2Team.totalScore += points;
        round2Team.completedQuestions[questionKey] = true;

        // Check if all challenges completed
        const allCompleted = Object.values(round2Team.completedQuestions).every(Boolean);
        if (allCompleted) {
            round2Team.isQuizCompleted = true;
            round2Team.endTime = new Date();
            round2Team.totalTimeTaken = Math.floor((round2Team.endTime - round2Team.startTime) / 1000);
        }

        await round2Team.save();

        res.status(200).json({
            success: true,
            message: 'Coding solution submitted successfully',
            score: round2Team.totalScore,
            isQuizCompleted: round2Team.isQuizCompleted
        });
    } catch (error) {
        console.error('Submit coding solution error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while submitting coding solution'
        });
    }
};

// @desc    Get Round 2 scores/leaderboard
// @route   GET /api/round2/scores
// @access  Public
const getRound2Scores = async (req, res) => {
    try {
        const scores = await Round2Team.find({ isQuizCompleted: true })
            .select('teamName totalScore totalTimeTaken startTime endTime completedQuestions')
            .sort({ totalScore: -1, totalTimeTaken: 1 });

        res.status(200).json({
            success: true,
            data: scores
        });
    } catch (error) {
        console.error('Get Round 2 scores error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching Round 2 scores'
        });
    }
};

// @desc    Get admin overview
// @route   GET /api/round2/admin/overview
// @access  Private
const getAdminOverview = async (req, res) => {
    try {
        const teams = await Round2Team.find()
            .select('teamName currentStep isQuizCompleted totalScore totalTimeTaken startTime endTime completedQuestions unlockedQuestions aptitudeAttempts')
            .sort({ totalScore: -1, totalTimeTaken: 1 });

        const stats = {
            totalTeams: teams.length,
            completedTeams: teams.filter(t => t.isQuizCompleted).length,
            averageScore: teams.length > 0 ? teams.reduce((sum, t) => sum + t.totalScore, 0) / teams.length : 0
        };

        res.status(200).json({
            success: true,
            data: {
                teams,
                stats
            }
        });
    } catch (error) {
        console.error('Get admin overview error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching admin overview'
        });
    }
};

// Apply routes
router.post('/teams', protect, createRound2Team);
router.get('/teams/:teamId', protect, getRound2TeamProgress);
router.post('/aptitude/answer', protect, submitAptitudeAnswer);
router.post('/coding/submit', protect, submitCodingSolution);
router.get('/scores', getRound2Scores);
router.get('/admin/overview', protect, getAdminOverview);

export default router;