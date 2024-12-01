import React, { useEffect, useState } from "react";
import axios from "axios";
import "./EmployeeCompetencies.css";

const EmployeeCompetencies = () => {
  const [competencies, setCompetencies] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCompetencies = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/api/competencies/employee/1"); // Replace employee_id dynamically
        setCompetencies(response.data);
      } catch (err) {
        setError("Failed to fetch competencies.");
      }
    };
    fetchCompetencies();
  }, []);

  if (error) {
    return <div className="competencies-container">{error}</div>;
  }

  return (
    <div className="competencies-container">
      <h2>Employee Competencies</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Type</th>
            <th>Status</th>
            <th>Expiry Date</th>
          </tr>
        </thead>
        <tbody>
          {competencies.map((comp) => (
            <tr key={comp.competency_id}>
              <td>{comp.name}</td>
              <td>{comp.description}</td>
              <td>{comp.type}</td>
              <td>{comp.status}</td>
              <td>{comp.expiry_date || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeCompetencies;
