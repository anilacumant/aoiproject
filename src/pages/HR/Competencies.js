import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Competencies.css";

const Competencies = () => {
  const [competencies, setCompetencies] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formState, setFormState] = useState({
    id: null,
    name: "",
    description: "",
    type: "Skill",
    expiry_date: "",
  });
  const [error, setError] = useState("");

  // Fetch competencies on load
  useEffect(() => {
    const fetchCompetencies = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/api/competencies");
        setCompetencies(response.data);
      } catch (err) {
        setError("Failed to fetch competencies.");
      }
    };

    fetchCompetencies();
  }, []);

  // Open modal to add or edit a competency
  const handleOpenModal = (competency = null) => {
    if (competency) {
      setFormState({
        id: competency.id,
        name: competency.name,
        description: competency.description,
        type: competency.type,
        expiry_date: competency.expiry_date,
      });
    } else {
      setFormState({
        id: null,
        name: "",
        description: "",
        type: "Skill",
        expiry_date: "",
      });
    }
    setShowModal(true);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formState.id) {
        // Update existing competency
        await axios.put(
          `http://127.0.0.1:5000/api/competencies/${formState.id}`,
          formState
        );
      } else {
        // Add new competency
        await axios.post("http://127.0.0.1:5000/api/competencies", formState);
      }
      // Refresh competencies list
      const response = await axios.get("http://127.0.0.1:5000/api/competencies");
      setCompetencies(response.data);
      setShowModal(false);
    } catch (err) {
      setError("Failed to save competency.");
    }
  };

  return (
    <div className="competencies-container">
      <header className="competencies-header">Manage Competencies</header>
      {error && <div className="error-message">{error}</div>}
      <button
        className="add-button"
        onClick={() => handleOpenModal()}
      >
        Add Competency
      </button>
      <table className="competencies-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Type</th>
            <th>Expiry Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {competencies.map((competency) => (
            <tr key={competency.id}>
              <td>{competency.id}</td>
              <td>{competency.name}</td>
              <td>{competency.description}</td>
              <td>{competency.type}</td>
              <td>{competency.expiry_date}</td>
              <td>
                <button
                  className="action-button edit"
                  onClick={() => handleOpenModal(competency)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>{formState.id ? "Edit Competency" : "Add Competency"}</h3>
            <form onSubmit={handleSubmit}>
              <label>Name</label>
              <input
                type="text"
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                required
              />
              <label>Description</label>
              <textarea
                value={formState.description}
                onChange={(e) =>
                  setFormState({ ...formState, description: e.target.value })
                }
                required
              />
              <label>Type</label>
              <select
                value={formState.type}
                onChange={(e) => setFormState({ ...formState, type: e.target.value })}
              >
                <option value="Skill">Skill</option>
                <option value="Certification">Certification</option>
                <option value="Training">Training</option>
              </select>
              <label>Expiry Date</label>
              <input
                type="date"
                value={formState.expiry_date}
                onChange={(e) =>
                  setFormState({ ...formState, expiry_date: e.target.value })
                }
              />
              <div className="modal-actions">
                <button type="submit" className="save-button">
                  Save
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

export default Competencies;
