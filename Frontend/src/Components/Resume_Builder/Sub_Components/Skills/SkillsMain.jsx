import { useState, useEffect } from "react";
import ListType from "./ListType.jsx";
import ParaType from "./ParaType.jsx";
import PreviewPdf from "../PreviewPdf.jsx";
import { useNavigate } from "react-router-dom";
import ResumeInputTemplate from "../../../../ResumeFormat.jsx";
import HeaderTemplate from "../Header.jsx";
import SurfingIcon from "@mui/icons-material/Surfing";

const Skills = ({ setLogoutClicked, setLogoutUserType, setOverlayType }) => {
  const navigate = useNavigate();

  const { resumeData, updateField } = ResumeInputTemplate();

  const changeContent = (navigationType) => {
    if (navigationType === "previous") {
      navigate("/resume-builder/projects");
    } else {
      navigate("/resume-builder/certifications");
    }
  };

  const [skillType, setSkillType] = useState("Default");

  useEffect(() => {
    if (resumeData.skills.type == "ListType") {
      setSkillType("ListType");
    } else if (resumeData.skills.type == "ParaType") {
      setSkillType("ParaType");
    } else {
      setSkillType("Default");
    }
  }, [resumeData.skills]);

  const setSkills = (type) => {
    if (type === "ListType") {
      let updatedSkills = { ...resumeData.skills };
      updatedSkills.type = "ListType";
      updatedSkills.skillSet = [];

      updateField("skills", updatedSkills);
    } else if (type === "ParaType") {
      let updatedSkills = { ...resumeData.skills };
      updatedSkills.type = "ParaType";
      updatedSkills.skillSet = "";

      updateField("skills", updatedSkills);
    }

    setSkillType(type);
  };

  return (
    <>
      <HeaderTemplate
        currentPage={"Skills"}
        setLogoutClicked={setLogoutClicked}
        setLogoutUserType={setLogoutUserType}
        setOverlayType={setOverlayType}
        PageIcon={SurfingIcon}
      />
      <div id="dv-MainFormAndPreview">
        <div id="dv-MainForm">
          <div id="dv-SkillsWrapper" className="WrapperClass">
            <div id="dv-SkillsStyles" className="StyleChoosingButtons">
              <button
                type="button"
                onClick={() => setSkills("ListType")}
                className="ListInputButton"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#e3e3e3"
                >
                  <path d="M360-200v-80h480v80H360Zm0-240v-80h480v80H360Zm0-240v-80h480v80H360ZM200-160q-33 0-56.5-23.5T120-240q0-33 23.5-56.5T200-320q33 0 56.5 23.5T280-240q0 33-23.5 56.5T200-160Zm0-240q-33 0-56.5-23.5T120-480q0-33 23.5-56.5T200-560q33 0 56.5 23.5T280-480q0 33-23.5 56.5T200-400Zm0-240q-33 0-56.5-23.5T120-720q0-33 23.5-56.5T200-800q33 0 56.5 23.5T280-720q0 33-23.5 56.5T200-640Z" />
                </svg>{" "}
                List Type
              </button>

              <button
                type="button"
                onClick={() => setSkills("ParaType")}
                className="ParaInputButton"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#e3e3e3"
                >
                  <path d="M120-240v-80h240v80H120Zm0-200v-80h480v80H120Zm0-200v-80h720v80H120Z" />
                </svg>{" "}
                Para Type
              </button>
            </div>

            {skillType === "Default" && (
              <p>Please select a skill type to begin.</p>
            )}
            {skillType === "ListType" && <ListType />}
            {skillType === "ParaType" && <ParaType />}
          </div>
          <div id="dv-SkillsButtons" className="NavigationButtons">
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
              Projects
            </button>
            <button
              type="button"
              onClick={() => changeContent("next")}
              className="RightNavigationButtons"
            >
              Certifications{" "}
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

export default Skills;
