import React, { useState } from "react";

const Style1 = ({ resumeData, setResumeData }) => {
  const [infoDiv, setInfoDiv] = useState("");

  const showOrHideInfoDiv = (currentState) => {
    if (infoDiv === currentState) {
      setInfoDiv(" ");
    } else {
      setInfoDiv(currentState);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedCertification = { ...resumeData.certification };

    updatedCertification.style1.certificationset = value
      .split(",")
      .map((role) => role.trim());

    setResumeData({
      ...resumeData,
      certification: updatedCertification,
    });
  };

  return (
    <div id="dv-CertificationStyle1" className="SubWrapper">
      <div id="dv-CertificationStyle1CertificationSet" className="InputWrapper">
        <input
          type="text"
          id="in-rb_cer_list"
          name="certificationset"
          value={resumeData.certification.style1.certificationset.join(", ")}
          onChange={(e) => handleInputChange(e)}
          placeholder=" "
        />
        <label htmlFor="in-rb_cer_list" className="TextFieldLabel">
          Certification List
        </label>
        <svg
          onClick={() => showOrHideInfoDiv("Certification")}
          className="InputInfoSvg"
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#e3e3e3"
        >
          <path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
        </svg>
      </div>

      {infoDiv === "Certification" && (
        <div className="InputInfoDiv">
          <div className="InputInfoText">
            <p>Input your certifications as comma separated values.</p>
          </div>
        </div>
      )}
      {infoDiv === " " && (
        <div className="InputInfoDiv">
          <div className="InputInfoText"></div>
        </div>
      )}
    </div>
  );
};

export default Style1;
