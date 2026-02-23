import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { SidebarData } from './SidebarData.jsx';
import './CustomerSideBar.css';
import { IconContext } from 'react-icons';
import { FaDumbbell } from 'react-icons/fa';

function CustomerSideBar() {
  const [sidebar, setSidebar] = useState(false);
  const [activeItem, setActiveItem] = useState('Profile');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usertype');
    localStorage.removeItem('userid');
    navigate('/login');
  };

  const showSidebar = () => setSidebar(!sidebar);

  const handleItemClick = (title, path) => {
    setActiveItem(title);
    if (title === 'Logout') {
      handleLogout();
    }
  };

  return (
    <>
      <IconContext.Provider value={{ color: '#FF6B35' }}>
        <div className='sidebar-nav'>
          <div className="nav-brand">
            <FaDumbbell className="nav-logo-icon" />
            <div className="nav-brand-text">
              <span className="nav-brand-name">FIT</span>
              <span className="nav-brand-name-accent">TRACK</span>
            </div>
          </div>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>
        
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <div className="nav-header">
            <div className="user-info">
              <div className="user-avatar">
                <FaIcons.FaUserCircle />
              </div>
              <div className="user-details">
                <h4>Welcome Back!</h4>
                <p>Track your fitness journey</p>
              </div>
            </div>
            <Link to='#' className='menu-close'>
              <AiIcons.AiOutlineClose onClick={showSidebar} />
            </Link>
          </div>
          
          <ul className='nav-menu-items'>
            {SidebarData.map((item, index) => {
              const isActive = activeItem === item.title;
              return (
                <li
                  key={index}
                  className={`${item.cName} ${isActive ? 'active' : ''}`}
                  onClick={() => handleItemClick(item.title, item.path)}
                >
                  <Link to={item.path}>
                    <div className="nav-icon">
                      {item.icon}
                    </div>
                    <span>{item.title}</span>
                    {isActive && <div className="active-indicator"></div>}
                  </Link>
                </li>
              );
            })}
          </ul>
          
          <div className="nav-footer">
            <div className="fitness-stats">
              <div className="stat">
                <span className="stat-number">0</span>
                <span className="stat-label">Workouts</span>
              </div>
              <div className="stat">
                <span className="stat-number">0</span>
                <span className="stat-label">Days</span>
              </div>
            </div>
          </div>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default CustomerSideBar;