import React from "react";

const Diploma = ({ resumeData, setResumeData }) => {
  const handleEducationInputChange = (e, Index) => {
    const { name, value } = e.target;
    const updatedEducation = [...resumeData.education];
    updatedEducation[0].diploma[Index][name] = value;
    setResumeData({
      ...resumeData,
      education: updatedEducation,
    });
  };

  const handleAddEducation = (e) => {
    e.preventDefault();
    const updatedEducation = [...resumeData.education];
    updatedEducation[0].diploma.push({
      diploma_name: "",
      diploma_university: "",
      diploma_year: "",
      diploma_cgpa: "",
      diploma_additional_info: "",
    });

    setResumeData({
      ...resumeData,
      education: updatedEducation,
    });
  };

  return (
    <div id="dv-EducationDiplomaWrapper" className="WrapperClass">
      <div id="dv-EducationDiplomaHeader" className="EducationHeader">
      <h3>Education Details - Diploma <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-120 200-272v-240L40-600l440-240 440 240v320h-80v-276l-80 44v240L480-120Zm0-332 274-148-274-148-274 148 274 148Zm0 241 200-108v-151L480-360 280-470v151l200 108Zm0-241Zm0 90Zm0 0Z"/></svg></h3>
      <button type="button" onClick={(e) => handleAddEducation(e)} className="AddInputButtons">
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg> Add Diploma
      </button>
      </div>
      {resumeData.education[0].diploma.map((diploma, index) => (
        <div key={index} id="dv-EducationDiploma" className="SubWrapper">
          <div id="dv-EducationDiplomaName" className="InputWrapper">
            <label>Diploma Name:</label>
            <input
              type="text"
              name="diploma_name"
              value={diploma.diploma_name}
              onChange={(e) => handleEducationInputChange(e, index)}
              placeholder="Diploma Name"
            />
          </div>
          <div id="dv-EducationDiplomaUniversity" className="InputWrapper">
            <label>Diploma University:</label>
            <input
              type="text"
              name="diploma_university"
              value={diploma.diploma_university}
              onChange={(e) => handleEducationInputChange(e, index)}
              placeholder="University Name"
            />
          </div>
          <div id="dv-EducationDiplomaYear" className="InputWrapper">
            <label>Diploma Year:</label>
            <input
              type="text"
              name="diploma_year"
              value={diploma.diploma_year}
              onChange={(e) => handleEducationInputChange(e, index)}
              placeholder="Year of Study"
            />
          </div>
          <div id="dv-EducationDiplomaCgpa" className="InputWrapper">
            <label>Diploma CGPA:</label>
            <input
              type="text"
              name="diploma_cgpa"
              value={diploma.diploma_cgpa}
              onChange={(e) => handleEducationInputChange(e, index)}
              placeholder="CGPA"
            />
          </div>
          <div id="dv-EducationDiplomaAdditionalInfo" className="InputWrapper">
            <label>Diploma Additional Info:</label>
            <textarea
              name="diploma_additional_info"
              value={diploma.diploma_additional_info}
              onChange={(e) => handleEducationInputChange(e, index)}
              placeholder="Additional Info"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Diploma;
