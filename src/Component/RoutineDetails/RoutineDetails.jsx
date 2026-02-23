import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './RoutineDetails.css';
import {
  FaDumbbell,
  FaCalendarAlt,
  FaClock,
  FaUsers,
  FaStar,
  FaRegStar,
  FaEye,
  FaUserTie,
  FaCheckCircle
} from 'react-icons/fa';

const RoutineDetails = () => {
  const { id } = useParams();
  const [routine, setRoutine] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRoutineDetails();
  }, [id]);

  const fetchRoutineDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:1000/api/auth/public-routine/${id}`);
      setRoutine(response.data);
    } catch (error) {
      console.error('Error fetching routine:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i} className="star-filled" />);
      } else {
        stars.push(<FaRegStar key={i} className="star-empty" />);
      }
    }
    return stars;
  };

  if (loading) {
    return (
      <div className="details-loading">
        <div className="loading-spinner"></div>
        <p>Loading routine details...</p>
      </div>
    );
  }

  if (!routine) {
    return (
      <div className="not-found">
        <h2>Routine not found</h2>
        <Link to="/routines" className="back-btn">Browse Routines</Link>
      </div>
    );
  }

  return (
    <div className="routine-details-page">
      <div className="details-container">
        {/* Header */}
        <div className="details-header">
          <h1>{routine.title}</h1>
          <div className="header-meta">
            <span className="badge category">{routine.category}</span>
            <span className="badge difficulty">{routine.difficulty}</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="details-content">
          {/* Left Column - Info */}
          <div className="info-column">
            <div className="info-card">
              <h3>About this Routine</h3>
              <p className="description">{routine.description}</p>

              <div className="stats-grid">
                <div className="stat-item">
                  <FaCalendarAlt />
                  <div>
                    <span className="stat-label">Duration</span>
                    <span className="stat-value">{routine.duration} weeks</span>
                  </div>
                </div>
                <div className="stat-item">
                  <FaClock />
                  <div>
                    <span className="stat-label">Frequency</span>
                    <span className="stat-value">{routine.frequency} days/week</span>
                  </div>
                </div>
                <div className="stat-item">
                  <FaUsers />
                  <div>
                    <span className="stat-label">Completions</span>
                    <span className="stat-value">{routine.completions || 0}</span>
                  </div>
                </div>
                <div className="stat-item">
                  <FaEye />
                  <div>
                    <span className="stat-label">Views</span>
                    <span className="stat-value">{routine.views || 0}</span>
                  </div>
                </div>
              </div>

              <div className="rating-display">
                <div className="stars-large">
                  {renderStars(routine.averageRating || 0)}
                </div>
                <span className="rating-number">
                  {routine.averageRating?.toFixed(1) || '0.0'} / 5.0
                </span>
              </div>
            </div>

            {/* Equipment Needed */}
            {routine.equipmentRequired?.length > 0 && (
              <div className="info-card">
                <h3>Equipment Needed</h3>
                <div className="equipment-list">
                  {routine.equipmentRequired.map((item, index) => (
                    <span key={index} className="equipment-tag">
                      <FaCheckCircle /> {item}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Goals */}
            {routine.goals?.length > 0 && (
              <div className="info-card">
                <h3>Goals</h3>
                <div className="goals-list">
                  {routine.goals.map((goal, index) => (
                    <span key={index} className="goal-tag">
                      {goal}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Trainer & Workout Days */}
          <div className="workout-column">
            {/* Trainer Info */}
            <div className="trainer-card">
              <h3>Created By</h3>
              <div className="trainer-profile">
                <div className="trainer-avatar-large">
                  {routine.trainer?.firstname?.charAt(0)}
                  {routine.trainer?.lastname?.charAt(0)}
                </div>
                <div className="trainer-info">
                  <h4>{routine.trainer?.firstname} {routine.trainer?.lastname}</h4>
                  <p className="trainer-specialization">
                    {routine.trainer?.trainerProfile?.specialization?.join(', ') || 'Fitness Trainer'}
                  </p>
                </div>
              </div>
            </div>

            {/* Workout Days */}
            <div className="workout-days-card">
              <h3>Workout Schedule</h3>
              {routine.workoutDays?.map((day, index) => (
                <div key={index} className="workout-day">
                  <div className="day-header">
                    <h4>Day {day.dayNumber}: {day.dayName}</h4>
                    <span className="day-focus">{day.focus}</span>
                  </div>
                  
                  {day.exercises?.length > 0 ? (
                    <div className="exercises">
                      {day.exercises.map((exercise, exIndex) => (
                        <div key={exIndex} className="exercise-item">
                          <div className="exercise-name">{exercise.name}</div>
                          <div className="exercise-details">
                            {exercise.sets > 0 && (
                              <span className="detail">{exercise.sets} sets</span>
                            )}
                            {exercise.reps > 0 && (
                              <span className="detail">{exercise.reps} reps</span>
                            )}
                            {exercise.duration > 0 && (
                              <span className="detail">{exercise.duration} min</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="no-exercises">Rest day</p>
                  )}
                  
                  {day.notes && (
                    <p className="day-notes">{day.notes}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="details-cta">
          <h3>Ready to start this routine?</h3>
          <p>Create a free account to track your progress</p>
          <div className="cta-buttons">
            <Link to="/signup" className="cta-btn primary">Sign Up Free</Link>
            <Link to="/login" className="cta-btn secondary">Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoutineDetails;