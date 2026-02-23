import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaUser, FaEnvelope, FaPhone, FaLock, FaMapMarkerAlt, FaDumbbell, FaEye, FaEyeSlash, FaGraduationCap } from 'react-icons/fa';
import './CustomerSignup.css';

const CustomerSignup = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    location: '',
    userType: 'customer', // Default to customer
  });

  const [trainerInfo, setTrainerInfo] = useState({
    specialization: '',
    experience: '',
    bio: ''
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('trainer_')) {
      const fieldName = name.replace('trainer_', '');
      setTrainerInfo({
        ...trainerInfo,
        [fieldName]: value
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate first name
    if (!formData.firstname.trim()) {
      newErrors.firstname = 'First name is required.';
    }

    // Validate last name
    if (!formData.lastname.trim()) {
      newErrors.lastname = 'Last name is required.';
    }

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    // Validate phone number
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required.';
    } else if (!/^\d{10,15}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Phone number must be 10-15 digits.';
    }

    // Validate password
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required.';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }

    // Validate confirm password
    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = 'Confirm password is required.';
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    // Validate location
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required.';
    }

    // Validate trainer info if registering as trainer
    if (formData.userType === 'trainer') {
      if (!trainerInfo.specialization.trim()) {
        newErrors.specialization = 'Specialization is required for trainers.';
      }
      if (!trainerInfo.experience || parseInt(trainerInfo.experience) < 0) {
        newErrors.experience = 'Please enter valid experience in years.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    const submissionData = {
      firstname: formData.firstname,
      lastname: formData.lastname,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      password: formData.password,
      location: formData.location,
      userType: formData.userType,
    };

    // Add trainer profile data if registering as trainer
    if (formData.userType === 'trainer') {
      submissionData.trainerProfile = {
        specialization: trainerInfo.specialization.split(',').map(s => s.trim()),
        experience: parseInt(trainerInfo.experience),
        bio: trainerInfo.bio
      };
    }

    try {
      const response = await fetch('http://localhost:1000/api/auth/customerregister', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      const data = await response.json();

      if (response.ok) {
        // Store token and user type
        localStorage.setItem('token', data.authToken);
        localStorage.setItem('usertype', formData.userType);
        
        if (formData.userType === 'trainer') {
          alert('Trainer registration successful! Welcome to FitTrack!');
          navigate('/fitnessroutines'); // Redirect trainers to fitness routines
        } else {
          alert('Registration successful! Welcome to FitTrack!');
          navigate('/login'); // Redirect customers to login
        }
      } else {
        throw new Error(data.error || 'Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert(error.message || 'An error occurred during registration.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        {/* Left Side - Branding */}
        <div className="signup-branding">
          <div className="brand-logo">
            <FaDumbbell className="logo-icon" />
            <div className="logo-text">
              <span className="logo-name">FIT</span>
              <span className="logo-name-accent">TRACK</span>
            </div>
          </div>
          <div className="brand-content">
            <h1>Start Your Fitness Journey</h1>
            <p>
              Join thousands of users who are transforming their lives with personalized 
              fitness tracking, AI-powered workouts, and expert nutrition guidance.
            </p>
            <div className="brand-features">
              <div className="feature">
                <div className="feature-icon">🎯</div>
                <span>Personalized Plans</span>
              </div>
              <div className="feature">
                <div className="feature-icon">📊</div>
                <span>Progress Tracking</span>
              </div>
              <div className="feature">
                <div className="feature-icon">👥</div>
                <span>Community Support</span>
              </div>
            </div>
          </div>
          <div className="brand-footer">
            <p>Already have an account?</p>
            <Link to="/login" className="login-link">Sign In Here</Link>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="signup-form-container">
          <div className="form-header">
            <h2>Create Your Account</h2>
            <p>Fill in your details to get started</p>
          </div>

          <form className="signup-form" onSubmit={handleSubmit}>
            <div className="user-type-selection">
              <h3>I want to join as:</h3>
              <div className="user-type-options">
                <label className={`user-type-option ${formData.userType === 'customer' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="userType"
                    value="customer"
                    checked={formData.userType === 'customer'}
                    onChange={handleChange}
                  />
                  <div className="option-content">
                    <div className="option-icon">👤</div>
                    <div className="option-text">
                      <strong>Fitness Enthusiast</strong>
                      <small>Track workouts, meals & progress</small>
                    </div>
                  </div>
                </label>
                
                <label className={`user-type-option ${formData.userType === 'trainer' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="userType"
                    value="trainer"
                    checked={formData.userType === 'trainer'}
                    onChange={handleChange}
                  />
                  <div className="option-content">
                    <div className="option-icon">
                      <FaGraduationCap />
                    </div>
                    <div className="option-text">
                      <strong>Fitness Trainer</strong>
                      <small>Create & share workout routines</small>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            <div className="form-row">
              <div className="input-group">
                <div className="input-icon">
                  <FaUser />
                </div>
                <input
                  type="text"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                  placeholder="First Name"
                  className={errors.firstname ? 'error-input' : ''}
                />
                {errors.firstname && <span className="error-message">{errors.firstname}</span>}
              </div>

              <div className="input-group">
                <div className="input-icon">
                  <FaUser />
                </div>
                <input
                  type="text"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  placeholder="Last Name"
                  className={errors.lastname ? 'error-input' : ''}
                />
                {errors.lastname && <span className="error-message">{errors.lastname}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="input-group">
                <div className="input-icon">
                  <FaEnvelope />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className={errors.email ? 'error-input' : ''}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              <div className="input-group">
                <div className="input-icon">
                  <FaPhone />
                </div>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className={errors.phoneNumber ? 'error-input' : ''}
                />
                {errors.phoneNumber && <span className="error-message">{errors.phoneNumber}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="input-group">
                <div className="input-icon">
                  <FaLock />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className={errors.password ? 'error-input' : ''}
                />
                <button 
                  type="button" 
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
                {errors.password && <span className="error-message">{errors.password}</span>}
              </div>

              <div className="input-group">
                <div className="input-icon">
                  <FaLock />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  className={errors.confirmPassword ? 'error-input' : ''}
                />
                <button 
                  type="button" 
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
                {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
              </div>
            </div>

            <div className="input-group full-width">
              <div className="input-icon">
                <FaMapMarkerAlt />
              </div>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Location (City, Country)"
                className={errors.location ? 'error-input' : ''}
              />
              {errors.location && <span className="error-message">{errors.location}</span>}
            </div>

            {/* Trainer Specific Fields */}
            {formData.userType === 'trainer' && (
              <div className="trainer-fields">
                <h3>Trainer Information</h3>
                
                <div className="input-group">
                  <div className="input-icon">
                    <FaGraduationCap />
                  </div>
                  <input
                    type="text"
                    name="trainer_specialization"
                    value={trainerInfo.specialization}
                    onChange={handleChange}
                    placeholder="Specialization (e.g., Yoga, Weight Training, Cardio)"
                    className={errors.specialization ? 'error-input' : ''}
                  />
                  {errors.specialization && <span className="error-message">{errors.specialization}</span>}
                  <small className="field-hint">Separate multiple specializations with commas</small>
                </div>

                <div className="form-row">
                  <div className="input-group">
                    <div className="input-icon">
                      📅
                    </div>
                    <input
                      type="number"
                      name="trainer_experience"
                      value={trainerInfo.experience}
                      onChange={handleChange}
                      placeholder="Years of Experience"
                      className={errors.experience ? 'error-input' : ''}
                      min="0"
                    />
                    {errors.experience && <span className="error-message">{errors.experience}</span>}
                  </div>
                </div>

                <div className="input-group">
                  <textarea
                    name="trainer_bio"
                    value={trainerInfo.bio}
                    onChange={handleChange}
                    placeholder="Tell us about your training philosophy and approach..."
                    rows="3"
                    className="bio-textarea"
                  />
                  <small className="field-hint">Brief bio about yourself (optional)</small>
                </div>
              </div>
            )}

            <div className="terms-group">
              <input type="checkbox" id="terms" required />
              <label htmlFor="terms">
                I agree to the <a href="#terms">Terms of Service</a> and <a href="#privacy">Privacy Policy</a>
              </label>
            </div>

            <button type="submit" className="signup-button" disabled={isLoading}>
              {isLoading ? (
                <>
                  <span className="spinner"></span>
                  Creating Account...
                </>
              ) : (
                formData.userType === 'trainer' ? 'Register as Trainer' : 'Start Your Fitness Journey'
              )}
            </button>

            <div className="signin-redirect">
              <p>Already have an account? <Link to="/login">Sign In</Link></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CustomerSignup;