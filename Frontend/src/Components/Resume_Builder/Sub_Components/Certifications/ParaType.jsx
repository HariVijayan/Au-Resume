import { useState } from "react";
import ResumeInputTemplate from "../../../../ResumeFormat.jsx";
import UserInputs from "../UserInputs.jsx";

const ParaType = () => {
  const { resumeData } = ResumeInputTemplate();

  const [certificationSetValue, setCertificationSetValue] = useState(
    resumeData.certifications.certificationSet || ""
  );

  return (
    <div id="dv-CertificationParaType" className="SubWrapper">
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
    </div>
  );
};

export default ParaType;
