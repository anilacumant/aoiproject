import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CertificationRequests.css";

const CertificationRequests = ({ managerId }) => {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:5000/api/certifications/pending/2`
        );
        setRequests(response.data);
      } catch (err) {
        setError("Failed to fetch certification requests.");
      }
    };

    fetchRequests();
  }, [managerId]);

  const handleApprove = async (id) => {
    try {
      await axios.put(`http://127.0.0.1:5000/api/certifications/approve/${id}`, {
        approval_status: "Approved",
      });
      setRequests((prev) => prev.filter((req) => req.id !== id));
      alert("Certification approved!");
    } catch (err) {
      alert("Failed to approve certification.");
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.put(`http://127.0.0.1:5000/api/certifications/approve/${id}`, {
        approval_status: "Rejected",
      });
      setRequests((prev) => prev.filter((req) => req.id !== id));
      alert("Certification rejected!");
    } catch (err) {
      alert("Failed to reject certification.");
    }
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="certification-container">
      <h2 className="certification-header">Pending Certification Requests</h2>
      {requests.length === 0 ? (
        <div className="no-requests-message">No pending requests</div>
      ) : (
        <table className="certification-table">
          <thead>
            <tr>
              <th>Request ID</th>
              <th>Employee ID</th>
              <th>Certification Name</th>
              <th>Requested Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req.id}>
                <td>{req.id}</td>
                <td>{req.employee_id}</td>
                <td>{req.certification_name}</td>
                <td>{new Date(req.requested_date).toLocaleDateString()}</td>
                <td>
                  <button
                    className="action-button approve"
                    onClick={() => handleApprove(req.id)}
                  >
                    Approve
                  </button>
                  <button
                    className="action-button reject"
                    onClick={() => handleReject(req.id)}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CertificationRequests;
