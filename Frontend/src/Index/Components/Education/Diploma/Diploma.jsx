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
    <>
      <h3>Diploma Details</h3>
      {resumeData.education[0].diploma.map((diploma, index) => (
        <div key={index} id="dv-EducationDiploma">
          <div>
            <label>Diploma Name:</label>
            <input
              type="text"
              name="diploma_name"
              value={diploma.diploma_name}
              onChange={(e) => handleEducationInputChange(e, index)}
              placeholder="Diploma Name"
              required
            />
          </div>
          <div>
            <label>Diploma University:</label>
            <input
              type="text"
              name="diploma_university"
              value={diploma.diploma_university}
              onChange={(e) => handleEducationInputChange(e, index)}
              placeholder="University Name"
              required
            />
          </div>
          <div>
            <label>Diploma Year:</label>
            <input
              type="text"
              name="diploma_year"
              value={diploma.diploma_year}
              onChange={(e) => handleEducationInputChange(e, index)}
              placeholder="Year of Study"
              required
            />
          </div>
          <div>
            <label>Diploma CGPA:</label>
            <input
              type="text"
              name="diploma_cgpa"
              value={diploma.diploma_cgpa}
              onChange={(e) => handleEducationInputChange(e, index)}
              placeholder="CGPA"
              required
            />
          </div>
          <div>
            <label>Diploma Additional Info:</label>
            <textarea
              name="diploma_additional_info"
              value={diploma.diploma_additional_info}
              onChange={(e) => handleEducationInputChange(e, index)}
              placeholder="Additional Info"
              required
            />
          </div>
        </div>
      ))}
      <button type="button" onClick={(e) => handleAddEducation(e)}>
        Add Diploma
      </button>
    </>
  );
};

export default Diploma;
