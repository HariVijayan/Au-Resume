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
        <h3>Skills <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M220-464 64-620l156-156 156 156-156 156ZM360-80v-200q-61-5-121-14.5T120-320l20-80q84 23 168.5 31.5T480-360q87 0 171.5-8.5T820-400l20 80q-59 16-119 25.5T600-280v200H360ZM220-576l44-44-44-44-44 44 44 44Zm260-104q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35Zm0 280q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-360q17 0 28.5-11.5T520-800q0-17-11.5-28.5T480-840q-17 0-28.5 11.5T440-800q0 17 11.5 28.5T480-760Zm202 280-68-120 68-120h136l68 120-68 120H682Zm46-80h44l22-40-22-40h-44l-22 40 22 40Zm-508-60Zm260-180Zm270 200Z"/></svg></h3>
        <button
          type="button"
          onClick={() => setSkills("Style1")}
          className="ListInputButton"
        >
         <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M360-200v-80h480v80H360Zm0-240v-80h480v80H360Zm0-240v-80h480v80H360ZM200-160q-33 0-56.5-23.5T120-240q0-33 23.5-56.5T200-320q33 0 56.5 23.5T280-240q0 33-23.5 56.5T200-160Zm0-240q-33 0-56.5-23.5T120-480q0-33 23.5-56.5T200-560q33 0 56.5 23.5T280-480q0 33-23.5 56.5T200-400Zm0-240q-33 0-56.5-23.5T120-720q0-33 23.5-56.5T200-800q33 0 56.5 23.5T280-720q0 33-23.5 56.5T200-640Z"/></svg> List Type
        </button>

        <button
          type="button"
          onClick={() => setSkills("Style2")}
          className="ParaInputButton"
        >
         <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M120-240v-80h240v80H120Zm0-200v-80h480v80H120Zm0-200v-80h720v80H120Z"/></svg> Para Type
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
