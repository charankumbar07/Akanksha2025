import express from 'express';
import Team from '../models/Team.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @desc    Get all teams (Admin only)
// @route   GET /api/admin/teams
// @access  Private (Admin)
const getAllTeams = async (req, res) => {
    try {
        const teams = await Team.find({ isActive: true })
            .select('-password')
            .sort({ registrationDate: -1 });

        res.status(200).json({
            success: true,
            data: {
                teams
            }
        });
    } catch (error) {
        console.error('Get all teams error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching teams'
        });
    }
};

// @desc    Update team status (Admin only)
// @route   PUT /api/admin/teams/:id/status
// @access  Private (Admin)
const updateTeamStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { competitionStatus, scores } = req.body;

        const validStatuses = ['registered', 'round1_completed', 'round2_completed', 'round3_completed', 'disqualified'];

        if (competitionStatus && !validStatuses.includes(competitionStatus)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid competition status'
            });
        }

        const updateData = {};
        if (competitionStatus) updateData.competitionStatus = competitionStatus;
        if (scores) {
            updateData.scores = { ...scores };
            updateData.scores.total = (updateData.scores.round1 || 0) +
                (updateData.scores.round2 || 0) +
                (updateData.scores.round3 || 0);
        }

        const updatedTeam = await Team.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        ).select('-password');

        if (!updatedTeam) {
            return res.status(404).json({
                success: false,
                message: 'Team not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Team status updated successfully',
            data: {
                team: updatedTeam
            }
        });

    } catch (error) {
        console.error('Update team status error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while updating team status'
        });
    }
};

// @desc    Announce round results (Admin only)
// @route   POST /api/admin/announce/:round
// @access  Private (Admin)
const announceRoundResults = async (req, res) => {
    try {
        const { round } = req.params;
        const validRounds = ['1', '2', '3'];

        if (!validRounds.includes(round)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid round number'
            });
        }

        // Here you would implement the logic to announce results
        // For now, just return success
        res.status(200).json({
            success: true,
            message: `Round ${round} results announced successfully`
        });

    } catch (error) {
        console.error('Announce round results error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while announcing round results'
        });
    }
};

// @desc    Start round with code (Admin only)
// @route   POST /api/admin/start/:round
// @access  Private (Admin)
const startRound = async (req, res) => {
    try {
        const { round } = req.params;
        const { code } = req.body;
        const validRounds = ['2', '3'];

        if (!validRounds.includes(round)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid round number'
            });
        }

        if (!code) {
            return res.status(400).json({
                success: false,
                message: 'Round code is required'
            });
        }

        // Here you would implement the logic to start the round
        // For now, just return success
        res.status(200).json({
            success: true,
            message: `Round ${round} started successfully with code: ${code}`
        });

    } catch (error) {
        console.error('Start round error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while starting round'
        });
    }
};

// Apply routes
router.get('/teams', protect, getAllTeams);
router.put('/teams/:id/status', protect, updateTeamStatus);
router.post('/announce/:round', protect, announceRoundResults);
router.post('/start/:round', protect, startRound);

export default router;
