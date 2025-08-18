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

  const [skillsetValue, setSkillsetValue] = useState(
    resumeData.skills.skillSet || ""
  );

  const splitCSValues = (e) => {
    let { value } = e.target;
    let updatedSkills = { ...resumeData.skills };

    setSkillsetValue(value);

    let newSkills = value.split(",").filter((skill) => skill.trim().length > 0);

    newSkills = newSkills.map((skill) => skill.trim());

    updatedSkills = {
      type: "ListType",
      skillSet: newSkills,
    };

    updateField("skills", updatedSkills);
  };

  const [showInputInfo, setShowInputInfo] = useState(false);

  const showInfoDiv = () => setShowInputInfo((show) => !show);

  return (
    <div id="dv-SkillsListType" className="SubWrapper">
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
          onChange={splitCSValues}
          label="Skills List"
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
          examples={"Web Development, Cloud Deployment, Machine Learning"}
          explanation={"List of your personal skills, separated by commas"}
        />
      )}
    </div>
  );
};

export default ListType;
