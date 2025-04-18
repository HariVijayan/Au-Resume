import React, { useState } from "react";
import InfoDiv from "../Info Div/InfoDiv";

const Style1 = ({ resumeData, setResumeData }) => {
  const [infoDiv, setInfoDiv] = useState("");

  const showOrHideInfoDiv = (currentState) => {
    if (infoDiv === currentState) {
      setInfoDiv(" ");
    } else {
      setInfoDiv(currentState);
    }
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedSkills = { ...resumeData.skills };

    updatedSkills.style1.skillset = value.split(",").map((role) => role.trim());

    setResumeData({
      ...resumeData,
      skills: updatedSkills,
    });
  };

  return (
    <div id="dv-SkillsStyle1" className="SubWrapper">
      <div id="dv-SkillsStyle1SkillSet" className="InputWrapper">
        <input
          type="text"
          name="skillset"
          id="in-rb_skills_list"
          value={resumeData.skills.style1.skillset.join(", ")}
          onChange={(e) => handleInputChange(e, 0)}
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

export default Style1;
