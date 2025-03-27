import React from "react";

const Pg = ({ resumeData, setResumeData }) => {
  const handleEducationInputChange = (e, Index) => {
    const { name, value } = e.target;
    const updatedEducation = [...resumeData.education];
    updatedEducation[0].pg_degree[Index][name] = value;
    setResumeData({
      ...resumeData,
      education: updatedEducation,
    });
  };

  const handleAddEducation = (e) => {
    e.preventDefault();
    const updatedEducation = [...resumeData.education];
    updatedEducation[0].pg_degree.push({
      pg_degree_name: "",
      pg_degree_university: "",
      pg_degree_year: "",
      pg_degree_cgpa: "",
      pg_degree_additional_info: "",
    });

    setResumeData({
      ...resumeData,
      education: updatedEducation,
    });
  };

  return (
    <div id="dv-EducationPgWrapper" className="WrapperClass">
      <div id="dv-EducationPgHeader" className="EducationHeader">
      <h3>Education Details - Pg <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-120 200-272v-240L40-600l440-240 440 240v320h-80v-276l-80 44v240L480-120Zm0-332 274-148-274-148-274 148 274 148Zm0 241 200-108v-151L480-360 280-470v151l200 108Zm0-241Zm0 90Zm0 0Z"/></svg></h3>
      <button type="button" onClick={(e) => handleAddEducation(e)} className="AddInputButtons">
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg> Add Pg
      </button>
      </div>
      {resumeData.education[0].pg_degree.map((pg_degree, index) => (
        <div key={index} id="dv-EducationPg" className="SubWrapper">
          <div id="dv-EducationPgName" className="InputWrapper">
            <label>PG. Name:</label>
            <input
              type="text"
              name="pg_degree_name"
              value={pg_degree.pg_degree_name}
              onChange={(e) => handleEducationInputChange(e, index)}
              placeholder="PG Name"
            />
          </div>
          <div id="dv-EducationPgUniversity" className="InputWrapper">
            <label>PG University:</label>
            <input
              type="text"
              name="pg_degree_university"
              value={pg_degree.pg_degree_university}
              onChange={(e) => handleEducationInputChange(e, index)}
              placeholder="University Name"
            />
          </div>
          <div id="dv-EducationPgYear" className="InputWrapper">
            <label>Pg. Year:</label>
            <input
              type="text"
              name="pg_degree_year"
              value={pg_degree.pg_degree_year}
              onChange={(e) => handleEducationInputChange(e, index)}
              placeholder="Year of Study"
            />
          </div>
          <div id="dv-EducationPgCgpa" className="InputWrapper">
            <label>Pg CGPA:</label>
            <input
              type="text"
              name="pg_degree_cgpa"
              value={pg_degree.pg_degree_cgpa}
              onChange={(e) => handleEducationInputChange(e, index)}
              placeholder="CGPA"
            />
          </div>
          <div id="dv-EducationPgAdditionalInfo" className="InputWrapper">
            <label>Pg Additional Info:</label>
            <textarea
              name="pg_additional_info"
              value={pg_degree.pg_additional_info}
              onChange={(e) => handleEducationInputChange(e, index)}
              placeholder="Additional Info"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Pg;
