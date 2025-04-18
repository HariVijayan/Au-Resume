import React, { useState } from "react";
import PreviewPdf from "../../PreviewPdf.jsx";
import { useNavigate } from "react-router-dom";
import InfoDiv from "../../Info Div/InfoDiv.jsx";

const School = ({ resumeData, setResumeData, templateType }) => {
  const navigate = useNavigate();

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setResumeData((prevState) => {
      const updatedEducation = { ...prevState.education[0] };
      updatedEducation[name] = value;

      return {
        ...prevState,
        education: [updatedEducation],
      };
    });
  };

  return (
    <div id="dv-MainFormAndPreview">
      <div id="dv-MainForm">
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
        <div id="dv-EducationSchoolWrapper" className="WrapperClass">
          <div id="dv-EducationHscName" className="InputWrapper">
            <input
              type="text"
              id="in-rb_edu_schl_hsc_name"
              name="hsc_name"
              value={resumeData.hsc_name}
              onChange={(e) => handleInputChange(e)}
              placeholder=" "
            />
            <label htmlFor="in-rb_edu_schl_hsc_name" className="TextFieldLabel">
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
              value={resumeData.hsc_year}
              onChange={(e) => handleInputChange(e)}
              placeholder=" "
            />
            <label htmlFor="in-rb_edu_schl_hsc_year" className="TextFieldLabel">
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
              value={resumeData.hsc_grade}
              onChange={(e) => handleInputChange(e)}
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
              value={resumeData.hsc_additional_info}
              onChange={(e) => handleInputChange(e)}
              placeholder=" "
            />
            <label htmlFor="in-rb_edu_schl_hsc_addl" className="TextFieldLabel">
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
              value={resumeData.sslc_name}
              onChange={(e) => handleInputChange(e)}
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
              value={resumeData.sslc_year}
              onChange={(e) => handleInputChange(e)}
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
              value={resumeData.sslc_grade}
              onChange={(e) => handleInputChange(e)}
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
              value={resumeData.sslc_additional_info}
              onChange={(e) => handleInputChange(e)}
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
      <PreviewPdf resumeData={resumeData} templateType={templateType} />
    </div>
  );
};

export default School;
