import React from 'react'
import { Link } from 'react-router-dom'; // Import Link
import heroimg from "../../../assets/fit-hero.png"
import "./Hero.css"
import { FaPlay, FaDumbbell } from "react-icons/fa" // Added FaDumbbell
import { GiMuscleUp } from "react-icons/gi"

export default function Hero() {
  return (
    <div className='Hero-page' id="hero">
      <div className="hero-content">
        <div className="hero-badge">
          <GiMuscleUp className="badge-icon" />
          <span>TRANSFORM YOUR FITNESS JOURNEY</span>
        </div>
        
        <h1>
          <span className="hero-title-line">Track Your Progress,</span>
          <span className="hero-title-line">Achieve Your <span className="hero-highlight">Fitness Goals</span></span>
        </h1>
        
        <p className='hero-p'>
          FitTrack uses AI-powered technology to create personalized workout plans, 
          track your nutrition, and monitor your progress in real-time.
        </p>
        
        <div className="hero-stats">
          <div className="stat-item">
            <h3>50K+</h3>
            <p>Active Users</p>
          </div>
          <div className="stat-item">
            <h3>500+</h3>
            <p>Workout Plans</p>
          </div>
          <div className="stat-item">
            <h3>98%</h3>
            <p>Success Rate</p>
          </div>
        </div>
        
        {/* New Explore Button Section */}
        <div className="hero-actions">
          <Link to="/routines" className="explore-btn">
            <FaDumbbell className="btn-icon" />
            Explore Free Routines
          </Link>
          <Link to="/signup" className="get-started-btn">
            Get Started
            <FaPlay className="btn-icon" />
          </Link>
        </div>
      </div>
      
      <div className='hero-image'>
        <img src={heroimg} alt="Fitness Tracker Dashboard" />
        <div className="hero-image-overlay"></div>
      </div>
    </div>
  )
}