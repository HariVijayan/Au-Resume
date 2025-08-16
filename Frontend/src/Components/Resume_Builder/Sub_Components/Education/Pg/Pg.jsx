import { useState } from "react";
import PreviewPdf from "../../PreviewPdf.jsx";
import { useNavigate } from "react-router-dom";
import InfoDiv from "../../Info Div/InfoDiv.jsx";
import ResumeInputTemplate from "../../../../../ResumeFormat.jsx";
import HeaderTemplate from "../../Header.jsx";
import SchoolIcon from "@mui/icons-material/School";

const Pg = ({ setLogoutClicked, setLogoutUserType, setOverlayType }) => {
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
      <HeaderTemplate
        currentPage={"Education - Post Graduate"}
        setLogoutClicked={setLogoutClicked}
        setLogoutUserType={setLogoutUserType}
        setOverlayType={setOverlayType}
        PageIcon={SchoolIcon}
      />
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
