import React from 'react';
import './Services.css';
import { FaDumbbell, FaChartLine, FaAppleAlt, FaUsers, FaBrain, FaMobileAlt } from 'react-icons/fa';

export default function Services() {
  const services = [
    {
      icon: <FaDumbbell />,
      title: "AI-Powered Workouts",
      description: "Personalized workout plans that adapt to your progress, fitness level, and goals using advanced AI algorithms.",
      features: ["Adaptive Workouts", "Form Analysis", "Progress Tracking"]
    },
    {
      icon: <FaChartLine />,
      title: "Progress Analytics",
      description: "Comprehensive analytics dashboard showing your fitness journey with detailed metrics and insights.",
      features: ["Real-time Metrics", "Performance Trends", "Goal Tracking"]
    },
    {
      icon: <FaAppleAlt />,
      title: "Nutrition Tracking",
      description: "Smart nutrition tracking with meal planning, calorie counting, and macronutrient analysis.",
      features: ["Meal Plans", "Calorie Counter", "Nutrition Reports"]
    },
    {
      icon: <FaUsers />,
      title: "Community Support",
      description: "Connect with fitness enthusiasts, join challenges, and get motivated by our supportive community.",
      features: ["Group Challenges", "Expert Support", "Progress Sharing"]
    },
    {
      icon: <FaBrain />,
      title: "Smart Coaching",
      description: "Virtual coaching with personalized recommendations and real-time feedback on your workouts.",
      features: ["Form Correction", "Voice Guidance", "Rest Timer"]
    },
    {
      icon: <FaMobileAlt />,
      title: "Mobile Experience",
      description: "Seamless experience across all devices with offline mode and real-time sync capabilities.",
      features: ["Offline Mode", "Cross-platform Sync", "Wearable Integration"]
    }
  ];

  return (
    <section className="services-section" id="Service">
      <div className="services-container">
        <div className="services-header">
          <div className="services-badge">
            <span>OUR SERVICES</span>
          </div>
          <h2>Comprehensive Fitness Solutions</h2>
          <p className="services-subtitle">
            We provide everything you need for a successful fitness journey, 
            from personalized workouts to advanced tracking and community support.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <div className="service-card" key={index}>
              <div className="service-icon">
                {service.icon}
              </div>
              <h3>{service.title}</h3>
              <p className="service-description">{service.description}</p>
              <div className="service-features">
                {service.features.map((feature, idx) => (
                  <span className="feature-tag" key={idx}>{feature}</span>
                ))}
              </div>
              <button className="service-cta">
                Learn More
                <span className="cta-arrow">→</span>
              </button>
            </div>
          ))}
        </div>

        <div className="services-cta">
          <div className="cta-content">
            <h3>Ready to Transform Your Fitness Journey?</h3>
            <p>Join 50,000+ users who have achieved their fitness goals with FitTrack.</p>
          </div>
          <button className="primary-cta">
            Start Your Free Trial
          </button>
        </div>
      </div>
    </section>
  );
}