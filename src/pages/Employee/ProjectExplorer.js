import React, { useState, useEffect } from "react";
import axios from "axios";

const ProjectExplorer = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/api/projects/match/1");
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="project-explorer">
      <h3>Recommended Projects</h3>
      <ul>
        {projects.map((project) => (
          <li key={project.project_id}>
            {project.name} - {Math.round(project.match_percentage)}% Match
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectExplorer;
