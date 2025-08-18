import { useState } from "react";
import ResumeInputTemplate from "../../../../ResumeFormat.jsx";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputInfoDiv from "../InputInfoDiv.jsx";
import EmergencyIcon from "@mui/icons-material/Emergency";
import { useTheme } from "@mui/material";

const ParaType = () => {
  const theme = useTheme();

  const { resumeData, updateField } = ResumeInputTemplate();

  const [certificationSetValue, setCertificationSetValue] = useState(
    resumeData.certifications.certificationSet || ""
  );

  const trimParaWhitespaces = (e) => {
    const { value } = e.target;

    let updatedCertification = { ...resumeData.certifications };

    let newCertifications = value.trim();

    setCertificationSetValue(value);

    updatedCertification = {
      type: "ParaType",
      certificationSet: newCertifications,
    };

    updateField("certifications", updatedCertification);
  };

  const [showInputInfo, setShowInputInfo] = useState(false);

  const showInfoDiv = () => setShowInputInfo((show) => !show);

  return (
    <div id="dv-CertificationParaType" className="SubWrapper">
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
          onChange={trimParaWhitespaces}
          label="Certifications Para"
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
            "I have completed certifications in Web Development, Cloud Computing, and Machine Learning"
          }
          explanation={"Your personal certifications as a paragraph"}
        />
      )}
    </div>
  );
};

export default ParaType;
