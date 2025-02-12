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
    <div>
      <div id="style-2">
        <div>
        <label>Certification Set:</label>
          <input
            type="text"
            name="certificationset"
            value={resumeData.certification.style2.certificationset}
            onChange={handleInputChange}
            placeholder="Comma Separated Values"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default Style2;
