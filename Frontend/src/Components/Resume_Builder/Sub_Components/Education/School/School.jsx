import React, { useState } from "react";
import PreviewPdf from "../../PreviewPdf.jsx";
import { useNavigate } from "react-router-dom";

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
        <div id="dv-EducationSchoolWrapper" className="WrapperClass">
          <div id="dv-EducationSchoolHeader" className="EducationHeader">
            <h3>
              Education Details - School
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#e3e3e3"
              >
                <path d="M480-120 200-272v-240L40-600l440-240 440 240v320h-80v-276l-80 44v240L480-120Zm0-332 274-148-274-148-274 148 274 148Zm0 241 200-108v-151L480-360 280-470v151l200 108Zm0-241Zm0 90Zm0 0Z" />
              </svg>
            </h3>
          </div>
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

          {infoDiv === "Hsc Name" && (
            <div className="InputInfoDiv">
              <div className="InputInfoText">
                <p>Enter your High School Name</p>
              </div>
            </div>
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

          {infoDiv === "Hsc Year" && (
            <div className="InputInfoDiv">
              <div className="InputInfoText">
                <p>Enter the period of High school</p>
              </div>
            </div>
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

          {infoDiv === "Hsc Grade" && (
            <div className="InputInfoDiv">
              <div className="InputInfoText">
                <p>Enter your Hsc GPA or %</p>
              </div>
            </div>
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

          {infoDiv === "Hsc Addl" && (
            <div className="InputInfoDiv">
              <div className="InputInfoText">
                <p>
                  Enter any other important relevant information to your Hsc
                </p>
              </div>
            </div>
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

          {infoDiv === "Sslc Name" && (
            <div className="InputInfoDiv">
              <div className="InputInfoText">
                <p>Enter your Sslc school name</p>
              </div>
            </div>
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

          {infoDiv === "Sslc Year" && (
            <div className="InputInfoDiv">
              <div className="InputInfoText">
                <p>Enter the period of Sslc</p>
              </div>
            </div>
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

          {infoDiv === "Sslc Grade" && (
            <div className="InputInfoDiv">
              <div className="InputInfoText">
                <p>Enter your Sslc GPA or %</p>
              </div>
            </div>
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

          {infoDiv === "Sslc Addl" && (
            <div className="InputInfoDiv">
              <div className="InputInfoText">
                <p>
                  Enter any other important relevant information to your Sslc
                </p>
              </div>
            </div>
          )}
        </div>

        {infoDiv === " " && (
          <div className="InputInfoDiv">
            <div className="InputInfoText"></div>
          </div>
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
