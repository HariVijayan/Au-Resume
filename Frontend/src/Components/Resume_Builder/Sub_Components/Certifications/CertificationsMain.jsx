import { useState, useEffect } from "react";
import ListType from "./ListType.jsx";
import ParaType from "./ParaType.jsx";
import PreviewPdf from "../PreviewPdf.jsx";
import { useNavigate } from "react-router-dom";
import ResumeInputTemplate from "../../../../ResumeFormat.jsx";
import HeaderTemplate from "../Header.jsx";
import HowToRegIcon from "@mui/icons-material/HowToReg";

const Cerifications = ({
  setLogoutClicked,
  setLogoutUserType,
  setOverlayType,
}) => {
  const navigate = useNavigate();

  const { resumeData, updateField } = ResumeInputTemplate();

  const changeContent = (navigationType) => {
    if (navigationType === "previous") {
      navigate("/resume-builder/skills");
    } else {
      navigate("/resume-builder/languages-known");
    }
  };

  const [certificationType, setCertificationType] = useState("Default");

  useEffect(() => {
    if (resumeData.certifications.type == "ListType") {
      setCertificationType("ListType");
    } else if (resumeData.certifications.type == "ParaType") {
      setCertificationType("ParaType");
    } else {
      setCertificationType("Default");
    }
  }, [resumeData.certifications]);

  const setCertifications = (type) => {
    if (type === "ListType") {
      let updatedCertifications = { ...resumeData.certifications };
      updatedCertifications.type = "ListType";
      updatedCertifications.certificationSet = [];

      updateField("certifications", updatedCertifications);
    } else if (type === "ParaType") {
      let updatedCertifications = { ...resumeData.certifications };
      updatedCertifications.type = "ParaType";
      updatedCertifications.certificationSet = "";

      updateField("certifications", updatedCertifications);
    }

    setCertificationType(type);
  };

  return (
    <>
      <HeaderTemplate
        currentPage={"Certifications"}
        setLogoutClicked={setLogoutClicked}
        setLogoutUserType={setLogoutUserType}
        setOverlayType={setOverlayType}
        PageIcon={HowToRegIcon}
      />
      <div id="dv-MainFormAndPreview">
        <div id="dv-MainForm">
          <div id="dv-CertificationsWrapper" className="WrapperClass">
            <div id="dv-CertificationStyles" className="StyleChoosingButtons">
              <button
                type="button"
                onClick={() => setCertifications("ListType")}
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
                onClick={() => setCertifications("ParaType")}
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
            {certificationType === "ListType" && <ListType />}
            {certificationType === "ParaType" && <ParaType />}
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
        <PreviewPdf />
      </div>
    </>
  );
};

export default Cerifications;
