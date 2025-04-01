import React from "react";

const Style1 = ({ resumeData, setResumeData }) => {
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedExperience = [...resumeData.experience];

    if (name === "experience_roles") {
      updatedExperience[0].style1[index][name] = value
        .split(",")
        .map((role) => role.trim());
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
            <input
              type="text"
              id="in-rb_exp_name"
              name="experience_company"
              value={style1.experience_company}
              onChange={(e) => handleInputChange(e, index)}
              placeholder=" "
            />
            <label htmlFor="in-rb_exp_name" className="TextFieldLabel">
              Company Name
            </label>
          </div>
          <div id="dv-ExperienceLocation" className="InputWrapper">
            <input
              type="text"
              id="in-rb_exp_location"
              name="experience_location"
              value={style1.experience_location}
              onChange={(e) => handleInputChange(e, index)}
              placeholder=" "
            />
            <label htmlFor="in-rb_exp_location" className="TextFieldLabel">
              Location
            </label>
          </div>
          <div id="dv-ExperiencePeriod" className="InputWrapper">
            <input
              type="text"
              id="in-rb_exp_year"
              name="experience_year"
              value={style1.experience_year}
              onChange={(e) => handleInputChange(e, index)}
              placeholder=" "
            />
            <label htmlFor="in-rb_exp_year" className="TextFieldLabel">
              Period
            </label>
          </div>
          <div id="dv-ExperienceDesignation" className="InputWrapper">
            <input
              type="text"
              id="in-rb_exp_desg"
              name="experience_designation"
              value={style1.experience_designation}
              onChange={(e) => handleInputChange(e, index)}
              placeholder=" "
            />
            <label htmlFor="in-rb_exp_desg" className="TextFieldLabel">
              Designation
            </label>
          </div>
          <div id="dv-ExperienceTeamName" className="InputWrapper">
            <input
              type="text"
              id="in-rb_exp_team"
              name="experience_team"
              value={style1.experience_team}
              onChange={(e) => handleInputChange(e, index)}
              placeholder=" "
            />
            <label htmlFor="in-rb_exp_team" className="TextFieldLabel">
              Team Name
            </label>
          </div>
          <div id="dv-ExperienceRoles" className="InputWrapper">
            <input
              type="text"
              name="experience_roles"
              id="in-rb_exp_role"
              value={style1.experience_roles}
              onChange={(e) => handleInputChange(e, index)}
              placeholder=" "
            />
            <label htmlFor="in-rb_exp_role" className="TextFieldLabel">
              Roles
            </label>
          </div>
        </div>
      ))}
    </>
  );
};

export default Style1;
