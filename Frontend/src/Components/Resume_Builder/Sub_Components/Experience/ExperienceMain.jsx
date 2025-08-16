import { useState, useEffect } from "react";
import ListType from "./ListType.jsx";
import ParaType from "./ParaType.jsx";
import PreviewPdf from "../PreviewPdf.jsx";
import { useNavigate } from "react-router-dom";
import ResumeInputTemplate from "../../../../ResumeFormat.jsx";
import HeaderTemplate from "../Header.jsx";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";

const Experience = ({
  setLogoutClicked,
  setLogoutUserType,
  setOverlayType,
}) => {
  const navigate = useNavigate();

  const { resumeData, updateField } = ResumeInputTemplate();

  const changeContent = (navigationType) => {
    if (navigationType === "previous") {
      navigate("/resume-builder/basic-details");
    } else {
      navigate("/resume-builder/education/phd");
    }
  };

  const [hasChosenAStyle, setHasChosenAStyle] = useState(
    resumeData.experience[0].company != "" ? true : false
  );

  const [renderedStyles, setRenderedStyles] = useState([]);

  useEffect(() => {
    const styles = resumeData.experience
      .filter((exp) => exp.style !== "")
      .map((exp) => exp.style);
    setRenderedStyles(styles);
  }, [resumeData.experience]);

  const addExperience = (styleType) => {
    let updatedStyles = [...renderedStyles];

    updatedStyles.push(styleType);

    setRenderedStyles(updatedStyles);

    const newEntry = {
      style: styleType,
      company: "",
      location: "",
      year: "",
      designation: "",
      team: "",
      roles: styleType === "ListType" ? [] : undefined,
      description: styleType === "ParaType" ? "" : undefined,
    };

    const updatedExperience = hasChosenAStyle
      ? [...resumeData.experience, newEntry]
      : [newEntry];

    setHasChosenAStyle(true);
    updateField("experience", updatedExperience);
  };

  return (
    <>
      <HeaderTemplate
        currentPage={"Work Experience"}
        setLogoutClicked={setLogoutClicked}
        setLogoutUserType={setLogoutUserType}
        setOverlayType={setOverlayType}
        PageIcon={WorkHistoryIcon}
      />
      <div id="dv-MainFormAndPreview">
        <div id="dv-MainForm">
          <div id="dv-ExperienceWrapper" className="WrapperClass">
            <div id="dv-ExperienceStyles" className="StyleChoosingButtons">
              <button
                type="button"
                onClick={() => addExperience("ListType")}
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
                onClick={() => addExperience("ParaType")}
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

            {!hasChosenAStyle && (
              <p>Please select an experience type to begin.</p>
            )}

            {renderedStyles.includes("ListType") && <ListType />}

            {renderedStyles.includes("ParaType") && <ParaType />}
          </div>

          <div id="dv-ExperienceButtons" className="NavigationButtons">
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
              Basic Details
            </button>
            <button
              type="button"
              onClick={() => changeContent("next")}
              className="RightNavigationButtons"
            >
              Ph.D{" "}
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

export default Experience;
