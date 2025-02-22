import React, { useState } from "react";
import Style1 from './Style 1';
import Style2 from './Style 2';

const Experience = ({ resumeData, setResumeData }) => {
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
    <div id="dv-ExperienceWrapper" className="WrapperClass">
      <div id="dv-ExperienceStyle1Header" className="ExperienceHeader">
        <h3>Experience</h3>
        <button
          type="button"
          onClick={() => setExperience("Style1")}
          className="ListInputButton"
        >
          List Type
        </button>

        <button
          type="button"
          onClick={() => setExperience("Style2")}
          className="ParaInputButton"
        >
          Para Type
        </button>
      </div>

      {experienceType === "Default" && <p>Please select an experience type to begin.</p>}

      {renderedStyles.includes("Style1") && (
        <Style1 resumeData={resumeData} setResumeData={setResumeData} />
      )}

      {renderedStyles.includes("Style2") && (
        <Style2 resumeData={resumeData} setResumeData={setResumeData} />
      )}
    </div>
  );
};

export default Experience;
