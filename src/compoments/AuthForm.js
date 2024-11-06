import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';
import img1 from '../image/login.jpg';

function AuthForm() {
  const [activeTab, setActiveTab] = useState('login');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setErrorMessage('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email: formData.email,
        password: formData.password
      });

      const { token } = response.data;
      localStorage.setItem('token', token);
      window.location.href = '/home';
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || 'An error occurred during login'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/auth/register', {
        username: formData.username,
        email: formData.email,
        password: formData.password
      });
      
      alert('Registration successful! Please login.');
      setActiveTab('login');
      setFormData({ username: '', email: '', password: '' });
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || 'An error occurred during registration'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f3ef] flex items-center justify-center p-4">
      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-8">
        {/* Right Side - Auth Forms */}
        <div className="glass-effect rounded-3xl p-8 shadow-xl">
          <div className="mb-8">
            <h2 className="text-3xl font-bold fashion-font">Welcome</h2>
            <p className="text-gray-600 mt-2">Join our fashion community</p>
          </div>

          <div className="tabs">
            <div className="tabs-list grid grid-cols-2 gap-4 w-full mb-8">
              <button
                onClick={() => {
                  setActiveTab('login');
                  setErrorMessage('');
                }}
                className={`tab-trigger fashion-font py-2 border-b-2 ${
                  activeTab === 'login' ? 'border-black' : 'border-transparent text-gray-400'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  setActiveTab('register');
                  setErrorMessage('');
                }}
                className={`tab-trigger fashion-font py-2 border-b-2 ${
                  activeTab === 'register' ? 'border-black' : 'border-transparent text-gray-400'
                }`}
              >
                Register
              </button>
            </div>

            {activeTab === 'login' && (
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="input-focused block w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm text-sm"
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="input-focused block w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm text-sm"
                    placeholder="••••••••"
                    required
                  />
                </div>
                {errorMessage && (
                  <p className="text-red-500 text-sm">{errorMessage}</p>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-black text-white py-3 rounded-xl text-sm font-semibold hover:bg-gray-900 disabled:bg-gray-400"
                >
                  {loading ? 'Signing In...' : 'Sign In'}
                </button>
              </form>
            )}

            {activeTab === 'register' && (
              <form onSubmit={handleRegister} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="input-focused block w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm text-sm"
                    placeholder="johndoe"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="reg-email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="reg-email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="input-focused block w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm text-sm"
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="reg-password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="reg-password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="input-focused block w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm text-sm"
                    placeholder="••••••••"
                    required
                  />
                </div>
                {errorMessage && (
                  <p className="text-red-500 text-sm">{errorMessage}</p>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-black text-white py-3 rounded-xl text-sm font-semibold hover:bg-gray-900 disabled:bg-gray-400"
                >
                  {loading ? 'Creating Account...' : 'Create Account'}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Left Side - Background Image */}
        <div className="hidden md:flex flex-col justify-center p-12 bg-black rounded-3xl text-white space-y-8 relative overflow-hidden">
          <img
            src={img1}
            alt="Fashion Promo"
            className="absolute inset-0 h-full w-full object-cover opacity-40"
          />
          <div className="relative z-10">
            {/* Add promotional content here if needed */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthForm;