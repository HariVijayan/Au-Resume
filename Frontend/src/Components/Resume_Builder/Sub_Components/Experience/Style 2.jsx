import React from "react";

const Style2 = ({ resumeData, setResumeData }) => {
  const handleInputChange = (e, Index) => {
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
            <input
              type="text"
              id="in-rb_exp_name"
              name="experience_company"
              value={style2.experience_company}
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
              value={style2.experience_location}
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
              value={style2.experience_year}
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
              value={style2.experience_designation}
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
              value={style2.experience_team}
              onChange={(e) => handleInputChange(e, index)}
              placeholder=" "
            />
            <label htmlFor="in-rb_exp_team" className="TextFieldLabel">
              Team Name
            </label>
          </div>
          <div id="dv-ExperienceDescription" className="InputWrapper">
            <input
              type="text"
              id="in-rb_exp_role"
              name="experience_description"
              value={style2.experience_description}
              onChange={(e) => handleInputChange(e, index)}
              placeholder=" "
            />
            <label htmlFor="in-rb_exp_role" className="TextFieldLabel">
              Description
            </label>
          </div>
        </div>
      ))}
    </>
  );
};

export default Style2;
