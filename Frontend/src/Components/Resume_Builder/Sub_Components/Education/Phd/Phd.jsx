import React, { useState } from "react";
import PreviewPdf from "../../PreviewPdf.jsx";
import { useNavigate } from "react-router-dom";

const Phd = ({ resumeData, setResumeData, templateType }) => {
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
      navigate("/resume-builder/experience");
    } else {
      navigate("/resume-builder/education/pg");
    }
  };

  const handleEducationInputChange = (e, Index) => {
    const { name, value } = e.target;
    const updatedEducation = [...resumeData.education];
    updatedEducation[0].phd[Index][name] = value;
    setResumeData({
      ...resumeData,
      education: updatedEducation,
    });
  };

  const handleAddEducation = (e) => {
    e.preventDefault();
    const updatedEducation = [...resumeData.education];
    updatedEducation[0].phd.push({
      phd_name: "",
      phd_university: "",
      phd_year: "",
      phd_exp: "",
      phd_additional_info: "",
    });

    setResumeData({
      ...resumeData,
      education: updatedEducation,
    });
  };

  return (
    <div id="dv-MainFormAndPreview">
      <div id="dv-MainForm">
        <div id="dv-EducationPhdWrapper" className="WrapperClass">
          <div id="dv-EducationPhdHeader" className="EducationHeader">
            <h3>
              Education Details - Ph.D{" "}
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
              Add Phd
            </button>
          </div>
          {resumeData.education[0].phd.map((phd, index) => (
            <div
              key={index}
              id={`dv-EducationPhdCopy${index + 1}`}
              className="SubWrapper"
            >
              <div
                id={`dv-EduPhdNameCopy${index + 1}`}
                className="InputWrapper"
              >
                <input
                  type="text"
                  id={`in-rb_edu_phd_name${index + 1}`}
                  name="phd_name"
                  value={phd.phd_name}
                  onChange={(e) => handleEducationInputChange(e, index)}
                  placeholder=" "
                />
                <label
                  htmlFor={`in-rb_edu_phd_name${index + 1}`}
                  className="TextFieldLabel"
                >
                  Name
                </label>
                <svg
                  onClick={() => showOrHideInfoDiv(`Phd Name${index}`)}
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

              {infoDiv === `Phd Name${index}` && (
                <div className="InputInfoDiv">
                  <div className="InputInfoText">
                    <p>Enter degree name</p>
                  </div>
                </div>
              )}

              <div id={`dv-EduPhdUniCopy${index + 1}`} className="InputWrapper">
                <input
                  type="text"
                  id={`in-rb_edu_phd_uni${index + 1}`}
                  name="phd_university"
                  value={phd.phd_university}
                  onChange={(e) => handleEducationInputChange(e, index)}
                  placeholder=" "
                />
                <label
                  htmlFor={`in-rb_edu_phd_uni${index + 1}`}
                  className="TextFieldLabel"
                >
                  University
                </label>
                <svg
                  onClick={() => showOrHideInfoDiv(`Phd University${index}`)}
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

              {infoDiv === `Phd University${index}` && (
                <div className="InputInfoDiv">
                  <div className="InputInfoText">
                    <p>Enter phd university</p>
                  </div>
                </div>
              )}

              <div
                id={`dv-EduPhdYearCopy${index + 1}`}
                className="InputWrapper"
              >
                <input
                  type="text"
                  id={`in-rb_edu_phd_year${index + 1}`}
                  name="phd_year"
                  value={phd.phd_year}
                  onChange={(e) => handleEducationInputChange(e, index)}
                  placeholder=" "
                />
                <label
                  htmlFor={`in-rb_edu_phd_year${index + 1}`}
                  className="TextFieldLabel"
                >
                  Year
                </label>
                <svg
                  onClick={() => showOrHideInfoDiv(`Phd Period${index}`)}
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

              {infoDiv === `Phd Period${index}` && (
                <div className="InputInfoDiv">
                  <div className="InputInfoText">
                    <p>Enter period of phd</p>
                  </div>
                </div>
              )}

              <div id={`dv-EduPhdExpCopy${index + 1}`} className="InputWrapper">
                <input
                  type="text"
                  id={`in-rb_edu_phd_exp${index + 1}`}
                  name="phd_exp"
                  value={phd.phd_exp}
                  onChange={(e) => handleEducationInputChange(e, index)}
                  placeholder=" "
                />
                <label
                  htmlFor={`in-rb_edu_phd_exp${index + 1}`}
                  className="TextFieldLabel"
                >
                  Expertise
                </label>
                <svg
                  onClick={() => showOrHideInfoDiv(`Phd Expertise${index}`)}
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

              {infoDiv === `Phd Expertise${index}` && (
                <div className="InputInfoDiv">
                  <div className="InputInfoText">
                    <p>Enter areas of expertise</p>
                  </div>
                </div>
              )}

              <div
                id={`dv-EduPhdAddlCopy${index + 1}`}
                className="InputWrapper"
              >
                <input
                  type="text"
                  id={`in-rb_edu_phd_addl${index + 1}`}
                  name="phd_additional_info"
                  value={phd.phd_additional_info}
                  onChange={(e) => handleEducationInputChange(e, index)}
                  placeholder=" "
                />
                <label
                  htmlFor={`in-rb_edu_phd_addl${index + 1}`}
                  className="TextFieldLabel"
                >
                  Additional Info
                </label>
                <svg
                  onClick={() => showOrHideInfoDiv(`Additional Info${index}`)}
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

              {infoDiv === `Additional Info${index}` && (
                <div className="InputInfoDiv">
                  <div className="InputInfoText">
                    <p>Any other relevant important information</p>
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
        <div id="dv-EducationPhdButtons" className="NavigationButtons">
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
            Experience
          </button>
          <button
            type="button"
            onClick={() => changeContent("next")}
            className="RightNavigationButtons"
          >
            Post Graduate{" "}
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

export default Phd;
