import React from "react";
import Style1 from './Style 1'
import Style2 from './Style 2'

const Experience = ({ resumeData, setResumeData }) => {
  const handleAddExperienceStyle1 = (e) => {
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

  const handleAddExperienceStyle2 = (e) => {
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
    <div id="dv-ExperienceWrapper" className="WrapperClass">
      <div id="dv-ExperienceStyle1Header" className="ExperienceHeader">
      <h3>Experience - Style 1</h3>
      <button type="button" onClick={(e) => handleAddExperienceStyle1(e)} className="AddInputButtons">
        Add Experience
      </button>
      </div>
      <Style1 resumeData={resumeData} setResumeData={setResumeData} />

      <div id="dv-ExperienceStyle2Header" className="ExperienceHeader">
      <h3>Experience - Style 2</h3>
      <button type="button" onClick={(e) => handleAddExperienceStyle2(e)} className="AddInputButtons">
        Add Experience
      </button>
      </div>
      <Style2 resumeData={resumeData} setResumeData={setResumeData} />
    </div>
  );
};

export default Experience;
