import React from "react";
import PreviewPdf from "../../PreviewPdf.jsx";
import { useNavigate } from "react-router-dom";

const Pg = ({ resumeData, setResumeData, templateType }) => {
  const navigate = useNavigate();

  const changeContent = (navigationType) => {
    if (navigationType === "previous") {
      navigate("/resume-builder/education/phd");
    } else {
      navigate("/resume-builder/education/ug");
    }
  };

  const handleEducationInputChange = (e, Index) => {
    const { name, value } = e.target;
    const updatedEducation = [...resumeData.education];
    updatedEducation[0].pg_degree[Index][name] = value;
    setResumeData({
      ...resumeData,
      education: updatedEducation,
    });
  };

  const handleAddEducation = (e) => {
    e.preventDefault();
    const updatedEducation = [...resumeData.education];
    updatedEducation[0].pg_degree.push({
      pg_degree_name: "",
      pg_degree_university: "",
      pg_degree_year: "",
      pg_degree_cgpa: "",
      pg_degree_additional_info: "",
    });

    setResumeData({
      ...resumeData,
      education: updatedEducation,
    });
  };

  return (
    <div id="dv-MainFormAndPreview">
      <div id="dv-MainForm">
        <div id="dv-EducationPgWrapper" className="WrapperClass">
          <div id="dv-EducationPgHeader" className="EducationHeader">
            <h3>
              Education Details - Pg{" "}
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
              Add Pg
            </button>
          </div>
          {resumeData.education[0].pg_degree.map((pg_degree, index) => (
            <div key={index} id="dv-EducationPg" className="SubWrapper">
              <div id="dv-EducationPgName" className="InputWrapper">
                <input
                  type="text"
                  id="in-rb_edu_pg_name"
                  name="pg_degree_name"
                  value={pg_degree.pg_degree_name}
                  onChange={(e) => handleEducationInputChange(e, index)}
                  placeholder=" "
                />
                <label htmlFor="in-rb_edu_pg_name" className="TextFieldLabel">
                  Name
                </label>
              </div>
              <div id="dv-EducationPgUniversity" className="InputWrapper">
                <input
                  type="text"
                  id="in-rb_edu_pg_uni"
                  name="pg_degree_university"
                  value={pg_degree.pg_degree_university}
                  onChange={(e) => handleEducationInputChange(e, index)}
                  placeholder=" "
                />
                <label htmlFor="in-rb_edu_pg_uni" className="TextFieldLabel">
                  University
                </label>
              </div>
              <div id="dv-EducationPgYear" className="InputWrapper">
                <input
                  type="text"
                  id="in-rb_edu_pg_year"
                  name="pg_degree_year"
                  value={pg_degree.pg_degree_year}
                  onChange={(e) => handleEducationInputChange(e, index)}
                  placeholder=" "
                />
                <label htmlFor="in-rb_edu_pg_year" className="TextFieldLabel">
                  Year
                </label>
              </div>
              <div id="dv-EducationPgCgpa" className="InputWrapper">
                <input
                  type="text"
                  id="in-rb_edu_pg_cgpa"
                  name="pg_degree_cgpa"
                  value={pg_degree.pg_degree_cgpa}
                  onChange={(e) => handleEducationInputChange(e, index)}
                  placeholder=" "
                />
                <label htmlFor="in-rb_edu_pg_cgpa" className="TextFieldLabel">
                  CGPA
                </label>
              </div>
              <div id="dv-EducationPgAdditionalInfo" className="InputWrapper">
                <input
                  type="text"
                  name="pg_additional_info"
                  id="in-rb_edu_pg_addl"
                  value={pg_degree.pg_additional_info}
                  onChange={(e) => handleEducationInputChange(e, index)}
                  placeholder=" "
                />
                <label htmlFor="in-rb_edu_pg_addl" className="TextFieldLabel">
                  Additional Info
                </label>
              </div>
            </div>
          ))}
        </div>
        <div id="dv-EducationPgButtons" className="NavigationButtons">
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
            Ph.D
          </button>
          <button
            type="button"
            onClick={() => changeContent("next")}
            className="RightNavigationButtons"
          >
            Under Graduate{" "}
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

export default Pg;
