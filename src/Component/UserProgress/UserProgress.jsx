import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserProgress.css';
import {
  FaFire,
  FaCalendarAlt,
  FaClock,
  FaWeight,
  FaTint,
  FaAppleAlt,
  FaRunning,
  FaMedal,
  FaChartLine,
  FaStar,
  FaCheckCircle,
  FaBell,
  FaUserTie,
  FaComment,
  FaReply
} from 'react-icons/fa';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const UserProgress = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState(null);
  const [weeklyData, setWeeklyData] = useState(null);
  const [monthlyData, setMonthlyData] = useState(null);
  const [achievements, setAchievements] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [selectedRoutine, setSelectedRoutine] = useState(null);
  const [userRoutines, setUserRoutines] = useState([]);
  
  // Feedback Form State
  const [feedbackForm, setFeedbackForm] = useState({
    routineId: '',
    rating: 5,
    comment: '',
    weeksCompleted: 0,
    daysCompleted: 0,
    difficultyLevel: 'Just Right',
    enjoyedWorkouts: '',
    struggledWith: '',
    weightChange: '',
    energyLevel: 'Moderate',
    sleepQuality: 'Good',
    mood: 'Good'
  });

  useEffect(() => {
    fetchAllData();
    fetchUserRoutines();
  }, []);

  const fetchAllData = async () => {
    try {
      const token = localStorage.getItem('token');
      
      const [statsRes, weeklyRes, monthlyRes, achievementsRes, suggestionsRes, feedbackRes] = await Promise.all([
        axios.get('http://localhost:1000/api/auth/progress-stats', {
          headers: { 'auth-token': token }
        }),
        axios.get('http://localhost:1000/api/auth/weekly-progress', {
          headers: { 'auth-token': token }
        }),
        axios.get('http://localhost:1000/api/auth/monthly-progress', {
          headers: { 'auth-token': token }
        }),
        axios.get('http://localhost:1000/api/auth/achievements', {
          headers: { 'auth-token': token }
        }),
        axios.get('http://localhost:1000/api/auth/my-suggestions', {
          headers: { 'auth-token': token }
        }),
        axios.get('http://localhost:1000/api/auth/my-feedback', {
          headers: { 'auth-token': token }
        })
      ]);

      setStats(statsRes.data);
      setWeeklyData(weeklyRes.data);
      setMonthlyData(monthlyRes.data);
      setAchievements(achievementsRes.data);
      setSuggestions(suggestionsRes.data);
      setFeedback(feedbackRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserRoutines = async () => {
    try {
      const response = await axios.get('http://localhost:1000/api/auth/fitness-routines', {
        headers: { 'auth-token': localStorage.getItem('token') }
      });
      // Filter to only routines the user has used or can give feedback on
      setUserRoutines(response.data.filter(r => r.isPublic));
    } catch (error) {
      console.error('Error fetching routines:', error);
    }
  };

  const handleSubmitFeedback = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:1000/api/auth/submit-feedback', feedbackForm, {
        headers: {
          'auth-token': localStorage.getItem('token'),
          'Content-Type': 'application/json'
        }
      });
      
      alert('Feedback submitted successfully!');
      setShowFeedbackForm(false);
      setFeedbackForm({
        routineId: '',
        rating: 5,
        comment: '',
        weeksCompleted: 0,
        daysCompleted: 0,
        difficultyLevel: 'Just Right',
        enjoyedWorkouts: '',
        struggledWith: '',
        weightChange: '',
        energyLevel: 'Moderate',
        sleepQuality: 'Good',
        mood: 'Good'
      });
      fetchAllData(); // Refresh data
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Failed to submit feedback');
    }
  };

  const markSuggestionAsRead = async (suggestionId) => {
    try {
      await axios.put(`http://localhost:1000/api/auth/suggestion/${suggestionId}/read`, {}, {
        headers: { 'auth-token': localStorage.getItem('token') }
      });
      
      setSuggestions(prev =>
        prev.map(s => s.id === suggestionId ? { ...s, isRead: true } : s)
      );
    } catch (error) {
      console.error('Error marking suggestion as read:', error);
    }
  };

  // Chart Data
  const workoutChartData = {
    labels: weeklyData?.workouts.map(d => d.day) || [],
    datasets: [
      {
        label: 'Workouts',
        data: weeklyData?.workouts.map(d => d.value) || [],
        backgroundColor: '#FF6B35',
        borderColor: '#FF6B35',
        borderWidth: 1
      }
    ]
  };

  const calorieChartData = {
    labels: weeklyData?.calories.map(d => d.day) || [],
    datasets: [
      {
        label: 'Calories Burned',
        data: weeklyData?.calories.map(d => d.value) || [],
        backgroundColor: '#48bb78',
        borderColor: '#48bb78',
        borderWidth: 1
      }
    ]
  };

  const waterChartData = {
    labels: weeklyData?.water.map(d => d.day) || [],
    datasets: [
      {
        label: 'Water Intake (L)',
        data: weeklyData?.water.map(d => d.value) || [],
        backgroundColor: '#4299e1',
        borderColor: '#4299e1',
        borderWidth: 1
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: '#e2e8f0'
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };

  if (loading) {
    return (
      <div className="progress-loading">
        <div className="loading-spinner"></div>
        <p>Loading your progress...</p>
      </div>
    );
  }

  return (
    <div className="user-progress-page">
      {/* Header */}
      <div className="progress-header">
        <h1>
          <FaChartLine className="header-icon" />
          Your Fitness Progress
        </h1>
        <p>Track your achievements and get personalized suggestions from trainers</p>
      </div>

      {/* Tabs */}
      <div className="progress-tabs">
        <button
          className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <FaChartLine /> Overview
        </button>
        <button
          className={`tab-btn ${activeTab === 'feedback' ? 'active' : ''}`}
          onClick={() => setActiveTab('feedback')}
        >
          <FaComment /> Feedback
        </button>
        <button
          className={`tab-btn ${activeTab === 'suggestions' ? 'active' : ''}`}
          onClick={() => setActiveTab('suggestions')}
        >
          <FaBell /> Suggestions
          {suggestions.filter(s => !s.isRead).length > 0 && (
            <span className="badge">{suggestions.filter(s => !s.isRead).length}</span>
          )}
        </button>
        <button
          className={`tab-btn ${activeTab === 'achievements' ? 'active' : ''}`}
          onClick={() => setActiveTab('achievements')}
        >
          <FaMedal /> Achievements
        </button>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="overview-tab">
          {/* Stats Cards */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon workouts">
                <FaRunning />
              </div>
              <div className="stat-content">
                <span className="stat-value">{stats?.totalWorkouts || 0}</span>
                <span className="stat-label">Total Workouts</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon minutes">
                <FaClock />
              </div>
              <div className="stat-content">
                <span className="stat-value">{stats?.totalMinutes || 0}</span>
                <span className="stat-label">Total Minutes</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon calories">
                <FaFire />
              </div>
              <div className="stat-content">
                <span className="stat-value">{stats?.totalCaloriesBurned || 0}</span>
                <span className="stat-label">Calories Burned</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon streak">
                <FaCalendarAlt />
              </div>
              <div className="stat-content">
                <span className="stat-value">{stats?.currentStreak || 0}</span>
                <span className="stat-label">Day Streak</span>
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="charts-grid">
            <div className="chart-card">
              <h3>Weekly Workouts</h3>
              <div className="chart-container">
                <Bar data={workoutChartData} options={chartOptions} />
              </div>
            </div>

            <div className="chart-card">
              <h3>Weekly Calories</h3>
              <div className="chart-container">
                <Bar data={calorieChartData} options={chartOptions} />
              </div>
            </div>

            <div className="chart-card">
              <h3>Weekly Water Intake</h3>
              <div className="chart-container">
                <Bar data={waterChartData} options={chartOptions} />
              </div>
            </div>
          </div>

          {/* Monthly Summary */}
          <div className="monthly-summary">
            <h3>Monthly Summary</h3>
            <div className="summary-grid">
              <div className="summary-item">
                <span className="label">Total Workouts</span>
                <span className="value">{monthlyData?.totalWorkouts || 0}</span>
              </div>
              <div className="summary-item">
                <span className="label">Total Minutes</span>
                <span className="value">{monthlyData?.totalMinutes || 0}</span>
              </div>
              <div className="summary-item">
                <span className="label">Calories Burned</span>
                <span className="value">{monthlyData?.totalCaloriesBurned || 0}</span>
              </div>
              <div className="summary-item">
                <span className="label">Meals Logged</span>
                <span className="value">{monthlyData?.totalMeals || 0}</span>
              </div>
              <div className="summary-item">
                <span className="label">Avg Water</span>
                <span className="value">{monthlyData?.averageWaterIntake || 0}L</span>
              </div>
              <div className="summary-item">
                <span className="label">Active Days</span>
                <span className="value">{monthlyData?.activeDays || 0}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Feedback Tab */}
      {activeTab === 'feedback' && (
        <div className="feedback-tab">
          <div className="feedback-header">
            <h2>Your Feedback History</h2>
            <button
              className="new-feedback-btn"
              onClick={() => setShowFeedbackForm(true)}
            >
              <FaComment /> Give New Feedback
            </button>
          </div>

          {/* Feedback List */}
          <div className="feedback-list">
            {feedback.length > 0 ? (
              feedback.map((item) => (
                <div key={item._id} className="feedback-item">
                  <div className="feedback-item-header">
                    <div className="routine-info">
                      <h4>{item.routine?.title}</h4>
                      <span className="feedback-date">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="rating">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={i < item.rating ? 'star-filled' : 'star-empty'}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <p className="feedback-comment">"{item.comment}"</p>
                  
                  {item.trainerResponse && (
                    <div className="trainer-response">
                      <div className="response-header">
                        <FaUserTie />
                        <strong>Trainer Response:</strong>
                      </div>
                      <p>{item.trainerResponse.text}</p>
                      {item.trainerResponse.suggestions?.length > 0 && (
                        <div className="suggestions-list">
                          <h5>Suggestions:</h5>
                          <ul>
                            {item.trainerResponse.suggestions.map((s, idx) => (
                              <li key={idx}>{s.text}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="no-feedback">
                <FaComment className="no-feedback-icon" />
                <h3>No feedback yet</h3>
                <p>Share your experience with a routine to get started!</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Suggestions Tab */}
      {activeTab === 'suggestions' && (
        <div className="suggestions-tab">
          <h2>Trainer Suggestions</h2>
          
          <div className="suggestions-list">
            {suggestions.length > 0 ? (
              suggestions.map((suggestion) => (
                <div
                  key={suggestion.id}
                  className={`suggestion-card ${!suggestion.isRead ? 'unread' : ''}`}
                  onClick={() => markSuggestionAsRead(suggestion.id)}
                >
                  <div className="suggestion-header">
                    <div className="trainer-info">
                      <div className="trainer-avatar">
                        {suggestion.trainerName?.charAt(0)}
                      </div>
                      <div>
                        <h4>{suggestion.trainerName}</h4>
                        <span className="routine-name">{suggestion.routineName}</span>
                      </div>
                    </div>
                    <span className="suggestion-date">
                      {new Date(suggestion.date).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="suggestion-content">
                    <div className="user-comment">
                      <strong>Your feedback:</strong>
                      <p>"{suggestion.userComment}"</p>
                    </div>
                    
                    <div className="trainer-response">
                      <FaReply className="reply-icon" />
                      <div>
                        <strong>Trainer's response:</strong>
                        <p>{suggestion.trainerResponse}</p>
                      </div>
                    </div>

                    {suggestion.trainerSuggestions?.length > 0 && (
                      <div className="trainer-suggestions">
                        <strong>Suggestions for improvement:</strong>
                        <ul>
                          {suggestion.trainerSuggestions.map((s, idx) => (
                            <li key={idx}>{s.text}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {!suggestion.isRead && (
                    <div className="unread-indicator">New</div>
                  )}
                </div>
              ))
            ) : (
              <div className="no-suggestions">
                <FaBell className="no-suggestions-icon" />
                <h3>No suggestions yet</h3>
                <p>When trainers respond to your feedback, they'll appear here.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Achievements Tab */}
      {activeTab === 'achievements' && (
        <div className="achievements-tab">
          <h2>Your Achievements</h2>
          
          <div className="achievements-grid">
            {achievements.length > 0 ? (
              achievements.map((achievement, index) => (
                <div key={index} className="achievement-card">
                  <div className="achievement-icon">{achievement.icon}</div>
                  <div className="achievement-info">
                    <h4>{achievement.name}</h4>
                    <p>{achievement.description}</p>
                    {achievement.earned && (
                      <FaCheckCircle className="earned-icon" />
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="no-achievements">
                <FaMedal className="no-achievements-icon" />
                <h3>No achievements yet</h3>
                <p>Keep working out to earn achievements!</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Feedback Form Modal */}
      {showFeedbackForm && (
        <div className="feedback-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Give Feedback</h2>
              <button
                className="close-btn"
                onClick={() => setShowFeedbackForm(false)}
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmitFeedback}>
              <div className="form-group">
                <label>Select Routine *</label>
                <select
                  value={feedbackForm.routineId}
                  onChange={(e) => setFeedbackForm({...feedbackForm, routineId: e.target.value})}
                  required
                >
                  <option value="">Choose a routine</option>
                  {userRoutines.map(routine => (
                    <option key={routine._id} value={routine._id}>
                      {routine.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Rating *</label>
                <div className="rating-input">
                  {[1, 2, 3, 4, 5].map(num => (
                    <FaStar
                      key={num}
                      className={num <= feedbackForm.rating ? 'star-filled' : 'star-empty'}
                      onClick={() => setFeedbackForm({...feedbackForm, rating: num})}
                    />
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>Your Comment *</label>
                <textarea
                  value={feedbackForm.comment}
                  onChange={(e) => setFeedbackForm({...feedbackForm, comment: e.target.value})}
                  placeholder="Share your experience with this routine..."
                  rows="4"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Weeks Completed</label>
                  <input
                    type="number"
                    value={feedbackForm.weeksCompleted}
                    onChange={(e) => setFeedbackForm({...feedbackForm, weeksCompleted: e.target.value})}
                    min="0"
                  />
                </div>

                <div className="form-group">
                  <label>Days Completed</label>
                  <input
                    type="number"
                    value={feedbackForm.daysCompleted}
                    onChange={(e) => setFeedbackForm({...feedbackForm, daysCompleted: e.target.value})}
                    min="0"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Difficulty Level</label>
                <select
                  value={feedbackForm.difficultyLevel}
                  onChange={(e) => setFeedbackForm({...feedbackForm, difficultyLevel: e.target.value})}
                >
                  <option value="Too Easy">Too Easy</option>
                  <option value="Just Right">Just Right</option>
                  <option value="Too Hard">Too Hard</option>
                  <option value="Very Hard">Very Hard</option>
                </select>
              </div>

              <div className="form-group">
                <label>What workouts did you enjoy?</label>
                <input
                  type="text"
                  value={feedbackForm.enjoyedWorkouts}
                  onChange={(e) => setFeedbackForm({...feedbackForm, enjoyedWorkouts: e.target.value})}
                  placeholder="e.g., cardio, strength training"
                />
              </div>

              <div className="form-group">
                <label>What did you struggle with?</label>
                <input
                  type="text"
                  value={feedbackForm.struggledWith}
                  onChange={(e) => setFeedbackForm({...feedbackForm, struggledWith: e.target.value})}
                  placeholder="e.g., certain exercises, timing"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Weight Change (kg)</label>
                  <input
                    type="number"
                    value={feedbackForm.weightChange}
                    onChange={(e) => setFeedbackForm({...feedbackForm, weightChange: e.target.value})}
                    step="0.1"
                  />
                </div>

                <div className="form-group">
                  <label>Energy Level</label>
                  <select
                    value={feedbackForm.energyLevel}
                    onChange={(e) => setFeedbackForm({...feedbackForm, energyLevel: e.target.value})}
                  >
                    <option value="Low">Low</option>
                    <option value="Moderate">Moderate</option>
                    <option value="High">High</option>
                    <option value="Very High">Very High</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Sleep Quality</label>
                  <select
                    value={feedbackForm.sleepQuality}
                    onChange={(e) => setFeedbackForm({...feedbackForm, sleepQuality: e.target.value})}
                  >
                    <option value="Poor">Poor</option>
                    <option value="Fair">Fair</option>
                    <option value="Good">Good</option>
                    <option value="Excellent">Excellent</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Mood</label>
                  <select
                    value={feedbackForm.mood}
                    onChange={(e) => setFeedbackForm({...feedbackForm, mood: e.target.value})}
                  >
                    <option value="Poor">Poor</option>
                    <option value="Fair">Fair</option>
                    <option value="Good">Good</option>
                    <option value="Excellent">Excellent</option>
                  </select>
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="submit-btn">
                  Submit Feedback
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowFeedbackForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProgress;