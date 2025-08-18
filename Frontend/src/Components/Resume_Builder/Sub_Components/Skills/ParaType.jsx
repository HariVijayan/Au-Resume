import { useState } from "react";
import ResumeInputTemplate from "../../../../ResumeFormat.jsx";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputInfoDiv from "../InputInfoDiv.jsx";
import EmergencyIcon from "@mui/icons-material/Emergency";
import { useTheme } from "@mui/material";

const ParaType = () => {

  const { resumeData, updateField } = ResumeInputTemplate();
  const theme = useTheme();

  const [skillsetValue, setSkillsetValue] = useState(
    resumeData.skills.skillSet || ""
  );

  const trimParaWhitespaces = (e) => {
    const { value } = e.target;

    let updatedSkills = { ...resumeData.skills };

    let newSkills = value.trim();

    setSkillsetValue(value);

    updatedSkills = {
      type: "ParaType",
      skillSet: newSkills,
    };

    updateField("skills", updatedSkills);
  };

  const [showInputInfo, setShowInputInfo] = useState(false);

  const showInfoDiv = () => setShowInputInfo((show) => !show);

  return (
    <div id="dv-SkillsParaType" className="SubWrapper">
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
          value={skillsetValue}
          onChange={trimParaWhitespaces}
          label="Skills Para"
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
            "I am a web developer with skills in HTML, CSS, JavaScript, and React"
          }
          explanation={"Your personal skills as a paragraph"}
        />
      )}
    </div>
  );
};

export default ParaType;
