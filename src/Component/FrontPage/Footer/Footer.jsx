import React from 'react';
import './Footer.css';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaHeart, FaDumbbell } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', link: '#hero' },
    { name: 'Features', link: '#about' },
    { name: 'Workouts', link: '#Service' },
    { name: 'Team', link: '#team' },
    { name: 'Contact', link: '#contact' }
  ];

  const socialLinks = [
    { icon: <FaFacebookF />, link: '#' },
    { icon: <FaTwitter />, link: '#' },
    { icon: <FaInstagram />, link: '#' },
    { icon: <FaLinkedinIn />, link: '#' }
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Main Footer Content */}
        <div className="footer-main">
          {/* Brand Section */}
          <div className="footer-brand">
            <div className="footer-logo">
              <FaDumbbell className="logo-icon" />
              <div className="logo-text">
                <span className="logo-name">FIT</span>
                <span className="logo-name-accent">TRACK</span>
              </div>
            </div>
            <p className="brand-tagline">
              Your personal fitness companion for achieving health goals through smart technology.
            </p>
            <div className="social-links">
              {socialLinks.map((social, index) => (
                <a 
                  key={index} 
                  href={social.link} 
                  className="social-icon"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-links">
            <h3>Quick Links</h3>
            <ul className="links-list">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.link}>{link.name}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-contact">
            <h3>Contact Info</h3>
            <div className="contact-info">
              <p>Virtual University</p>
              <p>Lahore, Pakistan</p>
              <p>Email: nida.noureen@example.com</p>
              <p>Phone: +92 300 1234567</p>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="footer-bottom">
          <div className="copyright">
            <p>
              &copy; {currentYear} FitTrack. All rights reserved. 
              <span className="made-with">
                Made with <FaHeart className="heart-icon" /> by Nida Noureen
              </span>
            </p>
          </div>
          <div className="footer-extra">
            <a href="#privacy">Privacy Policy</a>
            <span className="divider">|</span>
            <a href="#terms">Terms of Service</a>
            <span className="divider">|</span>
            <span>Student ID: BC230409854</span>
          </div>
        </div>
      </div>
    </footer>
  );
}