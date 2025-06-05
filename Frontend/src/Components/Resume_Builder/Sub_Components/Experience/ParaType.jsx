import { useState } from "react";
import InfoDiv from "../Info Div/InfoDiv.jsx";
import ResumeInputTemplate from "../../../../ResumeFormat.jsx";

const ParaType = () => {
  const [infoDiv, setInfoDiv] = useState("");

  const { resumeData, updateField } = ResumeInputTemplate();

  const showOrHideInfoDiv = (currentState) => {
    if (infoDiv === currentState) {
      setInfoDiv(" ");
    } else {
      setInfoDiv(currentState);
    }
  };

  const modifyExperienceInput = (e, newExperienceIndex) => {
    const { name, value } = e.target;
    const updatedExperience = [...resumeData.experience];

    updatedExperience[newExperienceIndex][name] = value;

    updateField("experience", updatedExperience);
  };

  return (
    <>
      {resumeData.experience.map(
        (newExperienceEntry, newExperienceIndex) =>
          newExperienceEntry.style === "ParaType" && (
            <div
              key={newExperienceIndex}
              id={`dv-ExperienceParaCopy${newExperienceIndex + 1}`}
              className="SubWrapper"
            >
              <div
                id={`dv-EPCompanyNameCopy${newExperienceIndex + 1}`}
                className="InputWrapper"
              >
                <input
                  type="text"
                  id={`in-rb_ep_exp_name_copy${newExperienceIndex + 1}`}
                  name="company"
                  value={newExperienceEntry.company}
                  onChange={(e) => modifyExperienceInput(e, newExperienceIndex)}
                  placeholder=" "
                />
                <label
                  htmlFor={`in-rb_ep_exp_name_copy${newExperienceIndex + 1}`}
                  className="TextFieldLabel"
                >
                  Company Name
                </label>
                <svg
                  onClick={() =>
                    showOrHideInfoDiv(`Company Name${newExperienceIndex}`)
                  }
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

              {infoDiv === `Company Name${newExperienceIndex}` && (
                <InfoDiv
                  requirement={"Mandatory"}
                  explanation={"Your Company's Name"}
                  examples={"Zoho Corporation"}
                  characterLimit={"Upto 35 characters"}
                  allowedCharacters={"No Restrictions"}
                />
              )}

              <div
                id={`dv-EPLocationCopy${newExperienceIndex + 1}`}
                className="InputWrapper"
              >
                <input
                  type="text"
                  id={`in-rb_ep_exp_location_copy${newExperienceIndex + 1}`}
                  name="location"
                  value={newExperienceEntry.location}
                  onChange={(e) => modifyExperienceInput(e, newExperienceIndex)}
                  placeholder=" "
                />
                <label
                  htmlFor={`in-rb_ep_exp_location_copy${
                    newExperienceIndex + 1
                  }`}
                  className="TextFieldLabel"
                >
                  Location
                </label>
                <svg
                  onClick={() =>
                    showOrHideInfoDiv(`Work Location${newExperienceIndex}`)
                  }
                  xmlns="http://www.w3.org/2000/svg"
                  className="RecommededInputSvg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#e3e3e3"
                >
                  <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
                </svg>
              </div>

              {infoDiv === `Work Location${newExperienceIndex}` && (
                <InfoDiv
                  requirement={"Recommended"}
                  explanation={"The city where you've worked or remote"}
                  examples={"Chennai"}
                  characterLimit={"Upto 20 characters"}
                  allowedCharacters={"Alphabets"}
                />
              )}

              <div
                id={`dv-EPPeriodCopy${newExperienceIndex + 1}`}
                className="InputWrapper"
              >
                <input
                  type="text"
                  id={`in-rb_ep_exp_year_copy${newExperienceIndex + 1}`}
                  name="year"
                  value={newExperienceEntry.year}
                  onChange={(e) => modifyExperienceInput(e, newExperienceIndex)}
                  placeholder=" "
                />
                <label
                  htmlFor={`in-rb_ep_exp_year_copy${newExperienceIndex + 1}`}
                  className="TextFieldLabel"
                >
                  Period
                </label>
                <svg
                  onClick={() =>
                    showOrHideInfoDiv(`Work Period${newExperienceIndex}`)
                  }
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

              {infoDiv === `Work Period${newExperienceIndex}` && (
                <InfoDiv
                  requirement={"Mandatory"}
                  explanation={"The period of your time with the company"}
                  examples={"June 2024 - Present"}
                  characterLimit={"Upto 25 characters"}
                  allowedCharacters={"Alphabets, Numbers, Hyphen"}
                />
              )}

              <div
                id={`dv-EPDesignationCopy${newExperienceIndex + 1}`}
                className="InputWrapper"
              >
                <input
                  type="text"
                  id={`in-rb_ep_exp_desg_copy${newExperienceIndex + 1}`}
                  name="designation"
                  value={newExperienceEntry.designation}
                  onChange={(e) => modifyExperienceInput(e, newExperienceIndex)}
                  placeholder=" "
                />
                <label
                  htmlFor={`in-rb_ep_exp_name_copy${newExperienceIndex + 1}`}
                  className="TextFieldLabel"
                >
                  Designation
                </label>
                <svg
                  onClick={() =>
                    showOrHideInfoDiv(`Designation${newExperienceIndex}`)
                  }
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

              {infoDiv === `Designation${newExperienceIndex}` && (
                <InfoDiv
                  requirement={"Mandatory"}
                  explanation={
                    "The designation in which you worked in the company"
                  }
                  examples={"Software Engineer"}
                  characterLimit={"Upto 25 characters"}
                  allowedCharacters={"No Restrictions"}
                />
              )}

              <div
                id={`dv-EPTeamNameCopy${newExperienceIndex + 1}`}
                className="InputWrapper"
              >
                <input
                  type="text"
                  id={`in-rb_ep_exp_team_copy${newExperienceIndex + 1}`}
                  name="team"
                  value={newExperienceEntry.team}
                  onChange={(e) => modifyExperienceInput(e, newExperienceIndex)}
                  placeholder=" "
                />
                <label
                  htmlFor={`in-rb_ep_exp_name_copy${newExperienceIndex + 1}`}
                  className="TextFieldLabel"
                >
                  Team Name
                </label>
                <svg
                  onClick={() =>
                    showOrHideInfoDiv(`Team Name${newExperienceIndex}`)
                  }
                  xmlns="http://www.w3.org/2000/svg"
                  className="OptionalInputSvg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#e3e3e3"
                >
                  <path d="M240-440v-80h480v80H240Z" />
                </svg>
              </div>

              {infoDiv === `Team Name${newExperienceIndex}` && (
                <InfoDiv
                  requirement={"Optional"}
                  explanation={"Your team's name within the company"}
                  examples={"Immediate CyberThreat Response Team"}
                  characterLimit={"Upto 25 characters"}
                  allowedCharacters={"No Restrictions"}
                />
              )}

              <div
                id={`dv-EPDescriptionCopy${newExperienceIndex + 1}`}
                className="InputWrapper"
              >
                <input
                  type="text"
                  id={`in-rb_ep_exp_desc_copy${newExperienceIndex + 1}`}
                  name="description"
                  value={newExperienceEntry.description}
                  onChange={(e) => modifyExperienceInput(e, newExperienceIndex)}
                  placeholder=" "
                />
                <label
                  htmlFor={`in-rb_ep_exp_role_copy${newExperienceIndex + 1}`}
                  className="TextFieldLabel"
                >
                  Description
                </label>
                <svg
                  onClick={() =>
                    showOrHideInfoDiv(`Description${newExperienceIndex}`)
                  }
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

              {infoDiv === `Description${newExperienceIndex}` && (
                <InfoDiv
                  requirement={"Mandatory"}
                  explanation={
                    "Highlight your important day to day tasks while being part of the team as a single paragraph"
                  }
                  examples={
                    "Developed a security management dashboard for the team. Designed and developed a new threat detection algorithm"
                  }
                  characterLimit={"Upto 400 characters"}
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
          )
      )}
    </>
  );
};

export default ParaType;
