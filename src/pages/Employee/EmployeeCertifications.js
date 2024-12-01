import React, { useState, useEffect } from "react";
import axios from "axios";
import "./EmployeeCertifications.css";

const EmployeeCertifications = ({ employeeId }) => {
  const [certifications, setCertifications] = useState([]);
  const [newCertification, setNewCertification] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:5000/api/certifications/employee/1`
        );
        setCertifications(response.data);
      } catch (err) {
        setError("Failed to fetch certifications.");
      } finally {
        setLoading(false);
      }
    };

    fetchCertifications();
  }, [employeeId]);

  const handleApply = async () => {
    if (!newCertification) {
      alert("Please enter a certification name.");
      return;
    }

    try {
      await axios.post("http://127.0.0.1:5000/api/certifications/request", {
        employee_id: employeeId,
        certification_name: newCertification,
        manager_id: 2, // Replace with actual manager ID if needed
      });
      alert("Certification request submitted!");
      setNewCertification("");
    } catch (err) {
      alert("Failed to submit certification request.");
    }
  };

  if (loading) {
    return <div className="certification-container">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="certification-container">
      <h2 className="certification-header">My Certifications</h2>
      <table className="certification-table">
        <thead>
          <tr>
            <th>Certification Name</th>
            <th>Status</th>
            <th>Expiry Date</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {certifications.map((cert) => (
            <tr key={cert.competency_name}>
              <td>{cert.competency_name}</td>
              <td>{cert.status}</td>
              <td>
                {cert.expiry_date
                  ? new Date(cert.expiry_date).toLocaleDateString()
                  : "N/A"}
              </td>
              <td>{cert.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="apply-section">
        <input
          type="text"
          placeholder="Enter certification name"
          value={newCertification}
          onChange={(e) => setNewCertification(e.target.value)}
          className="certification-input"
        />
        <button onClick={handleApply} className="apply-button">
          Apply for Certification
        </button>
      </div>
    </div>
  );
};

export default EmployeeCertifications;
