import React from "react";

const Style1 = ({ resumeData, setResumeData }) => {
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const updatedExperience = [...resumeData.experience];
        
        if (name === "experience_roles") {
          updatedExperience[0].style1[index][name] = value.split(",").map(role => role.trim());
        } else {
          updatedExperience[0].style1[index][name] = value;
        }
      
        setResumeData({
          ...resumeData,
          experience: updatedExperience,
        });
      };

  return (
    <>
      {resumeData.experience[0].style1.map((style1, index) => (
        <div key={index} id="dv-ExperienceStyle1" className="SubWrapper">
          <div id="dv-ExperienceCompanyName" className="InputWrapper">
            <label>Company Name:</label>
            <input
              type="text"
              name="experience_company"
              value={style1.experience_company}
              onChange={(e) => handleInputChange(e, index)}
              placeholder="Zoho Corporation"
            />
          </div>
          <div id="dv-ExperienceLocation" className="InputWrapper">
            <label>Location:</label>
            <input
              type="text"
              name="experience_location"
              value={style1.experience_location}
              onChange={(e) => handleInputChange(e, index)}
              placeholder="Chennai, India"
            />
          </div>
          <div id="dv-ExperiencePeriod" className="InputWrapper">
            <label>Period:</label>
            <input
              type="text"
              name="experience_year"
              value={style1.experience_year}
              onChange={(e) => handleInputChange(e, index)}
              placeholder="2019 - 2020"
            />
          </div>
          <div id="dv-ExperienceDesignation" className="InputWrapper">
            <label>Designation:</label>
            <input
              type="text"
              name="experience_designation"
              value={style1.experience_designation}
              onChange={(e) => handleInputChange(e, index)}
              placeholder="Software Engineer"
            />
          </div>
          <div id="dv-ExperienceTeamName" className="InputWrapper">
            <label>Team Name:</label>
            <input
              type="text"
              name="experience_team"
              value={style1.experience_team}
              onChange={(e) => handleInputChange(e, index)}
              placeholder="Operations Security"
            />
          </div>
          <div id="dv-ExperienceRoles" className="InputWrapper">
            <label>Roles:</label>
            <input
              type="text"
              name="experience_roles"
              value={style1.experience_roles}
              onChange={(e) => handleInputChange(e, index)}
              placeholder="Developed Security management dashboard"
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default Style1;
