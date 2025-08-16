import { useState, useEffect } from "react";
import ListType from "./ListType.jsx";
import ParaType from "./ParaType.jsx";
import PreviewPdf from "../PreviewPdf.jsx";
import ResumeInputTemplate from "../../../../ResumeFormat.jsx";
import HeaderTemplate from "../Header.jsx";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import NavigationButtons from "../NavigationButtons.jsx";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import NotesIcon from "@mui/icons-material/Notes";
import { useTheme } from "@mui/material";

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
      <div id="dv-MainFormAndPreview">
        <div id="dv-MainForm">
          <div id="dv-CertificationsWrapper" className="WrapperClass">
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
              <p>Please select a certification type to begin.</p>
            )}
            {certificationType === "ListType" && <ListType />}
            {certificationType === "ParaType" && <ParaType />}
          </div>

          <NavigationButtons
            PreviousPageName={"Skills"}
            PreviousPageLink={`/resume-builder/skills`}
            NextPageName={"Languages"}
            NextPageLink={`/resume-builder/languages-known`}
          />
        </div>
        <PreviewPdf />
      </div>
    </>
  );
};

export default Cerifications;
