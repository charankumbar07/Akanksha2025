import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [formData, setFormData] = useState({
    teamName: '',
    member1Email: '',
    member1Name: '',
    member2Email: '',
    member2Name: '',
    leader: 'member1', // 'member1' or 'member2'
    leaderPhone: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Team name validation
    if (!formData.teamName.trim()) {
      newErrors.teamName = 'Team name is required';
    } else if (formData.teamName.length < 3) {
      newErrors.teamName = 'Team name must be at least 3 characters';
    }

    // Member 1 validation
    if (!formData.member1Name.trim()) {
      newErrors.member1Name = 'Member 1 name is required';
    }
    if (!formData.member1Email.trim()) {
      newErrors.member1Email = 'Member 1 email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.member1Email)) {
      newErrors.member1Email = 'Invalid email format';
    }

    // Member 2 validation
    if (!formData.member2Name.trim()) {
      newErrors.member2Name = 'Member 2 name is required';
    }
    if (!formData.member2Email.trim()) {
      newErrors.member2Email = 'Member 2 email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.member2Email)) {
      newErrors.member2Email = 'Invalid email format';
    }

    // Check for duplicate emails
    if (formData.member1Email && formData.member2Email &&
        formData.member1Email === formData.member2Email) {
      newErrors.member2Email = 'Member emails must be different';
    }

    // Leader phone validation
    if (!formData.leaderPhone.trim()) {
      newErrors.leaderPhone = 'Leader phone number is required';
    } else if (!/^\+?[\d\s\-\(\)]{10,}$/.test(formData.leaderPhone.replace(/\s/g, ''))) {
      newErrors.leaderPhone = 'Invalid phone number format';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
      // Simulating a successful registration
      setMessage({ type: 'success', text: 'Team registered successfully!' });
      // You would typically handle form submission to a backend here.
    } else {
      setMessage({ type: 'error', text: 'Please correct the errors in the form.' });
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
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-purple-500 bg-opacity-20 rounded-full mb-6 backdrop-blur-md">
                {renderIcon("M17 20v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M7 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm12 0a4 4 0 1 0 0-8 4 4 0 0 0 0 8z", "w-10 h-10 text-purple-400")}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Team Registration
              </h1>
              <p className="text-xl text-gray-300">
                Register your team for the technical competition
              </p>
            </div>

            {/* Registration Form */}
            <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-3xl p-8 shadow-lg border border-white border-opacity-20">
              {message.text && (
                <div className={`p-4 rounded-xl mb-4 ${message.type === 'success' ? 'bg-green-500 bg-opacity-20 text-green-200' : 'bg-red-500 bg-opacity-20 text-red-200'}`}>
                  {message.text}
                </div>
              )}
              <div className="space-y-6">
                {/* Team Name */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    {renderIcon("M17 20v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M7 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm12 0a4 4 0 1 0 0-8 4 4 0 0 0 0 8z", "w-4 h-4 inline mr-2")}
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

                {/* Team Members Section */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-white border-b border-white border-opacity-20 pb-2">
                    Team Members
                  </h3>

                  {/* Member 1 */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white text-sm font-medium mb-2">
                        {renderIcon("M1 20v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1zm6-10a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm13 4v-2a4 4 0 0 0-4-4h-2a4 4 0 0 0-4 4v2a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1zm-4-8a4 4 0 1 0 0-8 4 4 0 0 0 0 8z", "w-4 h-4 inline mr-2")}
                        Member 1 Name
                      </label>
                      <input
                        type="text"
                        name="member1Name"
                        value={formData.member1Name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-colors backdrop-blur-md"
                        placeholder="Enter member 1 name"
                      />
                      {errors.member1Name && <p className="text-red-400 text-sm mt-1">{errors.member1Name}</p>}
                    </div>
                    <div>
                      <label className="block text-white text-sm font-medium mb-2">
                        {renderIcon("M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6L12 13L2 6", "w-4 h-4 inline mr-2")}
                        Member 1 Email
                      </label>
                      <input
                        type="email"
                        name="member1Email"
                        value={formData.member1Email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-colors backdrop-blur-md"
                        placeholder="member1@example.com"
                      />
                      {errors.member1Email && <p className="text-red-400 text-sm mt-1">{errors.member1Email}</p>}
                    </div>
                  </div>

                  {/* Member 2 */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white text-sm font-medium mb-2">
                        {renderIcon("M1 20v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1zm6-10a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm13 4v-2a4 4 0 0 0-4-4h-2a4 4 0 0 0-4 4v2a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1zm-4-8a4 4 0 1 0 0-8 4 4 0 0 0 0 8z", "w-4 h-4 inline mr-2")}
                        Member 2 Name
                      </label>
                      <input
                        type="text"
                        name="member2Name"
                        value={formData.member2Name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-colors backdrop-blur-md"
                        placeholder="Enter member 2 name"
                      />
                      {errors.member2Name && <p className="text-red-400 text-sm mt-1">{errors.member2Name}</p>}
                    </div>
                    <div>
                      <label className="block text-white text-sm font-medium mb-2">
                        {renderIcon("M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6L12 13L2 6", "w-4 h-4 inline mr-2")}
                        Member 2 Email
                      </label>
                      <input
                        type="email"
                        name="member2Email"
                        value={formData.member2Email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-colors backdrop-blur-md"
                        placeholder="member2@example.com"
                      />
                      {errors.member2Email && <p className="text-red-400 text-sm mt-1">{errors.member2Email}</p>}
                    </div>
                  </div>
                </div>

                {/* Leader Selection */}
                <div>
                  <label className="block text-white text-sm font-medium mb-3">
                    {renderIcon("M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM8 14s1.5 2 4 2 4-2 4-2M15 9h.01M9 9h.01", "w-4 h-4 inline mr-2")}
                    Choose Team Leader
                  </label>
                  <div className="grid md:grid-cols-2 gap-4">
                    <label className="flex items-center p-4 bg-white bg-opacity-5 rounded-xl cursor-pointer hover:bg-opacity-10 transition-colors border border-white border-opacity-20">
                      <input
                        type="radio"
                        name="leader"
                        value="member1"
                        checked={formData.leader === 'member1'}
                        onChange={handleInputChange}
                        className="mr-3 text-purple-500"
                      />
                      <div>
                        <div className="text-white font-medium">
                          {formData.member1Name || 'Member 1'}
                        </div>
                        <div className="text-gray-300 text-sm">
                          {formData.member1Email || 'member1@example.com'}
                        </div>
                      </div>
                    </label>
                    <label className="flex items-center p-4 bg-white bg-opacity-5 rounded-xl cursor-pointer hover:bg-opacity-10 transition-colors border border-white border-opacity-20">
                      <input
                        type="radio"
                        name="leader"
                        value="member2"
                        checked={formData.leader === 'member2'}
                        onChange={handleInputChange}
                        className="mr-3 text-purple-500"
                      />
                      <div>
                        <div className="text-white font-medium">
                          {formData.member2Name || 'Member 2'}
                        </div>
                        <div className="text-gray-300 text-sm">
                          {formData.member2Email || 'member2@example.com'}
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Leader Phone */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    {renderIcon("M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z", "w-4 h-4 inline mr-2")}
                    Team Leader Phone Number
                  </label>
                  <input
                    type="tel"
                    name="leaderPhone"
                    value={formData.leaderPhone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-colors backdrop-blur-md"
                    placeholder="+1 (555) 123-4567"
                  />
                  {errors.leaderPhone && <p className="text-red-400 text-sm mt-1">{errors.leaderPhone}</p>}
                </div>

                {/* Password Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white border-b border-white border-opacity-20 pb-2">
                    Account Security
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
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
                    
                    <div>
                      <label className="block text-white text-sm font-medium mb-2">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-colors backdrop-blur-md"
                        placeholder="Confirm password"
                      />
                      {errors.confirmPassword && <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>}
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors duration-300 hover:scale-105 transform shadow-lg"
                >
                  Register Team
                </button>

                {/* Login Link */}
                <div className="text-center">
                  <p className="text-gray-300">
                    Already have an account?{' '}
                    <button onClick={() => navigate('/login')} className="text-purple-400 hover:text-purple-300 transition-colors">
                      Sign In
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

export default RegisterPage;
