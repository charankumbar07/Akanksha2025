import express from 'express';
import Team from '../models/Team.js';
import { protect, checkRoundEligibility, checkNotDisqualified } from '../middleware/auth.js';

const router = express.Router();

// @desc    Get competition leaderboard
// @route   GET /api/competition/leaderboard
// @access  Public
const getLeaderboard = async (req, res) => {
    try {
        const teams = await Team.find({ isActive: true })
            .select('teamName members competitionStatus scores registrationDate')
            .sort({ 'scores.total': -1, registrationDate: 1 })
            .limit(50);

        res.status(200).json({
            success: true,
            data: {
                leaderboard: teams
            }
        });
    } catch (error) {
        console.error('Get leaderboard error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching leaderboard'
        });
    }
};

// @desc    Get team's competition status
// @route   GET /api/competition/status
// @access  Private
const getCompetitionStatus = async (req, res) => {
    try {
        const team = req.team;

        res.status(200).json({
            success: true,
            data: {
                team: {
                    teamName: team.teamName,
                    competitionStatus: team.competitionStatus,
                    scores: team.scores,
                    registrationDate: team.registrationDate,
                    lastLogin: team.lastLogin
                }
            }
        });
    } catch (error) {
        console.error('Get competition status error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching competition status'
        });
    }
};

// @desc    Update team's competition status (Admin only - for now, any authenticated user)
// @route   PUT /api/competition/status
// @access  Private
const updateCompetitionStatus = async (req, res) => {
    try {
        const { status, scores } = req.body;
        const teamId = req.team._id;

        const validStatuses = ['registered', 'round1_completed', 'round2_completed', 'round3_completed', 'disqualified'];

        if (status && !validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid competition status'
            });
        }

        const updateData = {};
        if (status) updateData.competitionStatus = status;
        if (scores) {
            updateData.scores = { ...req.team.scores, ...scores };
            updateData.scores.total = (updateData.scores.round1 || 0) +
                (updateData.scores.round2 || 0) +
                (updateData.scores.round3 || 0);
        }

        const updatedTeam = await Team.findByIdAndUpdate(
            teamId,
            updateData,
            { new: true }
        );

        if (!updatedTeam) {
            return res.status(404).json({
                success: false,
                message: 'Team not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Competition status updated successfully',
            data: {
                team: {
                    teamName: updatedTeam.teamName,
                    competitionStatus: updatedTeam.competitionStatus,
                    scores: updatedTeam.scores
                }
            }
        });

    } catch (error) {
        console.error('Update competition status error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while updating competition status'
        });
    }
};

// @desc    Get competition statistics
// @route   GET /api/competition/stats
// @access  Public
const getCompetitionStats = async (req, res) => {
    try {
        const totalTeams = await Team.countDocuments({ isActive: true });
        const registeredTeams = await Team.countDocuments({
            isActive: true,
            competitionStatus: 'registered'
        });
        const round1Completed = await Team.countDocuments({
            isActive: true,
            competitionStatus: { $in: ['round1_completed', 'round2_completed', 'round3_completed'] }
        });
        const round2Completed = await Team.countDocuments({
            isActive: true,
            competitionStatus: { $in: ['round2_completed', 'round3_completed'] }
        });
        const round3Completed = await Team.countDocuments({
            isActive: true,
            competitionStatus: 'round3_completed'
        });

        res.status(200).json({
            success: true,
            data: {
                stats: {
                    totalTeams,
                    registeredTeams,
                    round1Completed,
                    round2Completed,
                    round3Completed
                }
            }
        });
    } catch (error) {
        console.error('Get competition stats error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching competition statistics'
        });
    }
};

// Apply routes
router.get('/leaderboard', getLeaderboard);
router.get('/stats', getCompetitionStats);
router.get('/status', protect, checkNotDisqualified, getCompetitionStatus);
router.put('/status', protect, checkNotDisqualified, updateCompetitionStatus);

export default router;
