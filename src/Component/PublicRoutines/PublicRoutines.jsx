import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './PublicRoutines.css';
import {
  FaDumbbell,
  FaCalendarAlt,
  FaClock,
  FaUsers,
  FaStar,
  FaRegStar,
  FaSearch,
  FaFilter,
  FaEye
} from 'react-icons/fa';

const PublicRoutines = () => {
  const [routines, setRoutines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    difficulty: ''
  });
  const [categories, setCategories] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    pages: 0
  });

  const navigate = useNavigate();

  const categoryOptions = [
    'Weight Loss', 'Muscle Building', 'Endurance', 'General Fitness', 
    'Sports Specific', 'Rehabilitation'
  ];

  useEffect(() => {
    fetchRoutines();
    fetchCategories();
  }, [pagination.page, filters, searchTerm]);

  const fetchRoutines = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: pagination.page,
        limit: pagination.limit,
        ...(filters.category && { category: filters.category }),
        ...(filters.difficulty && { difficulty: filters.difficulty }),
        ...(searchTerm && { search: searchTerm })
      });

      const response = await axios.get(`http://localhost:1000/api/auth/public-routines?${params}`);
      
      setRoutines(response.data.routines);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error('Error fetching routines:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:1000/api/auth/routine-categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPagination({ ...pagination, page: 1 });
    fetchRoutines();
  };

  const handleFilterChange = (name, value) => {
    setFilters({ ...filters, [name]: value });
    setPagination({ ...pagination, page: 1 });
  };

  const handlePageChange = (newPage) => {
    setPagination({ ...pagination, page: newPage });
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

  if (loading && routines.length === 0) {
    return (
      <div className="public-loading">
        <div className="loading-spinner"></div>
        <p>Loading fitness routines...</p>
      </div>
    );
  }

  return (
    <div className="public-routines-page">
      {/* Header */}
      <div className="public-header">
        <h1>
          <FaDumbbell className="header-icon" />
          Fitness Routines
        </h1>
        <p>Discover workout programs created by professional trainers</p>
      </div>

      {/* Search and Filters */}
      <div className="public-controls">
        <form onSubmit={handleSearch} className="search-form">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search routines..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <button type="submit" className="search-btn">Search</button>
        </form>

        <div className="filter-group">
          <select
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="filter-select"
          >
            <option value="">All Categories</option>
            {categoryOptions.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <select
            value={filters.difficulty}
            onChange={(e) => handleFilterChange('difficulty', e.target.value)}
            className="filter-select"
          >
            <option value="">All Levels</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
            <option value="All Levels">All Levels</option>
          </select>
        </div>
      </div>

      {/* Routines Grid */}
      {routines.length > 0 ? (
        <>
          <div className="routines-grid">
            {routines.map((routine) => (
              <div key={routine._id} className="routine-card">
                <div className="routine-header">
                  <h3>{routine.title}</h3>
                  <div className="routine-badges">
                    <span className="badge category">{routine.category}</span>
                    <span className="badge difficulty">{routine.difficulty}</span>
                  </div>
                </div>

                <p className="routine-description">{routine.description}</p>

                <div className="routine-stats">
                  <div className="stat">
                    <FaCalendarAlt />
                    <span>{routine.duration} weeks</span>
                  </div>
                  <div className="stat">
                    <FaClock />
                    <span>{routine.frequency} days/week</span>
                  </div>
                  <div className="stat">
                    <FaUsers />
                    <span>{routine.completions || 0} completions</span>
                  </div>
                  <div className="stat">
                    <FaEye />
                    <span>{routine.views || 0} views</span>
                  </div>
                </div>

                <div className="rating-section">
                  <div className="stars">
                    {renderStars(routine.averageRating || 0)}
                  </div>
                  <span className="rating-value">
                    {routine.averageRating?.toFixed(1) || '0.0'}
                  </span>
                </div>

                <div className="routine-footer">
                  <div className="trainer-info">
                    <div className="trainer-avatar">
                      {routine.trainer?.firstname?.charAt(0)}
                      {routine.trainer?.lastname?.charAt(0)}
                    </div>
                    <div className="trainer-details">
                      <span className="trainer-name">
                        {routine.trainer?.firstname} {routine.trainer?.lastname}
                      </span>
                    </div>
                  </div>
                  <Link to={`/routine/${routine._id}`} className="view-btn">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {pagination.pages > 1 && (
            <div className="pagination">
              <button
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={pagination.page === 1}
                className="page-btn"
              >
                Previous
              </button>
              
              {[...Array(pagination.pages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => handlePageChange(i + 1)}
                  className={`page-btn ${pagination.page === i + 1 ? 'active' : ''}`}
                >
                  {i + 1}
                </button>
              ))}
              
              <button
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={pagination.page === pagination.pages}
                className="page-btn"
              >
                Next
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="no-routines">
          <FaDumbbell className="no-routines-icon" />
          <h3>No routines found</h3>
          <p>Try adjusting your search or filters</p>
        </div>
      )}

      {/* Call to Action */}
      <div className="cta-section">
        <h2>Ready to start your fitness journey?</h2>
        <p>Join our community to track your progress and save your favorite routines</p>
        <div className="cta-buttons">
          <Link to="/signup" className="cta-btn primary">Sign Up Free</Link>
          <Link to="/login" className="cta-btn secondary">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default PublicRoutines;