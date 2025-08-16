import { useState, useEffect } from "react";
import ListType from "./ListType.jsx";
import ParaType from "./ParaType.jsx";
import PreviewPdf from "../PreviewPdf.jsx";
import ResumeInputTemplate from "../../../../ResumeFormat.jsx";
import HeaderTemplate from "../Header.jsx";
import SurfingIcon from "@mui/icons-material/Surfing";
import NavigationButtons from "../NavigationButtons.jsx";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import NotesIcon from "@mui/icons-material/Notes";
import { useTheme } from "@mui/material";

const Skills = ({ setLogoutClicked, setLogoutUserType, setOverlayType }) => {
  const { resumeData, updateField } = ResumeInputTemplate();
  const theme = useTheme();

  const [skillType, setSkillType] = useState("Default");

  useEffect(() => {
    if (resumeData.skills.type == "ListType") {
      setSkillType("ListType");
    } else if (resumeData.skills.type == "ParaType") {
      setSkillType("ParaType");
    } else {
      setSkillType("Default");
    }
  }, [resumeData.skills]);

  const setSkills = (type) => {
    if (type === "ListType") {
      let updatedSkills = { ...resumeData.skills };
      updatedSkills.type = "ListType";
      updatedSkills.skillSet = [];

      updateField("skills", updatedSkills);
    } else if (type === "ParaType") {
      let updatedSkills = { ...resumeData.skills };
      updatedSkills.type = "ParaType";
      updatedSkills.skillSet = "";

      updateField("skills", updatedSkills);
    }

    setSkillType(type);
  };

  return (
    <>
      <HeaderTemplate
        currentPage={"Skills"}
        setLogoutClicked={setLogoutClicked}
        setLogoutUserType={setLogoutUserType}
        setOverlayType={setOverlayType}
        PageIcon={SurfingIcon}
      />
      <div id="dv-MainFormAndPreview">
        <div id="dv-MainForm">
          <div id="dv-SkillsWrapper" className="WrapperClass">
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
                onClick={() => setSkills("ListType")}
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
                onClick={() => setSkills("ParaType")}
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

            {skillType === "Default" && (
              <p>Please select a skill type to begin.</p>
            )}
            {skillType === "ListType" && <ListType />}
            {skillType === "ParaType" && <ParaType />}
          </div>
          <NavigationButtons
            PreviousPageName={"Projects"}
            PreviousPageLink={`/resume-builder/projects`}
            NextPageName={"Certifications"}
            NextPageLink={`/resume-builder/certifications`}
          />
        </div>
        <PreviewPdf />
      </div>
    </>
  );
};

export default Skills;
