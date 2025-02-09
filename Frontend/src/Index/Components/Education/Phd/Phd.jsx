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
    <div>
      <h3>Education - Ph.D. Details</h3>
      {resumeData.education[0].phd.map((phd, index) => (
        <div key={index} className="phd-entry">
          <div>
            <label>Ph.D. Name:</label>
            <input
              type="text"
              name="phd_name"
              value={phd.phd_name}
              onChange={(e) => handleEducationInputChange(e, index)}
              placeholder="Ph.D. Name"
              required
            />
          </div>
          <div>
            <label>Ph.D. University:</label>
            <input
              type="text"
              name="phd_university"
              value={phd.phd_university}
              onChange={(e) => handleEducationInputChange(e, index)}
              placeholder="University Name"
              required
            />
          </div>
          <div>
            <label>Ph.D. Year:</label>
            <input
              type="text"
              name="phd_year"
              value={phd.phd_year}
              onChange={(e) => handleEducationInputChange(e, index)}
              placeholder="Year of Study"
              required
            />
          </div>
          <div>
            <label>Ph.D. Expertise:</label>
            <input
              type="text"
              name="phd_exp"
              value={phd.phd_exp}
              onChange={(e) => handleEducationInputChange(e, index)}
              placeholder="Expertise"
              required
            />
          </div>
          <div>
            <label>Ph.D. Additional Info:</label>
            <textarea
              name="phd_additional_info"
              value={phd.phd_additional_info}
              onChange={(e) => handleEducationInputChange(e, index)}
              placeholder="Additional Info"
              required
            />
          </div>
        </div>
      ))}
      <button type="button" onClick={(e) => handleAddEducation(e)}>
        Add Phd
      </button>
    </div>
  );
};

export default Phd;
