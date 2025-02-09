import React from "react";

const School = ({ resumeData, setResumeData }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setResumeData((prevState) => {
      const updatedEducation = { ...prevState.education[0] };
      updatedEducation[name] = value;

      return {
        ...prevState,
        education: [updatedEducation],
      };
    });
  };

  return (
    <div>
      <div>
        <label>HSC Name:</label>
        <input
          type="text"
          name="hsc_name"
          value={resumeData.hsc_name}
          onChange={(e) => handleInputChange(e)}
          placeholder="Enter your school name"
          required
        />
      </div>
      <div>
        <label>HSC Year:</label>
        <input
          type="text"
          name="hsc_year"
          value={resumeData.hsc_year}
          onChange={(e) => handleInputChange(e)}
          placeholder="Enter your school year"
          required
        />
      </div>
      <div>
        <label>HSC Grade:</label>
        <input
          type="text"
          name="hsc_grade"
          value={resumeData.hsc_grade}
          onChange={(e) => handleInputChange(e)}
          placeholder="Enter your school grade"
          required
        />
      </div>
      <div>
        <label>HSC Additional Info:</label>
        <input
          type="text"
          name="hsc_additional_info"
          value={resumeData.hsc_additional_info}
          onChange={(e) => handleInputChange(e)}
          placeholder="Enter hsc additional info"
          required
        />
      </div>
      <div>
        <label>SSLC Name:</label>
        <input
          type="text"
          name="sslc_name"
          value={resumeData.sslc_name}
          onChange={(e) => handleInputChange(e)}
          placeholder="Enter your school name"
          required
        />
      </div>
      <div>
        <label>SSLC Year:</label>
        <input
          type="text"
          name="sslc_year"
          value={resumeData.sslc_year}
          onChange={(e) => handleInputChange(e)}
          placeholder="Enter your school year"
          required
        />
      </div>
      <div>
        <label>SSLC Grade:</label>
        <input
          type="text"
          name="sslc_grade"
          value={resumeData.sslc_grade}
          onChange={(e) => handleInputChange(e)}
          placeholder="Enter your school grade"
          required
        />
      </div>
      <div>
        <label>SSLC Additional Info:</label>
        <input
          type="text"
          name="sslc_additional_info"
          value={resumeData.sslc_additional_info}
          onChange={(e) => handleInputChange(e)}
          placeholder="Enter sslc additional info"
          required
        />
      </div>
    </div>
  );
};

export default School;
