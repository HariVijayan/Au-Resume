import { useState } from "react";
import ResumeInputTemplate from "../../../ResumeFormat.jsx";
import UserInputs from "../UserInputs.jsx";
import Box from "@mui/material/Box";

const ParaType = () => {
  const { resumeData } = ResumeInputTemplate();

  const [skillsetValue, setSkillsetValue] = useState(
    resumeData.skills.skillSet || ""
  );

  return (
    <Box
      id="SkillsPara"
      sx={{
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        width: "100%",
        flexWrap: "wrap",
        flexDirection: "column",
        margin: "15rem 0rem",
      }}
    >
      <UserInputs
        inputType={"text"}
        inputLabel={"Skills Paragraph"}
        requirement={"Mandatory"}
        explanation={"Your personal skills as a paragraph"}
        examples={
          "I am a web developer with skills in HTML, CSS, JavaScript, and React"
        }
        inputValue={skillsetValue}
        inputOnchange={""}
        onChangeType={"SkillsPara"}
        onChangeEntry={setSkillsetValue}
        textfieldName={""}
      />
    </Box>
  );
};

export default ParaType;
