import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  
  return (
    <header className="fixed top-0 left-0 w-full bg-black bg-opacity-20 backdrop-blur-md z-50 shadow-lg border-b border-white border-opacity-10 transition-all duration-300">
      <nav className="container mx-auto px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <button onClick={() => navigate('/')} className="flex items-center space-x-2">
            <div className="p-2 rounded-full bg-purple-500 bg-opacity-20 text-purple-300 shadow-lg flex items-center justify-center backdrop-blur-md border border-white border-opacity-20">
              <img src="https://placehold.co/24x24/E9D5FF/6D28D9?text=Logo" alt="Hustle Logo" className="h-6 w-6" />
            </div>
            <span className="text-xl font-bold text-white">Hustle</span>
          </button>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-4">
          <button onClick={() => navigate('/login')} className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors">Login</button>
          <button onClick={() => navigate('/register')} className="px-6 py-2 bg-purple-600 text-white text-sm font-medium rounded-full shadow-lg hover:bg-purple-700 transition-colors backdrop-blur-md">Register Team</button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button className="text-gray-300 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
