import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import "./FeedbackForm.css";

const FeedbackForm = () => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(null);
    const [comments, setComments] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const feedback = { rating, comments, name, email, date: new Date().toISOString() };
            const response = await fetch("http://localhost:1000/api/auth/feedback", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(feedback),
            });

            if (response.ok) {
                setSuccessMessage("Thank you for your feedback!");
                setRating(0);
                setComments("");
                setName("");
                setEmail("");
            } else {
                setSuccessMessage("Failed to submit feedback. Please try again.");
            }
        } catch (error) {
            console.error("Error submitting feedback:", error);
            setSuccessMessage("Failed to submit feedback. Please try again.");
        }
    };

    return (
        <div className="feedback-form-container">
            {/* Left Side */}
            <div className="feedback-left">
                <h2>We Value Your Feedback</h2>
                <p>Your insights help us improve and provide better experiences.</p>
            </div>

            {/* Right Side */}
            <div className="feedback-right">
                <form onSubmit={handleSubmit}>
                    {/* Star Rating */}
                    <div className="star-rating">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <FaStar
                                key={star}
                                className={star <= (hover || rating) ? "star active" : "star"}
                                onMouseEnter={() => setHover(star)}
                                onMouseLeave={() => setHover(null)}
                                onClick={() => setRating(star)}
                            />
                        ))}
                    </div>

                    <textarea
                        placeholder="Write your comments here..."
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                        rows="4"
                        required
                    />

                    <input
                        type="text"
                        placeholder="Your Name (Optional)"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <input
                        type="email"
                        placeholder="Your Email (Optional)"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <button type="submit">Submit Feedback</button>
                </form>

                {successMessage && <p className="success-message">{successMessage}</p>}
            </div>
        </div>
    );
};

export default FeedbackForm;
