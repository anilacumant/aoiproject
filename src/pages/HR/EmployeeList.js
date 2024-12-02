import React, { useState, useEffect } from "react";
import axios from "axios";
import "./EmployeeList.css";

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [managers, setManagers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formState, setFormState] = useState({
        id: null,
        name: "",
        skills: "",
        certifications: "",
        manager_id: null,
    });
    const [error, setError] = useState("");

    // Fetch employees and managers on component mount
    useEffect(() => {
        fetchEmployees();
        fetchManagers();
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:5000/api/employees/");
            setEmployees(response.data);
            console.log("Employees fetched:", response.data);
        } catch (err) {
            setError("Failed to fetch employees.");
            console.error(err);
        }
    };

    const fetchManagers = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:5000/api/users/managers/");
            setManagers(response.data);
            console.log("Managers fetched:", response.data);
        } catch (err) {
            setError("Failed to fetch managers.");
            console.error(err);
        }
    };

    const handleOpenModal = (employee = null) => {
        console.log("Opening modal for:", employee);
        if (employee) {
            setFormState({
                id: employee.id,
                name: employee.name,
                skills: employee.skills,
                certifications: employee.certifications,
                manager_id: employee.manager_id,
            });
        } else {
            setFormState({
                id: null,
                name: "",
                skills: "",
                certifications: "",
                manager_id: null,
            });
        }
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting form with state:", formState);
        try {
            if (formState.id) {
                // Update employee
                await axios.put(
                    `http://127.0.0.1:5000/api/employees/${formState.id}`,
                    formState
                );
                console.log("Employee updated:", formState.id);
            } else {
                // Add new employee
                await axios.post("http://127.0.0.1:5000/api/employees/", formState);
                console.log("New employee added:", formState);
            }
            fetchEmployees();
            setShowModal(false);
        } catch (err) {
            setError("Failed to save employee.");
            console.error("Error in handleSubmit:", err.response || err);
        }
    };

    const handleDelete = async (id) => {
        console.log("Deleting employee:", id);
        try {
            await axios.delete(`http://127.0.0.1:5000/api/employees/${id}`);
            console.log("Employee deleted:", id);
            fetchEmployees();
        } catch (err) {
            setError("Failed to delete employee.");
            console.error(err);
        }
    };

    return (
        <div className="employee-list-container">
            <header className="employee-list-header">Manage Employees</header>
            {error && <div className="error-message">{error}</div>}
            <button
                className="add-employee-button"
                onClick={() => handleOpenModal()}
            >
                Add Employee
            </button>
            <table className="employee-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Skills</th>
                        <th>Certifications</th>
                        <th>Manager</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.name}</td>
                            <td>{employee.skills}</td>
                            <td>{employee.certifications}</td>
                            <td>{employee.manager_name || "Unassigned"}</td>
                            <td>
                                <button
                                    className="employee-action-button edit-button"
                                    onClick={() => handleOpenModal(employee)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="employee-action-button delete-button"
                                    onClick={() => handleDelete(employee.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>{formState.id ? "Edit Employee" : "Add Employee"}</h3>
                        <form onSubmit={handleSubmit}>
                            <label>Name</label>
                            <input
                                type="text"
                                value={formState.name}
                                onChange={(e) =>
                                    setFormState({ ...formState, name: e.target.value })
                                }
                                required
                            />
                            <label>Skills</label>
                            <textarea
                                value={formState.skills}
                                onChange={(e) =>
                                    setFormState({ ...formState, skills: e.target.value })
                                }
                            />
                            <label>Certifications</label>
                            <textarea
                                value={formState.certifications}
                                onChange={(e) =>
                                    setFormState({
                                        ...formState,
                                        certifications: e.target.value,
                                    })
                                }
                            />
                            <label>Manager</label>
                            <select
                                value={formState.manager_id || ""}
                                onChange={(e) =>
                                    setFormState({ ...formState, manager_id: e.target.value })
                                }
                            >
                                <option value="" disabled>
                                    Select Manager
                                </option>
                                {managers.map((manager) => (
                                    <option key={manager.id} value={manager.id}>
                                        {manager.username}
                                    </option>
                                ))}
                            </select>
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

export default EmployeeList;
