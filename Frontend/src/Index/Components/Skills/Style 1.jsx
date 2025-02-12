import React from "react";

const Style1 = ({ resumeData, setResumeData }) => {
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    
    // Make a copy of the current skills object
    const updatedSkills = { ...resumeData.skills };
    
    // Split input string by commas and trim whitespace for the skillset in style1
    updatedSkills.style1.skillset = value.split(",").map(role => role.trim());

    // Update the state with the modified skills
    setResumeData({
      ...resumeData,
      skills: updatedSkills,
    });
  };

  return (
    <div>
      <h3>Skills</h3>
      {/* Only one style1 skillset */}
      <div id="style-1">
        <div>
          <label>Skill Set:</label>
          <input
            type="text"
            name="skillset"
            value={resumeData.skills.style1.skillset.join(", ")} // Join skillset as comma-separated string
            onChange={(e) => handleInputChange(e, 0)} // Handle input change
            placeholder="Comma Separated Values"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default Style1;
