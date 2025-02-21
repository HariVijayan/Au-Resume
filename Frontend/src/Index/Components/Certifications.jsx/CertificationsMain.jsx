import React, {useState, useEffect} from "react";
import Style1 from './Style 1'
import Style2 from './Style 2'

const Cerifications = ({ resumeData, setResumeData }) => {

const [certificationType, setCertificationType] = useState("Default");

  useEffect(() => {
    if (resumeData.certification.style1.certificationset.length > 0) {
      setCertificationType("Style1");
    } else if (resumeData.certification.style2.certificationset.trim() !== "") {
      setCertificationType("Style2");
    }
  }, [resumeData.certification]);

  const setCertifications = (type) => {
    if (type === "Style1") {
      setResumeData({
        ...resumeData,
        certification: {
          style1: { certificationset: resumeData.certification.style1.certificationset },
          style2: { certificationset: "" },
        },
      });
    } else if (type === "Style2") {
      setResumeData({
        ...resumeData,
        certification: {
          style1: { certificationset: [] },
          style2: { certificationset: resumeData.certification.style2.certificationset },
        },
      });
    }

    setCertificationType(type);
  };

  return (
    <div id="dv-CertificationsWrapper" className="WrapperClass">
      <div id="dv-CertificationsHeader" className="CertificationsHeader">
        <h3>Certification</h3>
        <button
          type="button"
          onClick={() => setCertifications("Style1")}
          className="ListInputButton"
        >
          List Type
        </button>

        <button
          type="button"
          onClick={() => setCertifications("Style2")}
          className="ParaInputButton"
        >
          Para Type
        </button>
      </div>

      {certificationType === "Default" && <p>Please select a certification type to begin.</p>}
      {certificationType === "Style1" && (
        <Style1 resumeData={resumeData} setResumeData={setResumeData} />
      )}
      {certificationType === "Style2" && (
        <Style2 resumeData={resumeData} setResumeData={setResumeData} />
      )}
    </div>
  );
};

export default Cerifications;
