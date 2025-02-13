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

  const handleAddExperience = (e) => {
    e.preventDefault();
    const updatedExperience = [...resumeData.experience];
    updatedExperience[0].style1.push({
        experience_company: "",
        experience_location: "",
        experience_year: "",
        experience_designation: "",
        experience_team: "",
        experience_roles: []
    });

    setResumeData({
      ...resumeData,
      experience: updatedExperience,
    });
  };

  return (
    <>
      {resumeData.experience[0].style1.map((style1, index) => (
        <div key={index} id="dv-ExperienceStyle1">
          <div>
            <label>Company Name:</label>
            <input
              type="text"
              name="experience_company"
              value={style1.experience_company}
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
              value={style1.experience_location}
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
              value={style1.experience_year}
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
              value={style1.experience_designation}
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
              value={style1.experience_team}
              onChange={(e) => handleInputChange(e, index)}
              placeholder="Operations Security"
              required
            />
          </div>
          <div>
            <label>Roles:</label>
            <input
              type="text"
              name="experience_roles"
              value={style1.experience_roles}
              onChange={(e) => handleInputChange(e, index)}
              placeholder="Developed Security management dashboard"
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

export default Style1;
