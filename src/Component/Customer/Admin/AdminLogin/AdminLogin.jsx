import React, { useState } from "react";
import axios from "axios";
import "./AdminLogin.css";
import { useNavigate, Link } from 'react-router-dom';

function AdminLogin({ setAuthToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:1000/api/admin/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email, password: password })
    });
    const json = await response.json();

    console.log("API Response:", json);  // Log the entire response

    if (json.success === true) {
      const token = json.authToken;  // Use correct capitalization
      console.log("Token to be saved:", token);  // Log the token before saving

      if (token) {
        localStorage.setItem('token', token);  
        localStorage.setItem('usertype', json.userType);
        console.log("Token saved to localStorage:", localStorage.getItem('token')); 
        console.log("Token saved to localStorage:", localStorage.getItem('usertype'));
        navigate("/adminpage");
      } else {
        console.error("Token is undefined, cannot save to localStorage");
      }
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        <h2 className="admin-login-heading">Admin Login</h2>
        <form onSubmit={handleSubmit} className="admin-login-form">
          <input
            type="email"
            className="admin-login-input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="admin-login-input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="admin-login-button">Login</button>
        </form>
        <Link to="/forgot-password" className="admin-login-link">Forgot Password?</Link>
      </div>
    </div>
  );
}

export default AdminLogin;