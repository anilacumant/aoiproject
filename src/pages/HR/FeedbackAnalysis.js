import React, { useEffect, useState } from "react";
import axios from "axios";
import "./FeedbackViewHR.css";

const FeedbackViewHR = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/api/feedback/hr");
        setFeedbacks(response.data);
      } catch (err) {
        setError("Failed to fetch feedback.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  if (loading) {
    return <div className="feedback-container">Loading...</div>;
  }

  if (error) {
    return <div className="feedback-container">{error}</div>;
  }

  return (
    <div className="feedback-container">
      <header className="feedback-header">Employee Feedback</header>
      {feedbacks.length === 0 ? (
        <div className="no-feedback-message">No feedback available.</div>
      ) : (
        <table className="feedback-table">
          <thead>
            <tr>
              <th>Employee Name</th>
              <th>Manager Name</th>
              <th>Comments</th>
              <th>Sentiment</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((fb) => (
              <tr key={fb.id}>
                <td>{fb.employee_name}</td>
                <td>{fb.manager_name}</td>
                <td>{fb.comments}</td>
                <td>{fb.sentiment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FeedbackViewHR;
