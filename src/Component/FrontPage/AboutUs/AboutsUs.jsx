import React from 'react';
import './AboutUs.css';
import fitnessImage from "../../../assets/about.png" // Update this image

export default function AboutUs() {
  return (
    <section className="about-section" id="about">
      <div className="section-content">
        <div className="text-and-image">
          <div className="text-container">
            <div className="section-badge">
              <span>OUR MISSION</span>
            </div>
            <h2>Transform Your Fitness Journey with Precision & Science</h2>
            <p className="description">
              FitTrack is more than just a fitness app – it's your personal AI-powered fitness companion. 
              We combine cutting-edge technology with proven exercise science to create personalized workout 
              plans that adapt to your progress, goals, and lifestyle.
            </p>
            <p className="description">
              Our platform tracks every aspect of your fitness journey, from workout intensity and nutrition 
              to recovery and progress metrics, giving you comprehensive insights to optimize your results.
            </p>
            <div className="features-grid">
              
              <div className="feature-item">
                <span className="feature-icon">📊</span>
                <h4>Progress Analytics</h4>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🥗</span>
                <h4>Nutrition Tracking</h4>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🏃</span>
                <h4>Community Support</h4>
              </div>
            </div>
          </div>
          <div className="image-container">
            <img src={fitnessImage} alt="Fitness Tracking Dashboard" className="about-image" />
            <div className="image-stats">
              <div className="stat">
                <h4>50K+</h4>
                <p>Active Users</p>
              </div>
              <div className="stat">
                <h4>98%</h4>
                <p>Satisfaction Rate</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}