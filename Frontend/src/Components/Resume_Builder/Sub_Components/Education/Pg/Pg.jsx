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

import UserInputs from "../../UserInputs.jsx";

const Pg = ({ setLogoutClicked, setLogoutUserType, setOverlayType }) => {
  const { resumeData, updateField } = ResumeInputTemplate();
  const theme = useTheme();

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
              <Box
                key={newPgIndex}
                id={`PgInput${newPgIndex + 1}`}
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
                    "Complete name of the Pg degree with specialization if any"
                  }
                  examples={"Master of Computer Applications"}
                  inputValue={newPgEntry.name}
                  inputOnchange={""}
                  onChangeType={"Pg"}
                  onChangeEntry={newPgIndex}
                  textfieldName={"name"}
                />

                <UserInputs
                  inputType={"text"}
                  inputLabel={"University"}
                  requirement={"Mandatory"}
                  explanation={
                    "The university which awarded the Post graduate degree"
                  }
                  examples={"Anna University"}
                  inputValue={newPgEntry.university}
                  inputOnchange={""}
                  onChangeType={"Pg"}
                  onChangeEntry={newPgIndex}
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
                  inputValue={newPgEntry.startYear}
                  inputOnchange={""}
                  onChangeType={"Pg"}
                  onChangeEntry={newPgIndex}
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
                  inputValue={newPgEntry.endYear}
                  inputOnchange={""}
                  onChangeType={"Pg"}
                  onChangeEntry={newPgIndex}
                  textfieldName={"endYear"}
                />

                <UserInputs
                  inputType={"text"}
                  inputLabel={"Cgpa"}
                  requirement={"Mandatory"}
                  explanation={"Current or overall CGPA achieved in the course"}
                  examples={"9.5"}
                  inputValue={newPgEntry.cgpa}
                  inputOnchange={""}
                  onChangeType={"Pg"}
                  onChangeEntry={newPgIndex}
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
                  inputValue={newPgEntry.additionalInfo}
                  inputOnchange={""}
                  onChangeType={"Pg"}
                  onChangeEntry={newPgIndex}
                  textfieldName={"additionalInfo"}
                />
              </Box>
            ))}
          </Box>
          <NavigationButtons
            PreviousPageName={"Ph. D"}
            PreviousPageLink={`/resume-builder/education/phd`}
            NextPageName={"Under Graduate"}
            NextPageLink={`/resume-builder/education/ug`}
          />
        </Box>
        <PreviewPdf />
      </Stack>
    </>
  );
};

export default Pg;
