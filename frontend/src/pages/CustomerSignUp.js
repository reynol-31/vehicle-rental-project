import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Use Link instead of <a>
import './CustomerSignUp.css';
import logo from '../assets/logo.png';

function CustomerSignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/customer-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to register');
      }

      navigate('/'); // ✅ Redirect to login page (or /login if that’s your login route)
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-left">
        <img src={logo} alt="Urban Rides Logo" className="logo" />
        <h1 className="welcome-title">Join Urban Rides</h1>
        <p className="welcome-text">Create an account to start your journey with our premium vehicles.</p>
      </div>

      <div className="signup-right">
        <div className="company-name">Urban Rides</div>
        <div className="form-box">
          <h2 className="form-title">Sign Up</h2>
          {error && <p className="error-message">{error}</p>}

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
                disabled={isLoading}
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
                disabled={isLoading}
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
                disabled={isLoading}
              />
            </div>

            <button type="submit" className="signup-button" disabled={isLoading}>
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <p className="login-text">
            Already have an account?{' '}
            <Link to="/" className="login-link">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default CustomerSignUp;
