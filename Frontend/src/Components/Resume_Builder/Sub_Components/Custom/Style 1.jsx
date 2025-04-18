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
    const updatedCustomDivs = [...resumeData.customdiv];

    if (name === "customlistvalue") {
      updatedCustomDivs[index].customlist = value
        .split(",")
        .map((role) => role.trim());

      const { customlistvalue, ...restOfDiv } = updatedCustomDivs[index];
      updatedCustomDivs[index] = restOfDiv;
    } else if (name === "customtitle") {
      updatedCustomDivs[index].customtitle = value;
    } else {
      updatedCustomDivs[index] = { ...updatedCustomDivs[index], [name]: value };
    }
    setResumeData({
      ...resumeData,
      customdiv: updatedCustomDivs,
    });
  };

  return (
    <>
      {resumeData.customdiv.map((div, index) => {
        if (div.customdivstyle1) {
          return (
            <div
              key={index}
              id={`dv-CustomListCopy${index + 1}`}
              className="SubWrapper"
            >
              <div id={`dv-CILTitleCopy${index + 1}`} className="InputWrapper">
                <input
                  type="text"
                  name="customtitle"
                  id={`in-rb_ci_title_copy${index + 1}`}
                  value={div.customtitle}
                  onChange={(e) => handleInputChange(e, index)}
                  placeholder=" "
                />
                <label
                  htmlFor={`in-rb_ci_title_copy${index + 1}`}
                  className="TextFieldLabel"
                >
                  Custom Title
                </label>
                <svg
                  onClick={() => showOrHideInfoDiv(`Title${index + 1}`)}
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

              {infoDiv === `Title${index + 1}` && (
                <InfoDiv
                  requirement={"Mandatory"}
                  explanation={"Provide a title for the custom section"}
                  examples={"Extra Curricular Activities"}
                  characterLimit={"Upto 30 characters"}
                  allowedCharacters={"No Restrictions"}
                />
              )}

              <div id={`dv-CILListCopy${index + 1}`} className="InputWrapper">
                <input
                  type="text"
                  name="customlistvalue"
                  id={`in-rb_ci_list_copy${index + 1}`}
                  value={div.customlist.join(", ")}
                  onChange={(e) => handleInputChange(e, index)}
                  placeholder=" "
                />
                <label
                  htmlFor={`in-rb_ci_list_copy${index + 1}`}
                  className="TextFieldLabel"
                >
                  Custom List
                </label>
                <svg
                  onClick={() => showOrHideInfoDiv(`List${index + 1}`)}
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

              {infoDiv === `List${index + 1}` && (
                <InfoDiv
                  requirement={"Mandatory"}
                  explanation={
                    "List all the custom values, separated by commas"
                  }
                  examples={
                    "High School Football team captain, Part of Bharat Scouts"
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
        }
        return null;
      })}
    </>
  );
};

export default Style1;
