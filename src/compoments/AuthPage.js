// src/AuthPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { addUser, getUsers } from './data/users'; // Import user management functions
import './App.css';

function AuthPage() {
    const [activeTab, setActiveTab] = useState('login');
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Hook to programmatically navigate

    const showTab = (tab) => {
        setActiveTab(tab);
        setError(''); // Clear error when switching tabs
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (activeTab === 'register') {
            // Basic validation
            if (!formData.username || !formData.email || !formData.password) {
                setError('All fields are required.');
                return;
            }

            // Check if the user already exists
            const existingUser = getUsers().find(user => user.email === formData.email);
            if (existingUser) {
                setError('User already exists. Please login.');
                return;
            }

            // Add user to the data store
            addUser(formData);
            alert('User registered successfully!');
            navigate('/home'); // Navigate to home page after registration
            setFormData({ username: '', email: '', password: '' }); // Reset form
        } else {
            // Handle login logic
            const user = getUsers().find(user => user.email === formData.email && user.password === formData.password);
            if (user) {
                alert('Login successful!');
                navigate('/home'); // Navigate to home page after login
            } else {
                setError('Invalid email or password. Please try again.');
            }
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
                                onClick={() => showTab('login')}
                                className={`tab-trigger fashion-font py-2 border-b-2 border-black text-lg ${
                                    activeTab === 'login' ? 'active-tab' : ''
                                }`}
                            >
                                Sign In
                            </button>
                            <button
                                onClick={() => showTab('register')}
                                className={`tab-trigger fashion-font py-2 border-b-2 ${
                                    activeTab === 'register'
                                        ? 'border-black'
                                        : 'border-transparent text-gray-400'
                                }`}
                            >
                                Register
                            </button>
                        </div>
                        {/* Nội dung tab */}
                        {activeTab === 'login' ? (
                            // Nội dung tab đăng nhập
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    className="w-full p-3 border rounded-lg"
                                    onChange={handleChange}
                                    required
                                />
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    className="w-full p-3 border rounded-lg"
                                    onChange={handleChange}
                                    required
                                />
                                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg">Sign In</button>
                                {error && <p className="text-red-500">{error}</p>}
                            </form>
                        ) : (
                            // Nội dung tab đăng ký
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                {error && <p className="text-red-500">{error}</p>}
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    className="w-full p-3 border rounded-lg"
                                    onChange={handleChange}
                                    required
                                />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    className="w-full p-3 border rounded-lg"
                                    onChange={handleChange}
                                    required
                                />
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    className="w-full p-3 border rounded-lg"
                                    onChange={handleChange}
                                    required
                                />
                                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg">Register</button>
                            </form>
                        )}
                    </div>
                    {/* Nội dung phần đăng nhập mạng xã hội */}
                    <div className="mt-8">...</div>
                </div>

                {/* Left Side - Background Image or Promotion */}
                <div className="hidden md:flex flex-col justify-center p-12 bg-black rounded-3xl text-white space-y-8 relative overflow-hidden">
                    <div className="absolute inset-0 bg-opacity-50 bg-cover bg-center"></div>
                    <div className="relative z-10">
                        <h1 className="text-5xl font-bold fashion-font mb-4 text-white-300">
                            CHICIFY
                        </h1>
                        <p className="text-xl opacity-90 font-light">
                            Discover the latest in fashion trends.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AuthPage;
