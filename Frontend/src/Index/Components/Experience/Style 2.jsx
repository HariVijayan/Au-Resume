import React from "react";

const Style2 = ({ resumeData, setResumeData }) => {
  const handleInputChange = (e , Index) => {
    const { name, value } = e.target;
    const updatedExperience = [...resumeData.experience];
    updatedExperience[0].style2[Index][name] = value;
    setResumeData({
      ...resumeData,
      experience: updatedExperience,
    });
  };

  return (
    <>
      {resumeData.experience[0].style2.map((style2, index) => (
        <div key={index} id="dv-ExperienceStyle2" className="SubWrapper">
          <div id="dv-ExperienceCompanyName" className="InputWrapper">
            <label>Company Name:</label>
            <input
              type="text"
              name="experience_company"
              value={style2.experience_company}
              onChange={(e) => handleInputChange(e, index)}
              placeholder="Zoho Corporation"
            />
          </div>
          <div id="dv-ExperienceLocation" className="InputWrapper">
            <label>Location:</label>
            <input
              type="text"
              name="experience_location"
              value={style2.experience_location}
              onChange={(e) => handleInputChange(e, index)}
              placeholder="Chennai, India"
            />
          </div>
          <div id="dv-ExperiencePeriod" className="InputWrapper">
            <label>Period:</label>
            <input
              type="text"
              name="experience_year"
              value={style2.experience_year}
              onChange={(e) => handleInputChange(e, index)}
              placeholder="2019 - 2020"
            />
          </div>
          <div id="dv-ExperienceDesignation" className="InputWrapper">
            <label>Designation:</label>
            <input
              type="text"
              name="experience_designation"
              value={style2.experience_designation}
              onChange={(e) => handleInputChange(e, index)}
              placeholder="Software Engineer"
            />
          </div>
          <div id="dv-ExperienceTeamName" className="InputWrapper">
            <label>Team Name:</label>
            <input
              type="text"
              name="experience_team"
              value={style2.experience_team}
              onChange={(e) => handleInputChange(e, index)}
              placeholder="Operations Security"
            />
          </div>
          <div id="dv-ExperienceDescription" className="InputWrapper">
            <label>Description:</label>
            <input
              type="text"
              name="experience_description"
              value={style2.experience_description}
              onChange={(e) => handleInputChange(e, index)}
              placeholder="Worked for 3 years. Developed and managed the security management dashboard."
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default Style2;
