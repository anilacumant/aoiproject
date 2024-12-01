import React, { useEffect, useState } from "react";
import axios from "axios";
import "./EmployeeFeedback.css";

const EmployeeFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/api/feedback/1"); // Replace employee_id dynamically
        setFeedbacks(response.data);
      } catch (err) {
        setError("Failed to fetch feedback.");
      }
    };
    fetchFeedbacks();
  }, []);

  if (error) {
    return <div className="feedback-container">{error}</div>;
  }

  return (
    <div className="feedback-container">
      <h2>Employee Feedback</h2>
      <ul>
        {feedbacks.map((fb) => (
          <li key={fb.id}>
            <p><strong>Comment:</strong> {fb.comments}</p>
            <p><strong>Sentiment:</strong> {fb.sentiment}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeFeedback;
