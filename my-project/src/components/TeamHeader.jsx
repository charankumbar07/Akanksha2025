import React from 'react';
import { useNavigate } from 'react-router-dom';

const TeamHeader = () => {
  const navigate = useNavigate();
  
  // Get team info from localStorage
  const getTeamInfo = () => {
    const team = localStorage.getItem('hustle_team');
    return team ? JSON.parse(team) : null;
  };

  const handleLogout = () => {
    localStorage.removeItem('hustle_team');
    localStorage.removeItem('hustle_token');
    navigate('/login');
  };

  const teamInfo = getTeamInfo();

  return (
    <header className="bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 shadow-xl border-b border-purple-500/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Left side - Logo/Brand */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">H</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">HUSTLE</h1>
                <p className="text-xs text-purple-300">Competition Platform</p>
              </div>
            </div>
          </div>

          {/* Center - Team Name */}
          <div className="hidden md:flex items-center">
            <div className="text-center">
              <p className="text-white font-bold text-xl">
                {teamInfo?.teamName || 'Team Name'}
              </p>
            </div>
          </div>

          {/* Right side - Logout */}
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full transition-all duration-300 hover:scale-105 shadow-lg flex items-center space-x-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Mobile Team Name */}
        <div className="md:hidden mt-3 flex items-center justify-center">
          <p className="text-white font-bold text-lg text-center">
            {teamInfo?.teamName || 'Team Name'}
          </p>
        </div>
      </div>
    </header>
  );
};

export default TeamHeader;
