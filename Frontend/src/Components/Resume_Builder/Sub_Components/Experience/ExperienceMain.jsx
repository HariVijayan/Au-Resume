import React, { useState } from "react";
import Style1 from "./Style 1";
import Style2 from "./Style 2";
import PreviewPdf from "../PreviewPdf.jsx";
import { useNavigate } from "react-router-dom";

const Experience = ({ resumeData, setResumeData, templateType }) => {
  const navigate = useNavigate();

  const changeContent = (navigationType) => {
    if (navigationType === "previous") {
      navigate("/resume-builder/bio-summary");
    } else {
      navigate("/resume-builder/education/phd");
    }
  };

  const [experienceType, setExperienceType] = useState("Default");
  const [renderedStyles, setRenderedStyles] = useState([]);

  const [hasStyle1Rendered, setHasStyle1Rendered] = useState(false);
  const [hasStyle2Rendered, setHasStyle2Rendered] = useState(false);

  const setExperience = (type) => {
    let updatedStyles = [...renderedStyles];
    if (type === "Style1") {
      if (!hasStyle1Rendered) {
        updatedStyles.push("Style1");
        setExperienceType("Style1");
        setHasStyle1Rendered(true);
      } else {
        updatedStyles.push("Style1");
        handleAddExperienceStyle1();
      }
    } else if (type === "Style2") {
      if (!hasStyle2Rendered) {
        updatedStyles.push("Style2");
        setExperienceType("Style2");
        setHasStyle2Rendered(true);
      } else {
        updatedStyles.push("Style2");
        handleAddExperienceStyle2();
      }
    }
    setRenderedStyles(updatedStyles);
  };

  const handleAddExperienceStyle1 = () => {
    const updatedExperience = [...resumeData.experience];
    updatedExperience[0].style1.push({
      experience_company: "",
      experience_location: "",
      experience_year: "",
      experience_designation: "",
      experience_team: "",
      experience_roles: [],
    });

    setResumeData({
      ...resumeData,
      experience: updatedExperience,
    });
  };

  const handleAddExperienceStyle2 = () => {
    const updatedExperience = [...resumeData.experience];
    updatedExperience[0].style2.push({
      experience_company: "",
      experience_location: "",
      experience_year: "",
      experience_designation: "",
      experience_team: "",
      experience_description: "",
    });

    setResumeData({
      ...resumeData,
      experience: updatedExperience,
    });
  };

  return (
    <div id="dv-MainFormAndPreview">
      <div id="dv-MainForm">
        <div id="dv-ExperienceHeader" className="PageDetailsHeader">
          <span className="RBHeaderText">
            <span
              id="sp-rbheading"
              onClick={() => navigate("/resume-builder/template-choosing")}
            >
              Resume Builder
            </span>
            <div className="RBHeaderSvgWrapper">
              <span className="RBHeaderArrow">{" > "}</span>Experience
              <svg
                className="RBHeaderSvg"
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#e3e3e3"
              >
                <path d="M160-200v-440 440-15 15Zm0 80q-33 0-56.5-23.5T80-200v-440q0-33 23.5-56.5T160-720h160v-80q0-33 23.5-56.5T400-880h160q33 0 56.5 23.5T640-800v80h160q33 0 56.5 23.5T880-640v171q-18-13-38-22.5T800-508v-132H160v440h283q3 21 9 41t15 39H160Zm240-600h160v-80H400v80ZM720-40q-83 0-141.5-58.5T520-240q0-83 58.5-141.5T720-440q83 0 141.5 58.5T920-240q0 83-58.5 141.5T720-40Zm20-208v-112h-40v128l86 86 28-28-74-74Z" />
              </svg>
            </div>
          </span>
        </div>
        <div id="dv-ExperienceWrapper" className="WrapperClass">
          <div id="dv-ExperienceStyles" className="StyleChoosingButtons">
            <button
              type="button"
              onClick={() => setExperience("Style1")}
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
              onClick={() => setExperience("Style2")}
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

          {experienceType === "Default" && (
            <p>Please select an experience type to begin.</p>
          )}

          {renderedStyles.includes("Style1") && (
            <Style1 resumeData={resumeData} setResumeData={setResumeData} />
          )}

          {renderedStyles.includes("Style2") && (
            <Style2 resumeData={resumeData} setResumeData={setResumeData} />
          )}
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
      <PreviewPdf resumeData={resumeData} templateType={templateType} />
    </div>
  );
};

export default Experience;
