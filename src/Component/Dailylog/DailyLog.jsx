import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DailyLog.css';
import { 
  FaRunning, 
  FaAppleAlt, 
  FaTint, 
  FaPlus, 
  FaTrash, 
  FaEdit, 
  FaSave, 
  FaTimes,
  FaChartLine,
  FaFire,
  FaHeartbeat,
  FaCalendarAlt,
  FaRegSmile,
  FaDumbbell,
  FaUtensils,
} from 'react-icons/fa';
import { FaGlassWater } from "react-icons/fa6";

const DailyLog = () => {
  const [activeTab, setActiveTab] = useState('workouts');
  const [dailyLog, setDailyLog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState(new Date());

  // Form states
  const [workoutForm, setWorkoutForm] = useState({
    type: 'Cardio',
    duration: '',
    intensity: 'Moderate',
    caloriesBurned: '',
    notes: ''
  });

  const [mealForm, setMealForm] = useState({
    mealType: 'Breakfast',
    foodItems: [{ name: '', quantity: '', calories: '', protein: '', carbs: '', fat: '' }],
    totalCalories: '',
    notes: '',
    time: ''
  });

  const [waterForm, setWaterForm] = useState({
    amount: '250'
  });

  const [dailySummary, setDailySummary] = useState({
    mood: '',
    notes: ''
  });

  const [waterGoal, setWaterGoal] = useState(2); // in liters

  // Fetch today's log
  useEffect(() => {
    fetchDailyLog();
  }, [date]);

  const fetchDailyLog = async () => {
    try {
      const response = await axios.get('http://localhost:1000/api/auth/daily-log', {
        headers: {
          'auth-token': localStorage.getItem('token')
        }
      });
      setDailyLog(response.data);
      setWaterGoal(response.data.waterIntake?.goal || 2);
      setDailySummary({
        mood: response.data.mood || '',
        notes: response.data.notes || ''
      });
    } catch (error) {
      console.error('Error fetching daily log:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle workout submission
  const handleAddWorkout = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:1000/api/auth/add-workout', workoutForm, {
        headers: {
          'auth-token': localStorage.getItem('token'),
          'Content-Type': 'application/json'
        }
      });
      setWorkoutForm({
        type: 'Cardio',
        duration: '',
        intensity: 'Moderate',
        caloriesBurned: '',
        notes: ''
      });
      fetchDailyLog();
    } catch (error) {
      console.error('Error adding workout:', error);
      alert('Failed to add workout');
    }
  };

  // Handle meal submission
  const handleAddMeal = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        ...mealForm,
        foodItems: mealForm.foodItems.filter(item => item.name.trim() !== '')
      };

      await axios.post('http://localhost:1000/api/auth/add-meal', formData, {
        headers: {
          'auth-token': localStorage.getItem('token'),
          'Content-Type': 'application/json'
        }
      });
      
      setMealForm({
        mealType: 'Breakfast',
        foodItems: [{ name: '', quantity: '', calories: '', protein: '', carbs: '', fat: '' }],
        totalCalories: '',
        notes: '',
        time: ''
      });
      fetchDailyLog();
    } catch (error) {
      console.error('Error adding meal:', error);
      alert('Failed to add meal');
    }
  };

  // Handle water intake
  const handleAddWater = async (amount) => {
    try {
      await axios.post('http://localhost:1000/api/auth/add-water', { amount }, {
        headers: {
          'auth-token': localStorage.getItem('token'),
          'Content-Type': 'application/json'
        }
      });
      fetchDailyLog();
    } catch (error) {
      console.error('Error adding water:', error);
      alert('Failed to add water intake');
    }
  };

  // Handle delete actions
  const handleDeleteWorkout = async (id) => {
    if (window.confirm('Delete this workout?')) {
      try {
        await axios.delete(`http://localhost:1000/api/auth/workout/${id}`, {
          headers: {
            'auth-token': localStorage.getItem('token')
          }
        });
        fetchDailyLog();
      } catch (error) {
        console.error('Error deleting workout:', error);
        alert('Failed to delete workout');
      }
    }
  };

  const handleDeleteMeal = async (id) => {
    if (window.confirm('Delete this meal?')) {
      try {
        await axios.delete(`http://localhost:1000/api/auth/meal/${id}`, {
          headers: {
            'auth-token': localStorage.getItem('token')
          }
        });
        fetchDailyLog();
      } catch (error) {
        console.error('Error deleting meal:', error);
        alert('Failed to delete meal');
      }
    }
  };

  // Update water goal
  const handleUpdateWaterGoal = async () => {
    try {
      await axios.put('http://localhost:1000/api/auth/update-water-goal', 
        { goal: waterGoal },
        {
          headers: {
            'auth-token': localStorage.getItem('token'),
            'Content-Type': 'application/json'
          }
        }
      );
      fetchDailyLog();
    } catch (error) {
      console.error('Error updating water goal:', error);
      alert('Failed to update water goal');
    }
  };

  // Update daily summary
  const handleUpdateSummary = async () => {
    try {
      await axios.put('http://localhost:1000/api/auth/update-daily-summary', 
        dailySummary,
        {
          headers: {
            'auth-token': localStorage.getItem('token'),
            'Content-Type': 'application/json'
          }
        }
      );
      fetchDailyLog();
      alert('Daily summary updated!');
    } catch (error) {
      console.error('Error updating summary:', error);
      alert('Failed to update summary');
    }
  };

  // Add food item row
  const addFoodItemRow = () => {
    setMealForm({
      ...mealForm,
      foodItems: [...mealForm.foodItems, { name: '', quantity: '', calories: '', protein: '', carbs: '', fat: '' }]
    });
  };

  // Remove food item row
  const removeFoodItemRow = (index) => {
    const newFoodItems = mealForm.foodItems.filter((_, i) => i !== index);
    setMealForm({ ...mealForm, foodItems: newFoodItems });
  };

  // Update food item
  const updateFoodItem = (index, field, value) => {
    const newFoodItems = [...mealForm.foodItems];
    newFoodItems[index][field] = value;
    setMealForm({ ...mealForm, foodItems: newFoodItems });
  };

  // Calculate totals
  const calculateTotals = () => {
    if (!dailyLog) return { totalCaloriesConsumed: 0, totalCaloriesBurned: 0, netCalories: 0 };

    return {
      totalCaloriesConsumed: dailyLog.totalCalories?.consumed || 0,
      totalCaloriesBurned: dailyLog.totalCalories?.burned || 0,
      netCalories: (dailyLog.totalCalories?.consumed || 0) - (dailyLog.totalCalories?.burned || 0)
    };
  };

  const totals = calculateTotals();

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading your daily log...</p>
      </div>
    );
  }

  return (
    <div className="daily-log-page">
      {/* Header */}
      <div className="daily-log-header">
        <h1>
          <FaCalendarAlt className="header-icon" />
          Daily Log
        </h1>
        <p>Track your workouts, meals, and water intake</p>
        <div className="date-selector">
          <input
            type="date"
            value={date.toISOString().split('T')[0]}
            onChange={(e) => setDate(new Date(e.target.value))}
            className="date-input"
          />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="summary-card calorie-card">
          <FaFire className="card-icon" />
          <div className="card-content">
            <span className="card-value">{totals.netCalories}</span>
            <span className="card-label">Net Calories</span>
          </div>
        </div>

        <div className="summary-card workout-card">
          <FaRunning className="card-icon" />
          <div className="card-content">
            <span className="card-value">{dailyLog?.workouts?.length || 0}</span>
            <span className="card-label">Workouts</span>
          </div>
        </div>

        <div className="summary-card water-card">
          <FaTint className="card-icon" />
          <div className="card-content">
            <span className="card-value">
              {dailyLog?.waterIntake?.consumed?.toFixed(1) || 0}L
            </span>
            <span className="card-label">Water Intake</span>
          </div>
        </div>

        <div className="summary-card meal-card">
          <FaAppleAlt className="card-icon" />
          <div className="card-content">
            <span className="card-value">{dailyLog?.meals?.length || 0}</span>
            <span className="card-label">Meals</span>
          </div>
        </div>
      </div>

      <div className="daily-log-content">
        {/* Left Column - Add Forms */}
        <div className="add-section">
          {/* Tabs */}
          <div className="form-tabs">
            <button
              className={`tab-btn ${activeTab === 'workouts' ? 'active' : ''}`}
              onClick={() => setActiveTab('workouts')}
            >
              <FaRunning /> Add Workout
            </button>
            <button
              className={`tab-btn ${activeTab === 'meals' ? 'active' : ''}`}
              onClick={() => setActiveTab('meals')}
            >
              <FaAppleAlt /> Add Meal
            </button>
            <button
              className={`tab-btn ${activeTab === 'water' ? 'active' : ''}`}
              onClick={() => setActiveTab('water')}
            >
              <FaTint /> Water Intake
            </button>
          </div>

          {/* Workout Form */}
          {activeTab === 'workouts' && (
            <div className="form-card">
              <h3><FaDumbbell /> Add Workout</h3>
              <form onSubmit={handleAddWorkout}>
                <div className="form-group">
                  <label>Workout Type</label>
                  <select
                    value={workoutForm.type}
                    onChange={(e) => setWorkoutForm({...workoutForm, type: e.target.value})}
                  >
                    <option value="Cardio">Cardio</option>
                    <option value="Strength">Strength</option>
                    <option value="Yoga">Yoga</option>
                    <option value="HIIT">HIIT</option>
                    <option value="Running">Running</option>
                    <option value="Cycling">Cycling</option>
                    <option value="Swimming">Swimming</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Duration (minutes)</label>
                    <input
                      type="number"
                      min="1"
                      max="480"
                      value={workoutForm.duration}
                      onChange={(e) => setWorkoutForm({...workoutForm, duration: e.target.value})}
                      placeholder="e.g., 30"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Intensity</label>
                    <select
                      value={workoutForm.intensity}
                      onChange={(e) => setWorkoutForm({...workoutForm, intensity: e.target.value})}
                    >
                      <option value="Low">Low</option>
                      <option value="Moderate">Moderate</option>
                      <option value="High">High</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Calories Burned (optional)</label>
                  <input
                    type="number"
                    min="0"
                    value={workoutForm.caloriesBurned}
                    onChange={(e) => setWorkoutForm({...workoutForm, caloriesBurned: e.target.value})}
                    placeholder="Estimated calories burned"
                  />
                </div>

                <div className="form-group">
                  <label>Notes (optional)</label>
                  <textarea
                    value={workoutForm.notes}
                    onChange={(e) => setWorkoutForm({...workoutForm, notes: e.target.value})}
                    placeholder="How did it feel? Any notes?"
                    rows="3"
                  />
                </div>

                <button type="submit" className="submit-btn">
                  <FaPlus /> Add Workout
                </button>
              </form>
            </div>
          )}

          {/* Meal Form */}
          {activeTab === 'meals' && (
            <div className="form-card">
              <h3><FaUtensils /> Add Meal</h3>
              <form onSubmit={handleAddMeal}>
                <div className="form-group">
                  <label>Meal Type</label>
                  <select
                    value={mealForm.mealType}
                    onChange={(e) => setMealForm({...mealForm, mealType: e.target.value})}
                  >
                    <option value="Breakfast">Breakfast</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Dinner">Dinner</option>
                    <option value="Snack">Snack</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Food Items</label>
                  {mealForm.foodItems.map((item, index) => (
                    <div key={index} className="food-item-row">
                      <div className="food-item-inputs">
                        <input
                          type="text"
                          placeholder="Food name"
                          value={item.name}
                          onChange={(e) => updateFoodItem(index, 'name', e.target.value)}
                          className="food-name"
                        />
                        <input
                          type="text"
                          placeholder="Quantity"
                          value={item.quantity}
                          onChange={(e) => updateFoodItem(index, 'quantity', e.target.value)}
                          className="food-quantity"
                        />
                        <input
                          type="number"
                          placeholder="Calories"
                          value={item.calories}
                          onChange={(e) => updateFoodItem(index, 'calories', e.target.value)}
                          className="food-calories"
                        />
                      </div>
                      {mealForm.foodItems.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeFoodItemRow(index)}
                          className="remove-food-btn"
                        >
                          <FaTimes />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addFoodItemRow}
                    className="add-food-btn"
                  >
                    <FaPlus /> Add Another Food Item
                  </button>
                </div>

                <div className="form-group">
                  <label>Total Calories (optional)</label>
                  <input
                    type="number"
                    min="0"
                    value={mealForm.totalCalories}
                    onChange={(e) => setMealForm({...mealForm, totalCalories: e.target.value})}
                    placeholder="Total calories for this meal"
                  />
                </div>

                <div className="form-group">
                  <label>Time (optional)</label>
                  <input
                    type="time"
                    value={mealForm.time}
                    onChange={(e) => setMealForm({...mealForm, time: e.target.value})}
                  />
                </div>

                <div className="form-group">
                  <label>Notes (optional)</label>
                  <textarea
                    value={mealForm.notes}
                    onChange={(e) => setMealForm({...mealForm, notes: e.target.value})}
                    placeholder="Any notes about this meal?"
                    rows="2"
                  />
                </div>

                <button type="submit" className="submit-btn">
                  <FaPlus /> Add Meal
                </button>
              </form>
            </div>
          )}

          {/* Water Intake */}
          {activeTab === 'water' && (
            <div className="form-card">
              <h3><FaGlassWater /> Water Intake</h3>
              
              <div className="water-goal-section">
                <div className="water-goal-header">
                  <h4>Daily Water Goal</h4>
                  <div className="goal-controls">
                    <input
                      type="number"
                      step="0.1"
                      min="0.5"
                      max="10"
                      value={waterGoal}
                      onChange={(e) => setWaterGoal(parseFloat(e.target.value))}
                      className="goal-input"
                    />
                    <span>L</span>
                    <button
                      onClick={handleUpdateWaterGoal}
                      className="update-goal-btn"
                    >
                      <FaSave /> Update
                    </button>
                  </div>
                </div>
                
                <div className="water-progress">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ 
                        width: `${Math.min((dailyLog?.waterIntake?.consumed || 0) / waterGoal * 100, 100)}%` 
                      }}
                    ></div>
                  </div>
                  <div className="water-stats">
                    <span className="current-water">
                      {dailyLog?.waterIntake?.consumed?.toFixed(1) || 0}L
                    </span>
                    <span className="water-separator">/</span>
                    <span className="goal-water">{waterGoal}L</span>
                  </div>
                </div>
              </div>

              <div className="quick-water-buttons">
                <h4>Quick Add</h4>
                <div className="water-buttons-grid">
                  {[250, 500, 750, 1000].map((amount) => (
                    <button
                      key={amount}
                      onClick={() => handleAddWater(amount)}
                      className="water-amount-btn"
                    >
                      {amount} ml
                    </button>
                  ))}
                </div>
              </div>

              <div className="custom-water-section">
                <h4>Custom Amount</h4>
                <div className="custom-water-input">
                  <input
                    type="number"
                    min="50"
                    max="1000"
                    step="50"
                    value={waterForm.amount}
                    onChange={(e) => setWaterForm({ amount: e.target.value })}
                    placeholder="Amount in ml"
                  />
                  <button
                    onClick={() => handleAddWater(waterForm.amount)}
                    className="custom-add-btn"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Today's Log */}
        <div className="log-section">
          {/* Today's Workouts */}
          <div className="log-card">
            <div className="log-header">
              <h3><FaRunning /> Today's Workouts</h3>
              <span className="log-count">{dailyLog?.workouts?.length || 0}</span>
            </div>
            
            {dailyLog?.workouts?.length > 0 ? (
              <div className="log-items">
                {dailyLog.workouts.map((workout, index) => (
                  <div key={index} className="log-item">
                    <div className="item-header">
                      <div className="item-title">
                        <span className="workout-type">{workout.type}</span>
                        <span className="workout-duration">{workout.duration} min</span>
                      </div>
                      <button
                        onClick={() => handleDeleteWorkout(workout._id)}
                        className="delete-btn"
                      >
                        <FaTrash />
                      </button>
                    </div>
                    <div className="item-details">
                      <span className="detail intensity">Intensity: {workout.intensity}</span>
                      {workout.caloriesBurned > 0 && (
                        <span className="detail calories">{workout.caloriesBurned} cal</span>
                      )}
                    </div>
                    {workout.notes && (
                      <div className="item-notes">{workout.notes}</div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-items">No workouts logged today</p>
            )}
          </div>

          {/* Today's Meals */}
          <div className="log-card">
            <div className="log-header">
              <h3><FaAppleAlt /> Today's Meals</h3>
              <span className="log-count">{dailyLog?.meals?.length || 0}</span>
            </div>
            
            {dailyLog?.meals?.length > 0 ? (
              <div className="log-items">
                {dailyLog.meals.map((meal, index) => (
                  <div key={index} className="log-item meal-item">
                    <div className="item-header">
                      <div className="item-title">
                        <span className="meal-type">{meal.mealType}</span>
                        {meal.time && <span className="meal-time">{meal.time}</span>}
                      </div>
                      <button
                        onClick={() => handleDeleteMeal(meal._id)}
                        className="delete-btn"
                      >
                        <FaTrash />
                      </button>
                    </div>
                    <div className="food-items-list">
                      {meal.foodItems.map((item, idx) => (
                        <div key={idx} className="food-item">
                          <span className="food-name">{item.name}</span>
                          {item.quantity && <span className="food-quantity">{item.quantity}</span>}
                          {item.calories && <span className="food-calories">{item.calories} cal</span>}
                        </div>
                      ))}
                    </div>
                    {meal.totalCalories > 0 && (
                      <div className="meal-total">
                        Total: <strong>{meal.totalCalories} calories</strong>
                      </div>
                    )}
                    {meal.notes && (
                      <div className="item-notes">{meal.notes}</div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-items">No meals logged today</p>
            )}
          </div>

          {/* Daily Summary */}
          <div className="log-card summary-card">
            <h3><FaRegSmile /> Daily Summary</h3>
            
            <div className="summary-form">
              <div className="form-group">
                <label>How was your day?</label>
                <select
                  value={dailySummary.mood}
                  onChange={(e) => setDailySummary({...dailySummary, mood: e.target.value})}
                >
                  <option value="">Select mood</option>
                  <option value="Excellent">Excellent 😊</option>
                  <option value="Good">Good 🙂</option>
                  <option value="Average">Average 😐</option>
                  <option value="Poor">Poor 😕</option>
                  <option value="Terrible">Terrible 😞</option>
                </select>
              </div>

              <div className="form-group">
                <label>Daily Notes</label>
                <textarea
                  value={dailySummary.notes}
                  onChange={(e) => setDailySummary({...dailySummary, notes: e.target.value})}
                  placeholder="How did your day go? Any achievements or challenges?"
                  rows="4"
                />
              </div>

              <button
                onClick={handleUpdateSummary}
                className="save-summary-btn"
              >
                <FaSave /> Save Summary
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyLog;