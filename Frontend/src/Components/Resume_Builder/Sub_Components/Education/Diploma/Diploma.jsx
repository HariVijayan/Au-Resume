import PreviewPdf from "../../PreviewPdf.jsx";
import ResumeInputTemplate from "../../../../../ResumeFormat.jsx";
import HeaderTemplate from "../../Header.jsx";
import SchoolIcon from "@mui/icons-material/School";
import NavigationButtons from "../../NavigationButtons.jsx";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useTheme } from "@mui/material";

import UserInputs from "../../UserInputs.jsx";

const Diploma = ({ setLogoutClicked, setLogoutUserType, setOverlayType }) => {
  const { resumeData, updateField } = ResumeInputTemplate();
  const theme = useTheme();

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
    <>
      <HeaderTemplate
        currentPage={"Education - Diploma"}
        setLogoutClicked={setLogoutClicked}
        setLogoutUserType={setLogoutUserType}
        setOverlayType={setOverlayType}
        PageIcon={SchoolIcon}
      />
      <div id="dv-MainFormAndPreview">
        <div id="dv-MainForm">
          <div id="dv-EducationDiplomaWrapper" className="WrapperClass">
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
                onClick={addNewDiploma}
                size="large"
                endIcon={<AddBoxIcon />}
                sx={{
                  margin: "2rem 0rem",
                  textTransform: "none",
                  backgroundColor: theme.palette.brown.main,
                }}
                padding={{ xs: "1rem 2rem", sm: "2rem 3rem" }}
              >
                Add Diploma
              </Button>
            </Box>

            {resumeData.education.diploma.map(
              (newDiplomaEntry, newDiplomaIndex) => (
                <div
                  key={newDiplomaIndex}
                  id={`dv-EducationDiplomaCopy${newDiplomaIndex + 1}`}
                  className="SubWrapper"
                >
                  <UserInputs
                    inputType={"text"}
                    inputLabel={"Name"}
                    requirement={"Mandatory"}
                    explanation={
                      "Complete name of the diploma with specialization if any"
                    }
                    examples={"Diploma in Information Technology"}
                    inputValue={newDiplomaEntry.name}
                    inputOnchange={""}
                    onChangeType={"Diploma"}
                    onChangeEntry={newDiplomaIndex}
                    textfieldName={"name"}
                  />

                  <UserInputs
                    inputType={"text"}
                    inputLabel={"University"}
                    requirement={"Mandatory"}
                    explanation={"The university which awarded the diploma"}
                    examples={"Anna University"}
                    inputValue={newDiplomaEntry.university}
                    inputOnchange={""}
                    onChangeType={"Diploma"}
                    onChangeEntry={newDiplomaIndex}
                    textfieldName={"university"}
                  />

                  <UserInputs
                    inputType={"monthYearStart"}
                    inputLabel={"Starting Period"}
                    requirement={"Mandatory"}
                    explanation={
                      "The starting month and year from which you started pursuing this diploma"
                    }
                    examples={"May 2023"}
                    inputValue={newDiplomaEntry.startYear}
                    inputOnchange={""}
                    onChangeType={"Diploma"}
                    onChangeEntry={newDiplomaIndex}
                    textfieldName={"startYear"}
                  />

                  <UserInputs
                    inputType={"monthYearStart"}
                    inputLabel={"Ending Period"}
                    requirement={"Mandatory"}
                    explanation={
                      "The ending month and year from which you finished pursuing this diploma"
                    }
                    examples={"May 2025"}
                    inputValue={newDiplomaEntry.endYear}
                    inputOnchange={""}
                    onChangeType={"Diploma"}
                    onChangeEntry={newDiplomaIndex}
                    textfieldName={"endYear"}
                  />

                  <UserInputs
                    inputType={"text"}
                    inputLabel={"Cgpa"}
                    requirement={"Mandatory"}
                    explanation={
                      "Current or overall CGPA achieved in the course"
                    }
                    examples={"9.5"}
                    inputValue={newDiplomaEntry.cgpa}
                    inputOnchange={""}
                    onChangeType={"Diploma"}
                    onChangeEntry={newDiplomaIndex}
                    textfieldName={"cgpa"}
                  />

                  <UserInputs
                    inputType={"text"}
                    inputLabel={"Additional Info"}
                    requirement={"Optional"}
                    explanation={
                      "Any other important and relevant information related to this course"
                    }
                    examples={"Distinction Grade"}
                    inputValue={newDiplomaEntry.additionalInfo}
                    inputOnchange={""}
                    onChangeType={"Diploma"}
                    onChangeEntry={newDiplomaIndex}
                    textfieldName={"additionalInfo"}
                  />
                </div>
              )
            )}
          </div>
          <NavigationButtons
            PreviousPageName={"Under Graduate"}
            PreviousPageLink={`/resume-builder/education/ug`}
            NextPageName={"School"}
            NextPageLink={`/resume-builder/education/school`}
          />
        </div>
        <PreviewPdf />
      </div>
    </>
  );
};

export default Diploma;
