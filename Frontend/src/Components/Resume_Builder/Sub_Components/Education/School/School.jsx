import { useState } from "react";
import PreviewPdf from "../../PreviewPdf.jsx";
import { useNavigate } from "react-router-dom";
import InfoDiv from "../../Info Div/InfoDiv.jsx";
import ResumeInputTemplate from "../../../../../ResumeFormat.jsx";
import HeaderTemplate from "../../Header.jsx";
import SchoolIcon from "@mui/icons-material/School";

const School = ({ setLogoutClicked, setLogoutUserType, setOverlayType }) => {
  const navigate = useNavigate();

  const { resumeData, updateField } = ResumeInputTemplate();

  const [infoDiv, setInfoDiv] = useState("");

  const showOrHideInfoDiv = (currentState) => {
    if (infoDiv === currentState) {
      setInfoDiv(" ");
    } else {
      setInfoDiv(currentState);
    }
  };

  const changeContent = (navigationType) => {
    if (navigationType === "previous") {
      navigate("/resume-builder/education/diploma");
    } else {
      navigate("/resume-builder/projects");
    }
  };

  return (
    <>
      <HeaderTemplate
        currentPage={"Education - Schooling"}
        setLogoutClicked={setLogoutClicked}
        setLogoutUserType={setLogoutUserType}
        setOverlayType={setOverlayType}
        PageIcon={SchoolIcon}
      />
      <div id="dv-MainFormAndPreview">
        <div id="dv-MainForm">
          <div id="dv-EducationSchoolWrapper" className="WrapperClass">
            <div id="dv-EducationHscName" className="InputWrapper">
              <input
                type="text"
                id="in-rb_edu_schl_hsc_name"
                name="hsc_name"
                value={resumeData.education.hsc.name}
                onChange={(e) =>
                  updateField("education.hsc.name", e.target.value)
                }
                placeholder=" "
              />
              <label
                htmlFor="in-rb_edu_schl_hsc_name"
                className="TextFieldLabel"
              >
                HSC Name
              </label>
              <svg
                onClick={() => showOrHideInfoDiv("Hsc Name")}
                xmlns="http://www.w3.org/2000/svg"
                className="MandatoryInputSvg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#e3e3e3"
              >
                <path d="M440-120v-264L254-197l-57-57 187-186H120v-80h264L197-706l57-57 186 187v-264h80v264l186-187 57 57-187 186h264v80H576l187 186-57 57-186-187v264h-80Z" />
              </svg>
            </div>

            {infoDiv === "Hsc Name" && (
              <InfoDiv
                requirement={"Mandatory"}
                explanation={"The school name where you studied HSC"}
                examples={"Kendriya Vidyalaya"}
                characterLimit={"Upto 40 characters"}
                allowedCharacters={"No Restrictions"}
              />
            )}

            <div id="dv-EducationHscYear" className="InputWrapper">
              <input
                type="text"
                id="in-rb_edu_schl_hsc_year"
                name="hsc_year"
                value={resumeData.education.hsc.year}
                onChange={(e) =>
                  updateField("education.hsc.year", e.target.value)
                }
                placeholder=" "
              />
              <label
                htmlFor="in-rb_edu_schl_hsc_year"
                className="TextFieldLabel"
              >
                HSC Year
              </label>
              <svg
                onClick={() => showOrHideInfoDiv("Hsc Year")}
                xmlns="http://www.w3.org/2000/svg"
                className="MandatoryInputSvg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#e3e3e3"
              >
                <path d="M440-120v-264L254-197l-57-57 187-186H120v-80h264L197-706l57-57 186 187v-264h80v264l186-187 57 57-187 186h264v80H576l187 186-57 57-186-187v264h-80Z" />
              </svg>
            </div>

            {infoDiv === "Hsc Year" && (
              <InfoDiv
                requirement={"Mandatory"}
                explanation={"The period of your time pursuing HSC"}
                examples={"2021 - 2023"}
                characterLimit={"Upto 15 characters"}
                allowedCharacters={"Numbers, Hyphens"}
              />
            )}

            <div id="dv-EducationHscGrade" className="InputWrapper">
              <input
                type="text"
                id="in-rb_edu_schl_hsc_grade"
                name="hsc_grade"
                value={resumeData.education.hsc.grade}
                onChange={(e) =>
                  updateField("education.hsc.grade", e.target.value)
                }
                placeholder=" "
              />
              <label
                htmlFor="in-rb_edu_schl_hsc_grade"
                className="TextFieldLabel"
              >
                HSC Grade
              </label>
              <svg
                onClick={() => showOrHideInfoDiv("Hsc Grade")}
                xmlns="http://www.w3.org/2000/svg"
                className="MandatoryInputSvg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#e3e3e3"
              >
                <path d="M440-120v-264L254-197l-57-57 187-186H120v-80h264L197-706l57-57 186 187v-264h80v264l186-187 57 57-187 186h264v80H576l187 186-57 57-186-187v264h-80Z" />
              </svg>
            </div>

            {infoDiv === "Hsc Grade" && (
              <InfoDiv
                requirement={"Mandatory"}
                explanation={"GPA or overall percentage achieved in HSC"}
                examples={"9.5"}
                characterLimit={"Upto 5 characters"}
                allowedCharacters={"Numbers, Period"}
              />
            )}

            <div id="dv-EducationHscAdditionalInfo" className="InputWrapper">
              <input
                type="text"
                id="in-rb_edu_schl_hsc_addl"
                name="hsc_additional_info"
                value={resumeData.education.hsc.additionalInfo}
                onChange={(e) =>
                  updateField("education.hsc.additionalInfo", e.target.value)
                }
                placeholder=" "
              />
              <label
                htmlFor="in-rb_edu_schl_hsc_addl"
                className="TextFieldLabel"
              >
                HSC Additional Info
              </label>
              <svg
                onClick={() => showOrHideInfoDiv("Hsc Addl")}
                xmlns="http://www.w3.org/2000/svg"
                className="OptionalInputSvg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#e3e3e3"
              >
                <path d="M240-440v-80h480v80H240Z" />
              </svg>
            </div>

            {infoDiv === "Hsc Addl" && (
              <InfoDiv
                requirement={"Optional"}
                explanation={
                  "Any other important and relevant information related to HSC"
                }
                examples={"NCERT Board"}
                characterLimit={"Upto 40 characters"}
                allowedCharacters={"No Restrictions"}
              />
            )}

            <div id="dv-EducationSslcName" className="InputWrapper">
              <input
                type="text"
                id="in-rb_edu_schl_sslc_name"
                name="sslc_name"
                value={resumeData.education.sslc.name}
                onChange={(e) =>
                  updateField("education.sslc.name", e.target.value)
                }
                placeholder=" "
              />
              <label
                htmlFor="in-rb_edu_schl_sslc_name"
                className="TextFieldLabel"
              >
                SSLC Name
              </label>
              <svg
                onClick={() => showOrHideInfoDiv("Sslc Name")}
                xmlns="http://www.w3.org/2000/svg"
                className="MandatoryInputSvg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#e3e3e3"
              >
                <path d="M440-120v-264L254-197l-57-57 187-186H120v-80h264L197-706l57-57 186 187v-264h80v264l186-187 57 57-187 186h264v80H576l187 186-57 57-186-187v264h-80Z" />
              </svg>
            </div>

            {infoDiv === "Sslc Name" && (
              <InfoDiv
                requirement={"Mandatory"}
                explanation={"The school name where you studied SSLC"}
                examples={"Kendriya Vidyalaya"}
                characterLimit={"Upto 40 characters"}
                allowedCharacters={"No Restrictions"}
              />
            )}

            <div id="dv-EducationSslcYear" className="InputWrapper">
              <input
                type="text"
                id="in-rb_edu_schl_sslc_year"
                name="sslc_year"
                value={resumeData.education.sslc.year}
                onChange={(e) =>
                  updateField("education.sslc.year", e.target.value)
                }
                placeholder=" "
              />
              <label
                htmlFor="in-rb_edu_schl_sslc_year"
                className="TextFieldLabel"
              >
                SSLC Year
              </label>
              <svg
                onClick={() => showOrHideInfoDiv("Sslc Year")}
                xmlns="http://www.w3.org/2000/svg"
                className="MandatoryInputSvg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#e3e3e3"
              >
                <path d="M440-120v-264L254-197l-57-57 187-186H120v-80h264L197-706l57-57 186 187v-264h80v264l186-187 57 57-187 186h264v80H576l187 186-57 57-186-187v264h-80Z" />
              </svg>
            </div>

            {infoDiv === "Sslc Year" && (
              <InfoDiv
                requirement={"Mandatory"}
                explanation={"The period of your time pursuing SSLC"}
                examples={"2019 - 2021"}
                characterLimit={"Upto 15 characters"}
                allowedCharacters={"Numbers, Hyphens"}
              />
            )}

            <div id="dv-EducationSslcGrade" className="InputWrapper">
              <input
                type="text"
                id="in-rb_edu_schl_sslc_grade"
                name="sslc_grade"
                value={resumeData.education.sslc.grade}
                onChange={(e) =>
                  updateField("education.sslc.grade", e.target.value)
                }
                placeholder=" "
              />
              <label
                htmlFor="in-rb_edu_schl_sslc_grade"
                className="TextFieldLabel"
              >
                SSLC Grade
              </label>
              <svg
                onClick={() => showOrHideInfoDiv("Sslc Grade")}
                xmlns="http://www.w3.org/2000/svg"
                className="MandatoryInputSvg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#e3e3e3"
              >
                <path d="M440-120v-264L254-197l-57-57 187-186H120v-80h264L197-706l57-57 186 187v-264h80v264l186-187 57 57-187 186h264v80H576l187 186-57 57-186-187v264h-80Z" />
              </svg>
            </div>

            {infoDiv === "Sslc Grade" && (
              <InfoDiv
                requirement={"Mandatory"}
                explanation={"GPA or overall percentage achieved in SSLC"}
                examples={"9.5"}
                characterLimit={"Upto 5 characters"}
                allowedCharacters={"Numbers, Period"}
              />
            )}

            <div id="dv-EducationSslcAdditionalInfo" className="InputWrapper">
              <input
                type="text"
                id="in-rb_edu_schl_sslc_addl"
                name="sslc_additional_info"
                value={resumeData.education.sslc.additionalInfo}
                onChange={(e) =>
                  updateField("education.sslc.additionalInfo", e.target.value)
                }
                placeholder=" "
              />
              <label
                htmlFor="in-rb_edu_schl_sslc_addl"
                className="TextFieldLabel"
              >
                SSLC Additional Info
              </label>
              <svg
                onClick={() => showOrHideInfoDiv("Sslc Addl")}
                xmlns="http://www.w3.org/2000/svg"
                className="OptionalInputSvg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#e3e3e3"
              >
                <path d="M240-440v-80h480v80H240Z" />
              </svg>
            </div>

            {infoDiv === "Sslc Addl" && (
              <InfoDiv
                requirement={"Optional"}
                explanation={
                  "Any other important and relevant information related to SSLC"
                }
                examples={"NCERT Board"}
                characterLimit={"Upto 40 characters"}
                allowedCharacters={"No Restrictions"}
              />
            )}
          </div>

          {infoDiv === " " && (
            <InfoDiv
              requirement={""}
              explanation={""}
              examples={""}
              characterLimit={""}
              allowedCharacters={""}
            />
          )}

          <div id="dv-EducationSchoolButtons" className="NavigationButtons">
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
              Diploma
            </button>
            <button
              type="button"
              onClick={() => changeContent("next")}
              className="RightNavigationButtons"
            >
              Projects{" "}
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

export default School;
