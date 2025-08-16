import { useState } from "react";
import PreviewPdf from "../../PreviewPdf.jsx";
import InfoDiv from "../../Info Div/InfoDiv.jsx";
import ResumeInputTemplate from "../../../../../ResumeFormat.jsx";
import HeaderTemplate from "../../Header.jsx";
import SchoolIcon from "@mui/icons-material/School";
import NavigationButtons from "../../NavigationButtons.jsx";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useTheme } from "@mui/material";

const Pg = ({ setLogoutClicked, setLogoutUserType, setOverlayType }) => {
  const { resumeData, updateField } = ResumeInputTemplate();
  const theme = useTheme();

  const [infoDiv, setInfoDiv] = useState("");

  const showOrHideInfoDiv = (currentState) => {
    if (infoDiv === currentState) {
      setInfoDiv(" ");
    } else {
      setInfoDiv(currentState);
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
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Button
                variant="contained"
                onClick={addNewPg}
                size="large"
                endIcon={<AddBoxIcon />}
                sx={{
                  margin: "2rem 0rem",
                  textTransform: "none",
                  backgroundColor: theme.palette.brown.main,
                }}
                padding={{ xs: "1rem 2rem", sm: "2rem 3rem" }}
              >
                Add Pg
              </Button>
            </Box>

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
          <NavigationButtons
            PreviousPageName={"Ph. D"}
            PreviousPageLink={`/resume-builder/education/phd`}
            NextPageName={"Under Graduate"}
            NextPageLink={`/resume-builder/education/ug`}
          />
        </div>
        <PreviewPdf />
      </div>
    </>
  );
};

export default Pg;
