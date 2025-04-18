import React, { useState } from "react";
import PreviewPdf from "../../PreviewPdf.jsx";
import { useNavigate } from "react-router-dom";
import InfoDiv from "../../Info Div/InfoDiv.jsx";

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
        <div id="dv-EducationPhdHeader" className="PageDetailsHeader">
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
              Ph.D
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

        <div id="dv-EducationPhdWrapper" className="WrapperClass">
          <div id="dv-EducationPhdAddInput" className="AddInputButton">
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

              {infoDiv === `Phd Name${index}` && (
                <InfoDiv
                  requirement={"Mandatory"}
                  explanation={"Complete name of the PhD with specialization"}
                  examples={"PhD in Advanced Neural Networks"}
                  characterLimit={"Upto 40 characters"}
                  allowedCharacters={"No Restrictions"}
                />
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

              {infoDiv === `Phd University${index}` && (
                <InfoDiv
                  requirement={"Mandatory"}
                  explanation={"The university which awarded the PhD"}
                  examples={"Anna University"}
                  characterLimit={"Upto 40 characters"}
                  allowedCharacters={"No Restrictions"}
                />
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

              {infoDiv === `Phd Period${index}` && (
                <InfoDiv
                  requirement={"Mandatory"}
                  explanation={
                    "The period of your time pursuing this PhD program"
                  }
                  examples={"2017 - 2024"}
                  characterLimit={"Upto 15 characters"}
                  allowedCharacters={"Numbers, Hyphens"}
                />
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
                  xmlns="http://www.w3.org/2000/svg"
                  className="RecommededInputSvg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#e3e3e3"
                >
                  <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
                </svg>
              </div>

              {infoDiv === `Phd Expertise${index}` && (
                <InfoDiv
                  requirement={"Recommended"}
                  explanation={"Domains which got expertise during PhD"}
                  examples={"Machine Learning, Deep Learning, Neural Networks"}
                  characterLimit={"Upto 40 characters"}
                  allowedCharacters={"No Restrictions"}
                />
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

              {infoDiv === `Additional Info${index}` && (
                <InfoDiv
                  requirement={"Optional"}
                  explanation={
                    "Any other important and relevant information related to this degree"
                  }
                  examples={
                    "Widely accepted research with improved efficient algorithms"
                  }
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
