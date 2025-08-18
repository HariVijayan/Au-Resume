import { useState } from "react";
import ResumeInputTemplate from "../../../../ResumeFormat.jsx";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputInfoDiv from "../InputInfoDiv.jsx";
import EmergencyIcon from "@mui/icons-material/Emergency";
import { useTheme } from "@mui/material";

const ListType = () => {
  const { resumeData, updateField } = ResumeInputTemplate();
  const theme = useTheme();

  const [certificationSetValue, setCertificationSetValue] = useState(
    resumeData.certifications.certificationSet || ""
  );

  const splitCSValues = (e) => {
    let { value } = e.target;
    let updatedCertification = { ...resumeData.certifications };

    setCertificationSetValue(value);

    let newCertifications = value
      .split(",")
      .filter((certification) => certification.trim().length > 0);

    newCertifications = newCertifications.map((certification) =>
      certification.trim()
    );

    updatedCertification = {
      type: "ListType",
      certificationSet: newCertifications,
    };

    updateField("certifications", updatedCertification);
  };

  const [showInputInfo, setShowInputInfo] = useState(false);

  const showInfoDiv = () => setShowInputInfo((show) => !show);

  return (
    <div id="dv-CertificationListType" className="SubWrapper">
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
          value={certificationSetValue}
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
          examples={
            "AWS Certified Developer, Google Cloud Certified (udemy.com/certificate/ghvsgv212)"
          }
          explanation={"List of your certifications, separated by commas"}
        />
      )}
    </div>
  );
};

export default ListType;
