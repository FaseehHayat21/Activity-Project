// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { FaEnvelope, FaLock, FaDumbbell, FaEye, FaEyeSlash } from 'react-icons/fa';
// import './CustomerLogin.css';

// const CustomerLogin = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setIsLoading(true);

//     try {
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 1500));
      
//       const response = await fetch("http://localhost:1000/api/auth/customer/login", {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ email: email, password: password })
//       });
      
//       const json = await response.json();
//       console.log("API Response:", json);

//       if (json.success === true) {
//         const token = json.authToken;
//         if (token) {
//           localStorage.setItem('token', token);
//           navigate("/customerDashboard");
//         } else {
//           setError('Login successful but no token received');
//         }
//       } else {
//         setError('Invalid email or password');
//       }
//     } catch (err) {
//       console.error('Login error:', err);
//       setError('Failed to connect to server. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   return (
//     <div className="login-page">
//       <div className="login-container">
//         {/* Left Side - Branding */}
//         <div className="login-branding">
//           <div className="brand-logo">
//             <FaDumbbell className="logo-icon" />
//             <div className="logo-text">
//               <span className="logo-name">FIT</span>
//               <span className="logo-name-accent">TRACK</span>
//             </div>
//           </div>
//           <div className="brand-content">
//             <h1>Welcome Back!</h1>
//             <p>
//               Continue your fitness journey with personalized workouts, 
//               progress tracking, and expert nutrition guidance.
//             </p>
//             <div className="brand-features">
//               <div className="feature">
//                 <div className="feature-icon">🏋️</div>
//                 <span>Track Workouts</span>
//               </div>
//               <div className="feature">
//                 <div className="feature-icon">📈</div>
//                 <span>Monitor Progress</span>
//               </div>
//               <div className="feature">
//                 <div className="feature-icon">🥗</div>
//                 <span>Nutrition Plans</span>
//               </div>
//             </div>
//           </div>
//           <div className="brand-footer">
//             <p>Don't have an account?</p>
//             <Link to="/signup" className="signup-link">Create Account</Link>
//           </div>
//         </div>

//         {/* Right Side - Form */}
//         <div className="login-form-container">
//           <div className="form-header">
//             <h2>Sign In</h2>
//             <p>Enter your credentials to continue</p>
//           </div>

//           <form className="login-form" onSubmit={handleSubmit}>
//             {error && (
//               <div className="error-message">
//                 <span>{error}</span>
//               </div>
//             )}

//             <div className="input-group">
//               <div className="input-icon">
//                 <FaEnvelope />
//               </div>
//               <input
//                 type="email"
//                 id="email"
//                 value={email}
//                 onChange={(e) => {
//                   setEmail(e.target.value);
//                   setError('');
//                 }}
//                 placeholder="Email Address"
//                 required
//                 disabled={isLoading}
//               />
//             </div>

//             <div className="input-group">
//               <div className="input-icon">
//                 <FaLock />
//               </div>
//               <input
//                 type={showPassword ? "text" : "password"}
//                 id="password"
//                 value={password}
//                 onChange={(e) => {
//                   setPassword(e.target.value);
//                   setError('');
//                 }}
//                 placeholder="Password"
//                 required
//                 disabled={isLoading}
//               />
//               <button 
//                 type="button" 
//                 className="password-toggle"
//                 onClick={() => setShowPassword(!showPassword)}
//                 disabled={isLoading}
//               >
//                 {showPassword ? <FaEyeSlash /> : <FaEye />}
//               </button>
//             </div>

//             <div className="form-options">
//               <div className="remember-me">
//                 <input type="checkbox" id="remember" />
//                 <label htmlFor="remember">Remember me</label>
//               </div>
//               <Link to="/forgot-password" className="forgot-password">
//                 Forgot password?
//               </Link>
//             </div>

//             <button type="submit" className="login-button" disabled={isLoading}>
//               {isLoading ? (
//                 <>
//                   <span className="spinner"></span>
//                   Signing In...
//                 </>
//               ) : (
//                 'Sign In'
//               )}
//             </button>

//             <div className="divider">
//               <span>or continue with</span>
//             </div>

//             <div className="social-login">
//               <button type="button" className="social-button google">
//                 <svg className="social-icon" viewBox="0 0 24 24">
//                   <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
//                   <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
//                   <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
//                   <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
//                 </svg>
//                 <span>Google</span>
//               </button>
//               <button type="button" className="social-button github">
//                 <svg className="social-icon" viewBox="0 0 24 24">
//                   <path fill="currentColor" d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
//                 </svg>
//                 <span>GitHub</span>
//               </button>
//             </div>

//             <div className="signup-redirect">
//               <p>
//                 New to FitTrack? <Link to="/signup">Create an account</Link>
//               </p>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CustomerLogin;


import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaEnvelope, FaLock, FaDumbbell, FaEye, FaEyeSlash } from 'react-icons/fa';
import './CustomerLogin.css';

const CustomerLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:1000/api/auth/customer/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email, password: password })
      });
      
      const json = await response.json();
      console.log("API Response:", json);

      if (json.success === true || json.authToken) {
        const token = json.authToken;
        const userType = json.userType || 'customer'; // Default to customer if not specified
        const userId = json.userid || json.id; // Get user ID
        
        if (token) {
          // Store all user data in localStorage
          localStorage.setItem('token', token);
          localStorage.setItem('usertype', userType);
          localStorage.setItem('userid', userId);
          
          console.log('User Type:', userType);
          console.log('User ID:', userId);
          
          // Redirect based on user type
          if (userType === 'trainer') {
            navigate('/fitnessroutines'); // Redirect trainers to fitness routines
          } else {
            navigate('/customerDashboard'); // Redirect customers to dashboard
          }
        } else {
          setError('Login successful but no token received');
        }
      } else {
        setError(json.error || 'Invalid email or password');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Failed to connect to server. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        {/* Left Side - Branding */}
        <div className="login-branding">
          <div className="brand-logo">
            <FaDumbbell className="logo-icon" />
            <div className="logo-text">
              <span className="logo-name">FIT</span>
              <span className="logo-name-accent">TRACK</span>
            </div>
          </div>
          <div className="brand-content">
            <h1>Welcome Back!</h1>
            <p>
              Continue your fitness journey with personalized workouts, 
              progress tracking, and expert nutrition guidance.
            </p>
            <div className="brand-features">
              <div className="feature">
                <div className="feature-icon">🏋️</div>
                <span>Track Workouts</span>
              </div>
              <div className="feature">
                <div className="feature-icon">📈</div>
                <span>Monitor Progress</span>
              </div>
              <div className="feature">
                <div className="feature-icon">🥗</div>
                <span>Nutrition Plans</span>
              </div>
            </div>
          </div>
          <div className="brand-footer">
            <p>Don't have an account?</p>
            <Link to="/signup" className="signup-link">Create Account</Link>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="login-form-container">
          <div className="form-header">
            <h2>Sign In</h2>
            <p>Enter your credentials to continue</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            {error && (
              <div className="error-message">
                <span>{error}</span>
              </div>
            )}

            <div className="input-group">
              <div className="input-icon">
                <FaEnvelope />
              </div>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
                placeholder="Email Address"
                required
                disabled={isLoading}
              />
            </div>

            <div className="input-group">
              <div className="input-icon">
                <FaLock />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                placeholder="Password"
                required
                disabled={isLoading}
              />
              <button 
                type="button" 
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <div className="form-options">
              <div className="remember-me">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">Remember me</label>
              </div>
              <Link to="/forgot-password" className="forgot-password">
                Forgot password?
              </Link>
            </div>

            <button type="submit" className="login-button" disabled={isLoading}>
              {isLoading ? (
                <>
                  <span className="spinner"></span>
                  Signing In...
                </>
              ) : (
                'Sign In'
              )}
            </button>

            <div className="divider">
              <span>or continue with</span>
            </div>

            <div className="social-login">
              <button type="button" className="social-button google">
                <svg className="social-icon" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span>Google</span>
              </button>
              <button type="button" className="social-button github">
                <svg className="social-icon" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <span>GitHub</span>
              </button>
            </div>

            <div className="signup-redirect">
              <p>
                New to FitTrack? <Link to="/signup">Create an account</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CustomerLogin;