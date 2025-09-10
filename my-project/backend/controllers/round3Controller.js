// backend/controllers/round3Controller.js
import Team from '../models/Team.js';

export const submitRound3 = async (req, res) => {
    try {
        const { teamId, score, timeTaken, selectedProgram, questionOrder, questionOrderName, questionResults, individualQuestionScores } = req.body;

        // Prefer teamId from authenticated user if available
        const finalTeamId = teamId || (req.user && (req.user.teamId || req.user.id));
        if (!finalTeamId) return res.status(400).json({ message: "teamId required" });

        // Save to Team document (update fields for round3)
        const updated = await Team.findByIdAndUpdate(
            finalTeamId,
            {
                $set: {
                    round3Score: score,
                    round3Time: timeTaken,
                    round3Program: selectedProgram,
                    round3QuestionOrder: questionOrder,
                    round3QuestionOrderName: questionOrderName,
                    round3QuestionResults: questionResults,
                    round3IndividualScores: individualQuestionScores,
                    round3Completed: true,
                    round3SubmittedAt: new Date()
                }
            },
            { new: true, runValidators: true }
        );

        if (!updated) return res.status(404).json({ message: "Team not found" });
        return res.json({ message: "Round 3 result saved", team: updated });
    } catch (err) {
        console.error("round3Controller.submitRound3:", err);
        return res.status(500).json({ error: err.message });
    }
};

export const getRound3Scores = async (req, res) => {
    try {
        const teams = await Team.find({ round3Completed: true })
            .select('teamName round3Score round3Time round3SubmittedAt round3QuestionOrderName')
            .sort({ round3Score: -1, round3Time: 1 });

        return res.json(teams);
    } catch (err) {
        console.error("round3Controller.getRound3Scores:", err);
        return res.status(500).json({ error: err.message });
    }
};
