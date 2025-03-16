import React from "react";

const Style2 = ({ resumeData, setResumeData }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    const updatedCertification = { ...resumeData.certification };

    updatedCertification.style2.certificationset = value.trim();

    setResumeData({
      ...resumeData,
      certification: updatedCertification,
    });
  };

  return (
      <div id="dv-CertificationStyle2" className="SubWrapper">
        <div id="dv-CertificationStyle2CertificationSet" className="InputWrapper">
        <label>Certification Para:</label>
          <input
            type="text"
            name="certificationset"
            value={resumeData.certification.style2.certificationset}
            onChange={handleInputChange}
            placeholder="Comma Separated Values"
          />
        </div>
      </div>
  );
};

export default Style2;
