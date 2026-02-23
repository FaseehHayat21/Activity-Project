import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './FitnessRoutines.css';
import {
  FaDumbbell,
  FaPlus,
  FaEdit,
  FaTrash,
  FaCalendarAlt,
  FaClock,
  FaUsers,
  FaSearch,
  FaStar,
  FaComment,
  FaReply,
  FaUserTie,
  FaRegStar,
  FaBell,
  FaChartLine,
  FaEye,
  FaThLarge,
  FaComments,
  FaSignOutAlt,
  FaBars,
  FaTimes
} from 'react-icons/fa';

const FitnessRoutines = () => {
  // ==================== STATE MANAGEMENT ====================
  const [activeView, setActiveView] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [routines, setRoutines] = useState([]);
  const [filteredRoutines, setFilteredRoutines] = useState([]);
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalRoutines: 0,
    totalFeedback: 0,
    unreadFeedback: 0,
    averageRating: 0,
    totalCompletions: 0,
    totalViews: 0
  });

  // Search and Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    difficulty: '',
    status: 'all'
  });
  const [sortBy, setSortBy] = useState('newest');

  // Form States
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingRoutine, setEditingRoutine] = useState(null);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [selectedRoutineFeedback, setSelectedRoutineFeedback] = useState([]);
  
  // Response Form
  const [responseText, setResponseText] = useState('');
  const [feedbackSuggestions, setFeedbackSuggestions] = useState(['']);

  // New Routine Form
  const [newRoutine, setNewRoutine] = useState({
    title: '',
    description: '',
    category: 'General Fitness',
    difficulty: 'All Levels',
    duration: 4,
    frequency: 3,
    workoutDays: [
      {
        dayNumber: 1,
        dayName: 'Monday',
        focus: 'Full Body',
        exercises: [],
        notes: ''
      }
    ],
    targetAudience: [],
    equipmentRequired: [],
    goals: [],
    tags: [],
    isPublic: false
  });

  // Exercise Form
  const [newExercise, setNewExercise] = useState({
    name: '',
    category: 'Strength',
    duration: 30,
    sets: 3,
    reps: 10,
    restTime: 60
  });

  // ==================== CONSTANTS ====================
  const categoryOptions = [
    'Weight Loss', 'Muscle Building', 'Endurance', 'General Fitness', 
    'Sports Specific', 'Rehabilitation'
  ];

  const difficultyOptions = ['Beginner', 'Intermediate', 'Advanced', 'All Levels'];
  
  const focusOptions = [
    'Full Body', 'Upper Body', 'Lower Body', 'Push', 'Pull', 'Legs', 'Cardio'
  ];

  const exerciseCategories = ['Strength', 'Cardio', 'Flexibility', 'HIIT'];

  const navigate = useNavigate();

  // ==================== INITIALIZATION ====================
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userType = localStorage.getItem('usertype');

    if (!token) {
      navigate('/login');
      return;
    }

    if (userType !== 'trainer') {
      navigate('/customerDashboard');
      return;
    }

    fetchAllData();
  }, []);

  // ==================== DATA FETCHING ====================
  const fetchAllData = async () => {
    setLoading(true);
    try {
      await Promise.all([
        fetchRoutines(),
        fetchAllFeedback(),
        fetchDashboardStats()
      ]);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRoutines = async () => {
    try {
      const response = await axios.get('http://localhost:1000/api/auth/my-routines', {
        headers: { 'auth-token': localStorage.getItem('token') }
      });
      setRoutines(response.data);
      setFilteredRoutines(response.data);
    } catch (error) {
      console.error('Error fetching routines:', error);
    }
  };

  const fetchAllFeedback = async () => {
    try {
      const response = await axios.get('http://localhost:1000/api/auth/trainer/feedback', {
        headers: { 'auth-token': localStorage.getItem('token') }
      });
      setFeedbackList(response.data);
    } catch (error) {
      console.error('Error fetching feedback:', error);
    }
  };

  const fetchDashboardStats = async () => {
    try {
      const routinesRes = await axios.get('http://localhost:1000/api/auth/my-routines', {
        headers: { 'auth-token': localStorage.getItem('token') }
      });
      
      const feedbackRes = await axios.get('http://localhost:1000/api/auth/trainer/feedback', {
        headers: { 'auth-token': localStorage.getItem('token') }
      });

      const routines = routinesRes.data;
      const feedback = feedbackRes.data;

      const totalRoutines = routines.length;
      const totalFeedback = feedback.length;
      const unreadFeedback = feedback.filter(f => !f.isRead).length;
      const totalCompletions = routines.reduce((sum, r) => sum + (r.completions || 0), 0);
      const totalViews = routines.reduce((sum, r) => sum + (r.views || 0), 0);
      
      const avgRating = feedback.length > 0 
        ? (feedback.reduce((sum, f) => sum + f.rating, 0) / feedback.length).toFixed(1)
        : 0;

      setStats({
        totalRoutines,
        totalFeedback,
        unreadFeedback,
        averageRating: avgRating,
        totalCompletions,
        totalViews
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchRoutineFeedback = async (routineId) => {
    try {
      const response = await axios.get(`http://localhost:1000/api/auth/trainer/feedback/routine/${routineId}`, {
        headers: { 'auth-token': localStorage.getItem('token') }
      });
      setSelectedRoutineFeedback(response.data);
    } catch (error) {
      console.error('Error fetching routine feedback:', error);
      setSelectedRoutineFeedback([]);
    }
  };

  // ==================== FILTERS & SORTING ====================
  useEffect(() => {
    filterAndSortRoutines();
  }, [routines, searchTerm, filters, sortBy]);

  const filterAndSortRoutines = () => {
    let filtered = [...routines];

    if (searchTerm) {
      filtered = filtered.filter(routine =>
        routine.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        routine.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filters.category) {
      filtered = filtered.filter(routine => routine.category === filters.category);
    }

    if (filters.difficulty) {
      filtered = filtered.filter(routine => routine.difficulty === filters.difficulty);
    }

    if (filters.status === 'public') {
      filtered = filtered.filter(routine => routine.isPublic);
    } else if (filters.status === 'private') {
      filtered = filtered.filter(routine => !routine.isPublic);
    }

    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case 'most-completions':
        filtered.sort((a, b) => (b.completions || 0) - (a.completions || 0));
        break;
      case 'highest-rated':
        filtered.sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0));
        break;
      case 'most-views':
        filtered.sort((a, b) => (b.views || 0) - (a.views || 0));
        break;
      default:
        break;
    }

    setFilteredRoutines(filtered);
  };

  // ==================== ROUTINE CRUD OPERATIONS ====================
  const handleCreateRoutine = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:1000/api/auth/create-routine',
        newRoutine,
        {
          headers: {
            'auth-token': localStorage.getItem('token'),
            'Content-Type': 'application/json'
          }
        }
      );
      
      alert('Routine created successfully!');
      setShowCreateForm(false);
      resetRoutineForm();
      fetchAllData();
    } catch (error) {
      console.error('Error creating routine:', error);
      alert(error.response?.data?.error || 'Failed to create routine');
    }
  };

  const handleUpdateRoutine = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:1000/api/auth/update-routine/${editingRoutine._id}`,
        editingRoutine,
        {
          headers: {
            'auth-token': localStorage.getItem('token'),
            'Content-Type': 'application/json'
          }
        }
      );
      
      alert('Routine updated successfully!');
      setEditingRoutine(null);
      fetchAllData();
    } catch (error) {
      console.error('Error updating routine:', error);
      alert(error.response?.data?.error || 'Failed to update routine');
    }
  };

  const handleDeleteRoutine = async (id) => {
    if (window.confirm('Are you sure you want to delete this routine? This action cannot be undone.')) {
      try {
        await axios.delete(`http://localhost:1000/api/auth/delete-routine/${id}`, {
          headers: { 'auth-token': localStorage.getItem('token') }
        });
        
        alert('Routine deleted successfully!');
        fetchAllData();
      } catch (error) {
        console.error('Error deleting routine:', error);
        alert(error.response?.data?.error || 'Failed to delete routine');
      }
    }
  };

  // ==================== FEEDBACK OPERATIONS ====================
const handleRespondToFeedback = async (e) => {
  e.preventDefault();
  
  if (!responseText.trim()) {
    alert('Please enter a response');
    return;
  }

  // Format suggestions as simple strings (not objects)
  const validSuggestions = feedbackSuggestions.filter(s => s.trim() !== '');
  
  console.log('Sending suggestions as strings:', validSuggestions); // Debug log

  try {
    const token = localStorage.getItem('token');
    
    await axios.post(
      `http://localhost:1000/api/auth/trainer/feedback/${selectedFeedback._id}/respond`,
      {
        text: responseText,
        suggestions: validSuggestions // Now it's an array of strings
      },
      {
        headers: { 
          'auth-token': token,
          'Content-Type': 'application/json'
        }
      }
    );

    alert('Response sent successfully!');
    setSelectedFeedback(null);
    setResponseText('');
    setFeedbackSuggestions(['']);
    fetchAllFeedback();
    fetchDashboardStats();
    
    if (selectedRoutineFeedback.length > 0) {
      fetchRoutineFeedback(selectedRoutineFeedback[0]?.routine);
    }
  } catch (error) {
    console.error('Error responding to feedback:', error);
    alert('Failed to send response: ' + (error.response?.data?.error || error.message));
  }
};
  const markAsRead = async (feedbackId) => {
    try {
      await axios.put(
        `http://localhost:1000/api/auth/trainer/feedback/${feedbackId}/read`,
        {},
        { headers: { 'auth-token': localStorage.getItem('token') } }
      );
      
      setFeedbackList(prev =>
        prev.map(f => f._id === feedbackId ? { ...f, isRead: true } : f)
      );
      
      if (selectedRoutineFeedback.length > 0) {
        setSelectedRoutineFeedback(prev =>
          prev.map(f => f._id === feedbackId ? { ...f, isRead: true } : f)
        );
      }
      
      fetchDashboardStats();
    } catch (error) {
      console.error('Error marking feedback as read:', error);
    }
  };

  const handleViewRoutineFeedback = async (routine) => {
    await fetchRoutineFeedback(routine._id);
    setShowFeedbackModal(true);
  };

  // ==================== FORM HELPERS ====================
  const resetRoutineForm = () => {
    setNewRoutine({
      title: '',
      description: '',
      category: 'General Fitness',
      difficulty: 'All Levels',
      duration: 4,
      frequency: 3,
      workoutDays: [
        {
          dayNumber: 1,
          dayName: 'Monday',
          focus: 'Full Body',
          exercises: [],
          notes: ''
        }
      ],
      targetAudience: [],
      equipmentRequired: [],
      goals: [],
      tags: [],
      isPublic: false
    });
  };

  const addExerciseToDay = (dayIndex) => {
    if (!newExercise.name) {
      alert('Please enter exercise name');
      return;
    }

    const updatedRoutine = editingRoutine || newRoutine;
    const updatedWorkoutDays = [...updatedRoutine.workoutDays];
    updatedWorkoutDays[dayIndex].exercises.push({ ...newExercise });

    if (editingRoutine) {
      setEditingRoutine({ ...editingRoutine, workoutDays: updatedWorkoutDays });
    } else {
      setNewRoutine({ ...newRoutine, workoutDays: updatedWorkoutDays });
    }

    setNewExercise({
      name: '',
      category: 'Strength',
      duration: 30,
      sets: 3,
      reps: 10,
      restTime: 60
    });
  };

  const removeExerciseFromDay = (dayIndex, exerciseIndex) => {
    const updatedRoutine = editingRoutine || newRoutine;
    const updatedWorkoutDays = [...updatedRoutine.workoutDays];
    updatedWorkoutDays[dayIndex].exercises = updatedWorkoutDays[dayIndex].exercises.filter(
      (_, i) => i !== exerciseIndex
    );

    if (editingRoutine) {
      setEditingRoutine({ ...editingRoutine, workoutDays: updatedWorkoutDays });
    } else {
      setNewRoutine({ ...newRoutine, workoutDays: updatedWorkoutDays });
    }
  };

  const addWorkoutDay = () => {
    const updatedRoutine = editingRoutine || newRoutine;
    const currentDays = updatedRoutine.workoutDays.length;
    const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    const newDay = {
      dayNumber: currentDays + 1,
      dayName: dayNames[currentDays % 7],
      focus: 'Full Body',
      exercises: [],
      notes: ''
    };

    if (editingRoutine) {
      setEditingRoutine({
        ...editingRoutine,
        workoutDays: [...editingRoutine.workoutDays, newDay]
      });
    } else {
      setNewRoutine({
        ...newRoutine,
        workoutDays: [...newRoutine.workoutDays, newDay]
      });
    }
  };

  const removeWorkoutDay = (dayIndex) => {
    const updatedRoutine = editingRoutine || newRoutine;
    const updatedWorkoutDays = updatedRoutine.workoutDays.filter((_, i) => i !== dayIndex);

    updatedWorkoutDays.forEach((day, index) => {
      day.dayNumber = index + 1;
    });

    if (editingRoutine) {
      setEditingRoutine({ ...editingRoutine, workoutDays: updatedWorkoutDays });
    } else {
      setNewRoutine({ ...newRoutine, workoutDays: updatedWorkoutDays });
    }
  };

  const addSuggestionField = () => {
    setFeedbackSuggestions([...feedbackSuggestions, '']);
  };

  const updateSuggestion = (index, value) => {
    const newSuggestions = [...feedbackSuggestions];
    newSuggestions[index] = value;
    setFeedbackSuggestions(newSuggestions);
  };

  const removeSuggestion = (index) => {
    if (feedbackSuggestions.length > 1) {
      setFeedbackSuggestions(feedbackSuggestions.filter((_, i) => i !== index));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usertype');
    localStorage.removeItem('userid');
    navigate('/login');
  };

  // ==================== RENDER HELPERS ====================
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i} className="td-star-filled" />);
      } else {
        stars.push(<FaRegStar key={i} className="td-star-empty" />);
      }
    }
    return stars;
  };

  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`;
  };

  // ==================== LOADING STATE ====================
  if (loading) {
    return (
      <div className="td-loading-container">
        <div className="td-loading-spinner"></div>
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  // ==================== MAIN RENDER ====================
  return (
    <div className="td-dashboard-container">
      {/* Sidebar */}
      <aside className={`td-sidebar ${sidebarOpen ? 'td-sidebar-open' : ''}`}>
        <div className="td-sidebar-header">
          <div className="td-logo">
            <FaDumbbell className="td-logo-icon" />
            <span className="td-logo-text">FIT<span className="td-logo-accent">TRACK</span></span>
          </div>
          <button className="td-sidebar-close" onClick={() => setSidebarOpen(false)}>
            <FaTimes />
          </button>
        </div>

        <div className="td-trainer-profile">
          <div className="td-trainer-avatar">
            {localStorage.getItem('usertype')?.charAt(0).toUpperCase()}
          </div>
          <div className="td-trainer-info">
            <h4>Trainer Dashboard</h4>
            <p>Manage your fitness content</p>
          </div>
        </div>

        <nav className="td-sidebar-nav">
          <button
            className={`td-nav-item ${activeView === 'dashboard' ? 'td-active' : ''}`}
            onClick={() => {
              setActiveView('dashboard');
              setSidebarOpen(false);
            }}
          >
            <FaThLarge /> Dashboard
          </button>
          <button
            className={`td-nav-item ${activeView === 'routines' ? 'td-active' : ''}`}
            onClick={() => {
              setActiveView('routines');
              setSidebarOpen(false);
            }}
          >
            <FaDumbbell /> My Routines
            <span className="td-nav-badge">{stats.totalRoutines}</span>
          </button>
          <button
            className={`td-nav-item ${activeView === 'feedback' ? 'td-active' : ''}`}
            onClick={() => {
              setActiveView('feedback');
              setSidebarOpen(false);
              fetchAllFeedback();
            }}
          >
            <FaComments /> Feedback
            {stats.unreadFeedback > 0 && (
              <span className="td-nav-badge td-badge-danger">{stats.unreadFeedback}</span>
            )}
          </button>
          <button className="td-nav-item td-logout" onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </button>
        </nav>

        <div className="td-sidebar-footer">
          <div className="td-mini-stats">
            <div className="td-mini-stat">
              <span className="td-mini-value">{stats.totalRoutines}</span>
              <span className="td-mini-label">Routines</span>
            </div>
            <div className="td-mini-stat">
              <span className="td-mini-value">{stats.totalCompletions}</span>
              <span className="td-mini-label">Completions</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`td-main-content ${sidebarOpen ? 'td-sidebar-shifted' : ''}`}>
        {/* Top Bar */}
        <header className="td-top-bar">
          <button className="td-menu-toggle" onClick={() => setSidebarOpen(true)}>
            <FaBars />
          </button>
          <h1 className="td-page-title">
            {activeView === 'dashboard' && 'Dashboard Overview'}
            {activeView === 'routines' && 'My Fitness Routines'}
            {activeView === 'feedback' && 'User Feedback'}
          </h1>
          <div className="td-top-bar-actions">
            {activeView === 'routines' && (
              <button
                className="td-create-btn"
                onClick={() => setShowCreateForm(true)}
              >
                <FaPlus /> New Routine
              </button>
            )}
          </div>
        </header>

        {/* DASHBOARD VIEW */}
        {activeView === 'dashboard' && (
          <div className="td-dashboard-view">
            {/* Stats Grid */}
            <div className="td-stats-grid">
              <div className="td-stat-card">
                <div className="td-stat-icon td-blue">
                  <FaDumbbell />
                </div>
                <div className="td-stat-content">
                  <span className="td-stat-value">{stats.totalRoutines}</span>
                  <span className="td-stat-label">Total Routines</span>
                </div>
              </div>

              <div className="td-stat-card">
                <div className="td-stat-icon td-green">
                  <FaUsers />
                </div>
                <div className="td-stat-content">
                  <span className="td-stat-value">{stats.totalCompletions}</span>
                  <span className="td-stat-label">Completions</span>
                </div>
              </div>

              <div className="td-stat-card">
                <div className="td-stat-icon td-orange">
                  <FaEye />
                </div>
                <div className="td-stat-content">
                  <span className="td-stat-value">{stats.totalViews}</span>
                  <span className="td-stat-label">Total Views</span>
                </div>
              </div>

              <div className="td-stat-card">
                <div className="td-stat-icon td-purple">
                  <FaStar />
                </div>
                <div className="td-stat-content">
                  <span className="td-stat-value">{stats.averageRating}</span>
                  <span className="td-stat-label">Avg Rating</span>
                </div>
              </div>

              <div className="td-stat-card">
                <div className="td-stat-icon td-red">
                  <FaComment />
                </div>
                <div className="td-stat-content">
                  <span className="td-stat-value">{stats.totalFeedback}</span>
                  <span className="td-stat-label">Feedback</span>
                </div>
              </div>

              <div className="td-stat-card">
                <div className="td-stat-icon td-yellow">
                  <FaBell />
                </div>
                <div className="td-stat-content">
                  <span className="td-stat-value">{stats.unreadFeedback}</span>
                  <span className="td-stat-label">Unread</span>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="td-recent-section">
              <h2>Recent Feedback</h2>
              <div className="td-recent-feedback">
                {feedbackList.slice(0, 5).map(feedback => (
                  <div key={feedback._id} className={`td-recent-item ${!feedback.isRead ? 'td-unread' : ''}`}>
                    <div className="td-recent-user">
                      <div className="td-recent-avatar">
                        {getInitials(feedback.user?.firstname, feedback.user?.lastname)}
                      </div>
                      <div className="td-recent-info">
                        <h4>{feedback.user?.firstname} {feedback.user?.lastname}</h4>
                        <p>{feedback.routine?.title}</p>
                      </div>
                    </div>
                    <div className="td-recent-rating">
                      {renderStars(feedback.rating)}
                    </div>
                    <p className="td-recent-comment">"{feedback.comment.substring(0, 60)}..."</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ROUTINES VIEW */}
        {activeView === 'routines' && (
          <div className="td-routines-view">
            {/* Filters Bar */}
            <div className="td-filters-bar">
              <div className="td-search-box">
                <FaSearch className="td-search-icon" />
                <input
                  type="text"
                  placeholder="Search routines..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="td-search-input"
                />
              </div>

              <div className="td-filter-group">
                <select
                  value={filters.category}
                  onChange={(e) => setFilters({...filters, category: e.target.value})}
                  className="td-filter-select"
                >
                  <option value="">All Categories</option>
                  {categoryOptions.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>

                <select
                  value={filters.difficulty}
                  onChange={(e) => setFilters({...filters, difficulty: e.target.value})}
                  className="td-filter-select"
                >
                  <option value="">All Levels</option>
                  {difficultyOptions.map(diff => (
                    <option key={diff} value={diff}>{diff}</option>
                  ))}
                </select>

                <select
                  value={filters.status}
                  onChange={(e) => setFilters({...filters, status: e.target.value})}
                  className="td-filter-select"
                >
                  <option value="all">All Routines</option>
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="td-filter-select"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="most-completions">Most Completions</option>
                  <option value="highest-rated">Highest Rated</option>
                  <option value="most-views">Most Views</option>
                </select>
              </div>
            </div>

            {/* Routines Grid */}
            <div className="td-routines-grid">
              {filteredRoutines.length > 0 ? (
                filteredRoutines.map(routine => (
                  <div key={routine._id} className="td-routine-card">
                    <div className="td-routine-header">
                      <h3>{routine.title}</h3>
                      <div className="td-routine-badges">
                        <span className="td-badge td-category">{routine.category}</span>
                        <span className="td-badge td-difficulty">{routine.difficulty}</span>
                        {!routine.isPublic && (
                          <span className="td-badge td-private">Private</span>
                        )}
                      </div>
                    </div>

                    <p className="td-routine-description">{routine.description}</p>

                    <div className="td-routine-stats">
                      <div className="td-stat-item">
                        <FaCalendarAlt /> {routine.duration} weeks
                      </div>
                      <div className="td-stat-item">
                        <FaClock /> {routine.frequency}/week
                      </div>
                      <div className="td-stat-item">
                        <FaUsers /> {routine.completions || 0}
                      </div>
                      <div className="td-stat-item">
                        <FaEye /> {routine.views || 0}
                      </div>
                    </div>

                    <div className="td-routine-footer">
                      <div className="td-rating">
                        {renderStars(routine.averageRating || 0)}
                        <span>({routine.averageRating?.toFixed(1) || '0.0'})</span>
                      </div>
                      <div className="td-routine-actions">
                        <button
                          onClick={() => handleViewRoutineFeedback(routine)}
                          className="td-action-btn td-feedback-btn"
                          title="View Feedback"
                        >
                          <FaComment />
                        </button>
                        <button
                          onClick={() => setEditingRoutine(routine)}
                          className="td-action-btn td-edit-btn"
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDeleteRoutine(routine._id)}
                          className="td-action-btn td-delete-btn"
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="td-empty-state">
                  <FaDumbbell className="td-empty-icon" />
                  <h3>No routines found</h3>
                  <p>Create your first routine to get started</p>
                  <button
                    onClick={() => setShowCreateForm(true)}
                    className="td-create-first-btn"
                  >
                    <FaPlus /> Create Routine
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* FEEDBACK VIEW - WITH VISIBLE RESPOND BUTTON */}
        {activeView === 'feedback' && (
          <div className="td-feedback-view">
            <div className="td-feedback-stats">
              <div className="td-feedback-stat">
                <span className="td-stat-number">{stats.totalFeedback}</span>
                <span className="td-stat-label">Total Feedback</span>
              </div>
              <div className="td-feedback-stat">
                <span className="td-stat-number">{stats.unreadFeedback}</span>
                <span className="td-stat-label">Unread</span>
              </div>
              <div className="td-feedback-stat">
                <span className="td-stat-number">{stats.averageRating}</span>
                <span className="td-stat-label">Avg Rating</span>
              </div>
            </div>

            <div className="td-feedback-grid">
              {feedbackList.length > 0 ? (
                feedbackList.map(feedback => (
                  <div key={feedback._id} className={`td-feedback-card ${!feedback.isRead ? 'td-feedback-unread' : ''}`}>
                    <div className="td-feedback-header">
                      <div className="td-feedback-user">
                        <div className="td-user-avatar">
                          {getInitials(feedback.user?.firstname, feedback.user?.lastname)}
                        </div>
                        <div className="td-user-info">
                          <h4>{feedback.user?.firstname} {feedback.user?.lastname}</h4>
                          <p className="td-routine-title">{feedback.routine?.title}</p>
                        </div>
                      </div>
                      <span className="td-feedback-date">
                        {new Date(feedback.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="td-feedback-rating">
                      {renderStars(feedback.rating)}
                    </div>

                    <p className="td-feedback-comment">"{feedback.comment}"</p>

                    {feedback.difficultyLevel && (
                      <div className="td-feedback-tags">
                        <span className="td-tag">Difficulty: {feedback.difficultyLevel}</span>
                        {feedback.weeksCompleted > 0 && (
                          <span className="td-tag">{feedback.weeksCompleted} weeks completed</span>
                        )}
                      </div>
                    )}

                    {feedback.trainerResponse && feedback.trainerResponse.text ? (
                      <div className="td-existing-response">
                        <div className="td-response-header">
                          <FaUserTie />
                          <strong>Your Response</strong>
                        </div>
                        <p>{feedback.trainerResponse.text}</p>
                        {feedback.trainerResponse.suggestions?.length > 0 && (
                          <div className="td-suggestions-list">
                            <h5>Suggestions:</h5>
                            <ul>
                              {feedback.trainerResponse.suggestions.map((s, idx) => (
                                <li key={idx}>{s.text}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ) : (
                      /* VISIBLE RESPOND BUTTON - This is what you asked for */
                      <div className="td-respond-button-container">
                        <button
                          className="td-respond-btn"
                          onClick={() => {
                            console.log('🔵 Respond button clicked for feedback:', feedback._id);
                            setSelectedFeedback(feedback);
                            markAsRead(feedback._id);
                          }}
                        >
                          <FaReply /> Respond to this Feedback
                        </button>
                      </div>
                    )}

                    {!feedback.isRead && !feedback.trainerResponse && (
                      <span className="td-unread-badge">New</span>
                    )}
                  </div>
                ))
              ) : (
                <div className="td-empty-state">
                  <FaComment className="td-empty-icon" />
                  <h3>No feedback yet</h3>
                  <p>When users give feedback on your routines, they'll appear here</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* ==================== MODALS ==================== */}

      {/* Create/Edit Routine Modal */}
      {(showCreateForm || editingRoutine) && (
        <div className="td-modal-overlay" onClick={() => {
          setShowCreateForm(false);
          setEditingRoutine(null);
          resetRoutineForm();
        }}>
          <div className="td-modal td-large-modal" onClick={e => e.stopPropagation()}>
            <div className="td-modal-header">
              <h2>{editingRoutine ? 'Edit Routine' : 'Create New Routine'}</h2>
              <button
                className="td-modal-close"
                onClick={() => {
                  setShowCreateForm(false);
                  setEditingRoutine(null);
                  resetRoutineForm();
                }}
              >
                &times;
              </button>
            </div>

            <form onSubmit={editingRoutine ? handleUpdateRoutine : handleCreateRoutine}>
              <div className="td-modal-body">
                {/* Basic Info Section */}
                <div className="td-form-section">
                  <h3>Basic Information</h3>
                  
                  <div className="td-form-group">
                    <label>Title *</label>
                    <input
                      type="text"
                      value={editingRoutine ? editingRoutine.title : newRoutine.title}
                      onChange={(e) => editingRoutine
                        ? setEditingRoutine({...editingRoutine, title: e.target.value})
                        : setNewRoutine({...newRoutine, title: e.target.value})
                      }
                      placeholder="e.g., 4-Week Fat Loss Program"
                      required
                    />
                  </div>

                  <div className="td-form-row">
                    <div className="td-form-group">
                      <label>Category *</label>
                      <select
                        value={editingRoutine ? editingRoutine.category : newRoutine.category}
                        onChange={(e) => editingRoutine
                          ? setEditingRoutine({...editingRoutine, category: e.target.value})
                          : setNewRoutine({...newRoutine, category: e.target.value})
                        }
                        required
                      >
                        {categoryOptions.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>

                    <div className="td-form-group">
                      <label>Difficulty</label>
                      <select
                        value={editingRoutine ? editingRoutine.difficulty : newRoutine.difficulty}
                        onChange={(e) => editingRoutine
                          ? setEditingRoutine({...editingRoutine, difficulty: e.target.value})
                          : setNewRoutine({...newRoutine, difficulty: e.target.value})
                        }
                      >
                        {difficultyOptions.map(diff => (
                          <option key={diff} value={diff}>{diff}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="td-form-row">
                    <div className="td-form-group">
                      <label>Duration (weeks) *</label>
                      <input
                        type="number"
                        min="1"
                        max="52"
                        value={editingRoutine ? editingRoutine.duration : newRoutine.duration}
                        onChange={(e) => editingRoutine
                          ? setEditingRoutine({...editingRoutine, duration: e.target.value})
                          : setNewRoutine({...newRoutine, duration: e.target.value})
                        }
                        required
                      />
                    </div>

                    <div className="td-form-group">
                      <label>Days per week *</label>
                      <input
                        type="number"
                        min="1"
                        max="7"
                        value={editingRoutine ? editingRoutine.frequency : newRoutine.frequency}
                        onChange={(e) => editingRoutine
                          ? setEditingRoutine({...editingRoutine, frequency: e.target.value})
                          : setNewRoutine({...newRoutine, frequency: e.target.value})
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="td-form-group">
                    <label>Description *</label>
                    <textarea
                      value={editingRoutine ? editingRoutine.description : newRoutine.description}
                      onChange={(e) => editingRoutine
                        ? setEditingRoutine({...editingRoutine, description: e.target.value})
                        : setNewRoutine({...newRoutine, description: e.target.value})
                      }
                      placeholder="Describe the routine and its benefits..."
                      rows="3"
                      required
                    />
                  </div>

                  <div className="td-checkbox-group">
                    <label className="td-checkbox-label">
                      <input
                        type="checkbox"
                        checked={editingRoutine ? editingRoutine.isPublic : newRoutine.isPublic}
                        onChange={(e) => editingRoutine
                          ? setEditingRoutine({...editingRoutine, isPublic: e.target.checked})
                          : setNewRoutine({...newRoutine, isPublic: e.target.checked})
                        }
                      />
                      <span>Make this routine public (visible to all users)</span>
                    </label>
                  </div>
                </div>

                {/* Workout Days Section */}
                <div className="td-form-section">
                  <h3>Workout Days</h3>
                  
                  {(editingRoutine ? editingRoutine.workoutDays : newRoutine.workoutDays).map((day, dayIndex) => (
                    <div key={dayIndex} className="td-workout-day-card">
                      <div className="td-day-header">
                        <h4>Day {day.dayNumber}: {day.dayName}</h4>
                        {(editingRoutine ? editingRoutine.workoutDays : newRoutine.workoutDays).length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeWorkoutDay(dayIndex)}
                            className="td-remove-day-btn"
                          >
                            <FaTrash />
                          </button>
                        )}
                      </div>

                      <div className="td-day-focus">
                        <select
                          value={day.focus}
                          onChange={(e) => {
                            const updated = editingRoutine || newRoutine;
                            const days = [...updated.workoutDays];
                            days[dayIndex].focus = e.target.value;
                            
                            editingRoutine
                              ? setEditingRoutine({...editingRoutine, workoutDays: days})
                              : setNewRoutine({...newRoutine, workoutDays: days});
                          }}
                        >
                          {focusOptions.map(focus => (
                            <option key={focus} value={focus}>{focus}</option>
                          ))}
                        </select>
                      </div>

                      {/* Add Exercise */}
                      <div className="td-add-exercise">
                        <h5>Add Exercise</h5>
                        <div className="td-exercise-form">
                          <input
                            type="text"
                            placeholder="Exercise name"
                            value={newExercise.name}
                            onChange={(e) => setNewExercise({...newExercise, name: e.target.value})}
                          />
                          <select
                            value={newExercise.category}
                            onChange={(e) => setNewExercise({...newExercise, category: e.target.value})}
                          >
                            {exerciseCategories.map(cat => (
                              <option key={cat} value={cat}>{cat}</option>
                            ))}
                          </select>
                          <div className="td-exercise-details-inputs">
                            <input
                              type="number"
                              placeholder="Sets"
                              value={newExercise.sets}
                              onChange={(e) => setNewExercise({...newExercise, sets: e.target.value})}
                            />
                            <input
                              type="number"
                              placeholder="Reps"
                              value={newExercise.reps}
                              onChange={(e) => setNewExercise({...newExercise, reps: e.target.value})}
                            />
                            <input
                              type="number"
                              placeholder="Duration (min)"
                              value={newExercise.duration}
                              onChange={(e) => setNewExercise({...newExercise, duration: e.target.value})}
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => addExerciseToDay(dayIndex)}
                            className="td-add-exercise-btn"
                            disabled={!newExercise.name}
                          >
                            <FaPlus /> Add Exercise
                          </button>
                        </div>
                      </div>

                      {/* Exercises List */}
                      {day.exercises.length > 0 && (
                        <div className="td-exercises-list">
                          <h5>Exercises</h5>
                          {day.exercises.map((exercise, exIndex) => (
                            <div key={exIndex} className="td-exercise-item">
                              <div className="td-exercise-info">
                                <strong>{exercise.name}</strong>
                                <span>{exercise.category}</span>
                                {exercise.sets > 0 && <span>{exercise.sets} sets</span>}
                                {exercise.reps > 0 && <span>{exercise.reps} reps</span>}
                                {exercise.duration > 0 && <span>{exercise.duration} min</span>}
                              </div>
                              <button
                                type="button"
                                onClick={() => removeExerciseFromDay(dayIndex, exIndex)}
                                className="td-remove-exercise-btn"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="td-form-group">
                        <label>Day Notes</label>
                        <textarea
                          value={day.notes}
                          onChange={(e) => {
                            const updated = editingRoutine || newRoutine;
                            const days = [...updated.workoutDays];
                            days[dayIndex].notes = e.target.value;
                            
                            editingRoutine
                              ? setEditingRoutine({...editingRoutine, workoutDays: days})
                              : setNewRoutine({...newRoutine, workoutDays: days});
                          }}
                          placeholder="Notes for this day..."
                          rows="2"
                        />
                      </div>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={addWorkoutDay}
                    className="td-add-day-btn"
                  >
                    <FaPlus /> Add Workout Day
                  </button>
                </div>
              </div>

              <div className="td-modal-footer">
                <button type="submit" className="td-save-btn">
                  {editingRoutine ? 'Update Routine' : 'Create Routine'}
                </button>
                <button
                  type="button"
                  className="td-cancel-btn"
                  onClick={() => {
                    setShowCreateForm(false);
                    setEditingRoutine(null);
                    resetRoutineForm();
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Routine Feedback Modal */}
      {showFeedbackModal && (
        <div className="td-modal-overlay" onClick={() => setShowFeedbackModal(false)}>
          <div className="td-modal td-medium-modal" onClick={e => e.stopPropagation()}>
            <div className="td-modal-header">
              <h2>Routine Feedback</h2>
              <button
                className="td-modal-close"
                onClick={() => setShowFeedbackModal(false)}
              >
                &times;
              </button>
            </div>

            <div className="td-modal-body">
              {selectedRoutineFeedback.length > 0 ? (
                selectedRoutineFeedback.map(feedback => (
                  <div key={feedback._id} className="td-feedback-detail-item">
                    <div className="td-feedback-detail-header">
                      <div>
                        <strong>{feedback.user?.firstname} {feedback.user?.lastname}</strong>
                        <span className="td-feedback-date">
                          {new Date(feedback.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="td-rating">
                        {renderStars(feedback.rating)}
                      </div>
                    </div>
                    
                    <p className="td-feedback-detail-text">"{feedback.comment}"</p>

                    {feedback.difficultyLevel && (
                      <div className="td-feedback-detail-tags">
                        <span className="td-tag">Difficulty: {feedback.difficultyLevel}</span>
                        {feedback.weeksCompleted > 0 && (
                          <span className="td-tag">{feedback.weeksCompleted} weeks</span>
                        )}
                      </div>
                    )}

                    {feedback.trainerResponse ? (
                      <div className="td-detail-response">
                        <p><strong>Your response:</strong> {feedback.trainerResponse.text}</p>
                      </div>
                    ) : (
                      <button
                        className="td-detail-respond-btn"
                        onClick={() => {
                          setSelectedFeedback(feedback);
                          setShowFeedbackModal(false);
                        }}
                      >
                        <FaReply /> Respond
                      </button>
                    )}
                  </div>
                ))
              ) : (
                <p className="td-no-data">No feedback for this routine yet</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Response Modal */}
      {selectedFeedback && (
        <div className="td-modal-overlay" onClick={() => setSelectedFeedback(null)}>
          <div className="td-modal td-medium-modal" onClick={e => e.stopPropagation()}>
            <div className="td-modal-header">
              <h2>Respond to Feedback</h2>
              <button
                className="td-modal-close"
                onClick={() => setSelectedFeedback(null)}
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleRespondToFeedback}>
              <div className="td-modal-body">
                <div className="td-original-feedback">
                  <div className="td-user-info">
                    <div className="td-user-avatar-large">
                      {getInitials(selectedFeedback.user?.firstname, selectedFeedback.user?.lastname)}
                    </div>
                    <div>
                      <h4>{selectedFeedback.user?.firstname} {selectedFeedback.user?.lastname}</h4>
                      <p>on {selectedFeedback.routine?.title}</p>
                    </div>
                  </div>
                  <div className="td-rating">
                    {renderStars(selectedFeedback.rating)}
                  </div>
                  <p className="td-feedback-quote">"{selectedFeedback.comment}"</p>
                </div>

                <div className="td-form-group">
                  <label>Your Response *</label>
                  <textarea
                    value={responseText}
                    onChange={(e) => setResponseText(e.target.value)}
                    placeholder="Write your response to this feedback..."
                    rows="4"
                    required
                    autoFocus
                  />
                </div>

                <div className="td-form-group">
                  <label>Suggestions (optional)</label>
                  {feedbackSuggestions.map((suggestion, index) => (
                    <div key={index} className="td-suggestion-input-group">
                      <input
                        type="text"
                        value={suggestion}
                        onChange={(e) => updateSuggestion(index, e.target.value)}
                        placeholder={`Suggestion ${index + 1}`}
                      />
                      {feedbackSuggestions.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeSuggestion(index)}
                          className="td-remove-suggestion-btn"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addSuggestionField}
                    className="td-add-suggestion-btn"
                  >
                    + Add Another Suggestion
                  </button>
                </div>
              </div>

              <div className="td-modal-footer">
                <button type="submit" className="td-save-btn">
                  Send Response
                </button>
                <button
                  type="button"
                  className="td-cancel-btn"
                  onClick={() => setSelectedFeedback(null)}
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

export default FitnessRoutines;