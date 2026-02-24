import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';
import {
  FaUsers,
  FaUserTie,
  FaDumbbell,
  FaComment,
  FaChartLine,
  FaCalendarAlt,
  FaTrash,
  FaEdit,
  FaEye,
  FaSearch,
  FaFilter,
  FaUserCircle,
  FaStar,
  FaRegStar,
  FaCheckCircle,
  FaTimesCircle,
  FaBan,
  FaCheck,
  FaPlus,
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaThLarge,
  FaCog,
  FaBell,
  FaExclamationTriangle,
  FaSync,
  FaDownload,
  FaPrint,
  FaHome,
  FaClipboardList,
  FaUserGraduate
} from 'react-icons/fa';

const AdminDashboard = () => {
  // ==================== STATE MANAGEMENT ====================
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState('dashboard'); // dashboard, users, trainers, routines, feedback, analytics
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState(null);
  
  // Data states
  const [stats, setStats] = useState({
    totalCustomers: 0,
    totalTrainers: 0,
    totalRoutines: 0,
    totalFeedback: 0,
    totalDailyLogs: 0
  });
  
  const [recentData, setRecentData] = useState({
    users: [],
    routines: [],
    feedback: []
  });

  const [customers, setCustomers] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [routines, setRoutines] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRoutine, setSelectedRoutine] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [routineDetails, setRoutineDetails] = useState(null);

  // Pagination
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  });

  // Search and filters
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    difficulty: '',
    status: 'all'
  });
  const [sortBy, setSortBy] = useState('newest');

  // Modal states
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showUserDetailsModal, setShowUserDetailsModal] = useState(false);
  const [showRoutineDetailsModal, setShowRoutineDetailsModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalType, setModalType] = useState(''); // 'customer', 'trainer', 'routine', 'feedback'

  // Edit form state
  const [editForm, setEditForm] = useState({});

  const navigate = useNavigate();

  // ==================== INITIALIZATION ====================
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userType = localStorage.getItem('usertype');
    const adminInfo = localStorage.getItem('adminInfo');

    if (!token) {
      navigate('/admin/login');
      return;
    }

    if (userType !== 'admin') {
      navigate('/');
      return;
    }

    if (adminInfo) {
      setAdmin(JSON.parse(adminInfo));
    }

    fetchDashboardData();
  }, []);

  // Fetch data based on active view
  useEffect(() => {
    if (activeView === 'users') {
      fetchCustomers();
    } else if (activeView === 'trainers') {
      fetchTrainers();
    } else if (activeView === 'routines') {
      fetchRoutines();
    } else if (activeView === 'feedback') {
      fetchAllFeedback();
    } else if (activeView === 'analytics') {
      fetchAnalytics();
    }
  }, [activeView, pagination.page, searchTerm, filters, sortBy]);

  // ==================== DATA FETCHING ====================
  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      
      const response = await axios.get('http://localhost:1000/api/admin/admin/dashboard/stats', {
        headers: { 'auth-token': token }
      });

      setStats(response.data.stats);
      setRecentData(response.data.recent);
    } catch (error) {
      console.error('Error fetching admin data:', error);
      if (error.response?.status === 403) {
        navigate('/admin/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchCustomers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `http://localhost:1000/api/admin/admin/customers?page=${pagination.page}&limit=${pagination.limit}&search=${searchTerm}`,
        { headers: { 'auth-token': token } }
      );

      setCustomers(response.data.customers);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const fetchTrainers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `http://localhost:1000/api/admin/admin/trainers?page=${pagination.page}&limit=${pagination.limit}&search=${searchTerm}`,
        { headers: { 'auth-token': token } }
      );

      setTrainers(response.data.trainers);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error('Error fetching trainers:', error);
    }
  };

  const fetchRoutines = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `http://localhost:1000/api/admin/admin/routines?page=${pagination.page}&limit=${pagination.limit}&search=${searchTerm}&category=${filters.category}&difficulty=${filters.difficulty}`,
        { headers: { 'auth-token': token } }
      );

      setRoutines(response.data.routines);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error('Error fetching routines:', error);
    }
  };

  const fetchAllFeedback = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `http://localhost:1000/api/admin/admin/feedback?page=${pagination.page}&limit=${pagination.limit}&status=${filters.status}`,
        { headers: { 'auth-token': token } }
      );

      setFeedback(response.data.feedback);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error('Error fetching feedback:', error);
    }
  };

  const fetchAnalytics = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        'http://localhost:1000/api/admin/admin/analytics',
        { headers: { 'auth-token': token } }
      );

      setAnalytics(response.data.analytics);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    }
  };

  const fetchUserDetails = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `http://localhost:1000/api/admin/admin/user/${userId}`,
        { headers: { 'auth-token': token } }
      );

      setUserDetails(response.data);
      setShowUserDetailsModal(true);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const fetchRoutineDetails = async (routineId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `http://localhost:1000/api/admin/admin/routine/${routineId}`,
        { headers: { 'auth-token': token } }
      );

      setRoutineDetails(response.data);
      setShowRoutineDetailsModal(true);
    } catch (error) {
      console.error('Error fetching routine details:', error);
    }
  };

  // ==================== CRUD OPERATIONS ====================

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      let url = '';

      switch (modalType) {
        case 'customer':
          url = `http://localhost:1000/api/admin/admin/user/${selectedItem._id}`;
          break;
        case 'trainer':
          url = `http://localhost:1000/api/admin/admin/user/${selectedItem._id}`;
          break;
        case 'routine':
          url = `http://localhost:1000/api/admin/admin/routine/${selectedItem._id}`;
          break;
        case 'feedback':
          url = `http://localhost:1000/api/admin/admin/feedback/${selectedItem._id}`;
          break;
        default:
          return;
      }

      await axios.delete(url, { headers: { 'auth-token': token } });

      alert(`${modalType} deleted successfully!`);
      setShowDeleteModal(false);
      setSelectedItem(null);
      
      // Refresh data
      if (activeView === 'users') fetchCustomers();
      else if (activeView === 'trainers') fetchTrainers();
      else if (activeView === 'routines') fetchRoutines();
      else if (activeView === 'feedback') fetchAllFeedback();
      else fetchDashboardData();

    } catch (error) {
      console.error('Error deleting item:', error);
      alert('Failed to delete');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      let url = '';

      switch (modalType) {
        case 'customer':
        case 'trainer':
          url = `http://localhost:1000/api/admin/admin/user/${selectedItem._id}`;
          break;
        case 'routine':
          url = `http://localhost:1000/api/admin/admin/routine/${selectedItem._id}`;
          break;
        default:
          return;
      }

      const response = await axios.put(url, editForm, {
        headers: { 'auth-token': token }
      });

      alert(`${modalType} updated successfully!`);
      setShowEditModal(false);
      setSelectedItem(null);
      setEditForm({});
      
      // Refresh data
      if (activeView === 'users') fetchCustomers();
      else if (activeView === 'trainers') fetchTrainers();
      else if (activeView === 'routines') fetchRoutines();

    } catch (error) {
      console.error('Error updating item:', error);
      alert('Failed to update');
    }
  };

  const handleToggleStatus = async (user) => {
    try {
      const token = localStorage.getItem('token');
      const type = user.userType === 'customer' ? 'customer' : 'trainer';
      
      const response = await axios.put(
        `http://localhost:1000/api/admin/admin/user/${user._id}/toggle-status`,
        { type },
        { headers: { 'auth-token': token } }
      );

      alert(response.data.message);
      
      // Refresh data
      if (user.userType === 'customer') fetchCustomers();
      else fetchTrainers();

    } catch (error) {
      console.error('Error toggling status:', error);
      alert('Failed to toggle status');
    }
  };

  // ==================== RENDER HELPERS ====================
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i} className="ad-star-filled" />);
      } else {
        stars.push(<FaRegStar key={i} className="ad-star-empty" />);
      }
    }
    return stars;
  };

  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`;
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usertype');
    localStorage.removeItem('userid');
    localStorage.removeItem('adminInfo');
    navigate('/admin/login');
  };

  // ==================== LOADING STATE ====================
  if (loading) {
    return (
      <div className="ad-loading-container">
        <div className="ad-loading-spinner"></div>
        <p>Loading Admin Dashboard...</p>
      </div>
    );
  }

  // ==================== MAIN RENDER ====================
  return (
    <div className="ad-dashboard-container">
      {/* Sidebar */}
      <aside className={`ad-sidebar ${sidebarOpen ? 'ad-sidebar-open' : ''}`}>
        <div className="ad-sidebar-header">
          <div className="ad-logo">
            <FaDumbbell className="ad-logo-icon" />
            <span className="ad-logo-text">FIT<span className="ad-logo-accent">TRACK</span></span>
            <span className="ad-logo-badge">ADMIN</span>
          </div>
         
         
        </div>

        <div className="ad-admin-profile">
          <div className="ad-admin-avatar">
            {admin ? getInitials(admin.firstname, admin.lastname) : <FaUserCircle />}
          </div>
          <div className="ad-admin-info">
            <h4>{admin ? `${admin.firstname} ${admin.lastname}` : 'Admin User'}</h4>
            <p>{admin?.role || 'Administrator'}</p>
          </div>
        </div>

        <nav className="ad-sidebar-nav">
          <button
            className={`ad-nav-item ${activeView === 'dashboard' ? 'ad-active' : ''}`}
            onClick={() => {
              setActiveView('dashboard');
              setSidebarOpen(false);
            }}
          >
            <FaThLarge /> Dashboard
          </button>
          <button
            className={`ad-nav-item ${activeView === 'users' ? 'ad-active' : ''}`}
            onClick={() => {
              setActiveView('users');
              setPagination({ ...pagination, page: 1 });
              setSidebarOpen(false);
            }}
          >
            <FaUsers /> Users
            <span className="ad-nav-badge">{stats.totalCustomers}</span>
          </button>
          <button
            className={`ad-nav-item ${activeView === 'trainers' ? 'ad-active' : ''}`}
            onClick={() => {
              setActiveView('trainers');
              setPagination({ ...pagination, page: 1 });
              setSidebarOpen(false);
            }}
          >
            <FaUserTie /> Trainers
            <span className="ad-nav-badge">{stats.totalTrainers}</span>
          </button>
          <button
            className={`ad-nav-item ${activeView === 'routines' ? 'ad-active' : ''}`}
            onClick={() => {
              setActiveView('routines');
              setPagination({ ...pagination, page: 1 });
              setSidebarOpen(false);
            }}
          >
            <FaDumbbell /> Routines
            <span className="ad-nav-badge">{stats.totalRoutines}</span>
          </button>
          <button
            className={`ad-nav-item ${activeView === 'feedback' ? 'ad-active' : ''}`}
            onClick={() => {
              setActiveView('feedback');
              setPagination({ ...pagination, page: 1 });
              setSidebarOpen(false);
            }}
          >
            <FaComment /> Feedback
            <span className="ad-nav-badge">{stats.totalFeedback}</span>
          </button>
          <button
            className={`ad-nav-item ${activeView === 'analytics' ? 'ad-active' : ''}`}
            onClick={() => {
              setActiveView('analytics');
              setSidebarOpen(false);
              fetchAnalytics();
            }}
          >
            <FaChartLine /> Analytics
          </button>
          <button className="ad-nav-item ad-logout" onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </button>
        </nav>

        <div className="ad-sidebar-footer">
          <div className="ad-mini-stats">
            <div className="ad-mini-stat">
              <span className="ad-mini-value">{stats.totalRoutines}</span>
              <span className="ad-mini-label">Routines</span>
            </div>
            <div className="ad-mini-stat">
              <span className="ad-mini-value">{stats.totalUsers}</span>
              <span className="ad-mini-label">Users</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`ad-main-content ${sidebarOpen ? 'ad-sidebar-shifted' : ''}`}>
        {/* Top Bar */}
        <header className="ad-top-bar">
          <button className="ad-menu-toggle" onClick={() => setSidebarOpen(true)}>
            <FaBars />
          </button>
          <h1 className="ad-page-title">
            {activeView === 'dashboard' && 'Dashboard Overview'}
            {activeView === 'users' && 'User Management'}
            {activeView === 'trainers' && 'Trainer Management'}
            {activeView === 'routines' && 'Routine Management'}
            {activeView === 'feedback' && 'Feedback Management'}
            {activeView === 'analytics' && 'Analytics & Reports'}
          </h1>
          <div className="ad-top-bar-actions">
            <button className="ad-refresh-btn" onClick={fetchDashboardData}>
              <FaSync /> Refresh
            </button>
          </div>
        </header>

        {/* DASHBOARD VIEW */}
        {activeView === 'dashboard' && (
          <div className="ad-dashboard-view">
            {/* Stats Grid */}
            <div className="ad-stats-grid">
              <div className="ad-stat-card">
                <div className="ad-stat-icon ad-blue">
                  <FaUsers />
                </div>
                <div className="ad-stat-content">
                  <span className="ad-stat-value">{stats.totalCustomers}</span>
                  <span className="ad-stat-label">Total Users</span>
                </div>
              </div>

              <div className="ad-stat-card">
                <div className="ad-stat-icon ad-green">
                  <FaUserTie />
                </div>
                <div className="ad-stat-content">
                  <span className="ad-stat-value">{stats.totalTrainers}</span>
                  <span className="ad-stat-label">Total Trainers</span>
                </div>
              </div>

              <div className="ad-stat-card">
                <div className="ad-stat-icon ad-orange">
                  <FaDumbbell />
                </div>
                <div className="ad-stat-content">
                  <span className="ad-stat-value">{stats.totalRoutines}</span>
                  <span className="ad-stat-label">Total Routines</span>
                </div>
              </div>

              <div className="ad-stat-card">
                <div className="ad-stat-icon ad-purple">
                  <FaComment />
                </div>
                <div className="ad-stat-content">
                  <span className="ad-stat-value">{stats.totalFeedback}</span>
                  <span className="ad-stat-label">Total Feedback</span>
                </div>
              </div>

              <div className="ad-stat-card">
                <div className="ad-stat-icon ad-red">
                  <FaClipboardList />
                </div>
                <div className="ad-stat-content">
                  <span className="ad-stat-value">{stats.totalDailyLogs}</span>
                  <span className="ad-stat-label">Daily Logs</span>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="ad-recent-grid">
              {/* Recent Users */}
              <div className="ad-recent-card">
                <h3>Recent Users</h3>
                <div className="ad-recent-list">
                  {recentData.users.map(user => (
                    <div key={user._id} className="ad-recent-item">
                      <div className="ad-recent-avatar">
                        {getInitials(user.firstname, user.lastname)}
                      </div>
                      <div className="ad-recent-info">
                        <h4>{user.firstname} {user.lastname}</h4>
                        <p>{user.email}</p>
                      </div>
                      <span className="ad-recent-badge">{user.userType}</span>
                      <span className="ad-recent-date">{formatDate(user.createdAt)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Routines */}
              <div className="ad-recent-card">
                <h3>Recent Routines</h3>
                <div className="ad-recent-list">
                  {recentData.routines.map(routine => (
                    <div key={routine._id} className="ad-recent-item">
                      <div className="ad-recent-icon">
                        <FaDumbbell />
                      </div>
                      <div className="ad-recent-info">
                        <h4>{routine.title}</h4>
                        <p>By {routine.trainer?.firstname} {routine.trainer?.lastname}</p>
                      </div>
                      <span className="ad-recent-date">{formatDate(routine.createdAt)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Feedback */}
              <div className="ad-recent-card">
                <h3>Recent Feedback</h3>
                <div className="ad-recent-list">
                  {recentData.feedback.map(item => (
                    <div key={item._id} className="ad-recent-item">
                      <div className="ad-recent-avatar small">
                        {getInitials(item.user?.firstname, item.user?.lastname)}
                      </div>
                      <div className="ad-recent-info">
                        <h4>{item.user?.firstname} {item.user?.lastname}</h4>
                        <p>on {item.routine?.title}</p>
                      </div>
                      <div className="ad-recent-rating">
                        {renderStars(item.rating)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* USERS VIEW */}
        {activeView === 'users' && (
          <div className="ad-table-view">
            <div className="ad-table-header">
              <div className="ad-search-box">
                <FaSearch className="ad-search-icon" />
                <input
                  type="text"
                  placeholder="Search users by name, email, phone..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setPagination({ ...pagination, page: 1 });
                  }}
                  className="ad-search-input"
                />
              </div>
            </div>

            <div className="ad-table-container">
              <table className="ad-data-table">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Location</th>
                    <th>Joined</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map(customer => (
                    <tr key={customer._id}>
                      <td>
                        <div className="ad-user-cell">
                          <div className="ad-user-avatar">
                            {getInitials(customer.firstname, customer.lastname)}
                          </div>
                          <span>{customer.firstname} {customer.lastname}</span>
                        </div>
                      </td>
                      <td>{customer.email}</td>
                      <td>{customer.phoneNumber}</td>
                      <td>{customer.location}</td>
                      <td>{formatDate(customer.createdAt)}</td>
                      <td>
                        <span className={`ad-status-badge ${customer.isActive ? 'ad-active' : 'ad-inactive'}`}>
                          {customer.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td>
                        <div className="ad-action-buttons">
                          <button
                            className="ad-action-btn ad-view"
                            onClick={() => fetchUserDetails(customer._id)}
                            title="View Details"
                          >
                            <FaEye />
                          </button>
                          <button
                            className="ad-action-btn ad-edit"
                            onClick={() => {
                              setSelectedItem(customer);
                              setModalType('customer');
                              setEditForm({
                                firstname: customer.firstname,
                                lastname: customer.lastname,
                                email: customer.email,
                                phoneNumber: customer.phoneNumber,
                                location: customer.location
                              });
                              setShowEditModal(true);
                            }}
                            title="Edit"
                          >
                            <FaEdit />
                          </button>
                          <button
                            className={`ad-action-btn ${customer.isActive ? 'ad-warning' : 'ad-success'}`}
                            onClick={() => handleToggleStatus(customer)}
                            title={customer.isActive ? 'Deactivate' : 'Activate'}
                          >
                            {customer.isActive ? <FaBan /> : <FaCheck />}
                          </button>
                          <button
                            className="ad-action-btn ad-danger"
                            onClick={() => {
                              setSelectedItem(customer);
                              setModalType('customer');
                              setShowDeleteModal(true);
                            }}
                            title="Delete"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {pagination.pages > 1 && (
              <div className="ad-pagination">
                <button
                  onClick={() => setPagination({ ...pagination, page: pagination.page - 1 })}
                  disabled={pagination.page === 1}
                  className="ad-page-btn"
                >
                  Previous
                </button>
                {[...Array(pagination.pages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setPagination({ ...pagination, page: i + 1 })}
                    className={`ad-page-btn ${pagination.page === i + 1 ? 'ad-active' : ''}`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setPagination({ ...pagination, page: pagination.page + 1 })}
                  disabled={pagination.page === pagination.pages}
                  className="ad-page-btn"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        )}

        {/* TRAINERS VIEW */}
        {activeView === 'trainers' && (
          <div className="ad-table-view">
            <div className="ad-table-header">
              <div className="ad-search-box">
                <FaSearch className="ad-search-icon" />
                <input
                  type="text"
                  placeholder="Search trainers by name, email, specialization..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setPagination({ ...pagination, page: 1 });
                  }}
                  className="ad-search-input"
                />
              </div>
            </div>

            <div className="ad-table-container">
              <table className="ad-data-table">
                <thead>
                  <tr>
                    <th>Trainer</th>
                    <th>Email</th>
                    <th>Specialization</th>
                    <th>Experience</th>
                    <th>Joined</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {trainers.map(trainer => (
                    <tr key={trainer._id}>
                      <td>
                        <div className="ad-user-cell">
                          <div className="ad-user-avatar">
                            {getInitials(trainer.firstname, trainer.lastname)}
                          </div>
                          <span>{trainer.firstname} {trainer.lastname}</span>
                        </div>
                      </td>
                      <td>{trainer.email}</td>
                      <td>
                        <div className="ad-specialization-tags">
                          {trainer.trainerProfile?.specialization?.slice(0, 2).map((spec, i) => (
                            <span key={i} className="ad-spec-tag">{spec}</span>
                          ))}
                          {trainer.trainerProfile?.specialization?.length > 2 && (
                            <span className="ad-spec-tag">+{trainer.trainerProfile.specialization.length - 2}</span>
                          )}
                        </div>
                      </td>
                      <td>{trainer.trainerProfile?.experience || 0} years</td>
                      <td>{formatDate(trainer.createdAt)}</td>
                      <td>
                        <span className={`ad-status-badge ${trainer.isActive ? 'ad-active' : 'ad-inactive'}`}>
                          {trainer.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td>
                        <div className="ad-action-buttons">
                          <button
                            className="ad-action-btn ad-view"
                            onClick={() => fetchUserDetails(trainer._id)}
                            title="View Details"
                          >
                            <FaEye />
                          </button>
                          <button
                            className="ad-action-btn ad-edit"
                            onClick={() => {
                              setSelectedItem(trainer);
                              setModalType('trainer');
                              setEditForm({
                                firstname: trainer.firstname,
                                lastname: trainer.lastname,
                                email: trainer.email,
                                phoneNumber: trainer.phoneNumber,
                                location: trainer.location,
                                trainerProfile: trainer.trainerProfile
                              });
                              setShowEditModal(true);
                            }}
                            title="Edit"
                          >
                            <FaEdit />
                          </button>
                          <button
                            className={`ad-action-btn ${trainer.isActive ? 'ad-warning' : 'ad-success'}`}
                            onClick={() => handleToggleStatus(trainer)}
                            title={trainer.isActive ? 'Deactivate' : 'Activate'}
                          >
                            {trainer.isActive ? <FaBan /> : <FaCheck />}
                          </button>
                          <button
                            className="ad-action-btn ad-danger"
                            onClick={() => {
                              setSelectedItem(trainer);
                              setModalType('trainer');
                              setShowDeleteModal(true);
                            }}
                            title="Delete"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {pagination.pages > 1 && (
              <div className="ad-pagination">
                {/* Pagination buttons same as users view */}
                {[...Array(pagination.pages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setPagination({ ...pagination, page: i + 1 })}
                    className={`ad-page-btn ${pagination.page === i + 1 ? 'ad-active' : ''}`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ROUTINES VIEW */}
        {activeView === 'routines' && (
          <div className="ad-table-view">
            <div className="ad-table-header">
              <div className="ad-search-box">
                <FaSearch className="ad-search-icon" />
                <input
                  type="text"
                  placeholder="Search routines..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setPagination({ ...pagination, page: 1 });
                  }}
                  className="ad-search-input"
                />
              </div>
              <select
                value={filters.category}
                onChange={(e) => {
                  setFilters({ ...filters, category: e.target.value });
                  setPagination({ ...pagination, page: 1 });
                }}
                className="ad-filter-select"
              >
                <option value="">All Categories</option>
                <option value="Weight Loss">Weight Loss</option>
                <option value="Muscle Building">Muscle Building</option>
                <option value="Endurance">Endurance</option>
                <option value="General Fitness">General Fitness</option>
                <option value="Sports Specific">Sports Specific</option>
                <option value="Rehabilitation">Rehabilitation</option>
              </select>
              <select
                value={filters.difficulty}
                onChange={(e) => {
                  setFilters({ ...filters, difficulty: e.target.value });
                  setPagination({ ...pagination, page: 1 });
                }}
                className="ad-filter-select"
              >
                <option value="">All Levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="All Levels">All Levels</option>
              </select>
            </div>

            <div className="ad-routines-grid">
              {routines.map(routine => (
                <div key={routine._id} className="ad-routine-card">
                  <div className="ad-routine-header">
                    <h3>{routine.title}</h3>
                    <div className="ad-routine-badges">
                      <span className="ad-badge ad-category">{routine.category}</span>
                      <span className="ad-badge ad-difficulty">{routine.difficulty}</span>
                      {!routine.isPublic && (
                        <span className="ad-badge ad-private">Private</span>
                      )}
                    </div>
                  </div>

                  <p className="ad-routine-description">{routine.description}</p>

                  <div className="ad-routine-meta">
                    <span><FaCalendarAlt /> {routine.duration} weeks</span>
                    <span><FaUsers /> {routine.completions || 0} completions</span>
                    <span><FaStar /> {routine.averageRating?.toFixed(1) || '0.0'}</span>
                  </div>

                  <div className="ad-routine-footer">
                    <div className="ad-trainer-info">
                      <FaUserTie />
                      <span>{routine.trainer?.firstname} {routine.trainer?.lastname}</span>
                    </div>
                    <div className="ad-routine-actions">
                      <button
                        className="ad-action-btn ad-view"
                        onClick={() => fetchRoutineDetails(routine._id)}
                        title="View Details"
                      >
                        <FaEye />
                      </button>
                      <button
                        className="ad-action-btn ad-edit"
                        onClick={() => {
                          setSelectedItem(routine);
                          setModalType('routine');
                          setEditForm({
                            title: routine.title,
                            description: routine.description,
                            category: routine.category,
                            difficulty: routine.difficulty,
                            duration: routine.duration,
                            frequency: routine.frequency,
                            isPublic: routine.isPublic
                          });
                          setShowEditModal(true);
                        }}
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="ad-action-btn ad-danger"
                        onClick={() => {
                          setSelectedItem(routine);
                          setModalType('routine');
                          setShowDeleteModal(true);
                        }}
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FEEDBACK VIEW */}
        {activeView === 'feedback' && (
          <div className="ad-table-view">
            <div className="ad-table-header">
              <select
                value={filters.status}
                onChange={(e) => {
                  setFilters({ ...filters, status: e.target.value });
                  setPagination({ ...pagination, page: 1 });
                }}
                className="ad-filter-select"
              >
                <option value="all">All Feedback</option>
                <option value="pending">Pending Response</option>
                <option value="responded">Responded</option>
              </select>
            </div>

            <div className="ad-feedback-grid">
              {feedback.map(item => (
                <div key={item._id} className="ad-feedback-card">
                  <div className="ad-feedback-header">
                    <div className="ad-feedback-user">
                      <div className="ad-user-avatar">
                        {getInitials(item.user?.firstname, item.user?.lastname)}
                      </div>
                      <div>
                        <h4>{item.user?.firstname} {item.user?.lastname}</h4>
                        <p>on {item.routine?.title}</p>
                      </div>
                    </div>
                    <span className="ad-feedback-date">{formatDate(item.createdAt)}</span>
                  </div>

                  <div className="ad-feedback-rating">
                    {renderStars(item.rating)}
                  </div>

                  <p className="ad-feedback-comment">"{item.comment}"</p>

                  {item.trainerResponse ? (
                    <div className="ad-trainer-response">
                      <strong>Trainer Response:</strong>
                      <p>{item.trainerResponse.text}</p>
                    </div>
                  ) : (
                    <span className="ad-pending-badge">Pending Response</span>
                  )}

                  <div className="ad-feedback-footer">
                    <button
                      className="ad-action-btn ad-danger"
                      onClick={() => {
                        setSelectedItem(item);
                        setModalType('feedback');
                        setShowDeleteModal(true);
                      }}
                      title="Delete Feedback"
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ANALYTICS VIEW */}
        {activeView === 'analytics' && analytics && (
          <div className="ad-analytics-view">
            <div className="ad-analytics-header">
              <h2>Platform Analytics</h2>
              <div className="ad-analytics-actions">
                <button className="ad-export-btn">
                  <FaDownload /> Export Report
                </button>
                <button className="ad-print-btn">
                  <FaPrint /> Print
                </button>
              </div>
            </div>

            <div className="ad-analytics-grid">
              <div className="ad-analytics-card">
                <h3>User Statistics</h3>
                <div className="ad-analytics-stats">
                  {analytics.userStats?.map(stat => (
                    <div key={stat._id} className="ad-analytics-stat">
                      <span className="ad-stat-label">
                        {stat._id === 'customer' ? 'Customers' : 'Trainers'}
                      </span>
                      <span className="ad-stat-value">{stat.count}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="ad-analytics-card">
                <h3>Routine Statistics</h3>
                <div className="ad-analytics-stats">
                  <div className="ad-analytics-stat">
                    <span className="ad-stat-label">Total Routines</span>
                    <span className="ad-stat-value">{analytics.routineStats?.total || 0}</span>
                  </div>
                  <div className="ad-analytics-stat">
                    <span className="ad-stat-label">Public</span>
                    <span className="ad-stat-value">{analytics.routineStats?.public || 0}</span>
                  </div>
                  <div className="ad-analytics-stat">
                    <span className="ad-stat-label">Private</span>
                    <span className="ad-stat-value">{analytics.routineStats?.private || 0}</span>
                  </div>
                  <div className="ad-analytics-stat">
                    <span className="ad-stat-label">Avg Rating</span>
                    <span className="ad-stat-value">{analytics.routineStats?.avgRating?.toFixed(1) || '0.0'}</span>
                  </div>
                </div>
              </div>

              <div className="ad-analytics-card">
                <h3>Feedback Statistics</h3>
                <div className="ad-analytics-stats">
                  <div className="ad-analytics-stat">
                    <span className="ad-stat-label">Total Feedback</span>
                    <span className="ad-stat-value">{analytics.feedbackStats?.totalFeedback || 0}</span>
                  </div>
                  <div className="ad-analytics-stat">
                    <span className="ad-stat-label">Average Rating</span>
                    <span className="ad-stat-value">{analytics.feedbackStats?.averageRating?.toFixed(1) || '0.0'}</span>
                  </div>
                  <div className="ad-analytics-stat">
                    <span className="ad-stat-label">Responded</span>
                    <span className="ad-stat-value">{analytics.feedbackStats?.respondedCount || 0}</span>
                  </div>
                </div>
              </div>

              <div className="ad-analytics-card">
                <h3>Popular Categories</h3>
                <div className="ad-categories-list">
                  {analytics.popularCategories?.map((cat, idx) => (
                    <div key={idx} className="ad-category-item">
                      <span className="ad-category-name">{cat._id}</span>
                      <span className="ad-category-count">{cat.count} routines</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="ad-analytics-card ad-full-width">
                <h3>Top Trainers</h3>
                <table className="ad-top-trainers-table">
                  <thead>
                    <tr>
                      <th>Trainer</th>
                      <th>Routines</th>
                      <th>Total Completions</th>
                      <th>Avg Rating</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analytics.topTrainers?.map((trainer, idx) => (
                      <tr key={idx}>
                        <td>
                          {trainer.trainerInfo[0]?.firstname} {trainer.trainerInfo[0]?.lastname}
                        </td>
                        <td>{trainer.routineCount}</td>
                        <td>{trainer.totalCompletions}</td>
                        <td>{trainer.avgRating?.toFixed(1) || '0.0'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ==================== MODALS ==================== */}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="ad-modal-overlay" onClick={() => setShowDeleteModal(false)}>
          <div className="ad-modal ad-small-modal" onClick={e => e.stopPropagation()}>
            <div className="ad-modal-header ad-danger-header">
              <FaExclamationTriangle />
              <h2>Confirm Delete</h2>
              <button className="ad-modal-close" onClick={() => setShowDeleteModal(false)}>
                &times;
              </button>
            </div>
            <div className="ad-modal-body">
              <p>Are you sure you want to delete this {modalType}?</p>
              <p className="ad-warning-text">This action cannot be undone!</p>
            </div>
            <div className="ad-modal-footer">
              <button className="ad-btn-danger" onClick={handleDelete}>
                Yes, Delete
              </button>
              <button className="ad-btn-secondary" onClick={() => setShowDeleteModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="ad-modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="ad-modal ad-medium-modal" onClick={e => e.stopPropagation()}>
            <div className="ad-modal-header">
              <h2>Edit {modalType === 'routine' ? 'Routine' : 'User'}</h2>
              <button className="ad-modal-close" onClick={() => setShowEditModal(false)}>
                &times;
              </button>
            </div>
            <form onSubmit={handleUpdate}>
              <div className="ad-modal-body">
                {modalType === 'routine' ? (
                  // Routine Edit Form
                  <>
                    <div className="ad-form-group">
                      <label>Title</label>
                      <input
                        type="text"
                        value={editForm.title || ''}
                        onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                        required
                      />
                    </div>
                    <div className="ad-form-group">
                      <label>Description</label>
                      <textarea
                        value={editForm.description || ''}
                        onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                        rows="3"
                        required
                      />
                    </div>
                    <div className="ad-form-row">
                      <div className="ad-form-group">
                        <label>Category</label>
                        <select
                          value={editForm.category || ''}
                          onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                        >
                          <option value="Weight Loss">Weight Loss</option>
                          <option value="Muscle Building">Muscle Building</option>
                          <option value="Endurance">Endurance</option>
                          <option value="General Fitness">General Fitness</option>
                        </select>
                      </div>
                      <div className="ad-form-group">
                        <label>Difficulty</label>
                        <select
                          value={editForm.difficulty || ''}
                          onChange={(e) => setEditForm({ ...editForm, difficulty: e.target.value })}
                        >
                          <option value="Beginner">Beginner</option>
                          <option value="Intermediate">Intermediate</option>
                          <option value="Advanced">Advanced</option>
                        </select>
                      </div>
                    </div>
                    <div className="ad-form-row">
                      <div className="ad-form-group">
                        <label>Duration (weeks)</label>
                        <input
                          type="number"
                          value={editForm.duration || ''}
                          onChange={(e) => setEditForm({ ...editForm, duration: e.target.value })}
                          min="1"
                          max="52"
                        />
                      </div>
                      <div className="ad-form-group">
                        <label>Frequency (days/week)</label>
                        <input
                          type="number"
                          value={editForm.frequency || ''}
                          onChange={(e) => setEditForm({ ...editForm, frequency: e.target.value })}
                          min="1"
                          max="7"
                        />
                      </div>
                    </div>
                    <div className="ad-checkbox-group">
                      <label className="ad-checkbox-label">
                        <input
                          type="checkbox"
                          checked={editForm.isPublic || false}
                          onChange={(e) => setEditForm({ ...editForm, isPublic: e.target.checked })}
                        />
                        <span>Public Routine</span>
                      </label>
                    </div>
                  </>
                ) : (
                  // User Edit Form
                  <>
                    <div className="ad-form-row">
                      <div className="ad-form-group">
                        <label>First Name</label>
                        <input
                          type="text"
                          value={editForm.firstname || ''}
                          onChange={(e) => setEditForm({ ...editForm, firstname: e.target.value })}
                          required
                        />
                      </div>
                      <div className="ad-form-group">
                        <label>Last Name</label>
                        <input
                          type="text"
                          value={editForm.lastname || ''}
                          onChange={(e) => setEditForm({ ...editForm, lastname: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div className="ad-form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        value={editForm.email || ''}
                        onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                        required
                      />
                    </div>
                    <div className="ad-form-group">
                      <label>Phone Number</label>
                      <input
                        type="text"
                        value={editForm.phoneNumber || ''}
                        onChange={(e) => setEditForm({ ...editForm, phoneNumber: e.target.value })}
                        required
                      />
                    </div>
                    <div className="ad-form-group">
                      <label>Location</label>
                      <input
                        type="text"
                        value={editForm.location || ''}
                        onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                        required
                      />
                    </div>
                    {modalType === 'trainer' && (
                      <>
                        <div className="ad-form-group">
                          <label>Experience (years)</label>
                          <input
                            type="number"
                            value={editForm.trainerProfile?.experience || ''}
                            onChange={(e) => setEditForm({
                              ...editForm,
                              trainerProfile: {
                                ...editForm.trainerProfile,
                                experience: e.target.value
                              }
                            })}
                          />
                        </div>
                        <div className="ad-form-group">
                          <label>Bio</label>
                          <textarea
                            value={editForm.trainerProfile?.bio || ''}
                            onChange={(e) => setEditForm({
                              ...editForm,
                              trainerProfile: {
                                ...editForm.trainerProfile,
                                bio: e.target.value
                              }
                            })}
                            rows="3"
                          />
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>
              <div className="ad-modal-footer">
                <button type="submit" className="ad-btn-primary">
                  Update
                </button>
                <button type="button" className="ad-btn-secondary" onClick={() => setShowEditModal(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* User Details Modal */}
      {showUserDetailsModal && userDetails && (
        <div className="ad-modal-overlay" onClick={() => setShowUserDetailsModal(false)}>
          <div className="ad-modal ad-medium-modal" onClick={e => e.stopPropagation()}>
            <div className="ad-modal-header">
              <h2>User Details</h2>
              <button className="ad-modal-close" onClick={() => setShowUserDetailsModal(false)}>
                &times;
              </button>
            </div>
            <div className="ad-modal-body">
              <div className="ad-details-view">
                <div className="ad-details-avatar">
                  {getInitials(userDetails.user.firstname, userDetails.user.lastname)}
                </div>
                <div className="ad-details-info">
                  <p><strong>Name:</strong> {userDetails.user.firstname} {userDetails.user.lastname}</p>
                  <p><strong>Email:</strong> {userDetails.user.email}</p>
                  <p><strong>Phone:</strong> {userDetails.user.phoneNumber}</p>
                  <p><strong>Location:</strong> {userDetails.user.location}</p>
                  <p><strong>User Type:</strong> {userDetails.user.userType}</p>
                  <p><strong>Joined:</strong> {formatDate(userDetails.user.createdAt)}</p>
                  <p><strong>Status:</strong> 
                    <span className={`ad-status-badge ${userDetails.user.isActive ? 'ad-active' : 'ad-inactive'}`}>
                      {userDetails.user.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </p>
                  
                  {userDetails.user.userType === 'trainer' && (
                    <>
                      <h3 style={{ marginTop: '20px', marginBottom: '10px' }}>Trainer Statistics</h3>
                      <p><strong>Total Routines:</strong> {userDetails.stats?.totalRoutines || 0}</p>
                      <p><strong>Total Feedback:</strong> {userDetails.stats?.totalFeedback || 0}</p>
                      <p><strong>Total Completions:</strong> {userDetails.stats?.totalCompletions || 0}</p>
                      <p><strong>Average Rating:</strong> {userDetails.stats?.averageRating?.toFixed(1) || '0.0'}</p>
                    </>
                  )}

                  {userDetails.user.userType === 'customer' && (
                    <>
                      <h3 style={{ marginTop: '20px', marginBottom: '10px' }}>Customer Statistics</h3>
                      <p><strong>Total Workouts:</strong> {userDetails.stats?.totalWorkouts || 0}</p>
                      <p><strong>Total Meals:</strong> {userDetails.stats?.totalMeals || 0}</p>
                      <p><strong>Current Streak:</strong> {userDetails.stats?.streak || 0} days</p>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="ad-modal-footer">
              <button className="ad-btn-secondary" onClick={() => setShowUserDetailsModal(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Routine Details Modal */}
      {showRoutineDetailsModal && routineDetails && (
        <div className="ad-modal-overlay" onClick={() => setShowRoutineDetailsModal(false)}>
          <div className="ad-modal ad-large-modal" onClick={e => e.stopPropagation()}>
            <div className="ad-modal-header">
              <h2>Routine Details</h2>
              <button className="ad-modal-close" onClick={() => setShowRoutineDetailsModal(false)}>
                &times;
              </button>
            </div>
            <div className="ad-modal-body">
              <div className="ad-details-view">
                <h3>{routineDetails.routine.title}</h3>
                <p><strong>Category:</strong> {routineDetails.routine.category}</p>
                <p><strong>Difficulty:</strong> {routineDetails.routine.difficulty}</p>
                <p><strong>Duration:</strong> {routineDetails.routine.duration} weeks</p>
                <p><strong>Frequency:</strong> {routineDetails.routine.frequency} days/week</p>
                <p><strong>Description:</strong> {routineDetails.routine.description}</p>
                <p><strong>Created by:</strong> {routineDetails.routine.trainer?.firstname} {routineDetails.routine.trainer?.lastname}</p>
                <p><strong>Status:</strong> {routineDetails.routine.isPublic ? 'Public' : 'Private'}</p>
                <p><strong>Completions:</strong> {routineDetails.routine.completions || 0}</p>
                <p><strong>Views:</strong> {routineDetails.routine.views || 0}</p>
                <p><strong>Average Rating:</strong> {routineDetails.routine.averageRating?.toFixed(1) || '0.0'}</p>

                <h3 style={{ marginTop: '20px' }}>Workout Days</h3>
                {routineDetails.routine.workoutDays?.map((day, idx) => (
                  <div key={idx} className="ad-workout-day">
                    <h4>Day {day.dayNumber}: {day.dayName} - {day.focus}</h4>
                    {day.exercises?.map((ex, exIdx) => (
                      <div key={exIdx} className="ad-exercise-item">
                        <span>{ex.name}</span>
                        {ex.sets > 0 && <span> - {ex.sets} sets</span>}
                        {ex.reps > 0 && <span> × {ex.reps} reps</span>}
                        {ex.duration > 0 && <span> ({ex.duration} min)</span>}
                      </div>
                    ))}
                    {day.notes && <p className="ad-day-notes"><em>{day.notes}</em></p>}
                  </div>
                ))}

                <h3 style={{ marginTop: '20px' }}>Feedback ({routineDetails.feedback?.length || 0})</h3>
                {routineDetails.feedback?.map((fb, idx) => (
                  <div key={idx} className="ad-feedback-item">
                    <p><strong>{fb.user?.firstname} {fb.user?.lastname}</strong> - {renderStars(fb.rating)}</p>
                    <p>"{fb.comment}"</p>
                    {fb.trainerResponse && (
                      <div className="ad-trainer-response">
                        <strong>Trainer: </strong> {fb.trainerResponse.text}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="ad-modal-footer">
              <button className="ad-btn-secondary" onClick={() => setShowRoutineDetailsModal(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;