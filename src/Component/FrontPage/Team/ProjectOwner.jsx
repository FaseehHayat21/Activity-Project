import React from 'react';
import './ProjectOwner.css';
import { FaGraduationCap, FaEnvelope, FaLinkedin, FaGithub, FaUserTie } from 'react-icons/fa';

export default function ProjectOwner() {
  return (
    <section className="project-owner-section" id="team">
      <div className="owner-container">
        <div className="owner-header">
          <div className="owner-badge">
            <span>PROJECT OWNER</span>
          </div>
         
        </div>

        <div className="owner-profile">
          <div className="owner-image-container">
            <div className="owner-image-wrapper">
              <div className="owner-image">
                <FaUserTie className="owner-icon" />
              </div>
              <div className="owner-image-overlay"></div>
            </div>
            <div className="owner-achievements">
              <div className="achievement">
                <h4>Project Lead</h4>
                <p>FitTrack Fitness Platform</p>
              </div>
              <div className="achievement">
                <h4>Student</h4>
                <p>Virtual University</p>
              </div>
            </div>
          </div>

          <div className="owner-info">
            <div className="owner-name-title">
              <h3>Nida Noureen</h3>
              <div className="owner-role">
                <span>Fitness Technology Innovator</span>
              </div>
            </div>

            <div className="owner-education">
              <div className="education-icon">
                <FaGraduationCap />
              </div>
              <div className="education-details">
                <h4>ADP Computer Science</h4>
                <p className="degree">Associate Degree Program</p>
                <p className="roll-number">BC230409854</p>
                <p className="university">Virtual University of Pakistan</p>
              </div>
            </div>

            <div className="owner-bio">
              <h4>About Nida</h4>
              <p>
                As the visionary behind FitTrack, Nida combines her passion for fitness with 
                cutting-edge technology to create transformative health solutions. With a strong 
                background in computer science, she leads the development of innovative features 
                that make fitness accessible and engaging for everyone.
              </p>
              <p>
                Her academic journey at Virtual University has equipped her with the technical 
                expertise to build robust, scalable fitness applications that truly make a 
                difference in people's lives.
              </p>
            </div>

            <div className="owner-skills">
              <h4>Core Competencies</h4>
              <div className="skills-list">
                <span className="skill-tag">Fitness Technology</span>
                <span className="skill-tag">AI & Machine Learning</span>
                <span className="skill-tag">User Experience Design</span>
                <span className="skill-tag">Project Management</span>
                <span className="skill-tag">Data Analytics</span>
                <span className="skill-tag">Mobile Development</span>
              </div>
            </div>

            <div className="owner-contact">
              <h4>Connect</h4>
              <div className="contact-links">
                <a href="mailto:nida.noureen@example.com" className="contact-link">
                  <FaEnvelope />
                  <span>Email</span>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="contact-link">
                  <FaLinkedin />
                  <span>LinkedIn</span>
                </a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="contact-link">
                  <FaGithub />
                  <span>GitHub</span>
                </a>
              </div>
            </div>

            <div className="owner-quote">
              <div className="quote-icon">"</div>
              <p className="quote-text">
                Fitness is not about being better than someone else. It's about being better 
                than you used to be. Technology should empower that journey, not complicate it.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}