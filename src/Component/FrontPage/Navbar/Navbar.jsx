import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import logo from "../../../assets/logo-1.png"
import { VscThreeBars } from "react-icons/vsc";
import { FaDumbbell } from "react-icons/fa";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  let navbarClasses = ['navbar', 'navbar-expand-lg', 'fixed-top'];
  if (scrolled) {
    navbarClasses.push('scrolled');
  }

  return (
    <>
      <nav className={navbarClasses.join(' ')}>
        <div className="container navbar-container">
          <div className="logo-brand">
            <FaDumbbell className="fitness-icon" />
            <div className="brand-text">
              <span className="brand-name">FIT</span>
              <span className="brand-name-accent">TRACK</span>
            </div>
          </div>
          
          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleMenu}
            aria-label="Toggle navigation"
          >
            <VscThreeBars />
          </button>
          
          <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" href="#hero">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#about">Features</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#Service">Workouts</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#team">Owner</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contact">Contact</a>
              </li>
            </ul>
            
            <div className="auth-buttons">
              <Link to="/signup">
                <button className="btn-signup" type="button">Start Free Trial</button>
              </Link>
              <Link to="/login">
                <button className="btn-login" type="button">Log In</button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}