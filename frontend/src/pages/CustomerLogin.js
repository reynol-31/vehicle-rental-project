import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './CustomerLogin.css';
import logo from '../assets/logo.png';

function CustomerLogin() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch('http://localhost:5000/api/customer-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();
    console.log("Login response:", data);

    if (!response.ok) {
      throw new Error(data.error || 'Login failed');
    }

    // Save userId so other pages (like RentalPage) can use it
    if (data.userId && !isNaN(data.userId)) {
      localStorage.setItem('userId', data.userId.toString());
    } else {
      console.error('Invalid user_id received:', data.userId);
    }
    

    navigate('/vehicles');
  } catch (error) {
    alert('Login error: ' + error.message);
  }
};


  return (
    <div className="login-container">
      <div className="login-left">
        <img src={logo} alt="Urban Rides Logo" className="logo" />
        <h1 className="welcome-title">Welcome to Urban Rides</h1>
        <p className="welcome-text">Your journey starts here. Log in to explore our premium vehicles.</p>
      </div>

      <div className="login-right">
        <div className="company-name">Urban Rides</div>
        <div className="form-box">
          <h2 className="form-title">Sign In</h2>
          <form onSubmit={handleSubmit} className="form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Enter your username"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
              />
            </div>
            <button type="submit" className="login-button">
              Sign In
            </button>
          </form>
          <p className="signup-text">
            Don't have an account?{' '}
            <Link to="/signup" className="signup-link">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default CustomerLogin;
