import PreviewPdf from "../../PreviewPdf.jsx";
import ResumeInputTemplate from "../../../../../ResumeFormat.jsx";
import HeaderTemplate from "../../Header.jsx";
import SchoolIcon from "@mui/icons-material/School";
import NavigationButtons from "../../NavigationButtons.jsx";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useTheme } from "@mui/material";
import Stack from "@mui/material/Stack";
import Footer from "../../Footer.jsx";
import UserInputs from "../../UserInputs.jsx";

const Ug = ({ setLogoutClicked, setLogoutUserType, setOverlayType }) => {
  const { resumeData, updateField } = ResumeInputTemplate();
  const theme = useTheme();

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
      <Stack
        id="ContentWrapper"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "90%",
          flexWrap: "wrap",
        }}
        flexDirection={{ xs: "column", md: "row" }}
      >
        <Box
          id="LeftContent"
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            flexWrap: "wrap",
            flexDirection: "column",
          }}
          width={{ xs: "90%", md: "50%" }}
        >
          <Box
            id="InputsWrapper"
            sx={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              width: "100%",
              flexWrap: "wrap",
              flexDirection: "column",
            }}
          >
            <Box
              id="AddNewInputs"
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Button
                variant="contained"
                onClick={addNewUg}
                size="large"
                endIcon={<AddBoxIcon />}
                sx={{
                  margin: "2rem 0rem",
                  textTransform: "none",
                  backgroundColor: theme.palette.brown.main,
                }}
                padding={{ xs: "1rem 2rem", sm: "2rem 3rem" }}
              >
                Add Ug
              </Button>
            </Box>

            {resumeData.education.underGraduate.map(
              (newUgEntry, newUgIndex) => (
                <Box
                  key={newUgIndex}
                  id={`UgInput${newUgIndex + 1}`}
                  sx={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    width: "100%",
                    flexWrap: "wrap",
                    flexDirection: "column",
                    margin: "2rem 0rem",
                  }}
                >
                  <UserInputs
                    inputType={"text"}
                    inputLabel={"Name"}
                    requirement={"Mandatory"}
                    explanation={
                      "Complete name of the Ug degree with specialization if any"
                    }
                    examples={"Bachelor of Computer Science"}
                    inputValue={newUgEntry.name}
                    inputOnchange={""}
                    onChangeType={"Ug"}
                    onChangeEntry={newUgIndex}
                    textfieldName={"name"}
                  />

                  <UserInputs
                    inputType={"text"}
                    inputLabel={"University"}
                    requirement={"Mandatory"}
                    explanation={
                      "The university which awarded the Under graduate degree"
                    }
                    examples={"Anna University"}
                    inputValue={newUgEntry.university}
                    inputOnchange={""}
                    onChangeType={"Ug"}
                    onChangeEntry={newUgIndex}
                    textfieldName={"university"}
                  />

                  <UserInputs
                    inputType={"yearStart"}
                    inputLabel={"Starting Year"}
                    requirement={"Mandatory"}
                    explanation={
                      "The starting year from which you started pursuing this degree"
                    }
                    examples={"May 2023"}
                    inputValue={newUgEntry.startYear}
                    inputOnchange={""}
                    onChangeType={"Ug"}
                    onChangeEntry={newUgIndex}
                    textfieldName={"startYear"}
                  />

                  <UserInputs
                    inputType={"yearEnd"}
                    inputLabel={"Ending Year"}
                    requirement={"Mandatory"}
                    explanation={
                      "The ending year from which you finished pursuing this degree"
                    }
                    examples={"May 2025"}
                    inputValue={newUgEntry.endYear}
                    inputOnchange={""}
                    onChangeType={"Ug"}
                    onChangeEntry={newUgIndex}
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
                    inputValue={newUgEntry.cgpa}
                    inputOnchange={""}
                    onChangeType={"Ug"}
                    onChangeEntry={newUgIndex}
                    textfieldName={"cgpa"}
                  />

                  <UserInputs
                    inputType={"text"}
                    inputLabel={"Additional Info"}
                    requirement={"Optional"}
                    explanation={
                      "Any other important and relevant information related to this degree"
                    }
                    examples={"Distinction Grade"}
                    inputValue={newUgEntry.additionalInfo}
                    inputOnchange={""}
                    onChangeType={"Ug"}
                    onChangeEntry={newUgIndex}
                    textfieldName={"additionalInfo"}
                  />
                </Box>
              )
            )}
          </Box>
          <NavigationButtons
            PreviousPageName={"Post Graduate"}
            PreviousPageLink={`/resume-builder/education/pg`}
            NextPageName={"Diploma"}
            NextPageLink={`/resume-builder/education/diploma`}
          />
        </Box>
        <PreviewPdf />
      </Stack>
      <Footer />
    </>
  );
};

export default Ug;
