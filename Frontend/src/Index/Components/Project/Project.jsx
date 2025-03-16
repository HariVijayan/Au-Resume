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
      <h3>Project Details <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M686-132 444-376q-20 8-40.5 12t-43.5 4q-100 0-170-70t-70-170q0-36 10-68.5t28-61.5l146 146 72-72-146-146q29-18 61.5-28t68.5-10q100 0 170 70t70 170q0 23-4 43.5T584-516l244 242q12 12 12 29t-12 29l-84 84q-12 12-29 12t-29-12Zm29-85 27-27-256-256q18-20 26-46.5t8-53.5q0-60-38.5-104.5T386-758l74 74q12 12 12 28t-12 28L332-500q-12 12-28 12t-28-12l-74-74q9 57 53.5 95.5T360-440q26 0 52-8t47-25l256 256ZM472-488Z"/></svg></h3>
      <button type="button" onClick={handleAddProjects} className="AddInputButtons">
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg> Add Project
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
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Project;
