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
      <h3>Education Details - Pg</h3>
      <button type="button" onClick={(e) => handleAddEducation(e)} className="AddEducationButton">
        Add Pg
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
              required
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
              required
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
              required
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
              required
            />
          </div>
          <div id="dv-EducationPgAdditionalInfo" className="InputWrapper">
            <label>Pg Additional Info:</label>
            <textarea
              name="pg_additional_info"
              value={pg_degree.pg_additional_info}
              onChange={(e) => handleEducationInputChange(e, index)}
              placeholder="Additional Info"
              required
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Pg;
