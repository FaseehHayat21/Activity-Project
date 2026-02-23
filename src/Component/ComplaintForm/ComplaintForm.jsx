// import React, { useState } from "react";
// import { FaExclamationTriangle } from "react-icons/fa";
// import "./ComplaintForm.css";

// const ComplaintForm = () => {
//     const [complaintType, setComplaintType] = useState("fraud");
//     const [description, setDescription] = useState("");
//     const [orderId, setOrderId] = useState("");
//     const [evidence, setEvidence] = useState(null);
//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [successMessage, setSuccessMessage] = useState("");
//     const [isSubmitting, setIsSubmitting] = useState(false);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setIsSubmitting(true);
        
//         try {
//             const formData = new FormData();
//             formData.append('complaintType', complaintType);
//             formData.append('description', description);
//             formData.append('orderId', orderId);
//             formData.append('name', name);
//             formData.append('email', email);
//             if (evidence) formData.append('evidence', evidence);

//             const response = await fetch("http://localhost:1000/api/auth/complaint", {
//                 method: "POST",
//                 body: formData,
//             });

//             if (response.ok) {
//                 setSuccessMessage("Your complaint has been submitted successfully. Our team will review it shortly.");
//                 // Reset form
//                 setComplaintType("fraud");
//                 setDescription("");
//                 setOrderId("");
//                 setEvidence(null);
//                 setName("");
//                 setEmail("");
//             } else {
//                 setSuccessMessage("Failed to submit complaint. Please try again.");
//             }
//         } catch (error) {
//             console.error("Error submitting complaint:", error);
//             setSuccessMessage("Failed to submit complaint. Please try again.");
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     const handleFileChange = (e) => {
//         if (e.target.files[0]) {
//             setEvidence(e.target.files[0]);
//         }
//     };

//     return (
//         <div className="complaint-form-container">
//             {/* Left Side */}
//             <div className="complaint-left">
//                 <h2>Report an Issue</h2>
//                 <p>
//                     <FaExclamationTriangle className="warning-icon" />
//                     Help us maintain a safe marketplace by reporting any fraudulent activity or issues.
//                 </p>
//                 <div className="complaint-guidelines">
//                     <h4>What to report:</h4>
//                     <ul>
//                         <li>Counterfeit or fake products</li>
//                         <li>Payment fraud</li>
//                         <li>Seller misconduct</li>
//                         <li>Order not received</li>
//                         <li>Product not as described</li>
//                     </ul>
//                 </div>
//             </div>

//             {/* Right Side */}
//             <div className="complaint-right">
//                 <form onSubmit={handleSubmit}>
//                     <div className="form-group">
//                         <label>Type of Complaint</label>
//                         <select 
//                             value={complaintType}
//                             onChange={(e) => setComplaintType(e.target.value)}
//                             required
//                         >
//                             <option value="fraud">Fraud</option>
//                             <option value="non-delivery">Non-Delivery</option>
//                             <option value="wrong-item">Wrong Item Received</option>
//                             <option value="defective">Defective Product</option>
//                             <option value="seller-misconduct">Seller Misconduct</option>
//                             <option value="other">Other</option>
//                         </select>
//                     </div>

//                     <div className="form-group">
//                         <label>Order ID (if applicable)</label>
//                         <input
//                             type="text"
//                             placeholder="Order ID"
//                             value={orderId}
//                             onChange={(e) => setOrderId(e.target.value)}
//                         />
//                     </div>

//                     <div className="form-group">
//                         <label>Detailed Description*</label>
//                         <textarea
//                             placeholder="Please describe your complaint in detail..."
//                             value={description}
//                             onChange={(e) => setDescription(e.target.value)}
//                             rows="5"
//                             required
//                         />
//                     </div>

//                     <div className="form-group">
//                         <label>Evidence (screenshots, photos, etc.)</label>
//                         <input
//                             type="file"
//                             onChange={handleFileChange}
//                             accept="image/*,.pdf"
//                         />
//                         {evidence && (
//                             <div className="file-preview">
//                                 <span>{evidence.name}</span>
//                             </div>
//                         )}
//                     </div>

//                     <div className="form-group">
//                         <label>Your Name*</label>
//                         <input
//                             type="text"
//                             placeholder="Your Name"
//                             value={name}
//                             onChange={(e) => setName(e.target.value)}
//                             required
//                         />
//                     </div>

//                     <div className="form-group">
//                         <label>Your Email*</label>
//                         <input
//                             type="email"
//                             placeholder="Your Email"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             required
//                         />
//                     </div>

//                     <button type="submit" disabled={isSubmitting}>
//                         {isSubmitting ? "Submitting..." : "Submit Complaint"}
//                     </button>
//                 </form>

//                 {successMessage && (
//                     <div className={`success-message ${isSubmitting ? "submitting" : ""}`}>
//                         {successMessage}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default ComplaintForm;

import React, { useState } from "react";
import { FaExclamationTriangle, FaPaperclip, FaCheck } from "react-icons/fa";
import { motion } from "framer-motion";
import "./ComplaintForm.css";

const ComplaintForm = () => {
    const [complaintType, setComplaintType] = useState("fraud");
    const [description, setDescription] = useState("");
    const [orderId, setOrderId] = useState("");
    const [evidence, setEvidence] = useState(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            const formData = new FormData();
            formData.append('complaintType', complaintType);
            formData.append('description', description);
            formData.append('orderId', orderId);
            formData.append('name', name);
            formData.append('email', email);
            if (evidence) formData.append('evidence', evidence);

            const response = await fetch("http://localhost:1000/api/auth/complaint", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
             // Reset form after success
                  setTimeout(() => {
                setComplaintType("fraud");
                setDescription("");
                setOrderId("");
                setEvidence(null);
                setName("");
                setEmail("");
                setIsSubmitting(false);
                setSubmitSuccess(false);
            }, 3000);
            } else {
                setSuccessMessage("Failed to submit complaint. Please try again.");
            }
            setSubmitSuccess(true);
            
           
        } catch (error) {
            console.error("Error submitting complaint:", error);
            setIsSubmitting(false);
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setEvidence(e.target.files[0]);
        }
    };

    return (
        <motion.div 
            className="complaint-form-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* Left Side - Information Panel */}
            <div className="complaint-left">
                <div className="info-card">
                    <div className="header-accent"></div>
                    <h2>
                        <FaExclamationTriangle className="warning-icon" />
                        Report an Issue
                    </h2>
                    <p className="subtitle">
                        Help us maintain a trustworthy marketplace by reporting any concerns.
                    </p>
                    
                    <div className="info-section">
                        <h4>When to Report</h4>
                        <ul>
                            <li>Suspicious seller activity</li>
                            <li>Counterfeit products</li>
                            <li>Payment irregularities</li>
                            <li>Items not as described</li>
                            <li>Non-delivery issues</li>
                        </ul>
                    </div>
                    
                    <div className="info-section">
                        <h4>What We Need</h4>
                        <ul>
                            <li>Detailed description</li>
                            <li>Order reference</li>
                            <li>Supporting evidence</li>
                            <li>Your contact information</li>
                        </ul>
                    </div>
                    
                    <div className="assurance">
                        <div className="assurance-icon">
                            <FaCheck />
                        </div>
                        <p>All reports are confidential and reviewed within 24 hours</p>
                    </div>
                </div>
            </div>

            {/* Right Side - Form Panel */}
            <div className="complaint-right">
                <div className="form-card">
                    {submitSuccess ? (
                        <motion.div 
                            className="success-state"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                        >
                            <div className="success-icon">
                                <FaCheck />
                            </div>
                            <h3>Complaint Submitted</h3>
                            <p>Thank you for your report. Our team will review it shortly.</p>
                            <p>A confirmation has been sent to your email.</p>
                        </motion.div>
                    ) : (
                        <>
                            <div className="form-header">
                                <h3>File a Complaint</h3>
                                <p>Please provide detailed information about your issue</p>
                            </div>
                            
                            <form onSubmit={handleSubmit}>
                                <div className="form-groupS">
                                    <label>Issue Type*</label>
                                    <select 
                                        value={complaintType}
                                        onChange={(e) => setComplaintType(e.target.value)}
                                        className="styled-select"
                                        required
                                    >
                                        <option value="fraud">Suspected Fraud</option>
                                        <option value="non-delivery">Non-Delivery</option>
                                        <option value="wrong-item">Wrong Item Received</option>
                                        <option value="defective">Defective Product</option>
                                        <option value="seller-misconduct">Seller Misconduct</option>
                                        <option value="other">Other Issue</option>
                                    </select>
                                </div>

                                <div className="form-groupS">
                                    <label>Order/Transaction ID</label>
                                    <input
                                        type="text"
                                        placeholder="e.g., ORD-123456"
                                        value={orderId}
                                        onChange={(e) => setOrderId(e.target.value)}
                                        className="styled-input"
                                    />
                                </div>

                                <div className="form-groupS">
                                    <label>Detailed Description*</label>
                                    <textarea
                                        placeholder="Please describe your issue in detail..."
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        rows="5"
                                        className="styled-textarea"
                                        required
                                    />
                                </div>

                                <div className="form-groupS file-upload">
                                    <label>Supporting Evidence</label>
                                    <div className="upload-area">
                                        <input
                                            type="file"
                                            id="evidence-upload"
                                            onChange={handleFileChange}
                                            accept="image/*,.pdf"
                                        />
                                        <label htmlFor="evidence-upload" className="upload-label">
                                            <FaPaperclip className="clip-icon" />
                                            {evidence ? (
                                                <span className="file-name">{evidence.name}</span>
                                            ) : (
                                                <span>Click to upload screenshots or documents</span>
                                            )}
                                        </label>
                                    </div>
                                    <p className="file-hint">Max file size: 5MB (JPG, PNG, PDF)</p>
                                </div>

                                <div className="form-groupS">
                                    <label>Your Name*</label>
                                    <input
                                        type="text"
                                        placeholder="Full name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="styled-input"
                                        required
                                    />
                                </div>

                                <div className="form-groupS">
                                    <label>Your Email*</label>
                                    <input
                                        type="email"
                                        placeholder="email@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="styled-input"
                                        required
                                    />
                                </div>

                                <motion.button 
                                    type="submit" 
                                    className="submit-btn"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <span className="spinner"></span>
                                    ) : (
                                        "Submit Complaint"
                                    )}
                                </motion.button>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default ComplaintForm;