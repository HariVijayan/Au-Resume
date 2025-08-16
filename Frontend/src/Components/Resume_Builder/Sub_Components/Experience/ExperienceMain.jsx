import { useState, useEffect } from "react";
import ListType from "./ListType.jsx";
import ParaType from "./ParaType.jsx";
import PreviewPdf from "../PreviewPdf.jsx";
import ResumeInputTemplate from "../../../../ResumeFormat.jsx";
import HeaderTemplate from "../Header.jsx";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import NavigationButtons from "../NavigationButtons.jsx";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import NotesIcon from "@mui/icons-material/Notes";
import { useTheme } from "@mui/material";

const Experience = ({
  setLogoutClicked,
  setLogoutUserType,
  setOverlayType,
}) => {
  const { resumeData, updateField } = ResumeInputTemplate();
  const theme = useTheme();

  const [hasChosenAStyle, setHasChosenAStyle] = useState(
    resumeData.experience[0].company != "" ? true : false
  );

  const [renderedStyles, setRenderedStyles] = useState([]);

  useEffect(() => {
    const styles = resumeData.experience
      .filter((exp) => exp.style !== "")
      .map((exp) => exp.style);
    setRenderedStyles(styles);
  }, [resumeData.experience]);

  const addExperience = (styleType) => {
    let updatedStyles = [...renderedStyles];

    updatedStyles.push(styleType);

    setRenderedStyles(updatedStyles);

    const newEntry = {
      style: styleType,
      company: "",
      location: "",
      year: "",
      designation: "",
      team: "",
      roles: styleType === "ListType" ? [] : undefined,
      description: styleType === "ParaType" ? "" : undefined,
    };

    const updatedExperience = hasChosenAStyle
      ? [...resumeData.experience, newEntry]
      : [newEntry];

    setHasChosenAStyle(true);
    updateField("experience", updatedExperience);
  };

  return (
    <>
      <HeaderTemplate
        currentPage={"Work Experience"}
        setLogoutClicked={setLogoutClicked}
        setLogoutUserType={setLogoutUserType}
        setOverlayType={setOverlayType}
        PageIcon={WorkHistoryIcon}
      />
      <div id="dv-MainFormAndPreview">
        <div id="dv-MainForm">
          <div id="dv-ExperienceWrapper" className="WrapperClass">
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Button
                variant="contained"
                onClick={() => addExperience("ListType")}
                size="large"
                startIcon={<FormatListBulletedIcon />}
                sx={{
                  margin: "2rem 0rem",
                  textTransform: "none",
                  backgroundColor: theme.palette.black.main,
                }}
                padding={{ xs: "1rem 2rem", sm: "2rem 3rem" }}
              >
                List Type
              </Button>

              <Button
                variant="contained"
                onClick={() => addExperience("ParaType")}
                size="large"
                endIcon={<NotesIcon />}
                sx={{
                  margin: "2rem 0rem",
                  textTransform: "none",
                  backgroundColor: theme.palette.black.main,
                }}
                padding={{ xs: "1rem 2rem", sm: "2rem 3rem" }}
              >
                Para Type
              </Button>
            </Box>

            {!hasChosenAStyle && (
              <p>Please select an experience type to begin.</p>
            )}

            {renderedStyles.includes("ListType") && <ListType />}

            {renderedStyles.includes("ParaType") && <ParaType />}
          </div>

          <NavigationButtons
            PreviousPageName={"Basic Details"}
            PreviousPageLink={`/resume-builder/basic-details`}
            NextPageName={"Ph. D"}
            NextPageLink={`/resume-builder/education/phd`}
          />
        </div>
        <PreviewPdf />
      </div>
    </>
  );
};

export default Experience;
