import { useState } from "react";
import PreviewPdf from "../PreviewPdf.jsx";
import { useNavigate } from "react-router-dom";
import InfoDiv from "../Info Div/InfoDiv.jsx";
import ResumeInputTemplate from "../../../../ResumeFormat.jsx";
import HeaderTemplate from "../Header.jsx";
import BuildIcon from "@mui/icons-material/Build";

const Project = ({ setLogoutClicked, setLogoutUserType, setOverlayType }) => {
  const navigate = useNavigate();

  const { resumeData, updateField } = ResumeInputTemplate();

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

  const addNewProject = (e) => {
    e.preventDefault();
    const updatedProjects = [...resumeData.projects];
    updatedProjects.push({
      name: "",
      link: "",
      description: "",
      techStack: "",
    });
    updateField("projects", updatedProjects);
  };

  return (
    <>
      <HeaderTemplate
        currentPage={"Projects"}
        setLogoutClicked={setLogoutClicked}
        setLogoutUserType={setLogoutUserType}
        setOverlayType={setOverlayType}
        PageIcon={BuildIcon}
      />
      <div id="dv-MainFormAndPreview">
        <div id="dv-MainForm">
          <div id="dv-ProjectsWrapper" className="WrapperClass">
            <div id="dv-ProjectsAddInput" className="AddInputButton">
              <button
                type="button"
                onClick={addNewProject}
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

            {resumeData.projects.map((newProjectEntry, newProjectIndex) => (
              <div
                key={newProjectIndex}
                id={`dv-ProjectCopy${newProjectIndex + 1}`}
                className="SubWrapper"
              >
                <div
                  id={`dv-ProjectNameCopy${newProjectIndex + 1}`}
                  className="InputWrapper"
                >
                  <input
                    type="text"
                    id={`in-rb_project_name_copy${newProjectIndex + 1}`}
                    name="project_name"
                    value={newProjectEntry.name}
                    onChange={(e) => {
                      let updatedProjects = [...resumeData.projects];
                      updatedProjects[newProjectIndex].name = e.target.value;
                      updateField("projects", updatedProjects);
                    }}
                    placeholder=" "
                  />
                  <label
                    htmlFor={`in-rb_project_name_copy${newProjectIndex + 1}`}
                    className="TextFieldLabel"
                  >
                    Name
                  </label>
                  <svg
                    onClick={() =>
                      showOrHideInfoDiv(`Project Name${newProjectIndex + 1}`)
                    }
                    xmlns="http://www.w3.org/2000/svg"
                    className="MandatoryInputSvg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#e3e3e3"
                  >
                    <path d="M440-120v-264L254-197l-57-57 187-186H120v-80h264L197-706l57-57 186 187v-264h80v264l186-187 57 57-187 186h264v80H576l187 186-57 57-186-187v264h-80Z" />
                  </svg>
                </div>

                {infoDiv === `Project Name${newProjectIndex + 1}` && (
                  <InfoDiv
                    requirement={"Mandatory"}
                    explanation={"Your project's name"}
                    examples={"Blog Website"}
                    characterLimit={"Upto 40 characters"}
                    allowedCharacters={"No Restrictions"}
                  />
                )}

                <div
                  id={`dv-ProjectLinkCopy${newProjectIndex + 1}`}
                  className="InputWrapper"
                >
                  <input
                    type="text"
                    name="project_link"
                    id={`in-rb_project_link_copy${newProjectIndex + 1}`}
                    value={newProjectEntry.link}
                    onChange={(e) => {
                      let updatedProjects = [...resumeData.projects];
                      updatedProjects[newProjectIndex].link = e.target.value;
                      updateField("projects", updatedProjects);
                    }}
                    placeholder=" "
                  />
                  <label
                    htmlFor={`in-rb_project_link_copy${newProjectIndex + 1}`}
                    className="TextFieldLabel"
                  >
                    Link
                  </label>
                  <svg
                    onClick={() =>
                      showOrHideInfoDiv(`Project Link${newProjectIndex + 1}`)
                    }
                    xmlns="http://www.w3.org/2000/svg"
                    className="RecommededInputSvg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#e3e3e3"
                  >
                    <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
                  </svg>
                </div>

                {infoDiv === `Project Link${newProjectIndex + 1}` && (
                  <InfoDiv
                    requirement={"Recommended"}
                    explanation={
                      "Link to your project if it is hosted or stored in an online public repository"
                    }
                    examples={"https://github.com/john_doe/Project1"}
                    characterLimit={"Upto 50 characters"}
                    allowedCharacters={"No Restrictions"}
                  />
                )}

                <div
                  id={`dv-ProjectDescCopy${newProjectIndex + 1}`}
                  className="InputWrapper"
                >
                  <input
                    type="text"
                    name="project_description"
                    id={`in-rb_project_desc_copy${newProjectIndex + 1}`}
                    value={newProjectEntry.description}
                    onChange={(e) => {
                      let updatedProjects = [...resumeData.projects];
                      updatedProjects[newProjectIndex].description =
                        e.target.value;
                      updateField("projects", updatedProjects);
                    }}
                    placeholder=" "
                  />
                  <label
                    htmlFor={`in-rb_project_desc_copy${newProjectIndex + 1}`}
                    className="TextFieldLabel"
                  >
                    Description
                  </label>
                  <svg
                    onClick={() =>
                      showOrHideInfoDiv(
                        `Project Description${newProjectIndex + 1}`
                      )
                    }
                    xmlns="http://www.w3.org/2000/svg"
                    className="MandatoryInputSvg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#e3e3e3"
                  >
                    <path d="M440-120v-264L254-197l-57-57 187-186H120v-80h264L197-706l57-57 186 187v-264h80v264l186-187 57 57-187 186h264v80H576l187 186-57 57-186-187v264h-80Z" />
                  </svg>
                </div>

                {infoDiv === `Project Description${newProjectIndex + 1}` && (
                  <InfoDiv
                    requirement={"Mandatory"}
                    explanation={
                      "A brief explanation about your project, what it does, and its features"
                    }
                    examples={
                      "A simple blog website with authentication and user profiles"
                    }
                    characterLimit={"Upto 120 characters"}
                    allowedCharacters={"No Restrictions"}
                  />
                )}

                <div
                  id={`dv-ProjectTechCopy${newProjectIndex + 1}`}
                  className="InputWrapper"
                >
                  <input
                    type="text"
                    name="project_tech"
                    id={`in-rb_project_tech_copy${newProjectIndex + 1}`}
                    value={newProjectEntry.techStack}
                    onChange={(e) => {
                      let updatedProjects = [...resumeData.projects];
                      updatedProjects[newProjectIndex].techStack =
                        e.target.value;
                      updateField("projects", updatedProjects);
                    }}
                    placeholder=" "
                  />
                  <label
                    htmlFor={`in-rb_project_tech_copy${newProjectIndex + 1}`}
                    className="TextFieldLabel"
                  >
                    Tech Stack
                  </label>
                  <svg
                    onClick={() =>
                      showOrHideInfoDiv(`Project Tech${newProjectIndex + 1}`)
                    }
                    xmlns="http://www.w3.org/2000/svg"
                    className="RecommededInputSvg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#e3e3e3"
                  >
                    <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
                  </svg>
                </div>

                {infoDiv === `Project Tech${newProjectIndex + 1}` && (
                  <InfoDiv
                    requirement={"Recommended"}
                    explanation={
                      "List of technologies used in your project, separated by commas"
                    }
                    examples={"HTML, CSS, JavaScript, ReactJS, NodeJS, MongoDB"}
                    characterLimit={"Upto 60 characters"}
                    allowedCharacters={"No Restrictions"}
                  />
                )}

                {infoDiv === " " && (
                  <InfoDiv
                    requirement={""}
                    explanation={""}
                    examples={""}
                    characterLimit={""}
                    allowedCharacters={""}
                  />
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
        <PreviewPdf />
      </div>
    </>
  );
};

export default Project;
