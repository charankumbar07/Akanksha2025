import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [formData, setFormData] = useState({
    teamName: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.teamName.trim()) {
      newErrors.teamName = 'Team name is required';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Login attempt:', formData);
      // Simulating a successful login
      setMessage({ type: 'success', text: 'Login successful! Redirecting...' });
      // In a real app, you would handle authentication here and redirect.
      navigate('/result');
    } else {
      setMessage({ type: 'error', text: 'Please check your credentials.' });
    }
  };

  const renderIcon = (svgPath, className) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d={svgPath} />
    </svg>
  );

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 pt-24">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-purple-500 bg-opacity-20 rounded-full mb-6 backdrop-blur-md">
                {renderIcon("M12 2a10 10 0 0 0-9.25 10.74C3.89 19.34 8.1 22 12 22s8.11-2.66 9.25-9.26A10 10 0 0 0 12 2z", "w-10 h-10 text-purple-400")}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Team Login
              </h1>
              <p className="text-xl text-gray-300">
                Sign in to your team account to start the competition
              </p>
            </div>

            <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-3xl p-8 shadow-lg border border-white border-opacity-20">
              {message.text && (
                <div className={`p-4 rounded-xl mb-4 ${message.type === 'success' ? 'bg-green-500 bg-opacity-20 text-green-200' : 'bg-red-500 bg-opacity-20 text-red-200'}`}>
                  {message.text}
                </div>
              )}
              <div className="space-y-6">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    {renderIcon("M17 20v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M7 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z", "w-4 h-4 inline mr-2")}
                    Team Name
                  </label>
                  <input
                    type="text"
                    name="teamName"
                    value={formData.teamName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-colors backdrop-blur-md"
                    placeholder="Enter your team name"
                  />
                  {errors.teamName && <p className="text-red-400 text-sm mt-1">{errors.teamName}</p>}
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 pr-12 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-colors backdrop-blur-md"
                      placeholder="Enter password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-white transition-colors"
                    >
                      {showPassword ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.68 9.68 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.51 3.15M12 12a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm7 0a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                          <line x1="1" y1="1" x2="23" y2="23" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      )}
                    </button>
                  </div>
                  {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
                </div>

                <button
                  type="button"
                  onClick={handleSubmit}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors duration-300 hover:scale-105 transform shadow-lg"
                >
                  Sign In
                </button>

                <div className="text-center">
                  <p className="text-gray-300">
                    Don't have an account?{' '}
                    <button onClick={() => navigate('/register')} className="text-purple-400 hover:text-purple-300 transition-colors">
                      Register Here
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LoginPage;
