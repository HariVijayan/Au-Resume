import React from "react";

const Style1 = ({ resumeData, setResumeData }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedCertification = { ...resumeData.certification };
    
    updatedCertification.style1.certificationset = value.split(",").map(role => role.trim());

    setResumeData({
      ...resumeData,
      certification: updatedCertification,
    });
  };

  return (
      <div id="dv-CertificationStyle1" className="SubWrapper">
        <div id="dv-CertificationStyle1CertificationSet" className="InputWrapper">
          <label>Certification Set:</label>
          <input
            type="text"
            name="certificationset"
            value={resumeData.certification.style1.certificationset.join(", ")}
            onChange={(e) => handleInputChange(e)}
            placeholder="Comma Separated Values"
            required
          />
        </div>
      </div>
  );
};

export default Style1;
