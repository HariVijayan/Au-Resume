import React from "react";

const Style1 = ({ resumeData, setResumeData }) => {
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedSkills = { ...resumeData.skills };
    
    updatedSkills.style1.skillset = value.split(",").map(role => role.trim());

    setResumeData({
      ...resumeData,
      skills: updatedSkills,
    });
  };

  return (
      <div id="dv-SkillsStyle1" className="SubWrapper">
        <div id="dv-SkillsStyle1SkillSet" className="InputWrapper">
          <label>Skills List:</label>
          <input
            type="text"
            name="skillset"
            value={resumeData.skills.style1.skillset.join(", ")} 
            onChange={(e) => handleInputChange(e, 0)} 
            placeholder="Comma Separated Values"
          />
        </div>
      </div>
  );
};

export default Style1;
