import React, { useState, useEffect } from "react";
import axios from "axios";

const TrainingProgress = () => {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    const fetchTrainings = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/api/training/1");
        setTrainings(response.data);
      } catch (error) {
        console.error("Error fetching trainings:", error);
      }
    };

    fetchTrainings();
  }, []);

  return (
    <div className="training-progress">
      <h3>Your Training Progress</h3>
      <ul>
        {trainings.map((training) => (
          <li key={training.id}>
            {training.program_name} - {training.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrainingProgress;    
