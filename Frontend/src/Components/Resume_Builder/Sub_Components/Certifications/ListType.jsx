import { useState } from "react";
import ResumeInputTemplate from "../../../../ResumeFormat.jsx";
import UserInputs from "../UserInputs.jsx";
import Box from "@mui/material/Box";

const ListType = () => {
  const { resumeData } = ResumeInputTemplate();

  const [certificationSetValue, setCertificationSetValue] = useState(
    resumeData.certifications.certificationSet || ""
  );

  return (
    <Box
      id="CertificationList"
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
        inputLabel={"Certifications List"}
        requirement={"Mandatory"}
        explanation={"List of your certifications, separated by commas"}
        examples={
          "AWS Certified Developer, Google Cloud Certified (udemy.com/certificate/ghvsgv212)"
        }
        inputValue={certificationSetValue}
        inputOnchange={""}
        onChangeType={"CertificationsList"}
        onChangeEntry={setCertificationSetValue}
        textfieldName={""}
      />
    </Box>
  );
};

export default ListType;
