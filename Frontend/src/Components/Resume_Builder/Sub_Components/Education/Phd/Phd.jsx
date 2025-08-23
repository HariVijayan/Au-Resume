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

const Phd = ({ setLogoutClicked, setLogoutUserType, setOverlayType }) => {
  const { resumeData, updateField } = ResumeInputTemplate();
  const theme = useTheme();

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
              <Box
                key={newPhdIndex}
                id={`PhdInput${newPhdIndex + 1}`}
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
                  explanation={"Complete name of the PhD with specialization"}
                  examples={"PhD in Advanced Neural Networks"}
                  inputValue={newPhdEntry.name}
                  inputOnchange={""}
                  onChangeType={"Phd"}
                  onChangeEntry={newPhdIndex}
                  textfieldName={"name"}
                />

                <UserInputs
                  inputType={"text"}
                  inputLabel={"University"}
                  requirement={"Mandatory"}
                  explanation={"The university which awarded the PhD"}
                  examples={"Anna University"}
                  inputValue={newPhdEntry.university}
                  inputOnchange={""}
                  onChangeType={"Phd"}
                  onChangeEntry={newPhdIndex}
                  textfieldName={"university"}
                />

                <UserInputs
                  inputType={"yearStart"}
                  inputLabel={"Starting Year"}
                  requirement={"Mandatory"}
                  explanation={
                    "The starting year from which you started pursuing this phd"
                  }
                  examples={"May 2023"}
                  inputValue={newPhdEntry.startYear}
                  inputOnchange={""}
                  onChangeType={"Phd"}
                  onChangeEntry={newPhdIndex}
                  textfieldName={"startYear"}
                />

                <UserInputs
                  inputType={"yearEnd"}
                  inputLabel={"Ending Year"}
                  requirement={"Mandatory"}
                  explanation={
                    "The ending year from which you finished pursuing this phd"
                  }
                  examples={"May 2025"}
                  inputValue={newPhdEntry.endYear}
                  inputOnchange={""}
                  onChangeType={"Phd"}
                  onChangeEntry={newPhdIndex}
                  textfieldName={"endYear"}
                />

                <UserInputs
                  inputType={"text"}
                  inputLabel={"Specialization"}
                  requirement={"Mandatory"}
                  explanation={
                    "Domains in which you specialized on the PhD research"
                  }
                  examples={"Machine Learning, Deep Learning, Neural Networks"}
                  inputValue={newPhdEntry.specialization}
                  inputOnchange={""}
                  onChangeType={"Phd"}
                  onChangeEntry={newPhdIndex}
                  textfieldName={"specialization"}
                />

                <UserInputs
                  inputType={"text"}
                  inputLabel={"Additional Info"}
                  requirement={"Optional"}
                  explanation={
                    "Any other important and relevant information related to this degree"
                  }
                  examples={
                    "Widely accepted research with improved efficient algorithms"
                  }
                  inputValue={newPhdEntry.additionalInfo}
                  inputOnchange={""}
                  onChangeType={"Phd"}
                  onChangeEntry={newPhdIndex}
                  textfieldName={"additionalInfo"}
                />
              </Box>
            ))}
          </Box>
          <NavigationButtons
            PreviousPageName={"Experience"}
            PreviousPageLink={`/resume-builder/experience`}
            NextPageName={"Post Graduate"}
            NextPageLink={`/resume-builder/education/pg`}
          />
        </Box>
        <PreviewPdf />
      </Stack>
      <Footer />
    </>
  );
};

export default Phd;
