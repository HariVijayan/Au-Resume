import React from "react";
import PreviewPdf from "../../PreviewPdf.jsx";
import { useNavigate } from "react-router-dom";

const School = ({ resumeData, setResumeData, templateType }) => {
  const navigate = useNavigate();

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
          </div>
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
          </div>
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
          </div>
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
          </div>
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
          </div>
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
          </div>
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
          </div>
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
          </div>
        </div>
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
