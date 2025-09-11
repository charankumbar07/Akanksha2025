import apiService from './api.js';

class Round2Service {
    // Create a new team for Round 2
    async createTeam(teamData) {
        try {
            const response = await apiService.post('/round2/teams', teamData);
            return response;
        } catch (error) {
            throw error;
        }
    }

    // Get team progress
    async getTeamProgress(teamId) {
        try {
            const response = await apiService.get(`/round2/teams/${teamId}`);
            return response;
        } catch (error) {
            throw error;
        }
    }

    // Submit aptitude answer
    async submitAptitudeAnswer(answerData) {
        try {
            const response = await apiService.post('/round2/aptitude/answer', answerData);
            return response;
        } catch (error) {
            throw error;
        }
    }

    // Submit coding solution
    async submitCodingSolution(solutionData) {
        try {
            const response = await apiService.post('/round2/coding/submit', solutionData);
            return response;
        } catch (error) {
            throw error;
        }
    }

    // Get admin overview
    async getAdminOverview() {
        try {
            const response = await apiService.get('/round2/admin/overview');
            return response;
        } catch (error) {
            throw error;
        }
    }

    // Get Round 2 scores
    async getRound2Scores() {
        try {
            const response = await apiService.get('/round2/scores');
            return response;
        } catch (error) {
            throw error;
        }
    }
}

// Create and export Round2 service instance
const round2Service = new Round2Service();
export default round2Service;
