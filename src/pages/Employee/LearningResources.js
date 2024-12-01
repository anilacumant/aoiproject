import React, { useState, useEffect } from 'react';

const LearningResources = () => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/learning/resources')
      .then((response) => response.json())
      .then((data) => setResources(data))
      .catch((error) => console.error('Error fetching resources:', error));
  }, []);

  return (
    <div>
      <h2>Learning Resources</h2>
      <div className="resource-list">
        {resources.map((resource) => (
          <div key={resource.id} className="resource-card">
            <h3>{resource.name}</h3>
            <p>{resource.description}</p>
            <p>Type: {resource.type}</p>
            {resource.url && (
              <a href={resource.url} target="_blank" rel="noopener noreferrer">
                Access Resource
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LearningResources;
