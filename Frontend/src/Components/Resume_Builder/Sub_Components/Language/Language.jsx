import { useState } from "react";
import PreviewPdf from "../PreviewPdf.jsx";
import ResumeInputTemplate from "../../../../ResumeFormat.jsx";
import HeaderTemplate from "../Header.jsx";
import LanguageIcon from "@mui/icons-material/Language";
import NavigationButtons from "../NavigationButtons.jsx";
import UserInputs from "../UserInputs.jsx";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

const Language = ({ setLogoutClicked, setLogoutUserType, setOverlayType }) => {
  const { resumeData } = ResumeInputTemplate();

  const [languageValue, setLanguageValue] = useState(
    resumeData.languages || ""
  );

  return (
    <>
      <HeaderTemplate
        currentPage={"Languages Known"}
        setLogoutClicked={setLogoutClicked}
        setLogoutUserType={setLogoutUserType}
        setOverlayType={setOverlayType}
        PageIcon={LanguageIcon}
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
              id="LanguageInput"
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
                width: "100%",
                flexWrap: "wrap",
                flexDirection: "column",
                margin: "15rem 0rem",
              }}
            >
              <UserInputs
                inputType={"text"}
                inputLabel={"Languages Known"}
                requirement={"Mandatory"}
                explanation={"List the languages you know, separated by commas"}
                examples={"Tamil, English"}
                inputValue={languageValue}
                inputOnchange={""}
                onChangeType={"Languages"}
                onChangeEntry={setLanguageValue}
                textfieldName={""}
              />
            </Box>
          </Box>
          <NavigationButtons
            PreviousPageName={"Certifications"}
            PreviousPageLink={`/resume-builder/certifications`}
            NextPageName={"Custom Input"}
            NextPageLink={`/resume-builder/custom-input`}
          />
        </Box>
        <PreviewPdf />
      </Stack>
    </>
  );
};

export default Language;
