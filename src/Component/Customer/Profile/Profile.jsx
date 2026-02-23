import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarker, 
  FaSave, 
  FaTimes, 
  FaEdit,
  FaWeight,
  FaRulerVertical,
  FaBirthdayCake,
  FaVenusMars,
  FaRunning,
  FaChartLine,
  FaCalendarAlt,
  FaAppleAlt
} from 'react-icons/fa';
import './Profile.css';

const Profile = () => {
  const [profile, setProfile] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phoneNumber: '',
    location: '',
    age: '',
    gender: '',
    height: '',
    weight: '',
    fitnessGoal: '',
    activityLevel: ''
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // Fetch profile data from API
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get('http://localhost:1000/api/auth/customerprofile', {
          headers: {
            'auth-token': localStorage.getItem('token'),
          },
        });
        
        // Transform backend data to match our state structure
        const userData = response.data;
        setProfile({
          firstname: userData.firstname || '',
          lastname: userData.lastname || '',
          email: userData.email || '',
          phoneNumber: userData.phoneNumber || '',
          location: userData.location || '',
          age: userData.age || '',
          gender: userData.gender || '',
          height: userData.height || '',
          weight: userData.weight || '',
          fitnessGoal: userData.fitnessGoal || 'General Fitness',
          activityLevel: userData.activityLevel || 'Moderate',
          _id: userData._id // Keep the ID for updates
        });
      } catch (error) {
        console.error('Error fetching profile data:', error.response?.data || error.message);
        alert('Failed to fetch profile data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);

    try {
      // Prepare data for backend (exclude _id from update)
      const updateData = { ...profile };
      delete updateData._id;

      const response = await axios.put(
        `http://localhost:1000/api/auth/customer/profile/${profile._id}`,
        updateData,
        {
          headers: {
            'auth-token': localStorage.getItem('token'),
          },
        }
      );

      alert('Profile updated successfully!');
      setIsEditing(false);
      
      // Update local state with response data
      setProfile(prev => ({
        ...prev,
        ...response.data
      }));
    } catch (error) {
      console.error('Error updating profile:', error.response?.data || error.message);
      alert('Failed to update profile. Please try again.');
    } finally {
      setUpdating(false);
    }
  };

  // Calculate fitness stats based on profile data
  const calculateFitnessStats = () => {
    // You can calculate these based on actual data later
    return {
      workoutsThisWeek: 0,
      caloriesToday: 0,
      streakDays: 0,
      goalProgress: 45
    };
  };

  const fitnessStats = calculateFitnessStats();

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading your profile...</p>
      </div>
    );
  }

  return (
    <div className="profile-page">
      {/* Header */}
      <div className="profile-header">
        <h1>
          <FaUser className="header-icon" />
          My Fitness Profile
        </h1>
        <p>Track your journey, achieve your goals</p>
      </div>

      <div className="profile-content">
        {/* Left Column - Profile Information */}
        <div className="profile-info-section">
          <div className="profile-card">
            <div className="card-header">
              <h2>Personal Information</h2>
              {!isEditing && (
                <button 
                  className="edit-btn"
                  onClick={() => setIsEditing(true)}
                >
                  <FaEdit /> Edit Profile
                </button>
              )}
            </div>

            {isEditing ? (
              <form className="profile-form" onSubmit={handleSubmit}>
                <div className="form-grid">
                  <div className="form-group">
                    <label>
                      <FaUser /> First Name
                    </label>
                    <input
                      type="text"
                      name="firstname"
                      value={profile.firstname}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>
                      <FaUser /> Last Name
                    </label>
                    <input
                      type="text"
                      name="lastname"
                      value={profile.lastname}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      <FaEnvelope /> Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={profile.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      <FaPhone /> Phone Number
                    </label>
                    <input
                      type="text"
                      name="phoneNumber"
                      value={profile.phoneNumber}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      <FaMapMarker /> Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={profile.location}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      <FaBirthdayCake /> Age
                    </label>
                    <input
                      type="number"
                      name="age"
                      value={profile.age}
                      onChange={handleInputChange}
                      min="1"
                      max="120"
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      <FaVenusMars /> Gender
                    </label>
                    <select
                      name="gender"
                      value={profile.gender}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>
                      <FaRulerVertical /> Height (cm)
                    </label>
                    <input
                      type="number"
                      name="height"
                      value={profile.height}
                      onChange={handleInputChange}
                      min="50"
                      max="250"
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      <FaWeight /> Weight (kg)
                    </label>
                    <input
                      type="number"
                      name="weight"
                      value={profile.weight}
                      onChange={handleInputChange}
                      min="20"
                      max="300"
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      <FaRunning /> Fitness Goal
                    </label>
                    <select
                      name="fitnessGoal"
                      value={profile.fitnessGoal}
                      onChange={handleInputChange}
                    >
                      <option value="Weight Loss">Weight Loss</option>
                      <option value="Muscle Gain">Muscle Gain</option>
                      <option value="Endurance">Endurance</option>
                      <option value="General Fitness">General Fitness</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>
                      <FaChartLine /> Activity Level
                    </label>
                    <select
                      name="activityLevel"
                      value={profile.activityLevel}
                      onChange={handleInputChange}
                    >
                      <option value="Sedentary">Sedentary</option>
                      <option value="Light">Light</option>
                      <option value="Moderate">Moderate</option>
                      <option value="Active">Active</option>
                      <option value="Very Active">Very Active</option>
                    </select>
                  </div>
                </div>

                <div className="form-actions">
                  <button 
                    type="submit" 
                    className="save-btn"
                    disabled={updating}
                  >
                    {updating ? (
                      <>
                        <div className="small-spinner"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <FaSave /> Save Changes
                      </>
                    )}
                  </button>
                  <button 
                    type="button" 
                    className="cancel-btn"
                    onClick={() => setIsEditing(false)}
                    disabled={updating}
                  >
                    <FaTimes /> Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="profile-details">
                <div className="detail-row">
                  <FaUser className="detail-icon" />
                  <div className="detail-content">
                    <span className="detail-label">Name</span>
                    <span className="detail-value">{profile.firstname} {profile.lastname}</span>
                  </div>
                </div>

                <div className="detail-row">
                  <FaEnvelope className="detail-icon" />
                  <div className="detail-content">
                    <span className="detail-label">Email</span>
                    <span className="detail-value">{profile.email}</span>
                  </div>
                </div>

                <div className="detail-row">
                  <FaPhone className="detail-icon" />
                  <div className="detail-content">
                    <span className="detail-label">Phone</span>
                    <span className="detail-value">{profile.phoneNumber}</span>
                  </div>
                </div>

                <div className="detail-row">
                  <FaMapMarker className="detail-icon" />
                  <div className="detail-content">
                    <span className="detail-label">Location</span>
                    <span className="detail-value">{profile.location}</span>
                  </div>
                </div>

                {profile.age && (
                  <div className="detail-row">
                    <FaBirthdayCake className="detail-icon" />
                    <div className="detail-content">
                      <span className="detail-label">Age</span>
                      <span className="detail-value">{profile.age} years</span>
                    </div>
                  </div>
                )}

                {profile.gender && (
                  <div className="detail-row">
                    <FaVenusMars className="detail-icon" />
                    <div className="detail-content">
                      <span className="detail-label">Gender</span>
                      <span className="detail-value">{profile.gender}</span>
                    </div>
                  </div>
                )}

                {profile.height && (
                  <div className="detail-row">
                    <FaRulerVertical className="detail-icon" />
                    <div className="detail-content">
                      <span className="detail-label">Height</span>
                      <span className="detail-value">{profile.height} cm</span>
                    </div>
                  </div>
                )}

                {profile.weight && (
                  <div className="detail-row">
                    <FaWeight className="detail-icon" />
                    <div className="detail-content">
                      <span className="detail-label">Weight</span>
                      <span className="detail-value">{profile.weight} kg</span>
                    </div>
                  </div>
                )}

                {profile.fitnessGoal && (
                  <div className="detail-row">
                    <FaRunning className="detail-icon" />
                    <div className="detail-content">
                      <span className="detail-label">Fitness Goal</span>
                      <span className="detail-value">{profile.fitnessGoal}</span>
                    </div>
                  </div>
                )}

                {profile.activityLevel && (
                  <div className="detail-row">
                    <FaChartLine className="detail-icon" />
                    <div className="detail-content">
                      <span className="detail-label">Activity Level</span>
                      <span className="detail-value">{profile.activityLevel}</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Quick Stats Card */}
          <div className="stats-card">
            <h3>Quick Stats</h3>
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-icon workout">
                  <FaRunning />
                </div>
                <div className="stat-content">
                  <span className="stat-value">{fitnessStats.workoutsThisWeek}</span>
                  <span className="stat-label">Workouts This Week</span>
                </div>
              </div>

              <div className="stat-item">
                <div className="stat-icon calorie">
                  <FaAppleAlt />
                </div>
                <div className="stat-content">
                  <span className="stat-value">{fitnessStats.caloriesToday}</span>
                  <span className="stat-label">Calories Today</span>
                </div>
              </div>

              <div className="stat-item">
                <div className="stat-icon streak">
                  <FaCalendarAlt />
                </div>
                <div className="stat-content">
                  <span className="stat-value">{fitnessStats.streakDays}</span>
                  <span className="stat-label">Day Streak</span>
                </div>
              </div>

              <div className="stat-item">
                <div className="stat-icon progress">
                  <FaChartLine />
                </div>
                <div className="stat-content">
                  <span className="stat-value">{fitnessStats.goalProgress}%</span>
                  <span className="stat-label">Goal Progress</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Empty State for Future Features */}
        <div className="fitness-data-section">
          <div className="coming-soon-card">
            <h3>Fitness Features Coming Soon!</h3>
            <div className="coming-soon-content">
              <div className="feature-item">
                <div className="feature-icon">🏃</div>
                <div className="feature-text">
                  <h4>Workout Logging</h4>
                  <p>Track your daily exercises and workouts</p>
                </div>
              </div>
              
              <div className="feature-item">
                <div className="feature-icon">🥗</div>
                <div className="feature-text">
                  <h4>Nutrition Tracking</h4>
                  <p>Log meals and monitor calorie intake</p>
                </div>
              </div>
              
              <div className="feature-item">
                <div className="feature-icon">📊</div>
                <div className="feature-text">
                  <h4>Progress Analytics</h4>
                  <p>View detailed statistics and charts</p>
                </div>
              </div>
              
              <div className="feature-item">
                <div className="feature-icon">👨‍🏫</div>
                <div className="feature-text">
                  <h4>Trainer Suggestions</h4>
                  <p>Get personalized recommendations</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;