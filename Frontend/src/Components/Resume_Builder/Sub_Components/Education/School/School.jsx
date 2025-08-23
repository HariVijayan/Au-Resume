import PreviewPdf from "../../PreviewPdf.jsx";
import ResumeInputTemplate from "../../../../../ResumeFormat.jsx";
import HeaderTemplate from "../../Header.jsx";
import SchoolIcon from "@mui/icons-material/School";
import NavigationButtons from "../../NavigationButtons.jsx";
import UserInputs from "../../UserInputs.jsx";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Footer from "../../Footer.jsx";

const School = ({ setLogoutClicked, setLogoutUserType, setOverlayType }) => {
  const { resumeData } = ResumeInputTemplate();

  return (
    <>
      <HeaderTemplate
        currentPage={"Education - Schooling"}
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
            id="SchoolInputs"
            sx={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              width: "100%",
              flexWrap: "wrap",
              flexDirection: "column",
            }}
          >
            <UserInputs
              inputType={"text"}
              inputLabel={"HSC School Name"}
              requirement={"Mandatory"}
              explanation={"The school name where you studied class 12th"}
              examples={"Kendriya Vidyalaya"}
              inputValue={resumeData.education.hsc.name}
              inputOnchange={"education.hsc.name"}
              onChangeType={"Regular"}
              onChangeEntry={""}
              textfieldName={""}
            />

            <UserInputs
              inputType={"text"}
              inputLabel={"Period of Study"}
              requirement={"Mandatory"}
              explanation={"The years during which you pursued class 12th"}
              examples={"2021 - 2023"}
              inputValue={resumeData.education.hsc.year}
              inputOnchange={"education.hsc.year"}
              onChangeType={"Regular"}
              onChangeEntry={""}
              textfieldName={""}
            />

            <UserInputs
              inputType={"text"}
              inputLabel={"Grade"}
              requirement={"Mandatory"}
              explanation={"GPA or overall percentage achieved in HSC"}
              examples={"9.5, 95%"}
              inputValue={resumeData.education.hsc.grade}
              inputOnchange={"education.hsc.grade"}
              onChangeType={"Regular"}
              onChangeEntry={""}
              textfieldName={""}
            />

            <UserInputs
              inputType={"text"}
              inputLabel={"HSC Additional Info"}
              requirement={"Optional"}
              explanation={
                "Any other important and relevant information related to HSC"
              }
              examples={"State Board, NCERT Board"}
              inputValue={resumeData.education.hsc.additionalInfo}
              inputOnchange={"education.hsc.additionalInfo"}
              onChangeType={"Regular"}
              onChangeEntry={""}
              textfieldName={""}
            />

            <UserInputs
              inputType={"text"}
              inputLabel={"SSLC School Name"}
              requirement={"Mandatory"}
              explanation={"The school name where you studied class 10th"}
              examples={"Kendriya Vidyalaya"}
              inputValue={resumeData.education.sslc.name}
              inputOnchange={"education.sslc.name"}
              onChangeType={"Regular"}
              onChangeEntry={""}
              textfieldName={""}
            />

            <UserInputs
              inputType={"text"}
              inputLabel={"Period of Study"}
              requirement={"Mandatory"}
              explanation={"The years during which you pursued class 10th"}
              examples={"2017 - 2019"}
              inputValue={resumeData.education.sslc.year}
              inputOnchange={"education.sslc.year"}
              onChangeType={"Regular"}
              onChangeEntry={""}
              textfieldName={""}
            />

            <UserInputs
              inputType={"text"}
              inputLabel={"Grade"}
              requirement={"Mandatory"}
              explanation={"GPA or overall percentage achieved in SSLC"}
              examples={"9.5, 95%"}
              inputValue={resumeData.education.sslc.grade}
              inputOnchange={"education.sslc.grade"}
              onChangeType={"Regular"}
              onChangeEntry={""}
              textfieldName={""}
            />

            <UserInputs
              inputType={"text"}
              inputLabel={"SSLC Additional Info"}
              requirement={"Optional"}
              explanation={
                "Any other important and relevant information related to SSLC"
              }
              examples={"State Board, NCERT Board"}
              inputValue={resumeData.education.sslc.additionalInfo}
              inputOnchange={"education.sslc.additionalInfo"}
              onChangeType={"Regular"}
              onChangeEntry={""}
              textfieldName={""}
            />
          </Box>
          <NavigationButtons
            PreviousPageName={"Diploma"}
            PreviousPageLink={`/resume-builder/education/diploma`}
            NextPageName={"Projects"}
            NextPageLink={`/resume-builder/projects`}
          />
        </Box>
        <PreviewPdf />
      </Stack>
      <Footer />
    </>
  );
};

export default School;
