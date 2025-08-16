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

const Phd = ({ setLogoutClicked, setLogoutUserType, setOverlayType }) => {
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

  const addNewPhd = (e) => {
    e.preventDefault();
    const updatedPhd = [...resumeData.education.phd];
    updatedPhd.push({
      name: "",
      university: "",
      year: "",
      expertise: "",
      additionalInfo: "",
    });
    updateField("education.phd", updatedPhd);
  };

  return (
    <>
      <HeaderTemplate
        currentPage={"Education - Ph. D"}
        setLogoutClicked={setLogoutClicked}
        setLogoutUserType={setLogoutUserType}
        setOverlayType={setOverlayType}
        PageIcon={SchoolIcon}
      />
      <div id="dv-MainFormAndPreview">
        <div id="dv-MainForm">
          <div id="dv-EducationPhdWrapper" className="WrapperClass">
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
                onClick={addNewPhd}
                size="large"
                endIcon={<AddBoxIcon />}
                sx={{
                  margin: "2rem 0rem",
                  textTransform: "none",
                  backgroundColor: theme.palette.brown.main,
                }}
                padding={{ xs: "1rem 2rem", sm: "2rem 3rem" }}
              >
                Add Ph. D
              </Button>
            </Box>

            {resumeData.education.phd.map((newPhdEntry, newPhdIndex) => (
              <div
                key={newPhdIndex}
                id={`dv-EducationPhdCopy${newPhdIndex + 1}`}
                className="SubWrapper"
              >
                <div
                  id={`dv-EduPhdNameCopy${newPhdIndex + 1}`}
                  className="InputWrapper"
                >
                  <input
                    type="text"
                    id={`in-rb_edu_phd_name${newPhdIndex + 1}`}
                    name="phd_name"
                    value={newPhdEntry.name}
                    onChange={(e) => {
                      let updatedPhd = [...resumeData.education.phd];
                      updatedPhd[newPhdIndex].name = e.target.value;
                      updateField("education.phd", updatedPhd);
                    }}
                    placeholder=" "
                  />
                  <label
                    htmlFor={`in-rb_edu_phd_name${newPhdIndex + 1}`}
                    className="TextFieldLabel"
                  >
                    Name
                  </label>
                  <svg
                    onClick={() => showOrHideInfoDiv(`Phd Name${newPhdIndex}`)}
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

                {infoDiv === `Phd Name${newPhdIndex}` && (
                  <InfoDiv
                    requirement={"Mandatory"}
                    explanation={"Complete name of the PhD with specialization"}
                    examples={"PhD in Advanced Neural Networks"}
                    characterLimit={"Upto 40 characters"}
                    allowedCharacters={"No Restrictions"}
                  />
                )}

                <div
                  id={`dv-EduPhdUniCopy${newPhdIndex + 1}`}
                  className="InputWrapper"
                >
                  <input
                    type="text"
                    id={`in-rb_edu_phd_uni${newPhdIndex + 1}`}
                    name="phd_university"
                    value={newPhdEntry.university}
                    onChange={(e) => {
                      let updatedPhd = [...resumeData.education.phd];
                      updatedPhd[newPhdIndex].university = e.target.value;
                      updateField("education.phd", updatedPhd);
                    }}
                    placeholder=" "
                  />
                  <label
                    htmlFor={`in-rb_edu_phd_uni${newPhdIndex + 1}`}
                    className="TextFieldLabel"
                  >
                    University
                  </label>
                  <svg
                    onClick={() =>
                      showOrHideInfoDiv(`Phd University${newPhdIndex}`)
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

                {infoDiv === `Phd University${newPhdIndex}` && (
                  <InfoDiv
                    requirement={"Mandatory"}
                    explanation={"The university which awarded the PhD"}
                    examples={"Anna University"}
                    characterLimit={"Upto 40 characters"}
                    allowedCharacters={"No Restrictions"}
                  />
                )}

                <div
                  id={`dv-EduPhdYearCopy${newPhdIndex + 1}`}
                  className="InputWrapper"
                >
                  <input
                    type="text"
                    id={`in-rb_edu_phd_year${newPhdIndex + 1}`}
                    name="phd_year"
                    value={newPhdEntry.year}
                    onChange={(e) => {
                      let updatedPhd = [...resumeData.education.phd];
                      updatedPhd[newPhdIndex].year = e.target.value;
                      updateField("education.phd", updatedPhd);
                    }}
                    placeholder=" "
                  />
                  <label
                    htmlFor={`in-rb_edu_phd_year${newPhdIndex + 1}`}
                    className="TextFieldLabel"
                  >
                    Year
                  </label>
                  <svg
                    onClick={() =>
                      showOrHideInfoDiv(`Phd Period${newPhdIndex}`)
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

                {infoDiv === `Phd Period${newPhdIndex}` && (
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

                <div
                  id={`dv-EduPhdExpCopy${newPhdIndex + 1}`}
                  className="InputWrapper"
                >
                  <input
                    type="text"
                    id={`in-rb_edu_phd_exp${newPhdIndex + 1}`}
                    name="phd_exp"
                    value={newPhdEntry.expertise}
                    onChange={(e) => {
                      let updatedPhd = [...resumeData.education.phd];
                      updatedPhd[newPhdIndex].expertise = e.target.value;
                      updateField("education.phd", updatedPhd);
                    }}
                    placeholder=" "
                  />
                  <label
                    htmlFor={`in-rb_edu_phd_exp${newPhdIndex + 1}`}
                    className="TextFieldLabel"
                  >
                    Expertise
                  </label>
                  <svg
                    onClick={() =>
                      showOrHideInfoDiv(`Phd Expertise${newPhdIndex}`)
                    }
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

                {infoDiv === `Phd Expertise${newPhdIndex}` && (
                  <InfoDiv
                    requirement={"Recommended"}
                    explanation={"Domains which got expertise during PhD"}
                    examples={
                      "Machine Learning, Deep Learning, Neural Networks"
                    }
                    characterLimit={"Upto 40 characters"}
                    allowedCharacters={"No Restrictions"}
                  />
                )}

                <div
                  id={`dv-EduPhdAddlCopy${newPhdIndex + 1}`}
                  className="InputWrapper"
                >
                  <input
                    type="text"
                    id={`in-rb_edu_phd_addl${newPhdIndex + 1}`}
                    name="phd_additional_info"
                    value={newPhdEntry.additionalInfo}
                    onChange={(e) => {
                      let updatedPhd = [...resumeData.education.phd];
                      updatedPhd[newPhdIndex].additionalInfo = e.target.value;
                      updateField("education.phd", updatedPhd);
                    }}
                    placeholder=" "
                  />
                  <label
                    htmlFor={`in-rb_edu_phd_addl${newPhdIndex + 1}`}
                    className="TextFieldLabel"
                  >
                    Additional Info
                  </label>
                  <svg
                    onClick={() =>
                      showOrHideInfoDiv(`Additional Info${newPhdIndex}`)
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

                {infoDiv === `Additional Info${newPhdIndex}` && (
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
          <NavigationButtons
            PreviousPageName={"Experience"}
            PreviousPageLink={`/resume-builder/experience`}
            NextPageName={"Post Graduate"}
            NextPageLink={`/resume-builder/education/pg`}
          />
        </div>
        <PreviewPdf />
      </div>
    </>
  );
};

export default Phd;
