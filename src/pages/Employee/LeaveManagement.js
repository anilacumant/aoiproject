import React, { useEffect, useState } from "react";
import axios from "axios";
import "./LeaveManagement.css";

const LeaveManagement = () => {
  const [leaves, setLeaves] = useState([]);
  const [form, setForm] = useState({
    start_date: "",
    end_date: "",
    type: "Vacation", // Default leave type
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const employeeId = 1; // Replace with dynamic employee_id if needed

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:5000/api/leaves/employee/${employeeId}`
        );
        setLeaves(response.data);
      } catch (err) {
        setError("Failed to fetch leave data.");
        console.error("Fetch Leaves Error:", err);
      }
    };
    fetchLeaves();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleApplyLeave = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.start_date || !form.end_date || !form.type) {
      setError("All fields are required.");
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:5000/api/leaves/apply", {
        employee_id: employeeId,
        ...form,
      });
      setSuccess(response.data.message);
      setForm({ start_date: "", end_date: "", type: "Vacation" }); // Reset form

      // Refresh leave history
      const leaveHistory = await axios.get(
        `http://127.0.0.1:5000/api/leaves/employee/${employeeId}`
      );
      setLeaves(leaveHistory.data);
    } catch (err) {
      setError("Failed to apply for leave.");
      console.error("Apply Leave Error:", err.response ? err.response.data : err);
    }
  };

  return (
    <div className="leave-management-container">
      <h2>Leave Management</h2>

      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}

      <form onSubmit={handleApplyLeave} className="leave-form">
        <div className="form-group">
          <label>Start Date</label>
          <input
            type="date"
            name="start_date"
            value={form.start_date}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>End Date</label>
          <input
            type="date"
            name="end_date"
            value={form.end_date}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Type of Leave</label>
          <select
            name="type"
            value={form.type}
            onChange={handleInputChange}
            required
          >
            <option value="Vacation">Vacation</option>
            <option value="Sick">Sick</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <button type="submit" className="apply-btn">
          Apply Leave
        </button>
      </form>

      <h3>Leave History</h3>
      <ul className="leave-list">
        {leaves.map((leave) => (
          <li key={leave.id}>
            {leave.type} Leave - {leave.start_date} to {leave.end_date} -{" "}
            <strong>{leave.status}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeaveManagement;
