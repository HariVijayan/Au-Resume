import { useState, useEffect } from "react";
import ListType from "./ListType.jsx";
import ParaType from "./ParaType.jsx";
import PreviewPdf from "../PreviewPdf.jsx";
import ResumeInputTemplate from "../../../../ResumeFormat.jsx";
import HeaderTemplate from "../Header.jsx";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import NavigationButtons from "../NavigationButtons.jsx";
import Button from "@mui/material/Button";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import NotesIcon from "@mui/icons-material/Notes";
import { useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Footer from "../Footer.jsx";

const Cerifications = ({
  setLogoutClicked,
  setLogoutUserType,
  setOverlayType,
}) => {
  const { resumeData, updateField } = ResumeInputTemplate();
  const theme = useTheme();

  const [certificationType, setCertificationType] = useState("Default");

  useEffect(() => {
    if (resumeData.certifications.type == "ListType") {
      setCertificationType("ListType");
    } else if (resumeData.certifications.type == "ParaType") {
      setCertificationType("ParaType");
    } else {
      setCertificationType("Default");
    }
  }, [resumeData.certifications]);

  const setCertifications = (type) => {
    if (type === "ListType") {
      let updatedCertifications = { ...resumeData.certifications };
      updatedCertifications.type = "ListType";
      updatedCertifications.certificationSet = [];

      updateField("certifications", updatedCertifications);
    } else if (type === "ParaType") {
      let updatedCertifications = { ...resumeData.certifications };
      updatedCertifications.type = "ParaType";
      updatedCertifications.certificationSet = "";

      updateField("certifications", updatedCertifications);
    }

    setCertificationType(type);
  };

  return (
    <>
      <HeaderTemplate
        currentPage={"Certifications"}
        setLogoutClicked={setLogoutClicked}
        setLogoutUserType={setLogoutUserType}
        setOverlayType={setOverlayType}
        PageIcon={HowToRegIcon}
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
                onClick={() => setCertifications("ListType")}
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
                onClick={() => setCertifications("ParaType")}
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

            {certificationType === "Default" && (
              <Typography sx={{ margin: "15rem 1rem", textAlign: "center" }}>
                Please select an certification type to begin.
              </Typography>
            )}
            {certificationType === "ListType" && <ListType />}
            {certificationType === "ParaType" && <ParaType />}
          </Box>

          <NavigationButtons
            PreviousPageName={"Skills"}
            PreviousPageLink={`/resume-builder/skills`}
            NextPageName={"Languages"}
            NextPageLink={`/resume-builder/languages-known`}
          />
        </Box>
        <PreviewPdf />
      </Stack>
      <Footer />
    </>
  );
};

export default Cerifications;
