import React from "react";

const Project = ({ resumeData, setResumeData }) => {
  const handleInputChange = (e, projectKey) => {
    const { name, value } = e.target;

    setResumeData((prevState) => {
      const updatedProjects = { ...prevState.projects };
      updatedProjects[projectKey] = {
        ...updatedProjects[projectKey],
        [name]: value,
      };

      return {
        ...prevState,
        projects: updatedProjects,
      };
    });
  };

  const handleAddProjects = (e) => {
    e.preventDefault();
    const newProjectKey = `project${Object.keys(resumeData.projects).length + 1}`;
    setResumeData({
      ...resumeData,
      projects: {
        ...resumeData.projects,
        [newProjectKey]: {
          project_name: "",
          project_link: "",
          project_description: "",
          project_tech: "",
        },
      },
    });
  };

  return (
    <div id="dv-ProjectsWrapper" className="WrapperClass">
      <div id="dv-ProjectsHeader" className="ProjectHeader">
      <h3>Project Details</h3>
      <button type="button" onClick={handleAddProjects} className="AddProjectButton">
        Add Project
      </button>
      </div>
      {Object.keys(resumeData.projects).map((projectKey) => (
        <div key={projectKey} id="dv-Projects" className="SubWrapper">
          <div id="dv-ProjectName" className="InputWrapper">
            <label>Name:</label>
            <input
              type="text"
              name="project_name"
              value={resumeData.projects[projectKey].project_name}
              onChange={(e) => handleInputChange(e, projectKey)}
              placeholder="Blog Website"
              required
            />
          </div>
          <div id="dv-ProjectLink" className="InputWrapper">
            <label>Hosted Link:</label>
            <input
              type="text"
              name="project_link"
              value={resumeData.projects[projectKey].project_link}
              onChange={(e) => handleInputChange(e, projectKey)}
              placeholder="github.com/BotUser/Demo"
              required
            />
          </div>
          <div id="dv-ProjectDescription" className="InputWrapper">
            <label>Description:</label>
            <input
              type="text"
              name="project_description"
              value={resumeData.projects[projectKey].project_description}
              onChange={(e) => handleInputChange(e, projectKey)}
              placeholder="Some random project"
              required
            />
          </div>
          <div id="dv-ProjectTech" className="InputWrapper">
            <label>Tech Stack:</label>
            <input
              type="text"
              name="project_tech"
              value={resumeData.projects[projectKey].project_tech}
              onChange={(e) => handleInputChange(e, projectKey)}
              placeholder="HTML, CSS, JavaScript"
              required
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Project;
