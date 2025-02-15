import React from "react";
import Style1 from './Style 1'
import Style2 from './Style 2'

const Cerifications = ({ resumeData, setResumeData }) => {
  return (
    <div id="dv-CertificationsWrapper" className="WrapperClass">
      <div id="dv-CertificationsStyle1Header" className="CertificationsHeader">
      <h3>Certifications - Style 1</h3>
      </div>
      <Style1 resumeData={resumeData} setResumeData={setResumeData} />

      <div id="dv-CertificationsStyle2Header" className="CertificationsHeader">
      <h3>Certifications - Style 2</h3>
      </div>
      <Style2 resumeData={resumeData} setResumeData={setResumeData} />
    </div>
  );
};

export default Cerifications;
