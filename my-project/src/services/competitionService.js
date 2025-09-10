import apiService from './api.js';

class CompetitionService {
    // Get competition leaderboard
    async getLeaderboard() {
        try {
            const response = await apiService.get('/competition/leaderboard');
            return response;
        } catch (error) {
            throw error;
        }
    }

    // Get competition statistics
    async getStats() {
        try {
            const response = await apiService.get('/competition/stats');
            return response;
        } catch (error) {
            throw error;
        }
    }

    // Get team's competition status
    async getStatus() {
        try {
            const response = await apiService.get('/competition/status');
            return response;
        } catch (error) {
            throw error;
        }
    }

    // Update team's competition status
    async updateStatus(statusData) {
        try {
            const response = await apiService.put('/competition/status', statusData);
            return response;
        } catch (error) {
            throw error;
        }
    }

    // Health check
    async healthCheck() {
        try {
            const response = await apiService.get('/health');
            return response;
        } catch (error) {
            throw error;
        }
    }
}

// Create and export competition service instance
const competitionService = new CompetitionService();
export default competitionService;
