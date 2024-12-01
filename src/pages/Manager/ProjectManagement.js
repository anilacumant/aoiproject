import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ProjectManagement.css";

const ProjectManagement = () => {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    required_skills: "",
    timeline: "",
  });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/api/projects");
        setProjects(response.data);
      } catch (err) {
        console.error("Failed to fetch projects:", err);
      }
    };

    fetchProjects();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject((prev) => ({ ...prev, [name]: value }));
  };

  const createProject = async () => {
    try {
      await axios.post("http://127.0.0.1:5000/api/projects", newProject);
      alert("Project created successfully");
      setNewProject({ name: "", description: "", required_skills: "", timeline: "" });
    } catch (err) {
      alert("Failed to create project");
    }
  };

  return (
    <div className="project-management-container">
      <h2>Project Management</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          name="name"
          placeholder="Project Name"
          value={newProject.name}
          onChange={handleInputChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={newProject.description}
          onChange={handleInputChange}
          required
        ></textarea>
        <input
          type="text"
          name="required_skills"
          placeholder="Required Skills"
          value={newProject.required_skills}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="timeline"
          placeholder="Timeline"
          value={newProject.timeline}
          onChange={handleInputChange}
          required
        />
        <button onClick={createProject}>Create Project</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Required Skills</th>
            <th>Timeline</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td>{project.name}</td>
              <td>{project.description}</td>
              <td>{project.required_skills}</td>
              <td>{project.timeline}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectManagement;
