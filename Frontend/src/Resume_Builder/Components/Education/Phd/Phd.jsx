import React from "react";

const Phd = ({ resumeData, setResumeData }) => {
  const handleEducationInputChange = (e, Index) => {
    const { name, value } = e.target;
    const updatedEducation = [...resumeData.education];
    updatedEducation[0].phd[Index][name] = value;
    setResumeData({
      ...resumeData,
      education: updatedEducation,
    });
  };

  const handleAddEducation = (e) => {
    e.preventDefault();
    const updatedEducation = [...resumeData.education];
    updatedEducation[0].phd.push({
      phd_name: "",
      phd_university: "",
      phd_year: "",
      phd_exp: "",
      phd_additional_info: "",
    });

    setResumeData({
      ...resumeData,
      education: updatedEducation,
    });
  };

  return (
    <div id="dv-EducationPhdWrapper" className="WrapperClass">
      <div id="dv-EducationPhdHeader" className="EducationHeader">
      <h3>Education Details - Ph.D <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-120 200-272v-240L40-600l440-240 440 240v320h-80v-276l-80 44v240L480-120Zm0-332 274-148-274-148-274 148 274 148Zm0 241 200-108v-151L480-360 280-470v151l200 108Zm0-241Zm0 90Zm0 0Z"/></svg></h3>
      <button type="button" onClick={(e) => handleAddEducation(e)} className="AddInputButtons">
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg> Add Phd
      </button>
      </div>
      {resumeData.education[0].phd.map((phd, index) => (
        <div key={index} id="dv-EducationPhd" className="SubWrapper">
          <div id="dv-EducationPhdName" className="InputWrapper">
            <label>Ph.D. Name:</label>
            <input
              type="text"
              name="phd_name"
              value={phd.phd_name}
              onChange={(e) => handleEducationInputChange(e, index)}
              placeholder="Ph.D. Name"
            />
          </div>
          <div id="dv-EducationPhdUniversity" className="InputWrapper">
            <label>Ph.D. University:</label>
            <input
              type="text"
              name="phd_university"
              value={phd.phd_university}
              onChange={(e) => handleEducationInputChange(e, index)}
              placeholder="University Name"
            />
          </div>
          <div id="dv-EducationPhdYear" className="InputWrapper">
            <label>Ph.D. Year:</label>
            <input
              type="text"
              name="phd_year"
              value={phd.phd_year}
              onChange={(e) => handleEducationInputChange(e, index)}
              placeholder="Year of Study"
            />
          </div>
          <div id="dv-EducationPhdExpertise" className="InputWrapper">
            <label>Ph.D. Expertise:</label>
            <input
              type="text"
              name="phd_exp"
              value={phd.phd_exp}
              onChange={(e) => handleEducationInputChange(e, index)}
              placeholder="Expertise"
            />
          </div>
          <div id="dv-EducationPhdAdditionalInfo" className="InputWrapper">
            <label>Ph.D. Additional Info:</label>
            <textarea
              name="phd_additional_info"
              value={phd.phd_additional_info}
              onChange={(e) => handleEducationInputChange(e, index)}
              placeholder="Additional Info"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Phd;
