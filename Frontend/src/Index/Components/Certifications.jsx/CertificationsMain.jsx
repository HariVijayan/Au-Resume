import React from "react";
import Style1 from './Style 1'
import Style2 from './Style 2'

const Cerifications = ({ resumeData, setResumeData }) => {
  return (
    <div id="dv-CertificationsWrapper" className="WrapperClass">
      <h3>Certifications</h3>
      <Style1 resumeData={resumeData} setResumeData={setResumeData} />
      <Style2 resumeData={resumeData} setResumeData={setResumeData} />
    </div>
  );
};

export default Cerifications;
