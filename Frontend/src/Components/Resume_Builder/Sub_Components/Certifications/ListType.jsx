import { useState } from "react";
import ResumeInputTemplate from "../../../../ResumeFormat.jsx";
import UserInputs from "../UserInputs.jsx";

const ListType = () => {
  const { resumeData } = ResumeInputTemplate();

  const [certificationSetValue, setCertificationSetValue] = useState(
    resumeData.certifications.certificationSet || ""
  );

  return (
    <div id="dv-CertificationListType" className="SubWrapper">
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
    </div>
  );
};

export default ListType;
