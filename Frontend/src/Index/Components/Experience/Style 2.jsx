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

  const handleAddExperience = (e) => {
    e.preventDefault();
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
    <>
      {resumeData.experience[0].style2.map((style2, index) => (
        <div key={index} id="dv-ExperienceStyle2">
          <div>
            <label>Company Name:</label>
            <input
              type="text"
              name="experience_company"
              value={style2.experience_company}
              onChange={(e) => handleInputChange(e, index)}
              placeholder="Zoho Corporation"
              required
            />
          </div>
          <div>
            <label>Location:</label>
            <input
              type="text"
              name="experience_location"
              value={style2.experience_location}
              onChange={(e) => handleInputChange(e, index)}
              placeholder="Chennai, India"
              required
            />
          </div>
          <div>
            <label>Period:</label>
            <input
              type="text"
              name="experience_year"
              value={style2.experience_year}
              onChange={(e) => handleInputChange(e, index)}
              placeholder="2019 - 2020"
              required
            />
          </div>
          <div>
            <label>Designation:</label>
            <input
              type="text"
              name="experience_designation"
              value={style2.experience_designation}
              onChange={(e) => handleInputChange(e, index)}
              placeholder="Software Engineer"
              required
            />
          </div>
          <div>
            <label>Team Name:</label>
            <input
              type="text"
              name="experience_team"
              value={style2.experience_team}
              onChange={(e) => handleInputChange(e, index)}
              placeholder="Operations Security"
              required
            />
          </div>
          <div>
            <label>Description:</label>
            <input
              type="text"
              name="experience_description"
              value={style2.experience_description}
              onChange={(e) => handleInputChange(e, index)}
              placeholder="Worked for 3 years. Developed and managed the security management dashboard."
              required
            />
          </div>
        </div>
      ))}

      <button type="button" onClick={(e) => handleAddExperience(e)}>
        Add Experience
      </button>
    </>
  );
};

export default Style2;
