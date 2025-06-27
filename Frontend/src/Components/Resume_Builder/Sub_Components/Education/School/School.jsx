import { useState } from "react";
import PreviewPdf from "../../PreviewPdf.jsx";
import { useNavigate } from "react-router-dom";
import InfoDiv from "../../Info Div/InfoDiv.jsx";
import ResumeInputTemplate from "../../../../../ResumeFormat.jsx";

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

  const logoutUser = () => {
    setLogoutUserType("User");
    setLogoutClicked(true);
  };

  return (
    <>
      <div id="dv-MainContent" className="MainContent">
        <div id="dv-EducationSchoolingHeader" className="PageDetailsHeader">
          <span className="RBHeaderText">
            <span
              id="sp-rbheading"
              onClick={() => navigate("/resume-builder/template-choosing")}
            >
              Resume Builder
            </span>
            <div className="RBHeaderSvgWrapper">
              <span className="RBHeaderArrow">{" > "}</span>Education Details
              <span className="RBHeaderArrow">{" > "}</span>
              Schooling
              <svg
                className="RBHeaderSvg"
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#e3e3e3"
              >
                <path d="M480-120 200-272v-240L40-600l440-240 440 240v320h-80v-276l-80 44v240L480-120Zm0-332 274-148-274-148-274 148 274 148Zm0 241 200-108v-151L480-360 280-470v151l200 108Zm0-241Zm0 90Zm0 0Z" />
              </svg>
            </div>
          </span>
        </div>
        <div id="dv-MenuIcons" className="MenuIcons">
          <svg
            className="MenuIconsSvg"
            onClick={() => setOverlayType("FetchResume")}
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e3e3e3"
          >
            <path d="M260-160q-91 0-155.5-63T40-377q0-78 47-139t123-78q17-72 85-137t145-65q33 0 56.5 23.5T520-716v242l64-62 56 56-160 160-160-160 56-56 64 62v-242q-76 14-118 73.5T280-520h-20q-58 0-99 41t-41 99q0 58 41 99t99 41h480q42 0 71-29t29-71q0-42-29-71t-71-29h-60v-80q0-48-22-89.5T600-680v-93q74 35 117 103.5T760-520q69 8 114.5 59.5T920-340q0 75-52.5 127.5T740-160H260Zm220-358Z" />
          </svg>
          <svg
            className="MenuIconsSvg"
            onClick={() => setOverlayType("SaveResume")}
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e3e3e3"
          >
            <path d="M260-160q-91 0-155.5-63T40-377q0-78 47-139t123-78q25-92 100-149t170-57q117 0 198.5 81.5T760-520q69 8 114.5 59.5T920-340q0 75-52.5 127.5T740-160H520q-33 0-56.5-23.5T440-240v-206l-64 62-56-56 160-160 160 160-56 56-64-62v206h220q42 0 71-29t29-71q0-42-29-71t-71-29h-60v-80q0-83-58.5-141.5T480-720q-83 0-141.5 58.5T280-520h-20q-58 0-99 41t-41 99q0 58 41 99t99 41h100v80H260Zm220-280Z" />
          </svg>
          <svg
            className="MenuIconsSvg"
            onClick={() => navigate("/user-profile")}
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e3e3e3"
          >
            <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z" />
          </svg>
          <svg
            className="MenuIconsSvg"
            onClick={logoutUser}
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e3e3e3"
          >
            <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
          </svg>
        </div>
      </div>
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
