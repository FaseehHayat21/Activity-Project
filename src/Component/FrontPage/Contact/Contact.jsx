import React, { useState } from 'react';
import './Contact.css';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock, FaPaperPlane, FaCheckCircle } from 'react-icons/fa';
import { MdError } from 'react-icons/md';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // null, 'success', 'error'

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: <FaMapMarkerAlt />,
      title: "Our Location",
      details: ["Virtual University of Pakistan", "Lahore, Pakistan"],
      description: "Working remotely with global reach"
    },
    {
      icon: <FaPhoneAlt />,
      title: "Contact Number",
      details: ["+92 300 1234567", "+92 42 1234567"],
      description: "Mon to Fri 9am to 6pm"
    },
    {
      icon: <FaEnvelope />,
      title: "Email Address",
      details: ["nida.noureen@example.com", "support@fittrack.com"],
      description: "Send us your query anytime!"
    },
    {
      icon: <FaClock />,
      title: "Working Hours",
      details: ["Monday - Friday: 9am - 6pm", "Saturday: 10am - 4pm"],
      description: "Sunday: Closed"
    }
  ];

  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        <div className="contact-header">
          <div className="contact-badge">
            <span>GET IN TOUCH</span>
          </div>
          <h2>Contact FitTrack</h2>
          <p className="contact-subtitle">
            Have questions about our fitness platform? We're here to help you 
            achieve your fitness goals. Reach out to us anytime.
          </p>
        </div>

        <div className="contact-content">
          {/* Contact Info Cards */}
          <div className="contact-info-section">
            <div className="contact-info-grid">
              {contactInfo.map((info, index) => (
                <div className="contact-info-card" key={index}>
                  <div className="info-icon">
                    {info.icon}
                  </div>
                  <h4>{info.title}</h4>
                  <div className="info-details">
                    {info.details.map((detail, idx) => (
                      <p key={idx}>{detail}</p>
                    ))}
                  </div>
                  <p className="info-description">{info.description}</p>
                </div>
              ))}
            </div>

            <div className="support-note">
              <div className="support-icon">💪</div>
              <div className="support-content">
                <h4>24/7 Support Available</h4>
                <p>
                  Our fitness experts are available to help you with workout plans, 
                  nutrition guidance, and technical support around the clock.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-section">
            <div className="form-header">
              <h3>Send Us a Message</h3>
              <p>Fill out the form below and we'll get back to you within 24 hours.</p>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Your Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                >
                  <option value="">Select a topic</option>
                  <option value="general">General Inquiry</option>
                  <option value="technical">Technical Support</option>
                  <option value="billing">Billing Question</option>
                  <option value="feedback">Feedback/Suggestions</option>
                  <option value="partnership">Partnership</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message">Your Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your fitness goals or any questions you have..."
                  rows="5"
                  required
                ></textarea>
              </div>

              {/* Submit Status Messages */}
              {submitStatus === 'success' && (
                <div className="submit-success">
                  <FaCheckCircle />
                  <span>Message sent successfully! We'll get back to you soon.</span>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="submit-error">
                  <MdError />
                  <span>Something went wrong. Please try again later.</span>
                </div>
              )}

              <button 
                type="submit" 
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner"></span>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <FaPaperPlane className="send-icon" />
                  </>
                )}
              </button>
            </form>

            <div className="form-footer">
              <p className="privacy-note">
                <span className="asterisk">*</span> Required fields
              </p>
              <p className="response-time">
                <strong>Response Time:</strong> We typically respond within 24 hours
              </p>
            </div>
          </div>
        </div>

        {/* Map/Location Section */}
        <div className="location-section">
          <div className="location-header">
            <h3>Virtual University Location</h3>
            <p>As a Virtual University student, I work remotely but serve clients globally.</p>
          </div>
          <div className="location-content">
            <div className="location-details">
              <div className="location-card">
                <h4>Virtual University Campus</h4>
                <p>M.A. Jinnah Campus, Defence Road, Off Raiwind Road, Lahore</p>
                <div className="location-features">
                  <span>Online Learning Platform</span>
                  <span>Digital Resources</span>
                  <span>Remote Collaboration</span>
                </div>
              </div>
              <div className="contact-cta">
                <p>Prefer a different way to connect?</p>
                <a href="mailto:nida.noureen@example.com" className="email-cta">
                  Email Directly
                </a>
              </div>
            </div>
            <div className="map-placeholder">
              <div className="map-overlay">
                <div className="map-marker">
                  <FaMapMarkerAlt />
                </div>
                <div className="map-text">
                  <h4>Virtual University</h4>
                  <p>Lahore, Pakistan</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}