import { useState } from "react";
import ResumeInputTemplate from "../../../../ResumeFormat.jsx";
import UserInputs from "../UserInputs.jsx";
import Box from "@mui/material/Box";

const ParaType = () => {
  const { resumeData } = ResumeInputTemplate();

  const [certificationSetValue, setCertificationSetValue] = useState(
    resumeData.certifications.certificationSet || ""
  );

  return (
    <Box
      id="CertificationPara"
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
        inputLabel={"Certifications Paragraph"}
        requirement={"Mandatory"}
        explanation={"Your personal certifications as a paragraph"}
        examples={
          "I have completed certifications in Web Development, Cloud Computing, and Machine Learning"
        }
        inputValue={certificationSetValue}
        inputOnchange={""}
        onChangeType={"CertificationsPara"}
        onChangeEntry={setCertificationSetValue}
        textfieldName={""}
      />
    </Box>
  );
};

export default ParaType;
