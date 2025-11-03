import React, { useState } from 'react'
import projectsData from './projectsData'

function Projects() {
  const [expandedId, setExpandedId] = useState(null);

  const handleToggle = (id) => {
    setExpandedId((prevId) => (prevId === id ? null : id))
  }
  return (
    <div>
      <h1>My Projects</h1>
      {
        projectsData.projectList.map((project) => (
          <div key={project.id} onClick={() => handleToggle(project.id)} style={{border: '1px solid black'}}>
            <h3>{project.name}</h3>
            <p>{project.description}</p>
            {expandedId === project.id && (
              <div style={{border: '1px solid blue'}}>
                <h4>{projectsData.projectDetails[project.id].name}</h4>
                <p>{projectsData.projectDetails[project.id].details}</p>
              </div>
            )}
          </div>
        ))
      }
    </div>
  )
}

export default Projects