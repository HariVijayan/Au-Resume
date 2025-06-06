import { useState } from "react";
import PreviewPdf from "../../PreviewPdf.jsx";
import { useNavigate } from "react-router-dom";
import InfoDiv from "../../Info Div/InfoDiv.jsx";
import ResumeInputTemplate from "../../../../../ResumeFormat.jsx";

const Pg = ({ setLogoutClicked }) => {
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
      navigate("/resume-builder/education/phd");
    } else {
      navigate("/resume-builder/education/ug");
    }
  };

  const addNewPg = (e) => {
    e.preventDefault();
    const updatedPg = [...resumeData.education.postGraduate];
    updatedPg.push({
      name: "",
      university: "",
      year: "",
      cgpa: "",
      additionalInfo: "",
    });
    updateField("education.postGraduate", updatedPg);
  };

  return (
    <>
      <div id="dv-MainContent" className="MainContent">
        <div id="dv-EducationPgHeader" className="PageDetailsHeader">
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
              Post Graduate
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
            onClick={() => setLogoutClicked(true)}
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
          <div id="dv-EducationPgWrapper" className="WrapperClass">
            <div id="dv-EducationPgAddInput" className="AddInputButton">
              <button
                type="button"
                onClick={addNewPg}
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

            {resumeData.education.postGraduate.map((newPgEntry, newPgIndex) => (
              <div
                key={newPgIndex}
                id={`dv-EducationPgCopy${newPgIndex + 1}`}
                className="SubWrapper"
              >
                <div
                  id={`dv-EduPgNameCopy${newPgIndex + 1}`}
                  className="InputWrapper"
                >
                  <input
                    type="text"
                    id={`in-rb_edu_pg_name${newPgIndex + 1}`}
                    name="pg_degree_name"
                    value={newPgEntry.name}
                    onChange={(e) => {
                      let updatedPg = [...resumeData.education.postGraduate];
                      updatedPg[newPgIndex].name = e.target.value;
                      updateField("education.postGraduate", updatedPg);
                    }}
                    placeholder=" "
                  />
                  <label
                    htmlFor={`in-rb_edu_pg_name${newPgIndex + 1}`}
                    className="TextFieldLabel"
                  >
                    Name
                  </label>
                  <svg
                    onClick={() => showOrHideInfoDiv(`Pg Name${newPgIndex}`)}
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

                {infoDiv === `Pg Name${newPgIndex}` && (
                  <InfoDiv
                    requirement={"Mandatory"}
                    explanation={
                      "Complete name of the Pg degree with specialization if any"
                    }
                    examples={"Master of Computer Applications"}
                    characterLimit={"Upto 40 characters"}
                    allowedCharacters={"No Restrictions"}
                  />
                )}

                <div
                  id={`dv-EduPgUniCopy${newPgIndex + 1}`}
                  className="InputWrapper"
                >
                  <input
                    type="text"
                    id={`in-rb_edu_pg_uni${newPgIndex + 1}`}
                    name="pg_degree_university"
                    value={newPgEntry.university}
                    onChange={(e) => {
                      let updatedPg = [...resumeData.education.postGraduate];
                      updatedPg[newPgIndex].university = e.target.value;
                      updateField("education.postGraduate", updatedPg);
                    }}
                    placeholder=" "
                  />
                  <label
                    htmlFor={`in-rb_edu_pg_uni${newPgIndex + 1}`}
                    className="TextFieldLabel"
                  >
                    University
                  </label>
                  <svg
                    onClick={() =>
                      showOrHideInfoDiv(`Pg University${newPgIndex}`)
                    }
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

                {infoDiv === `Pg University${newPgIndex}` && (
                  <InfoDiv
                    requirement={"Mandatory"}
                    explanation={"The university which awarded the Pg degree"}
                    examples={"Anna University"}
                    characterLimit={"Upto 40 characters"}
                    allowedCharacters={"No Restrictions"}
                  />
                )}

                <div
                  id={`dv-EduPgYearCopy${newPgIndex + 1}`}
                  className="InputWrapper"
                >
                  <input
                    type="text"
                    id={`in-rb_edu_pg_year${newPgIndex + 1}`}
                    name="pg_degree_year"
                    value={newPgEntry.year}
                    onChange={(e) => {
                      let updatedPg = [...resumeData.education.postGraduate];
                      updatedPg[newPgIndex].year = e.target.value;
                      updateField("education.postGraduate", updatedPg);
                    }}
                    placeholder=" "
                  />
                  <label
                    htmlFor={`in-rb_edu_pg_year${newPgIndex + 1}`}
                    className="TextFieldLabel"
                  >
                    Year
                  </label>
                  <svg
                    onClick={() => showOrHideInfoDiv(`Pg Period${newPgIndex}`)}
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

                {infoDiv === `Pg Period${newPgIndex}` && (
                  <InfoDiv
                    requirement={"Mandatory"}
                    explanation={
                      "The period of your time pursuing this Pg program"
                    }
                    examples={"2022 - 2024"}
                    characterLimit={"Upto 15 characters"}
                    allowedCharacters={"Numbers, Hyphens"}
                  />
                )}

                <div
                  id={`dv-EduPgCgpaCopy${newPgIndex + 1}`}
                  className="InputWrapper"
                >
                  <input
                    type="text"
                    id={`in-rb_edu_pg_cgpa${newPgIndex + 1}`}
                    name="pg_degree_cgpa"
                    value={newPgEntry.cgpa}
                    onChange={(e) => {
                      let updatedPg = [...resumeData.education.postGraduate];
                      updatedPg[newPgIndex].cgpa = e.target.value;
                      updateField("education.postGraduate", updatedPg);
                    }}
                    placeholder=" "
                  />
                  <label
                    htmlFor={`in-rb_edu_pg_cgpa${newPgIndex + 1}`}
                    className="TextFieldLabel"
                  >
                    CGPA
                  </label>
                  <svg
                    onClick={() => showOrHideInfoDiv(`Pg CGPA${newPgIndex}`)}
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

                {infoDiv === `Pg CGPA${newPgIndex}` && (
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

                <div
                  id={`dv-EduPgAddlCopy${newPgIndex + 1}`}
                  className="InputWrapper"
                >
                  <input
                    type="text"
                    name="pg_additional_info"
                    id={`in-rb_edu_pg_addl${newPgIndex + 1}`}
                    value={newPgEntry.additionalInfo}
                    onChange={(e) => {
                      let updatedPg = [...resumeData.education.postGraduate];
                      updatedPg[newPgIndex].additionalInfo = e.target.value;
                      updateField("education.postGraduate", updatedPg);
                    }}
                    placeholder=" "
                  />
                  <label
                    htmlFor={`in-rb_edu_pg_addl${newPgIndex + 1}`}
                    className="TextFieldLabel"
                  >
                    Additional Info
                  </label>
                  <svg
                    onClick={() => showOrHideInfoDiv(`Pg Addl${newPgIndex}`)}
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

                {infoDiv === `Pg Addl${newPgIndex}` && (
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
        <PreviewPdf />
      </div>
    </>
  );
};

export default Pg;
