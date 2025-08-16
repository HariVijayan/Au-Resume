import { useState } from "react";
import PreviewPdf from "../../PreviewPdf.jsx";
import { useNavigate } from "react-router-dom";
import InfoDiv from "../../Info Div/InfoDiv.jsx";
import ResumeInputTemplate from "../../../../../ResumeFormat.jsx";
import HeaderTemplate from "../../Header.jsx";
import SchoolIcon from "@mui/icons-material/School";

const Ug = ({ setLogoutClicked, setLogoutUserType, setOverlayType }) => {
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
      navigate("/resume-builder/education/pg");
    } else {
      navigate("/resume-builder/education/diploma");
    }
  };

  const addNewUg = (e) => {
    e.preventDefault();
    const updatedUg = [...resumeData.education.underGraduate];
    updatedUg.push({
      name: "",
      university: "",
      year: "",
      cgpa: "",
      additionalInfo: "",
    });
    updateField("education.underGraduate", updatedUg);
  };

  return (
    <>
      <HeaderTemplate
        currentPage={"Education - Under Graduate"}
        setLogoutClicked={setLogoutClicked}
        setLogoutUserType={setLogoutUserType}
        setOverlayType={setOverlayType}
        PageIcon={SchoolIcon}
      />
      <div id="dv-MainFormAndPreview">
        <div id="dv-MainForm">
          <div id="dv-EducationUgWrapper" className="WrapperClass">
            <div id="dv-EducationUgAddInput" className="AddInputButton">
              <button
                type="button"
                onClick={addNewUg}
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

            {resumeData.education.underGraduate.map(
              (newUgEntry, newUgIndex) => (
                <div
                  key={newUgIndex}
                  id={`dv-EducationUgCopy${newUgIndex + 1}`}
                  className="SubWrapper"
                >
                  <div
                    id={`dv-EduUgNameCopy${newUgIndex + 1}`}
                    className="InputWrapper"
                  >
                    <input
                      type="text"
                      id={`in-rb_edu_ug_name${newUgIndex + 1}`}
                      name="ug_degree_name"
                      value={newUgEntry.name}
                      onChange={(e) => {
                        let updatedUg = [...resumeData.education.underGraduate];
                        updatedUg[newUgIndex].name = e.target.value;
                        updateField("education.underGraduate", updatedUg);
                      }}
                      placeholder=" "
                    />
                    <label
                      htmlFor={`in-rb_edu_ug_name${newUgIndex + 1}`}
                      className="TextFieldLabel"
                    >
                      Name
                    </label>
                    <svg
                      onClick={() => showOrHideInfoDiv(`Ug Name${newUgIndex}`)}
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

                  {infoDiv === `Ug Name${newUgIndex}` && (
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

                  <div
                    id={`dv-EduUgUniCopy${newUgIndex + 1}`}
                    className="InputWrapper"
                  >
                    <input
                      type="text"
                      id={`in-rb_edu_ug_uni${newUgIndex + 1}`}
                      name="ug_degree_university"
                      value={newUgEntry.university}
                      onChange={(e) => {
                        let updatedUg = [...resumeData.education.underGraduate];
                        updatedUg[newUgIndex].university = e.target.value;
                        updateField("education.underGraduate", updatedUg);
                      }}
                      placeholder=" "
                    />
                    <label
                      htmlFor={`in-rb_edu_ug_uni${newUgIndex + 1}`}
                      className="TextFieldLabel"
                    >
                      University
                    </label>
                    <svg
                      onClick={() =>
                        showOrHideInfoDiv(`Ug University${newUgIndex}`)
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

                  {infoDiv === `Ug University${newUgIndex}` && (
                    <InfoDiv
                      requirement={"Mandatory"}
                      explanation={"The university which awarded the Ug degree"}
                      examples={"Anna University"}
                      characterLimit={"Upto 40 characters"}
                      allowedCharacters={"No Restrictions"}
                    />
                  )}

                  <div
                    id={`dv-EduUgYearCopy${newUgIndex + 1}`}
                    className="InputWrapper"
                  >
                    <input
                      type="text"
                      id={`in-rb_edu_ug_year${newUgIndex + 1}`}
                      name="ug_degree_year"
                      value={newUgEntry.year}
                      onChange={(e) => {
                        let updatedUg = [...resumeData.education.underGraduate];
                        updatedUg[newUgIndex].year = e.target.value;
                        updateField("education.underGraduate", updatedUg);
                      }}
                      placeholder=" "
                    />
                    <label
                      htmlFor={`in-rb_edu_ug_year${newUgIndex + 1}`}
                      className="TextFieldLabel"
                    >
                      Year
                    </label>
                    <svg
                      onClick={() =>
                        showOrHideInfoDiv(`Ug Period${newUgIndex}`)
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

                  {infoDiv === `Ug Period${newUgIndex}` && (
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

                  <div
                    id={`dv-EduUgCgpaCopy${newUgIndex + 1}`}
                    className="InputWrapper"
                  >
                    <input
                      type="text"
                      id={`in-rb_edu_ug_cpga${newUgIndex + 1}`}
                      name="ug_degree_cgpa"
                      value={newUgEntry.cgpa}
                      onChange={(e) => {
                        let updatedUg = [...resumeData.education.underGraduate];
                        updatedUg[newUgIndex].cgpa = e.target.value;
                        updateField("education.underGraduate", updatedUg);
                      }}
                      placeholder=" "
                    />
                    <label
                      htmlFor={`in-rb_edu_ug_cgpa${newUgIndex + 1}`}
                      className="TextFieldLabel"
                    >
                      CGPA
                    </label>
                    <svg
                      onClick={() => showOrHideInfoDiv(`Ug CGPA${newUgIndex}`)}
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

                  {infoDiv === `Ug CGPA${newUgIndex}` && (
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
                    id={`dv-EduUgAddlCopy${newUgIndex + 1}`}
                    className="InputWrapper"
                  >
                    <input
                      type="text"
                      id={`in-rb_edu_ug_addl${newUgIndex + 1}`}
                      name="ug_additional_info"
                      value={newUgEntry.additionalInfo}
                      onChange={(e) => {
                        let updatedUg = [...resumeData.education.underGraduate];
                        updatedUg[newUgIndex].additionalInfo = e.target.value;
                        updateField("education.underGraduate", updatedUg);
                      }}
                      placeholder=" "
                    />
                    <label
                      htmlFor={`in-rb_edu_ug_addl${newUgIndex + 1}`}
                      className="TextFieldLabel"
                    >
                      Additional Info
                    </label>
                    <svg
                      onClick={() => showOrHideInfoDiv(`Ug Addl${newUgIndex}`)}
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

                  {infoDiv === `Ug Addl${newUgIndex}` && (
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
              )
            )}
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
        <PreviewPdf />
      </div>
    </>
  );
};

export default Ug;
