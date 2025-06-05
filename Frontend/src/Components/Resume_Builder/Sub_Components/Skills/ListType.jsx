import { useState } from "react";
import InfoDiv from "../Info Div/InfoDiv.jsx";
import ResumeInputTemplate from "../../../../ResumeFormat.jsx";

const ListType = () => {
  const [infoDiv, setInfoDiv] = useState("");

  const { resumeData, updateField } = ResumeInputTemplate();

  const [skillsetValue, setSkillsetValue] = useState(
    resumeData.skills.skillSet || ""
  );

  const showOrHideInfoDiv = (currentState) => {
    if (infoDiv === currentState) {
      setInfoDiv(" ");
    } else {
      setInfoDiv(currentState);
    }
  };

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

  return (
    <div id="dv-SkillsListType" className="SubWrapper">
      <div id="dv-SkillsListTypeSkillSet" className="InputWrapper">
        <input
          type="text"
          name="skillset"
          id="in-rb_skills_list"
          value={skillsetValue}
          onChange={splitCSValues}
          placeholder=" "
        />
        <label htmlFor="in-rb_skills_list" className="TextFieldLabel">
          Skills List
        </label>
        <svg
          onClick={() => showOrHideInfoDiv("Skills")}
          xmlns="http://www.w3.org/2000/svg"
          className="MandatoryInputSvg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#e3e3e3"
        >
          <path d="M440-120v-264L254-197l-57-57 187-186H120v-80h264L197-706l57-57 186 187v-264h80v264l186-187 57 57-187 186h264v80H576l187 186-57 57-186-187v264h-80Z" />
        </svg>
      </div>

      {infoDiv === "Skills" && (
        <InfoDiv
          requirement={"Mandatory"}
          explanation={"List of your personal skills, separated by commas"}
          examples={"Web Development, Cloud Deployment, Machine Learning"}
          characterLimit={"Upto 120 characters"}
          allowedCharacters={"No Restrictions"}
        />
      )}
      {infoDiv === " " && (
        <InfoDiv
          requirement={""}
          explanation={""}
          examples={""}
          characterLimit={""}
          allowedCharacters={""}
        />
      )}
    </div>
  );
};

export default ListType;
