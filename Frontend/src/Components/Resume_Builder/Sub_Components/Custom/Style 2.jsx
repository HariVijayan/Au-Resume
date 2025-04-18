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
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedCustomDivs = [...resumeData.customdiv];

    if (name === "customparatitle") {
      updatedCustomDivs[index].customtitle = value;
    } else if (name === "custompara") {
      updatedCustomDivs[index].customparagraph = value;
    }

    updatedCustomDivs[index] = { ...updatedCustomDivs[index], [name]: value };

    setResumeData({
      ...resumeData,
      customdiv: updatedCustomDivs,
    });
  };

  return (
    <>
      {resumeData.customdiv.map((div, index) => {
        if (div.customdivstyle2) {
          return (
            <div
              key={index}
              id={`dv-CustomParaCopy${index + 1}`}
              className="SubWrapper"
            >
              <div id={`dv-CIPTitleCopy${index + 1}`} className="InputWrapper">
                <input
                  type="text"
                  name="customtitle"
                  id={`in-rb_ci_para_title_copy${index + 1}`}
                  value={div.customtitle}
                  onChange={(e) => handleInputChange(e, index)}
                  placeholder=" "
                />
                <label
                  htmlFor={`in-rb_ci_para_title_copy${index + 1}`}
                  className="TextFieldLabel"
                >
                  Custom Title
                </label>
                <svg
                  onClick={() => showOrHideInfoDiv(`Title${index}`)}
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

              {infoDiv === `Title${index}` && (
                <InfoDiv
                  requirement={"Mandatory"}
                  explanation={"Provide a title for the custom section"}
                  examples={"Extra Curricular Activities"}
                  characterLimit={"Upto 30 characters"}
                  allowedCharacters={"No Restrictions"}
                />
              )}

              <div id={`dv-CIPParaCopy${index + 1}`} className="InputWrapper">
                <input
                  type="text"
                  name="customparagraph"
                  id={`in-rb_ci_para_input_copy${index + 1}`}
                  value={div.customparagraph}
                  onChange={(e) => handleInputChange(e, index)}
                  placeholder=" "
                />
                <label
                  htmlFor={`in-rb_ci_para_input_copy${index + 1}`}
                  className="TextFieldLabel"
                >
                  Custom Paragraph
                </label>
                <svg
                  onClick={() => showOrHideInfoDiv(`Para${index}`)}
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

              {infoDiv === `Para${index}` && (
                <InfoDiv
                  requirement={"Mandatory"}
                  explanation={"Your custom paragraph"}
                  examples={
                    "High School Football team captain. Part of Bharat Scouts"
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

export default Style2;
