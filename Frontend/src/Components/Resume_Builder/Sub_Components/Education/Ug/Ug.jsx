import React, { useState } from "react";
import PreviewPdf from "../../PreviewPdf.jsx";
import { useNavigate } from "react-router-dom";
import InfoDiv from "../../Info Div/InfoDiv.jsx";

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
        <div id="dv-EducationUgHeader" className="PageDetailsHeader">
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
              Under Graduate
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
        <div id="dv-EducationUgWrapper" className="WrapperClass">
          <div id="dv-EducationUgAddInput" className="AddInputButton">
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

              {infoDiv === `Ug Name${index}` && (
                <InfoDiv
                  requirement={"Mandatory"}
                  explanation={
                    "Complete name of the Ug degree with specialization if any"
                  }
                  examples={"Bachelor of Computer Science"}
                  characterLimit={"Upto 40 characters"}
                  allowedCharacters={"No Restrictions"}
                />
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

              {infoDiv === `Ug University${index}` && (
                <InfoDiv
                  requirement={"Mandatory"}
                  explanation={"The university which awarded the Ug degree"}
                  examples={"Anna University"}
                  characterLimit={"Upto 40 characters"}
                  allowedCharacters={"No Restrictions"}
                />
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

              {infoDiv === `Ug Period${index}` && (
                <InfoDiv
                  requirement={"Mandatory"}
                  explanation={
                    "The period of your time pursuing this Ug program"
                  }
                  examples={"2021 - 2024"}
                  characterLimit={"Upto 15 characters"}
                  allowedCharacters={"Numbers, Hyphens"}
                />
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

              {infoDiv === `Ug CGPA${index}` && (
                <InfoDiv
                  requirement={"Mandatory"}
                  explanation={
                    "Current or overall CGPA achieved in this degree"
                  }
                  examples={"9.5"}
                  characterLimit={"Upto 5 characters"}
                  allowedCharacters={"Numbers, Period"}
                />
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

              {infoDiv === `Ug Addl${index}` && (
                <InfoDiv
                  requirement={"Optional"}
                  explanation={
                    "Any other important and relevant information related to this degree"
                  }
                  examples={"Distinction Grade"}
                  characterLimit={"Upto 40 characters"}
                  allowedCharacters={"No Restrictions"}
                />
              )}

              {infoDiv === " " && (
                <InfoDiv
                  requirement={""}
                  explanation={""}
                  examples={""}
                  characterLimit={""}
                  allowedCharacters={""}
                />
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
