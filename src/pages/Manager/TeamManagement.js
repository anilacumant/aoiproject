import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TeamManagement.css";

const TeamManagement = ({ managerId }) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:5000/api/team_management/employees/2`
        );
        setEmployees(response.data);
      } catch (err) {
        setError("Failed to fetch team members.");
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, [managerId]);

  if (loading) {
    return <div className="team-management-container">Loading...</div>;
  }

  if (error) {
    return <div className="team-management-container">{error}</div>;
  }

  return (
    <div className="team-management-container">
      <header className="team-management-header">Team Management</header>
      {employees.length === 0 ? (
        <div className="no-employees-message">No employees found.</div>
      ) : (
        <table className="employee-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Skills</th>
              <th>Certifications</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.name}</td>
                <td>{employee.skills || "N/A"}</td>
                <td>{employee.certifications || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TeamManagement;
