import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CompetencyTracker.css";

const CompetencyTracker = ({ employeeId }) => {
  const [competencies, setCompetencies] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCompetencies = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:5000/api/competencies/employee/2`
        );
        setCompetencies(response.data);
      } catch (err) {
        setError("Failed to fetch competencies.");
      }
    };

    fetchCompetencies();
  }, [employeeId]);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="competency-container">
      <h2 className="competency-header">My Competencies</h2>
      {competencies.length === 0 ? (
        <div className="no-competencies-message">No competencies assigned.</div>
      ) : (
        <table className="competency-table">
          <thead>
            <tr>
              <th>Competency Name</th>
              <th>Status</th>
              <th>Renewal Date</th>
            </tr>
          </thead>
          <tbody>
            {competencies.map((comp) => (
              <tr key={comp.competency_id}>
                <td>{comp.name}</td>
                <td>{comp.status}</td>
                <td>
                  {comp.renewal_date
                    ? new Date(comp.renewal_date).toLocaleDateString()
                    : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CompetencyTracker;
