import { useState } from "react";
import PreviewPdf from "../PreviewPdf.jsx";
import { useNavigate } from "react-router-dom";
import InfoDiv from "../Info Div/InfoDiv.jsx";
import ResumeInputTemplate from "../../../../ResumeFormat.jsx";

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

  const logoutUser = () => {
    setLogoutUserType("User");
    setLogoutClicked(true);
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
      <div id="dv-MainContent" className="MainContent">
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
        <div id="dv-MenuIcons" className="MenuIcons">
          <svg
            className="MenuIconsSvg"
            onClick={() => setOverlayType("FetchResume")}
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e3e3e3"
          >
            <path d="M260-160q-91 0-155.5-63T40-377q0-78 47-139t123-78q17-72 85-137t145-65q33 0 56.5 23.5T520-716v242l64-62 56 56-160 160-160-160 56-56 64 62v-242q-76 14-118 73.5T280-520h-20q-58 0-99 41t-41 99q0 58 41 99t99 41h480q42 0 71-29t29-71q0-42-29-71t-71-29h-60v-80q0-48-22-89.5T600-680v-93q74 35 117 103.5T760-520q69 8 114.5 59.5T920-340q0 75-52.5 127.5T740-160H260Zm220-358Z" />
          </svg>
          <svg
            className="MenuIconsSvg"
            onClick={() => setOverlayType("SaveResume")}
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e3e3e3"
          >
            <path d="M260-160q-91 0-155.5-63T40-377q0-78 47-139t123-78q25-92 100-149t170-57q117 0 198.5 81.5T760-520q69 8 114.5 59.5T920-340q0 75-52.5 127.5T740-160H520q-33 0-56.5-23.5T440-240v-206l-64 62-56-56 160-160 160 160-56 56-64-62v206h220q42 0 71-29t29-71q0-42-29-71t-71-29h-60v-80q0-83-58.5-141.5T480-720q-83 0-141.5 58.5T280-520h-20q-58 0-99 41t-41 99q0 58 41 99t99 41h100v80H260Zm220-280Z" />
          </svg>
          <svg
            className="MenuIconsSvg"
            onClick={() => navigate("/user-profile")}
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e3e3e3"
          >
            <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z" />
          </svg>
          <svg
            className="MenuIconsSvg"
            onClick={logoutUser}
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e3e3e3"
          >
            <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
          </svg>
        </div>
      </div>
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
