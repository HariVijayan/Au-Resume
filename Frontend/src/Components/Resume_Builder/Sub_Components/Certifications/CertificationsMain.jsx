import React, { useState, useEffect } from "react";
import Style1 from "./Style 1";
import Style2 from "./Style 2";
import PreviewPdf from "../PreviewPdf.jsx";
import { useNavigate } from "react-router-dom";

const Cerifications = ({ resumeData, setResumeData, templateType }) => {
  const navigate = useNavigate();

  const changeContent = (navigationType) => {
    if (navigationType === "previous") {
      navigate("/resume-builder/skills");
    } else {
      navigate("/resume-builder/languages-known");
    }
  };

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
          style1: {
            certificationset: resumeData.certification.style1.certificationset,
          },
          style2: { certificationset: "" },
        },
      });
    } else if (type === "Style2") {
      setResumeData({
        ...resumeData,
        certification: {
          style1: { certificationset: [] },
          style2: {
            certificationset: resumeData.certification.style2.certificationset,
          },
        },
      });
    }

    setCertificationType(type);
  };

  return (
    <div id="dv-MainFormAndPreview">
      <div id="dv-MainForm">
        <div id="dv-CertificationsHeader" className="PageDetailsHeader">
          <span className="RBHeaderText">
            <span
              id="sp-rbheading"
              onClick={() => navigate("/resume-builder/template-choosing")}
            >
              Resume Builder
            </span>
            <div className="RBHeaderSvgWrapper">
              <span className="RBHeaderArrow">{" > "}</span>Certifications
              <svg
                className="RBHeaderSvg"
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#e3e3e3"
              >
                <path d="M560-680v-80h320v80H560Zm0 160v-80h320v80H560Zm0 160v-80h320v80H560Zm-240-40q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35ZM80-160v-76q0-21 10-40t28-30q45-27 95.5-40.5T320-360q56 0 106.5 13.5T522-306q18 11 28 30t10 40v76H80Zm86-80h308q-35-20-74-30t-80-10q-41 0-80 10t-74 30Zm154-240q17 0 28.5-11.5T360-520q0-17-11.5-28.5T320-560q-17 0-28.5 11.5T280-520q0 17 11.5 28.5T320-480Zm0-40Zm0 280Z" />
              </svg>
            </div>
          </span>
        </div>
        <div id="dv-CertificationsWrapper" className="WrapperClass">
          <div id="dv-CertificationStyles" className="StyleChoosingButtons">
            <button
              type="button"
              onClick={() => setCertifications("Style1")}
              className="ListInputButton"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#e3e3e3"
              >
                <path d="M360-200v-80h480v80H360Zm0-240v-80h480v80H360Zm0-240v-80h480v80H360ZM200-160q-33 0-56.5-23.5T120-240q0-33 23.5-56.5T200-320q33 0 56.5 23.5T280-240q0 33-23.5 56.5T200-160Zm0-240q-33 0-56.5-23.5T120-480q0-33 23.5-56.5T200-560q33 0 56.5 23.5T280-480q0 33-23.5 56.5T200-400Zm0-240q-33 0-56.5-23.5T120-720q0-33 23.5-56.5T200-800q33 0 56.5 23.5T280-720q0 33-23.5 56.5T200-640Z" />
              </svg>{" "}
              List Type
            </button>

            <button
              type="button"
              onClick={() => setCertifications("Style2")}
              className="ParaInputButton"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#e3e3e3"
              >
                <path d="M120-240v-80h240v80H120Zm0-200v-80h480v80H120Zm0-200v-80h720v80H120Z" />
              </svg>{" "}
              Para Type
            </button>
          </div>

          {certificationType === "Default" && (
            <p>Please select a certification type to begin.</p>
          )}
          {certificationType === "Style1" && (
            <Style1 resumeData={resumeData} setResumeData={setResumeData} />
          )}
          {certificationType === "Style2" && (
            <Style2 resumeData={resumeData} setResumeData={setResumeData} />
          )}
        </div>
        <div id="dv-CertificationsButtons" className="NavigationButtons">
          <button
            type="button"
            onClick={() => changeContent("previous")}
            className="LeftNavigationButtons"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e3e3e3"
            >
              <path d="M440-240 200-480l240-240 56 56-183 184 183 184-56 56Zm264 0L464-480l240-240 56 56-183 184 183 184-56 56Z" />
            </svg>{" "}
            Skills
          </button>
          <button
            type="button"
            onClick={() => changeContent("next")}
            className="RightNavigationButtons"
          >
            Languages{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e3e3e3"
            >
              <path d="M383-480 200-664l56-56 240 240-240 240-56-56 183-184Zm264 0L464-664l56-56 240 240-240 240-56-56 183-184Z" />
            </svg>
          </button>
        </div>
      </div>
      <PreviewPdf resumeData={resumeData} templateType={templateType} />
    </div>
  );
};

export default Cerifications;
