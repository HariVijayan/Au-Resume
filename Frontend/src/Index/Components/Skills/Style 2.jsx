import React from "react";

const Style2 = ({ resumeData, setResumeData }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    const updatedSkills = { ...resumeData.skills };

    updatedSkills.style2.skillset = value.trim();

    setResumeData({
      ...resumeData,
      skills: updatedSkills,
    });
  };

  return (
      <div id="dv-SkillsStyle2" className="SubWrapper">
        <div id="dv-SkillsStyle2SkillSet" className="InputWrapper">
          <label>Skills Para:</label>
          <input
            type="text"
            name="skillset"
            value={resumeData.skills.style2.skillset}
            onChange={handleInputChange}
            placeholder="Comma Separated Values"
          />
        </div>
      </div>
  );
};

export default Style2;
