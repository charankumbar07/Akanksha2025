import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/api';

const AdminPage = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('dashboard');
    const [teams, setTeams] = useState([]);
    const [stats, setStats] = useState({
        totalTeams: 0,
        registeredTeams: 0,
        round1Completed: 0,
        round2Completed: 0,
        round3Completed: 0
    });
    const [roundCodes, setRoundCodes] = useState({
        round2: '',
        round3: ''
    });
    const [loading, setLoading] = useState(true);

    // Fetch teams and statistics
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            // Fetch teams from admin endpoint
            const teamsResponse = await apiService.get('/admin/teams');
            setTeams(teamsResponse.data.teams || []);

            // Fetch competition stats
            const statsResponse = await apiService.get('/competition/stats');
            setStats(statsResponse.data.stats);
        } catch (error) {
            console.error('Error fetching data:', error);
            // For demo purposes, use mock data
            setTeams([
                { _id: 1, teamName: "Team Alpha", members: { member1: { name: "John Doe" }, member2: { name: "Jane Smith" } }, competitionStatus: "registered", scores: { round1: 85, round2: 0, round3: 0, total: 85 } },
                { _id: 2, teamName: "Team Beta", members: { member1: { name: "Alice Johnson" }, member2: { name: "Bob Wilson" } }, competitionStatus: "round1_completed", scores: { round1: 92, round2: 0, round3: 0, total: 92 } },
                { _id: 3, teamName: "Team Gamma", members: { member1: { name: "Charlie Brown" }, member2: { name: "Diana Prince" } }, competitionStatus: "round2_completed", scores: { round1: 78, round2: 88, round3: 0, total: 166 } },
                { _id: 4, teamName: "Team Delta", members: { member1: { name: "Eve Adams" }, member2: { name: "Frank Miller" } }, competitionStatus: "round3_completed", scores: { round1: 90, round2: 95, round3: 88, total: 273 } }
            ]);
            setStats({
                totalTeams: 4,
                registeredTeams: 1,
                round1Completed: 3,
                round2Completed: 2,
                round3Completed: 1
            });
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('hustle_token');
        navigate('/login');
    };

    const handleAnnounceRound1 = async () => {
        try {
            const response = await apiService.post('/admin/announce/1');
            alert(response.message || 'Round 1 results announced!');
        } catch (error) {
            console.error('Error announcing round 1 results:', error);
            alert('Error announcing round 1 results');
        }
    };

    const handleStartRound2 = async () => {
        try {
            if (!roundCodes.round2) {
                alert('Please enter Round 2 code');
                return;
            }
            const response = await apiService.post('/admin/start/2', { code: roundCodes.round2 });
            alert(response.message || `Round 2 started with code: ${roundCodes.round2}`);
        } catch (error) {
            console.error('Error starting round 2:', error);
            alert('Error starting round 2');
        }
    };

    const handleStartRound3 = async () => {
        try {
            if (!roundCodes.round3) {
                alert('Please enter Round 3 code');
                return;
            }
            const response = await apiService.post('/admin/start/3', { code: roundCodes.round3 });
            alert(response.message || `Round 3 started with code: ${roundCodes.round3}`);
        } catch (error) {
            console.error('Error starting round 3:', error);
            alert('Error starting round 3');
        }
    };

    const updateTeamStatus = async (teamId, round, status) => {
        try {
            const response = await apiService.put(`/admin/teams/${teamId}/status`, {
                competitionStatus: status
            });

            // Update local state
            const updatedTeams = teams.map(team =>
                team._id === teamId
                    ? { ...team, competitionStatus: status }
                    : team
            );
            setTeams(updatedTeams);

            alert('Team status updated successfully');
        } catch (error) {
            console.error('Error updating team status:', error);
            alert('Error updating team status');
        }
    };

    const renderDashboard = () => (
        <div className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Total Teams Card */}
                <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg p-6 shadow-lg">
                    <h3 className="text-lg font-semibold text-white mb-2">Total No of Teams</h3>
                    <p className="text-3xl font-bold text-white">{stats.totalTeams}</p>
                </div>

                {/* Round 1 Section */}
                <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg p-6 shadow-lg">
                    <h3 className="text-lg font-semibold text-white mb-4">Round 1</h3>
                    <button
                        onClick={handleAnnounceRound1}
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                    >
                        Announce the Result
                    </button>
                </div>

                {/* Round 2 Section */}
                <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg p-6 shadow-lg">
                    <h3 className="text-lg font-semibold text-white mb-4">Round 2</h3>
                    <div className="space-y-3">
                        <input
                            type="text"
                            placeholder="Enter code"
                            value={roundCodes.round2}
                            onChange={(e) => setRoundCodes({ ...roundCodes, round2: e.target.value })}
                            className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            onClick={handleStartRound2}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                        >
                            Start
                        </button>
                    </div>
                </div>

                {/* Round 3 Section */}
                <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg p-6 shadow-lg">
                    <h3 className="text-lg font-semibold text-white mb-4">Round 3</h3>
                    <div className="space-y-3">
                        <input
                            type="text"
                            placeholder="Enter code"
                            value={roundCodes.round3}
                            onChange={(e) => setRoundCodes({ ...roundCodes, round3: e.target.value })}
                            className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            onClick={handleStartRound3}
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                        >
                            Start
                        </button>
                    </div>
                </div>
            </div>

            {/* Round Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 text-center">
                    <p className="text-white/70 text-sm">Registered</p>
                    <p className="text-2xl font-bold text-white">{stats.registeredTeams}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 text-center">
                    <p className="text-white/70 text-sm">Round 1 Complete</p>
                    <p className="text-2xl font-bold text-white">{stats.round1Completed}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 text-center">
                    <p className="text-white/70 text-sm">Round 2 Complete</p>
                    <p className="text-2xl font-bold text-white">{stats.round2Completed}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 text-center">
                    <p className="text-white/70 text-sm">Round 3 Complete</p>
                    <p className="text-2xl font-bold text-white">{stats.round3Completed}</p>
                </div>
            </div>
        </div>
    );

    const renderTeamManagement = () => (
        <div className="p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Team Management Page</h2>
            <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg shadow-lg overflow-hidden">
                <table className="w-full">
                    <thead className="bg-white/10">
                        <tr>
                            <th className="px-6 py-4 text-left text-white font-semibold">Team Name</th>
                            <th className="px-6 py-4 text-left text-white font-semibold">Member 1</th>
                            <th className="px-6 py-4 text-left text-white font-semibold">Member 2</th>
                            <th className="px-6 py-4 text-left text-white font-semibold">Status</th>
                            <th className="px-6 py-4 text-left text-white font-semibold">Round 2</th>
                            <th className="px-6 py-4 text-left text-white font-semibold">Round 3</th>
                            <th className="px-6 py-4 text-left text-white font-semibold">Total Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teams.map((team) => (
                            <tr key={team._id} className="border-t border-white/20 hover:bg-white/10 transition-colors">
                                <td className="px-6 py-4 text-white font-medium">{team.teamName}</td>
                                <td className="px-6 py-4 text-white/80">{team.members.member1.name}</td>
                                <td className="px-6 py-4 text-white/80">{team.members.member2.name}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${team.competitionStatus === 'registered' ? 'bg-yellow-500/20 text-yellow-300' :
                                        team.competitionStatus === 'round1_completed' ? 'bg-blue-500/20 text-blue-300' :
                                            team.competitionStatus === 'round2_completed' ? 'bg-green-500/20 text-green-300' :
                                                team.competitionStatus === 'round3_completed' ? 'bg-purple-500/20 text-purple-300' :
                                                    'bg-red-500/20 text-red-300'
                                        }`}>
                                        {team.competitionStatus.replace('_', ' ').toUpperCase()}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <select
                                        value={team.competitionStatus}
                                        onChange={(e) => updateTeamStatus(team._id, 'round2', e.target.value)}
                                        className="bg-white/20 border border-white/30 rounded px-2 py-1 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="registered">Not Started</option>
                                        <option value="round1_completed">Qualified</option>
                                        <option value="disqualified">Disqualified</option>
                                    </select>
                                </td>
                                <td className="px-6 py-4">
                                    <select
                                        value={team.competitionStatus}
                                        onChange={(e) => updateTeamStatus(team._id, 'round3', e.target.value)}
                                        className="bg-white/20 border border-white/30 rounded px-2 py-1 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="round1_completed">Not Started</option>
                                        <option value="round2_completed">Qualified</option>
                                        <option value="disqualified">Disqualified</option>
                                    </select>
                                </td>
                                <td className="px-6 py-4 text-white font-bold">{team.scores?.total || 0}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const renderRound2Results = () => {
        const round2Teams = teams.filter(team =>
            team.competitionStatus === 'round2_completed' || team.competitionStatus === 'round3_completed'
        ).sort((a, b) => (b.scores?.round2 || 0) - (a.scores?.round2 || 0));

        return (
            <div className="p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Round 2 Results</h2>
                <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg shadow-lg overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-white/10">
                            <tr>
                                <th className="px-6 py-4 text-left text-white font-semibold">Rank</th>
                                <th className="px-6 py-4 text-left text-white font-semibold">Team Name</th>
                                <th className="px-6 py-4 text-left text-white font-semibold">Round 2 Score</th>
                                <th className="px-6 py-4 text-left text-white font-semibold">Total Score</th>
                                <th className="px-6 py-4 text-left text-white font-semibold">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {round2Teams.map((team, index) => (
                                <tr key={team._id} className="border-t border-white/20 hover:bg-white/10 transition-colors">
                                    <td className="px-6 py-4 text-white font-bold">#{index + 1}</td>
                                    <td className="px-6 py-4 text-white font-medium">{team.teamName}</td>
                                    <td className="px-6 py-4 text-white">{team.scores?.round2 || 0}</td>
                                    <td className="px-6 py-4 text-white font-bold">{team.scores?.total || 0}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${team.competitionStatus === 'round2_completed' ? 'bg-green-500/20 text-green-300' :
                                            team.competitionStatus === 'round3_completed' ? 'bg-purple-500/20 text-purple-300' :
                                                'bg-yellow-500/20 text-yellow-300'
                                            }`}>
                                            {team.competitionStatus.replace('_', ' ').toUpperCase()}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };

    const renderRound3Results = () => {
        const round3Teams = teams.filter(team =>
            team.competitionStatus === 'round3_completed'
        ).sort((a, b) => (b.scores?.total || 0) - (a.scores?.total || 0));

        return (
            <div className="p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Round 3 Results</h2>
                <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg shadow-lg overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-white/10">
                            <tr>
                                <th className="px-6 py-4 text-left text-white font-semibold">Rank</th>
                                <th className="px-6 py-4 text-left text-white font-semibold">Team Name</th>
                                <th className="px-6 py-4 text-left text-white font-semibold">Round 1</th>
                                <th className="px-6 py-4 text-left text-white font-semibold">Round 2</th>
                                <th className="px-6 py-4 text-left text-white font-semibold">Round 3</th>
                                <th className="px-6 py-4 text-left text-white font-semibold">Total Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {round3Teams.map((team, index) => (
                                <tr key={team._id} className="border-t border-white/20 hover:bg-white/10 transition-colors">
                                    <td className="px-6 py-4 text-white font-bold">#{index + 1}</td>
                                    <td className="px-6 py-4 text-white font-medium">{team.teamName}</td>
                                    <td className="px-6 py-4 text-white">{team.scores?.round1 || 0}</td>
                                    <td className="px-6 py-4 text-white">{team.scores?.round2 || 0}</td>
                                    <td className="px-6 py-4 text-white">{team.scores?.round3 || 0}</td>
                                    <td className="px-6 py-4 text-white font-bold text-lg">{team.scores?.total || 0}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard':
                return renderDashboard();
            case 'team-manage':
                return renderTeamManagement();
            case 'round2-results':
                return renderRound2Results();
            case 'round3-results':
                return renderRound3Results();
            default:
                return renderDashboard();
        }
    };

    if (loading) {
        return (
            <div className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 min-h-screen flex items-center justify-center">
                <div className="text-white text-xl">Loading...</div>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 min-h-screen flex">
            {/* Sidebar */}
            <div className="w-64 bg-white/20 backdrop-blur-sm border-r border-white/30 shadow-lg">
                <div className="p-6">
                    <h1 className="text-2xl font-bold text-white text-center mb-8">Admin</h1>
                    <button
                        onClick={handleLogout}
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors mb-8"
                    >
                        Logout
                    </button>
                </div>

                <nav className="px-4 space-y-2">
                    <button
                        onClick={() => setActiveTab('dashboard')}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${activeTab === 'dashboard'
                            ? 'bg-white/30 text-white font-semibold'
                            : 'text-white/80 hover:bg-white/10 hover:text-white'
                            }`}
                    >
                        Dashboard
                    </button>
                    <button
                        onClick={() => setActiveTab('team-manage')}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${activeTab === 'team-manage'
                            ? 'bg-white/30 text-white font-semibold'
                            : 'text-white/80 hover:bg-white/10 hover:text-white'
                            }`}
                    >
                        Team Manage
                    </button>
                    <button
                        onClick={() => setActiveTab('round2-results')}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${activeTab === 'round2-results'
                            ? 'bg-white/30 text-white font-semibold'
                            : 'text-white/80 hover:bg-white/10 hover:text-white'
                            }`}
                    >
                        Round 2 Results
                    </button>
                    <button
                        onClick={() => setActiveTab('round3-results')}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${activeTab === 'round3-results'
                            ? 'bg-white/30 text-white font-semibold'
                            : 'text-white/80 hover:bg-white/10 hover:text-white'
                            }`}
                    >
                        Round 3 Results
                    </button>
                    <button
                        onClick={() => navigate('/admin/round3')}
                        className="w-full text-left px-4 py-3 rounded-lg transition-colors text-white/80 hover:bg-white/10 hover:text-white"
                    >
                        Round 3 Admin
                    </button>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto">
                {renderContent()}
            </div>
        </div>
    );
};

export default AdminPage;