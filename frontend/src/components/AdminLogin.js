import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await fetch('http://localhost:5000/api/admin-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    if (res.ok) {
      navigate('/admin-dashboard');
    } else {
      alert('Invalid admin credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F2F4F3]">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-[#5A827E]">Admin Login</h1>
          <p className="text-gray-500 text-sm">Sign in to manage the platform</p>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5A827E]"
              placeholder="Enter username"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5A827E]"
              placeholder="Enter password"
            />
          </div>
          <button
            onClick={handleLogin}
            className="w-full bg-[#5A827E] text-white font-semibold py-2 rounded-lg hover:bg-[#466c65] transition"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
