import React, { useState } from "react";
import InfoDiv from "../Info Div/InfoDiv";

const Style2 = ({ resumeData, setResumeData }) => {
  const [infoDiv, setInfoDiv] = useState("");

  const showOrHideInfoDiv = (currentState) => {
    if (infoDiv === currentState) {
      setInfoDiv(" ");
    } else {
      setInfoDiv(currentState);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    const updatedSkills = { ...resumeData.skills };

    updatedSkills.style2.skillset = value.trim();

    setResumeData({
      ...resumeData,
      skills: updatedSkills,
    });
  };

  return (
    <div id="dv-SkillsStyle2" className="SubWrapper">
      <div id="dv-SkillsStyle2SkillSet" className="InputWrapper">
        <input
          type="text"
          name="skillset"
          id="in-rb_skills_para"
          value={resumeData.skills.style2.skillset}
          onChange={handleInputChange}
          placeholder=" "
        />
        <label htmlFor="in-rb_skills_para" className="TextFieldLabel">
          Skills Para
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
          explanation={"Your personal skills as a paragraph"}
          examples={
            "I am a web developer with skills in HTML, CSS, JavaScript, and React"
          }
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

export default Style2;
