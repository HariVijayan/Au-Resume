import React, { useState } from "react";
import PreviewPdf from "../../PreviewPdf.jsx";
import { useNavigate } from "react-router-dom";

const Ug = ({ resumeData, setResumeData, templateType }) => {
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
      navigate("/resume-builder/education/pg");
    } else {
      navigate("/resume-builder/education/diploma");
    }
  };
  const handleEducationInputChange = (e, Index) => {
    const { name, value } = e.target;
    const updatedEducation = [...resumeData.education];
    updatedEducation[0].ug_degree[Index][name] = value;

    setResumeData({
      ...resumeData,
      education: updatedEducation,
    });
  };

  const handleAddEducation = (e) => {
    e.preventDefault();
    const updatedEducation = [...resumeData.education];
    updatedEducation[0].ug_degree.push({
      ug_degree_name: "",
      ug_degree_university: "",
      ug_degree_year: "",
      ug_degree_cgpa: "",
      ug_degree_additional_info: "",
    });

    setResumeData({
      ...resumeData,
      education: updatedEducation,
    });
  };

  return (
    <div id="dv-MainFormAndPreview">
      <div id="dv-MainForm">
        <div id="dv-EducationUgWrapper" className="WrapperClass">
          <div id="dv-EducationUgHeader" className="EducationHeader">
            <h3>
              Education Details - Ug
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
              Add Ug
            </button>
          </div>
          {resumeData.education[0].ug_degree.map((ug_degree, index) => (
            <div
              key={index}
              id={`dv-EducationUgCopy${index + 1}`}
              className="SubWrapper"
            >
              <div id={`dv-EduUgNameCopy${index + 1}`} className="InputWrapper">
                <input
                  type="text"
                  id={`in-rb_edu_ug_name${index + 1}`}
                  name="ug_degree_name"
                  value={ug_degree.ug_degree_name}
                  onChange={(e) => handleEducationInputChange(e, index)}
                  placeholder=" "
                />
                <label
                  htmlFor={`in-rb_edu_ug_name${index + 1}`}
                  className="TextFieldLabel"
                >
                  Name
                </label>
                <svg
                  onClick={() => showOrHideInfoDiv(`Ug Name${index}`)}
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

              {infoDiv === `Ug Name${index}` && (
                <div className="InputInfoDiv">
                  <div className="InputInfoText">
                    <p>Enter degree name</p>
                  </div>
                </div>
              )}

              <div id={`dv-EduUgUniCopy${index + 1}`} className="InputWrapper">
                <input
                  type="text"
                  id={`in-rb_edu_ug_uni${index + 1}`}
                  name="ug_degree_university"
                  value={ug_degree.ug_degree_university}
                  onChange={(e) => handleEducationInputChange(e, index)}
                  placeholder=" "
                />
                <label
                  htmlFor={`in-rb_edu_ug_uni${index + 1}`}
                  className="TextFieldLabel"
                >
                  University
                </label>
                <svg
                  onClick={() => showOrHideInfoDiv(`Ug University${index}`)}
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

              {infoDiv === `Ug University${index}` && (
                <div className="InputInfoDiv">
                  <div className="InputInfoText">
                    <p>Enter ug university</p>
                  </div>
                </div>
              )}

              <div id={`dv-EduUgYearCopy${index + 1}`} className="InputWrapper">
                <input
                  type="text"
                  id={`in-rb_edu_ug_year${index + 1}`}
                  name="ug_degree_year"
                  value={ug_degree.ug_degree_year}
                  onChange={(e) => handleEducationInputChange(e, index)}
                  placeholder=" "
                />
                <label
                  htmlFor={`in-rb_edu_ug_year${index + 1}`}
                  className="TextFieldLabel"
                >
                  Year
                </label>
                <svg
                  onClick={() => showOrHideInfoDiv(`Ug Period${index}`)}
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

              {infoDiv === `Ug Period${index}` && (
                <div className="InputInfoDiv">
                  <div className="InputInfoText">
                    <p>Enter period of study</p>
                  </div>
                </div>
              )}

              <div id={`dv-EduUgCgpaCopy${index + 1}`} className="InputWrapper">
                <input
                  type="text"
                  id={`in-rb_edu_ug_cpga${index + 1}`}
                  name="ug_degree_cgpa"
                  value={ug_degree.ug_degree_cgpa}
                  onChange={(e) => handleEducationInputChange(e, index)}
                  placeholder=" "
                />
                <label
                  htmlFor={`in-rb_edu_ug_cgpa${index + 1}`}
                  className="TextFieldLabel"
                >
                  CGPA
                </label>
                <svg
                  onClick={() => showOrHideInfoDiv(`Ug CGPA${index}`)}
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

              {infoDiv === `Ug CGPA${index}` && (
                <div className="InputInfoDiv">
                  <div className="InputInfoText">
                    <p>Enter ug cgpa</p>
                  </div>
                </div>
              )}

              <div id={`dv-EduUgAddlCopy${index + 1}`} className="InputWrapper">
                <input
                  type="text"
                  id={`in-rb_edu_ug_addl${index + 1}`}
                  name="ug_additional_info"
                  value={ug_degree.ug_additional_info}
                  onChange={(e) => handleEducationInputChange(e, index)}
                  placeholder=" "
                />
                <label
                  htmlFor={`in-rb_edu_ug_addl${index + 1}`}
                  className="TextFieldLabel"
                >
                  Additional Info
                </label>
                <svg
                  onClick={() => showOrHideInfoDiv(`Ug Addl${index}`)}
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

              {infoDiv === `Ug Addl${index}` && (
                <div className="InputInfoDiv">
                  <div className="InputInfoText">
                    <p>Any other important or relevant information</p>
                  </div>
                </div>
              )}

              {infoDiv === " " && (
                <div className="InputInfoDiv">
                  <div className="InputInfoText"></div>
                </div>
              )}
            </div>
          ))}
        </div>
        <div id="dv-EducationUgButtons" className="NavigationButtons">
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
            Post Graduate
          </button>
          <button
            type="button"
            onClick={() => changeContent("next")}
            className="RightNavigationButtons"
          >
            Diploma{" "}
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

export default Ug;
