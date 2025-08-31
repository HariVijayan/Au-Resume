import { useState, useEffect } from "react";
import ListType from "./ListType.jsx";
import ParaType from "./ParaType.jsx";
import PreviewPdf from "../PreviewPdf.jsx";
import ResumeInputTemplate from "../../../ResumeFormat.jsx";
import HeaderTemplate from "../Header.jsx";
import SurfingIcon from "@mui/icons-material/Surfing";
import NavigationButtons from "../NavigationButtons.jsx";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import NotesIcon from "@mui/icons-material/Notes";
import { useTheme } from "@mui/material";
import Footer from "../Footer.jsx";

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
              id="InputTypeOptions"
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                gap: "1rem",
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
              <Typography sx={{ margin: "15rem 1rem", textAlign: "center" }}>
                Please select an skill type to begin.
              </Typography>
            )}
            {skillType === "ListType" && <ListType />}
            {skillType === "ParaType" && <ParaType />}
          </Box>
          <NavigationButtons
            PreviousPageName={"Projects"}
            PreviousPageLink={`/resume-builder/projects`}
            NextPageName={"Certifications"}
            NextPageLink={`/resume-builder/certifications`}
          />
        </Box>
        <PreviewPdf />
      </Stack>
      <Footer />
    </>
  );
};

export default Skills;
