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
    <>
      <h3>PG Details</h3>
      {resumeData.education[0].pg_degree.map((pg_degree, index) => (
        <div key={index} id="dv-EducationPg">
          <div>
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
          <div>
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
          <div>
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
          <div>
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
          <div>
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
      <button type="button" onClick={(e) => handleAddEducation(e)}>
        Add PG
      </button>
    </>
  );
};

export default Pg;
