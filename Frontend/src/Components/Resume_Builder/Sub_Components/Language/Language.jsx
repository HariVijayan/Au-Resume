import { useState } from "react";
import PreviewPdf from "../PreviewPdf.jsx";
import InfoDiv from "../Info Div/InfoDiv.jsx";
import ResumeInputTemplate from "../../../../ResumeFormat.jsx";
import HeaderTemplate from "../Header.jsx";
import LanguageIcon from "@mui/icons-material/Language";
import NavigationButtons from "../NavigationButtons.jsx";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputInfoDiv from "../InputInfoDiv.jsx";
import EmergencyIcon from "@mui/icons-material/Emergency";
import { useTheme } from "@mui/material";

const Language = ({ setLogoutClicked, setLogoutUserType, setOverlayType }) => {
  const { resumeData, updateField } = ResumeInputTemplate();

  const [languageValue, setLanguageValue] = useState(
    resumeData.languages || ""
  );

  const theme = useTheme();

  const splitCSValues = (e) => {
    const { value } = e.target;
    let updatedLanguages = { ...resumeData.languages };

    setLanguageValue(value);

    updatedLanguages = value
      .split(",")
      .filter((language) => language.trim().length > 0);

    updatedLanguages = updatedLanguages.map((language) => language.trim());

    setLanguageValue(value);

    updateField("languages", updatedLanguages);
  };

  const [showInputInfo, setShowInputInfo] = useState(false);

  const showInfoDiv = () => setShowInputInfo((show) => !show);

  return (
    <>
      <HeaderTemplate
        currentPage={"Languages Known"}
        setLogoutClicked={setLogoutClicked}
        setLogoutUserType={setLogoutUserType}
        setOverlayType={setOverlayType}
        PageIcon={LanguageIcon}
      />
      <div id="dv-MainFormAndPreview">
        <div id="dv-MainForm">
          <div id="dv-LanguagesWrapper" className="WrapperClass">
            <div className="SubWrapper">
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  width: "100%",
                  flexWrap: "wrap",
                }}
              >
                <TextField
                  required
                  sx={{ width: "80%", margin: "1rem 0rem" }}
                  value={languageValue}
                  onChange={splitCSValues}
                  label="Certifications List"
                />

                <EmergencyIcon
                  sx={{
                    marginLeft: "2rem",
                    color: theme.palette.error.main,
                    cursor: "pointer",
                  }}
                  onClick={showInfoDiv}
                />
              </Box>

              {showInputInfo && (
                <InputInfoDiv
                  requirement={"Mandatory"}
                  examples={"Tamil, English"}
                  explanation={
                    "List the languages you know, separated by commas"
                  }
                />
              )}
            </div>
          </div>
          <NavigationButtons
            PreviousPageName={"Certifications"}
            PreviousPageLink={`/resume-builder/certifications`}
            NextPageName={"Custom Input"}
            NextPageLink={`/resume-builder/custom-input`}
          />
        </div>
        <PreviewPdf />
      </div>
    </>
  );
};

export default Language;
