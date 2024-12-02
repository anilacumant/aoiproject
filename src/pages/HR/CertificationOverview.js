import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CertificationOverview.css";

const HRPortal = () => {
  const [certifications, setCertifications] = useState([]);
  const [error, setError] = useState("");

  // Fetch certifications on load
  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/api/certifications/hr/overview");
        setCertifications(response.data);
      } catch (err) {
        setError("Failed to fetch certifications data.");
      }
    };

    fetchCertifications();
  }, []);

  // Handle sending notification
  const sendNotification = async (employeeId, certificationName) => {
    try {
      await axios.post(`http://127.0.0.1:5000/api/certifications/send-notification/${employeeId}`, {
        certification_name: certificationName,
      });
      alert(`Notification sent for certification '${certificationName}'.`);
    } catch (err) {
      alert("Failed to send notification. Please try again.");
    }
  };

  return (
    <div className="hr-portal-container">
      <header className="hr-portal-header">Certification Overview</header>
      {error && <div className="error-message">{error}</div>}
      <table className="hr-portal-table">
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Manager Name</th>
            <th>Certification</th>
            <th>Expiry Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {certifications.map((cert) => (
            <tr key={`${cert.employee_id}-${cert.certification_name}`}>
              <td>{cert.employee_name}</td>
              <td>{cert.manager_name}</td>
              <td>{cert.certification_name}</td>
              <td>{cert.expiry_date || "N/A"}</td>
              <td>{cert.certification_status}</td>
              <td>
                <button
                  className="action-button notify"
                  onClick={() => sendNotification(cert.employee_id, cert.certification_name)}
                >
                  Send Notification
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HRPortal;
