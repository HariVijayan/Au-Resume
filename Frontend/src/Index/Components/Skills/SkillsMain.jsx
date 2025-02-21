import React, { useState, useEffect } from "react";
import Style1 from './Style 1';
import Style2 from './Style 2';

const Skills = ({ resumeData, setResumeData }) => {
  const [skillType, setSkillType] = useState("Default");

  useEffect(() => {
    if (resumeData.skills.style1.skillset.length > 0) {
      setSkillType("Style1");
    } else if (resumeData.skills.style2.skillset.trim() !== "") {
      setSkillType("Style2");
    }
  }, [resumeData.skills]);

  const setSkills = (type) => {
    if (type === "Style1") {
      setResumeData({
        ...resumeData,
        skills: {
          style1: { skillset: resumeData.skills.style1.skillset },
          style2: { skillset: "" },
        },
      });
    } else if (type === "Style2") {
      setResumeData({
        ...resumeData,
        skills: {
          style1: { skillset: [] },
          style2: { skillset: resumeData.skills.style2.skillset },
        },
      });
    }

    setSkillType(type);
  };

  return (
    <div id="dv-SkillsWrapper" className="WrapperClass">
      <div id="dv-SkillsHeader" className="SkillsHeader">
        <h3>Skills</h3>
        <button
          type="button"
          onClick={() => setSkills("Style1")}
          className="ListInputButton"
        >
          List Type
        </button>

        <button
          type="button"
          onClick={() => setSkills("Style2")}
          className="ParaInputButton"
        >
          Para Type
        </button>
      </div>

      {skillType === "Default" && <p>Please select a skill type to begin.</p>}
      {skillType === "Style1" && (
        <Style1 resumeData={resumeData} setResumeData={setResumeData} />
      )}
      {skillType === "Style2" && (
        <Style2 resumeData={resumeData} setResumeData={setResumeData} />
      )}
    </div>
  );
};

export default Skills;
