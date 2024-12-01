import React, { useEffect, useState } from "react";
import axios from "axios";

const SkillTracker = () => {
  const [skills, setSkills] = useState([]);
  const [certifications, setCertifications] = useState([]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/api/competencies/employee/1");
        setSkills(response.data.filter((c) => c.type === "Skill"));
        setCertifications(response.data.filter((c) => c.type === "Certification"));
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };

    fetchSkills();
  }, []);

  return (
    <div className="skill-tracker">
      <h3>Your Skills</h3>
      <ul>
        {skills.map((skill) => (
          <li key={skill.competency_id}>{skill.name}</li>
        ))}
      </ul>
      <h3>Your Certifications</h3>
      <ul>
        {certifications.map((cert) => (
          <li key={cert.competency_id}>{cert.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default SkillTracker;
