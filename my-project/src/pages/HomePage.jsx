import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const HomePage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 font-sans antialiased text-white min-h-screen">
      <Navbar />

      {/* Main Content */}
      <main className="pt-24 min-h-screen">
        {/* Hero Section */}
        <section className="py-12 text-center px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-3xl bg-white bg-opacity-10 text-purple-300 shadow-xl backdrop-blur-md border border-white border-opacity-20">
                {/* Replace the src with your main icon image URL */}
                <img src="https://placehold.co/64x64/E9D5FF/6D28D9?text=</>" alt="Coding Icon" className="h-16 w-16" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight mb-4">
              Hustle
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Hustle is a premier technical event designed to push the boundaries of coding and problem-solving. It's a platform for innovation, challenging participants to overcome complex coding puzzles and dynamic challenges in a high-stakes, timed competition.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                onClick={() => navigate('/register')}
                className="flex items-center justify-center px-8 py-4 bg-purple-600 text-white text-lg font-bold rounded-full shadow-xl hover:bg-purple-700 transition-colors transform hover:scale-105"
              >
                Register Your Team
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        </section>

        {/* Competition Format Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Competition Format</h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Three exciting rounds designed to test different aspects of your coding skills
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Round 1 Card */}
              <div className="bg-white bg-opacity-10 p-8 rounded-3xl shadow-lg border border-white border-opacity-20 backdrop-blur-md transition-transform duration-300 hover:scale-105">
                <div className="flex justify-center mb-6">
                  <div className="p-4 rounded-full bg-emerald-500 bg-opacity-20 text-emerald-300 backdrop-blur-md">
                    {/* Replace the src with your Round 1 image URL */}
                    <img src="https://placehold.co/40x40/D1FAE5/065F46?text=R1" alt="Round 1 icon" className="h-10 w-10" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white text-center mb-2">Round 1: Aptitude</h3>
                <p className="text-sm text-gray-300 text-center mb-6">
                  Test your logical thinking and problem-solving abilities with brain teasers and puzzles.
                </p>
                <div className="text-center">
                  <span className="inline-block px-4 py-2 bg-white bg-opacity-10 text-gray-200 text-xs font-bold rounded-full border border-white border-opacity-20 shadow-md backdrop-blur-md">
                    Duration: 45 minutes
                  </span>
                </div>
              </div>

              {/* Round 2 Card */}
              <div className="bg-white bg-opacity-10 p-8 rounded-3xl shadow-lg border border-white border-opacity-20 backdrop-blur-md transition-transform duration-300 hover:scale-105">
                <div className="flex justify-center mb-6">
                  <div className="p-4 rounded-full bg-indigo-500 bg-opacity-20 text-indigo-300 backdrop-blur-md">
                    {/* Replace the src with your Round 2 image URL */}
                    <img src="https://placehold.co/40x40/E0E7FF/4338CA?text=R2" alt="Round 2 icon" className="h-10 w-10" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white text-center mb-2">Round 2: Coding</h3>
                <p className="text-sm text-gray-300 text-center mb-6">
                  Sequential puzzle unlock system. Solve programming challenges to advance through levels.
                </p>
                <div className="text-center">
                  <span className="inline-block px-4 py-2 bg-white bg-opacity-10 text-gray-200 text-xs font-bold rounded-full border border-white border-opacity-20 shadow-md backdrop-blur-md">
                    Duration: 2 hours
                  </span>
                </div>
              </div>

              {/* Round 3 Card */}
              <div className="bg-white bg-opacity-10 p-8 rounded-3xl shadow-lg border border-white border-opacity-20 backdrop-blur-md transition-transform duration-300 hover:scale-105">
                <div className="flex justify-center mb-6">
                  <div className="p-4 rounded-full bg-purple-500 bg-opacity-20 text-purple-300 backdrop-blur-md">
                    {/* Replace the src with your Round 3 image URL */}
                    <img src="https://placehold.co/40x40/EDE9FE/6D28D9?text=R3" alt="Round 3 icon" className="h-10 w-10" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white text-center mb-2">Round 3: Final</h3>
                <p className="text-sm text-gray-300 text-center mb-6">
                  Advanced algorithms and complex problem-solving for qualified teams only.
                </p>
                <div className="text-center">
                  <span className="inline-block px-4 py-2 bg-white bg-opacity-10 text-gray-200 text-xs font-bold rounded-full border border-white border-opacity-20 shadow-md backdrop-blur-md">
                    Duration: 3 hours
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
