import { useState } from "react";
import ResumeInputTemplate from "../../../../ResumeFormat.jsx";
import UserInputs from "../UserInputs.jsx";
import Box from "@mui/material/Box";

const ListType = () => {
  const { resumeData } = ResumeInputTemplate();

  const [skillsetValue, setSkillsetValue] = useState(
    resumeData.skills.skillSet || ""
  );

  return (
    <Box
      id="SkillsList"
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
        inputLabel={"Skills List"}
        requirement={"Mandatory"}
        explanation={"List of your personal skills, separated by commas"}
        examples={"Web Development, Cloud Deployment, Machine Learning"}
        inputValue={skillsetValue}
        inputOnchange={""}
        onChangeType={"SkillsList"}
        onChangeEntry={setSkillsetValue}
        textfieldName={""}
      />
    </Box>
  );
};

export default ListType;
