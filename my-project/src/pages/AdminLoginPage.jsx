import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [message, setMessage] = useState({ type: '', text: '' });
  const [showPassword, setShowPassword] = useState(false);

  // Admin credentials - in production, this should be environment variables or API-based
  const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'admin123'
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.username.trim() || !formData.password) {
      setMessage({ type: 'error', text: 'Please fill in all fields.' });
      return;
    }

    setMessage({ type: 'info', text: 'Authenticating...' });
    
    // Check credentials immediately
    const usernameMatch = formData.username.trim().toLowerCase() === ADMIN_CREDENTIALS.username.toLowerCase();
    const passwordMatch = formData.password === ADMIN_CREDENTIALS.password;
    
    setTimeout(() => {
      if (usernameMatch && passwordMatch) {
        setMessage({ type: 'success', text: 'Authentication successful! Redirecting...' });
        localStorage.setItem('hustle_admin_token', 'authenticated');
        localStorage.setItem('hustle_admin_user', JSON.stringify({ 
          username: ADMIN_CREDENTIALS.username,
          role: 'admin',
          loginTime: new Date().toISOString()
        }));
        setTimeout(() => navigate('/admin/dashboard'), 1000);
      } else {
        setMessage({ type: 'error', text: `Invalid credentials. Please use: ${ADMIN_CREDENTIALS.username} / ${ADMIN_CREDENTIALS.password}` });
      }
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500 bg-opacity-20 rounded-full mb-6 backdrop-blur-md">
            <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Admin Access</h1>
          <p className="text-gray-300">Secure authentication required</p>
        </div>

        <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-3xl p-8 shadow-lg border border-white border-opacity-20">
          {message.text && (
            <div className={`p-4 rounded-xl mb-6 ${
              message.type === 'success' ? 'bg-green-500 bg-opacity-20 text-green-200' :
              message.type === 'error' ? 'bg-red-500 bg-opacity-20 text-red-200' :
              'bg-blue-500 bg-opacity-20 text-blue-200'
            }`}>
              {message.text}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Admin Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400"
                placeholder="Enter admin username"
                required
              />
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Admin Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 pr-12 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400"
                  placeholder="Enter admin password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-white transition-colors"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors duration-300 hover:scale-105 transform shadow-lg"
            >
              Secure Login
            </button>
          </form>

          <div className="mt-6 text-center">
            <button 
              onClick={() => navigate('/')}
              className="text-gray-400 hover:text-gray-300 transition-colors text-sm"
            >
              ← Back to Home
            </button>
          </div>
        </div>

        <div className="mt-6 text-center">
          <div className="bg-yellow-500 bg-opacity-10 border border-yellow-500 border-opacity-20 rounded-lg p-3">
            <p className="text-yellow-300 text-xs">
              <strong>Demo Credentials:</strong> admin / admin123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
