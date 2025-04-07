import React, { useState } from "react";
import PreviewPdf from "../PreviewPdf.jsx";
import { useNavigate } from "react-router-dom";

const Project = ({ resumeData, setResumeData, templateType }) => {
  const navigate = useNavigate();

  const [infoDiv, setInfoDiv] = useState("");

  const showOrHideInfoDiv = (currentState) => {
    if (infoDiv === currentState) {
      setInfoDiv(" ");
    } else {
      setInfoDiv(currentState);
    }
  };

  const changeContent = (navigationType) => {
    if (navigationType === "previous") {
      navigate("/resume-builder/education/school");
    } else {
      navigate("/resume-builder/skills");
    }
  };

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
    const newProjectKey = `project${
      Object.keys(resumeData.projects).length + 1
    }`;
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
    <div id="dv-MainFormAndPreview">
      <div id="dv-MainForm">
        <div id="dv-ProjectsHeader" className="PageDetailsHeader">
          <span className="RBHeaderText">
            <span
              id="sp-rbheading"
              onClick={() => navigate("/resume-builder/template-choosing")}
            >
              Resume Builder
            </span>
            <div className="RBHeaderSvgWrapper">
              <span className="RBHeaderArrow">{" > "}</span>Projects
              <svg
                className="RBHeaderSvg"
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#e3e3e3"
              >
                <path d="M686-132 444-376q-20 8-40.5 12t-43.5 4q-100 0-170-70t-70-170q0-36 10-68.5t28-61.5l146 146 72-72-146-146q29-18 61.5-28t68.5-10q100 0 170 70t70 170q0 23-4 43.5T584-516l244 242q12 12 12 29t-12 29l-84 84q-12 12-29 12t-29-12Zm29-85 27-27-256-256q18-20 26-46.5t8-53.5q0-60-38.5-104.5T386-758l74 74q12 12 12 28t-12 28L332-500q-12 12-28 12t-28-12l-74-74q9 57 53.5 95.5T360-440q26 0 52-8t47-25l256 256ZM472-488Z" />
              </svg>
            </div>
          </span>
        </div>
        <div id="dv-ProjectsWrapper" className="WrapperClass">
          <div id="dv-ProjectsAddInput" className="AddInputButton">
            <button
              type="button"
              onClick={handleAddProjects}
              className="AddInputButtons"
            >
              <svg
                className="RBHeaderSvg"
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#e3e3e3"
              >
                <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
              </svg>{" "}
              Add Project
            </button>
          </div>

          {Object.keys(resumeData.projects).map((projectKey) => (
            <div
              key={projectKey}
              id={`dv-ProjectCopy${projectKey.charAt(7)}`}
              className="SubWrapper"
            >
              <div
                id={`dv-ProjectNameCopy${projectKey.charAt(7)}`}
                className="InputWrapper"
              >
                <input
                  type="text"
                  id={`in-rb_project_name_copy${projectKey.charAt(7)}`}
                  name="project_name"
                  value={resumeData.projects[projectKey].project_name}
                  onChange={(e) => handleInputChange(e, projectKey)}
                  placeholder=" "
                />
                <label
                  htmlFor={`in-rb_project_name_copy${projectKey.charAt(7)}`}
                  className="TextFieldLabel"
                >
                  Name
                </label>
                <svg
                  onClick={() =>
                    showOrHideInfoDiv(`Project Name${projectKey.charAt(7)}`)
                  }
                  className="InputInfoSvg"
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#e3e3e3"
                >
                  <path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                </svg>
              </div>

              {infoDiv === `Project Name${projectKey.charAt(7)}` && (
                <div className="InputInfoDiv">
                  <div className="InputInfoText">
                    <p>Enter your project name</p>
                  </div>
                </div>
              )}

              <div
                id={`dv-ProjectLinkCopy${projectKey.charAt(7)}`}
                className="InputWrapper"
              >
                <input
                  type="text"
                  name="project_link"
                  id={`in-rb_project_link_copy${projectKey.charAt(7)}`}
                  value={resumeData.projects[projectKey].project_link}
                  onChange={(e) => handleInputChange(e, projectKey)}
                  placeholder=" "
                />
                <label
                  htmlFor={`in-rb_project_link_copy${projectKey.charAt(7)}`}
                  className="TextFieldLabel"
                >
                  Link
                </label>
                <svg
                  onClick={() =>
                    showOrHideInfoDiv(`Project Link${projectKey.charAt(7)}`)
                  }
                  className="InputInfoSvg"
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#e3e3e3"
                >
                  <path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                </svg>
              </div>

              {infoDiv === `Project Link${projectKey.charAt(7)}` && (
                <div className="InputInfoDiv">
                  <div className="InputInfoText">
                    <p>Enter your project's hosted link</p>
                  </div>
                </div>
              )}

              <div
                id={`dv-ProjectDescCopy${projectKey.charAt(7)}`}
                className="InputWrapper"
              >
                <input
                  type="text"
                  name="project_description"
                  id={`in-rb_project_desc_copy${projectKey.charAt(7)}`}
                  value={resumeData.projects[projectKey].project_description}
                  onChange={(e) => handleInputChange(e, projectKey)}
                  placeholder=" "
                />
                <label
                  htmlFor={`in-rb_project_desc_copy${projectKey.charAt(7)}`}
                  className="TextFieldLabel"
                >
                  Description
                </label>
                <svg
                  onClick={() =>
                    showOrHideInfoDiv(
                      `Project Description${projectKey.charAt(7)}`
                    )
                  }
                  className="InputInfoSvg"
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#e3e3e3"
                >
                  <path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                </svg>
              </div>

              {infoDiv === `Project Description${projectKey.charAt(7)}` && (
                <div className="InputInfoDiv">
                  <div className="InputInfoText">
                    <p>Enter the project's description</p>
                  </div>
                </div>
              )}

              <div
                id={`dv-ProjectTechCopy${projectKey.charAt(7)}`}
                className="InputWrapper"
              >
                <input
                  type="text"
                  name="project_tech"
                  id={`in-rb_project_tech_copy${projectKey.charAt(7)}`}
                  value={resumeData.projects[projectKey].project_tech}
                  onChange={(e) => handleInputChange(e, projectKey)}
                  placeholder=" "
                />
                <label
                  htmlFor={`in-rb_project_tech_copy${projectKey.charAt(7)}`}
                  className="TextFieldLabel"
                >
                  Tech Stack
                </label>
                <svg
                  onClick={() =>
                    showOrHideInfoDiv(`Project Tech${projectKey.charAt(7)}`)
                  }
                  className="InputInfoSvg"
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#e3e3e3"
                >
                  <path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                </svg>
              </div>

              {infoDiv === `Project Tech${projectKey.charAt(7)}` && (
                <div className="InputInfoDiv">
                  <div className="InputInfoText">
                    <p>Enter the project's tech stack</p>
                  </div>
                </div>
              )}

              {infoDiv === " " && (
                <div className="InputInfoDiv">
                  <div className="InputInfoText"></div>
                </div>
              )}
            </div>
          ))}
        </div>
        <div id="dv-ProjectsButtons" className="NavigationButtons">
          <button
            type="button"
            onClick={() => changeContent("previous")}
            className="LeftNavigationButtons"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e3e3e3"
            >
              <path d="M440-240 200-480l240-240 56 56-183 184 183 184-56 56Zm264 0L464-480l240-240 56 56-183 184 183 184-56 56Z" />
            </svg>{" "}
            School
          </button>
          <button
            type="button"
            onClick={() => changeContent("next")}
            className="RightNavigationButtons"
          >
            Skills{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e3e3e3"
            >
              <path d="M383-480 200-664l56-56 240 240-240 240-56-56 183-184Zm264 0L464-664l56-56 240 240-240 240-56-56 183-184Z" />
            </svg>
          </button>
        </div>
      </div>
      <PreviewPdf resumeData={resumeData} templateType={templateType} />
    </div>
  );
};

export default Project;
