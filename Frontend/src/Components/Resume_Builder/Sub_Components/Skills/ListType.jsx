import { useState } from "react";
import ResumeInputTemplate from "../../../../ResumeFormat.jsx";
import UserInputs from "../UserInputs.jsx";

const ListType = () => {
  const { resumeData } = ResumeInputTemplate();

  const [skillsetValue, setSkillsetValue] = useState(
    resumeData.skills.skillSet || ""
  );

  return (
    <div id="dv-SkillsListType" className="SubWrapper">
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
    </div>
  );
};

export default ListType;
