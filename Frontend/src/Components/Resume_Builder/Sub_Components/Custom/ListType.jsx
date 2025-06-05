import { useState } from "react";
import InfoDiv from "../Info Div/InfoDiv";
import ResumeInputTemplate from "../../../../ResumeFormat.jsx";

const ListType = () => {
  const [infoDiv, setInfoDiv] = useState("");

  const { resumeData, updateField } = ResumeInputTemplate();

  const showOrHideInfoDiv = (currentState) => {
    if (infoDiv === currentState) {
      setInfoDiv(" ");
    } else {
      setInfoDiv(currentState);
    }
  };

  const modifyCustomInput = (e, customInputIndex) => {
    const { name, value } = e.target;
    const updatedCustomInput = [...resumeData.customInput];

    if (name === "listValues") {
      updatedCustomInput[customInputIndex][name] = value.split(",");
    } else {
      updatedCustomInput[customInputIndex][name] = value;
    }

    updateField("customInput", updatedCustomInput);
  };

  return (
    <>
      {resumeData.customInput.map(
        (customInputEntry, customInputIndex) =>
          customInputEntry.style === "ListType" && (
            <div
              key={customInputIndex}
              id={`dv-CustomListCopy${customInputIndex + 1}`}
              className="SubWrapper"
            >
              <div
                id={`dv-CILTitleCopy${customInputIndex + 1}`}
                className="InputWrapper"
              >
                <input
                  type="text"
                  name="title"
                  id={`in-rb_ci_title_copy${customInputIndex + 1}`}
                  value={customInputEntry.title}
                  onChange={(e) => modifyCustomInput(e, customInputIndex)}
                  placeholder=" "
                />
                <label
                  htmlFor={`in-rb_ci_title_copy${customInputIndex + 1}`}
                  className="TextFieldLabel"
                >
                  Custom Title
                </label>
                <svg
                  onClick={() =>
                    showOrHideInfoDiv(`Title${customInputIndex + 1}`)
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

              {infoDiv === `Title${customInputIndex + 1}` && (
                <InfoDiv
                  requirement={"Mandatory"}
                  explanation={"Provide a title for the custom section"}
                  examples={"Extra Curricular Activities"}
                  characterLimit={"Upto 30 characters"}
                  allowedCharacters={"No Restrictions"}
                />
              )}

              <div
                id={`dv-CILListCopy${customInputIndex + 1}`}
                className="InputWrapper"
              >
                <input
                  type="text"
                  name="listValues"
                  id={`in-rb_ci_list_copy${customInputIndex + 1}`}
                  value={customInputEntry.listValues}
                  onChange={(e) => modifyCustomInput(e, customInputIndex)}
                  placeholder=" "
                />
                <label
                  htmlFor={`in-rb_ci_list_copy${customInputIndex + 1}`}
                  className="TextFieldLabel"
                >
                  Custom List
                </label>
                <svg
                  onClick={() =>
                    showOrHideInfoDiv(`List${customInputIndex + 1}`)
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

              {infoDiv === `List${customInputIndex + 1}` && (
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
          )
      )}
    </>
  );
};

export default ListType;
