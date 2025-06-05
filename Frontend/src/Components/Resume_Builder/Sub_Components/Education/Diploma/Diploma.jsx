import { useState } from "react";
import PreviewPdf from "../../PreviewPdf.jsx";
import { useNavigate } from "react-router-dom";
import InfoDiv from "../../Info Div/InfoDiv.jsx";
import ResumeInputTemplate from "../../../../../ResumeFormat.jsx";

const Diploma = () => {
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
      navigate("/resume-builder/education/ug");
    } else {
      navigate("/resume-builder/education/school");
    }
  };

  const addNewDiploma = (e) => {
    e.preventDefault();
    const updatedDiploma = [...resumeData.education.diploma];
    updatedDiploma.push({
      name: "",
      university: "",
      year: "",
      cgpa: "",
      additionalInfo: "",
    });
    updateField("education.diploma", updatedDiploma);
  };

  return (
    <div id="dv-MainFormAndPreview">
      <div id="dv-MainForm">
        <div id="dv-EducationDiplomaHeader" className="PageDetailsHeader">
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
              Diploma
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
        <div id="dv-EducationDiplomaWrapper" className="WrapperClass">
          <div id="dv-EducationDiplomaAddInput" className="AddInputButton">
            <button
              type="button"
              onClick={addNewDiploma}
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

          {resumeData.education.diploma.map(
            (newDiplomaEntry, newDiplomaIndex) => (
              <div
                key={newDiplomaIndex}
                id={`dv-EducationDiplomaCopy${newDiplomaIndex + 1}`}
                className="SubWrapper"
              >
                <div
                  id={`dv-EduDiplomaNameCopy${newDiplomaIndex + 1}`}
                  className="InputWrapper"
                >
                  <input
                    type="text"
                    id={`in-rb_edu_dipl_name${newDiplomaIndex + 1}`}
                    name="diploma_name"
                    value={newDiplomaEntry.name}
                    onChange={(e) => {
                      let updatedDiploma = [...resumeData.education.diploma];
                      updatedDiploma[newDiplomaIndex].name = e.target.value;
                      updateField("education.diploma", updatedDiploma);
                    }}
                    placeholder=" "
                  />
                  <label
                    htmlFor={`in-rb_edu_dipl_name${newDiplomaIndex + 1}`}
                    className="TextFieldLabel"
                  >
                    Name
                  </label>
                  <svg
                    onClick={() =>
                      showOrHideInfoDiv(`Diploma Name${newDiplomaIndex}`)
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

                {infoDiv === `Diploma Name${newDiplomaIndex}` && (
                  <InfoDiv
                    requirement={"Mandatory"}
                    explanation={
                      "Complete name of the diploma with specialization if any"
                    }
                    examples={"Diploma in Information Technology"}
                    characterLimit={"Upto 40 characters"}
                    allowedCharacters={"No Restrictions"}
                  />
                )}

                <div
                  id={`dv-EduDiplomaUniCopy${newDiplomaIndex + 1}`}
                  className="InputWrapper"
                >
                  <input
                    type="text"
                    id={`in-rb_edu_dipl_uni${newDiplomaIndex + 1}`}
                    name="diploma_university"
                    value={newDiplomaEntry.university}
                    onChange={(e) => {
                      let updatedDiploma = [...resumeData.education.diploma];
                      updatedDiploma[newDiplomaIndex].university =
                        e.target.value;
                      updateField("education.diploma", updatedDiploma);
                    }}
                    placeholder=" "
                  />
                  <label
                    htmlFor={`in-rb_edu_dipl_uni${newDiplomaIndex + 1}`}
                    className="TextFieldLabel"
                  >
                    University
                  </label>
                  <svg
                    onClick={() =>
                      showOrHideInfoDiv(`Diploma University${newDiplomaIndex}`)
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

                {infoDiv === `Diploma University${newDiplomaIndex}` && (
                  <InfoDiv
                    requirement={"Mandatory"}
                    explanation={"The university which awarded the diploma"}
                    examples={"Anna University"}
                    characterLimit={"Upto 40 characters"}
                    allowedCharacters={"No Restrictions"}
                  />
                )}

                <div
                  id={`dv-EduDiplomaYearCopy${newDiplomaIndex + 1}`}
                  className="InputWrapper"
                >
                  <input
                    type="text"
                    id={`in-rb_edu_dipl_year${newDiplomaIndex + 1}`}
                    name="diploma_year"
                    value={newDiplomaEntry.year}
                    onChange={(e) => {
                      let updatedDiploma = [...resumeData.education.diploma];
                      updatedDiploma[newDiplomaIndex].year = e.target.value;
                      updateField("education.diploma", updatedDiploma);
                    }}
                    placeholder=" "
                  />
                  <label
                    htmlFor={`in-rb_edu_dipl_year${newDiplomaIndex + 1}`}
                    className="TextFieldLabel"
                  >
                    Year
                  </label>
                  <svg
                    onClick={() =>
                      showOrHideInfoDiv(`Diploma Period${newDiplomaIndex}`)
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

                {infoDiv === `Diploma Period${newDiplomaIndex}` && (
                  <InfoDiv
                    requirement={"Mandatory"}
                    explanation={
                      "The period of your time pursuing this diploma"
                    }
                    examples={"2021 - 2023"}
                    characterLimit={"Upto 15 characters"}
                    allowedCharacters={"Numbers, Hyphens"}
                  />
                )}

                <div
                  id={`dv-EduDiplomaCgpaCopy${newDiplomaIndex + 1}`}
                  className="InputWrapper"
                >
                  <input
                    type="text"
                    id={`in-rb_edu_dipl_cgpa${newDiplomaIndex + 1}`}
                    name="diploma_cgpa"
                    value={newDiplomaEntry.cgpa}
                    onChange={(e) => {
                      let updatedDiploma = [...resumeData.education.diploma];
                      updatedDiploma[newDiplomaIndex].cgpa = e.target.value;
                      updateField("education.diploma", updatedDiploma);
                    }}
                    placeholder=" "
                  />
                  <label
                    htmlFor={`in-rb_edu_dipl_cgpa${newDiplomaIndex + 1}`}
                    className="TextFieldLabel"
                  >
                    CGPA
                  </label>
                  <svg
                    onClick={() =>
                      showOrHideInfoDiv(`Diploma CGPA${newDiplomaIndex}`)
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

                {infoDiv === `Diploma CGPA${newDiplomaIndex}` && (
                  <InfoDiv
                    requirement={"Mandatory"}
                    explanation={
                      "Current or overall CGPA achieved in the course"
                    }
                    examples={"9.5"}
                    characterLimit={"Upto 5 characters"}
                    allowedCharacters={"Numbers, Period"}
                  />
                )}

                <div
                  id={`dv-EduDiplomaAddlCopy${newDiplomaIndex + 1}`}
                  className="InputWrapper"
                >
                  <input
                    type="text"
                    name="diploma_additional_info"
                    id={`in-rb_edu_dipl_addl${newDiplomaIndex + 1}`}
                    value={newDiplomaEntry.additionalInfo}
                    onChange={(e) => {
                      let updatedDiploma = [...resumeData.education.diploma];
                      updatedDiploma[newDiplomaIndex].additionalInfo =
                        e.target.value;
                      updateField("education.diploma", updatedDiploma);
                    }}
                    placeholder=" "
                  />
                  <label
                    htmlFor={`in-rb_edu_dipl_addl${newDiplomaIndex + 1}`}
                    className="TextFieldLabel"
                  >
                    Additional Info
                  </label>
                  <svg
                    onClick={() =>
                      showOrHideInfoDiv(`Diploma Addl${newDiplomaIndex}`)
                    }
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

                {infoDiv === `Diploma Addl${newDiplomaIndex}` && (
                  <InfoDiv
                    requirement={"Optional"}
                    explanation={
                      "Any other important and relevant information related to this course"
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
            )
          )}
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
      <PreviewPdf />
    </div>
  );
};

export default Diploma;
