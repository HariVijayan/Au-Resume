import { useState } from "react";
import ResumeInputTemplate from "../../../../ResumeFormat.jsx";
import UserInputs from "../UserInputs.jsx";

const ParaType = () => {
  const { resumeData } = ResumeInputTemplate();

  const [skillsetValue, setSkillsetValue] = useState(
    resumeData.skills.skillSet || ""
  );

  return (
    <div id="dv-SkillsParaType" className="SubWrapper">
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
    </div>
  );
};

export default ParaType;
