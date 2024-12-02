import React, { useEffect, useState } from "react";
import axios from "axios";
import "./EmployeeFeedback.css";

const EmployeeFeedback = ({ managerId }) => {
  const [employeesFeedback, setEmployeesFeedback] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [newFeedback, setNewFeedback] = useState({ comments: "", sentiment: "Positive" });
  const [error, setError] = useState("");

  // Fetch all employees and their feedback under the manager
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:5000/api/feedback/manager/2`
        );
        setEmployeesFeedback(response.data);
      } catch (err) {
        setError("Failed to fetch feedback data.");
        console.error(err);
      }
    };

    fetchFeedback();
  }, [managerId]);

  const handleOpenModal = (employee) => {
    setSelectedEmployee(employee);
    setShowModal(true);
  };

  const handleSubmitFeedback = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:5000/api/feedback/", {
        employee_id: selectedEmployee.id,
        manager_id: managerId,
        comments: newFeedback.comments,
        sentiment: newFeedback.sentiment,
      });
      alert("Feedback submitted successfully.");

      // Update feedback in the UI
      setEmployeesFeedback((prev) =>
        prev.map((emp) =>
          emp.employee_name === selectedEmployee.employee_name
            ? {
                ...emp,
                feedbacks: [
                  ...emp.feedbacks,
                  { comments: newFeedback.comments, sentiment: newFeedback.sentiment },
                ],
              }
            : emp
        )
      );

      setNewFeedback({ comments: "", sentiment: "Positive" });
      setShowModal(false);
    } catch (err) {
      alert("Failed to submit feedback.");
      console.error(err);
    }
  };

  return (
    <div className="feedback-container">
      <h2>Manage Feedback for Employees</h2>
      {error && <div className="error-message">{error}</div>}

      <table className="feedback-table">
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Feedback</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employeesFeedback.map((emp) => (
            <tr key={emp.employee_name}>
              <td>{emp.employee_name}</td>
              <td>
                {emp.feedbacks.length > 0 ? (
                  emp.feedbacks.map((fb, index) => (
                    <div key={index}>
                      <strong>{fb.sentiment}:</strong> {fb.comments}
                    </div>
                  ))
                ) : (
                  <em>No feedback available</em>
                )}
              </td>
              <td>
                <button
                  className="action-button add-feedback"
                  onClick={() => handleOpenModal(emp)}
                >
                  Add Feedback
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && selectedEmployee && (
        <div className="modal">
          <div className="modal-content">
            <h3>Add Feedback for {selectedEmployee.employee_name}</h3>
            <form onSubmit={handleSubmitFeedback}>
              <label>Comment:</label>
              <textarea
                value={newFeedback.comments}
                onChange={(e) => setNewFeedback({ ...newFeedback, comments: e.target.value })}
                required
              />
              <label>Sentiment:</label>
              <select
                value={newFeedback.sentiment}
                onChange={(e) => setNewFeedback({ ...newFeedback, sentiment: e.target.value })}
              >
                <option value="Positive">Positive</option>
                <option value="Neutral">Neutral</option>
                <option value="Negative">Negative</option>
              </select>
              <div className="modal-actions">
                <button type="submit" className="save-button">
                  Submit
                </button>
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeFeedback;
