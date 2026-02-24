import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './AdminLogin.css';
import { FaEnvelope, FaLock, FaDumbbell, FaEye, FaEyeSlash, FaShieldAlt } from 'react-icons/fa';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:1000/api/admin/admin/login', {
        email,
        password
      });

      console.log('Login response:', response.data);

      if (response.data.success) {
        localStorage.setItem('token', response.data.authToken);
        localStorage.setItem('usertype', 'admin');
        localStorage.setItem('userid', response.data.userid);
        
        // Store admin info
        localStorage.setItem('adminInfo', JSON.stringify(response.data.admin));
        
        navigate('/adminpage');
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.error || 'Failed to connect to server');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="ad-login-page">
      <div className="ad-login-container">
        {/* Left Side - Branding */}
        <div className="ad-login-branding">
          <div className="ad-brand-logo">
            <FaDumbbell className="ad-logo-icon" />
            <div className="ad-logo-text">
              <span className="ad-logo-name">FIT</span>
              <span className="ad-logo-name-accent">TRACK</span>
            </div>
          </div>
          <div className="ad-brand-content">
            <h1>Admin Portal</h1>
            <div className="ad-admin-badge">
              <FaShieldAlt />
              <span>Administrator Access Only</span>
            </div>
            <p>
              Manage users, trainers, routines, and monitor platform analytics 
              from a single dashboard.
            </p>
            <div className="ad-brand-features">
              <div className="ad-feature">
                <div className="ad-feature-icon">👥</div>
                <span>User Management</span>
              </div>
              <div className="ad-feature">
                <div className="ad-feature-icon">📊</div>
                <span>Analytics</span>
              </div>
              <div className="ad-feature">
                <div className="ad-feature-icon">🛡️</div>
                <span>Full Control</span>
              </div>
            </div>
          </div>
          <div className="ad-brand-footer">
            <p>Secure admin access only</p>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="ad-login-form-container">
          <div className="ad-form-header">
            <h2>Admin Login</h2>
            <p>Enter your credentials to access the admin panel</p>
          </div>

          <form className="ad-login-form" onSubmit={handleSubmit}>
            {error && (
              <div className="ad-error-message">
                <span>{error}</span>
              </div>
            )}

            <div className="ad-input-group">
              <div className="ad-input-icon">
                <FaEnvelope />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
                placeholder="Admin Email"
                required
                disabled={isLoading}
              />
            </div>

            <div className="ad-input-group">
              <div className="ad-input-icon">
                <FaLock />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                placeholder="Password"
                required
                disabled={isLoading}
              />
              <button 
                type="button" 
                className="ad-password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <button type="submit" className="ad-login-button" disabled={isLoading}>
              {isLoading ? (
                <>
                  <span className="ad-spinner"></span>
                  Authenticating...
                </>
              ) : (
                'Access Admin Panel'
              )}
            </button>

            <div className="ad-security-note">
              <FaShieldAlt />
              <span>This area is restricted to authorized personnel only</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;