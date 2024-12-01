import React, { useEffect, useState } from "react";
import axios from "axios";
import "./LeaveApproval.css";

const LeaveApproval = () => {
  const managerId = 2; // Hardcoded manager ID
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:5000/api/leaves/manager/${managerId}`
        );
        setLeaveRequests(response.data);
      } catch (err) {
        setError("Failed to fetch leave requests.");
      } finally {
        setLoading(false);
      }
    };

    fetchLeaveRequests();
  }, []);

  const handleAction = async (leaveId, status) => {
    try {
      await axios.put(`http://127.0.0.1:5000/api/leaves/update/${leaveId}`, {
        status,
      });
      setLeaveRequests((prevRequests) =>
        prevRequests.filter((request) => request.id !== leaveId)
      );
      alert(`Leave request ${status.toLowerCase()} successfully.`);
    } catch (err) {
      alert("Failed to update leave request. Please try again.");
    }
  };

  if (loading) {
    return <div className="leave-approval-container">Loading...</div>;
  }

  if (error) {
    return <div className="leave-approval-container">{error}</div>;
  }

  return (
    <div className="leave-approval-container">
      <header className="leave-approval-header">Leave Approval</header>
      {leaveRequests.length === 0 ? (
        <div className="no-requests-message">No leave requests found.</div>
      ) : (
        <table className="leave-table">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Employee Name</th>
              <th>Type</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {leaveRequests.map((leave) => (
              <tr key={leave.id}>
                <td>{leave.employee_id}</td>
                <td>{leave.employee_name}</td>
                <td>{leave.type}</td>
                <td>{leave.start_date}</td>
                <td>{leave.end_date}</td>
                <td>{leave.status}</td>
                <td>
                  <button
                    className="action-button approve"
                    onClick={() => handleAction(leave.id, "Approved")}
                  >
                    Approve
                  </button>
                  <button
                    className="action-button reject"
                    onClick={() => handleAction(leave.id, "Rejected")}
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

export default LeaveApproval;
