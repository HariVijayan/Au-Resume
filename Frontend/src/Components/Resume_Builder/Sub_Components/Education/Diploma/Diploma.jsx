import React from "react";
import PreviewPdf from "../../PreviewPdf.jsx";
import { useNavigate } from "react-router-dom";

const Diploma = ({ resumeData, setResumeData, templateType }) => {
  const navigate = useNavigate();

  const changeContent = (navigationType) => {
    if (navigationType === "previous") {
      navigate("/resume-builder/education/ug");
    } else {
      navigate("/resume-builder/education/school");
    }
  };

  const handleEducationInputChange = (e, Index) => {
    const { name, value } = e.target;
    const updatedEducation = [...resumeData.education];
    updatedEducation[0].diploma[Index][name] = value;
    setResumeData({
      ...resumeData,
      education: updatedEducation,
    });
  };

  const handleAddEducation = (e) => {
    e.preventDefault();
    const updatedEducation = [...resumeData.education];
    updatedEducation[0].diploma.push({
      diploma_name: "",
      diploma_university: "",
      diploma_year: "",
      diploma_cgpa: "",
      diploma_additional_info: "",
    });

    setResumeData({
      ...resumeData,
      education: updatedEducation,
    });
  };

  return (
    <div id="dv-MainFormAndPreview">
      <div id="dv-MainForm">
        <div id="dv-EducationDiplomaWrapper" className="WrapperClass">
          <div id="dv-EducationDiplomaHeader" className="EducationHeader">
            <h3>
              Education Details - Diploma{" "}
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
            <button
              type="button"
              onClick={(e) => handleAddEducation(e)}
              className="AddInputButtons"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#e3e3e3"
              >
                <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
              </svg>{" "}
              Add Diploma
            </button>
          </div>
          {resumeData.education[0].diploma.map((diploma, index) => (
            <div key={index} id="dv-EducationDiploma" className="SubWrapper">
              <div id="dv-EducationDiplomaName" className="InputWrapper">
                <input
                  type="text"
                  id="in-rb_edu_dipl_name"
                  name="diploma_name"
                  value={diploma.diploma_name}
                  onChange={(e) => handleEducationInputChange(e, index)}
                  placeholder=" "
                />
                <label htmlFor="in-rb_edu_dipl_name" className="TextFieldLabel">
                  Name
                </label>
              </div>
              <div id="dv-EducationDiplomaUniversity" className="InputWrapper">
                <input
                  type="text"
                  id="in-rb_edu_dipl_uni"
                  name="diploma_university"
                  value={diploma.diploma_university}
                  onChange={(e) => handleEducationInputChange(e, index)}
                  placeholder=" "
                />
                <label htmlFor="in-rb_edu_dipl_uni" className="TextFieldLabel">
                  University
                </label>
              </div>
              <div id="dv-EducationDiplomaYear" className="InputWrapper">
                <input
                  type="text"
                  id="in-rb_edu_dipl_year"
                  name="diploma_year"
                  value={diploma.diploma_year}
                  onChange={(e) => handleEducationInputChange(e, index)}
                  placeholder=" "
                />
                <label htmlFor="in-rb_edu_dipl_year" className="TextFieldLabel">
                  Year
                </label>
              </div>
              <div id="dv-EducationDiplomaCgpa" className="InputWrapper">
                <input
                  type="text"
                  id="in-rb_edu_dipl_cgpa"
                  name="diploma_cgpa"
                  value={diploma.diploma_cgpa}
                  onChange={(e) => handleEducationInputChange(e, index)}
                  placeholder=" "
                />
                <label htmlFor="in-rb_edu_dipl_cgpa" className="TextFieldLabel">
                  CGPA
                </label>
              </div>
              <div
                id="dv-EducationDiplomaAdditionalInfo"
                className="InputWrapper"
              >
                <input
                  type="text"
                  name="diploma_additional_info"
                  id="in-rb_edu_dipl_addl"
                  value={diploma.diploma_additional_info}
                  onChange={(e) => handleEducationInputChange(e, index)}
                  placeholder=" "
                />
                <label htmlFor="in-rb_edu_dipl_addl" className="TextFieldLabel">
                  Additional Info
                </label>
              </div>
            </div>
          ))}
        </div>
        <div id="dv-EducationDiplomaButtons" className="NavigationButtons">
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
            Under Graduate
          </button>
          <button
            type="button"
            onClick={() => changeContent("next")}
            className="RightNavigationButtons"
          >
            School{" "}
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

export default Diploma;
