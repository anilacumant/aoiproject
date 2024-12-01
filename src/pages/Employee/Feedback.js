import React, { useState, useEffect } from "react";
import axios from "axios";

const Feedback = () => {
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/api/feedback/1");
        setFeedback(response.data);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
    };

    fetchFeedback();
  }, []);

  return (
    <div className="feedback">
      <h3>Your Feedback</h3>
      <ul>
        {feedback.map((fb) => (
          <li key={fb.id}>
            {fb.comments} - {fb.sentiment}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Feedback;
