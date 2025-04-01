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
        <input
          type="text"
          id="in-rb_cer_para"
          name="certificationset"
          value={resumeData.certification.style2.certificationset}
          onChange={handleInputChange}
          placeholder=" "
        />
        <label htmlFor="in-rb_cer_para" className="TextFieldLabel">
          Certification Para
        </label>
      </div>
    </div>
  );
};

export default Style2;
