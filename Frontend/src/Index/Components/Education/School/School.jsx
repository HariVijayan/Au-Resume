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
    <div id="dv-EducationSchoolWrapper" className="WrapperClass">
      <div id="dv-EducationSchoolHeader" className="EducationHeader">
      <h3>Education Details - School</h3>
      </div>
      <div id="dv-EducationHscName" className="InputWrapper">
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
      <div id="dv-EducationHscYear" className="InputWrapper">
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
      <div id="dv-EducationHscGrade" className="InputWrapper">
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
      <div id="dv-EducationHscAdditionalInfo" className="InputWrapper">
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
      <div id="dv-EducationSslcName" className="InputWrapper">
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
      <div id="dv-EducationSslcYear" className="InputWrapper">
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
      <div id="dv-EducationSslcGrade" className="InputWrapper">
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
      <div id="dv-EducationSslcAdditionalInfo" className="InputWrapper">
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
