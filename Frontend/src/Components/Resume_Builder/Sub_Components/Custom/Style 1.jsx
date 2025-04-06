import React, { useState } from "react";

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
                  className="InputInfoSvg"
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#e3e3e3"
                >
                  <path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                </svg>
              </div>

              {infoDiv === `Title${index + 1}` && (
                <div className="InputInfoDiv">
                  <div className="InputInfoText">
                    <p>Enter a custom title</p>
                  </div>
                </div>
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
                  className="InputInfoSvg"
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#e3e3e3"
                >
                  <path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                </svg>
              </div>

              {infoDiv === `List${index + 1}` && (
                <div className="InputInfoDiv">
                  <div className="InputInfoText">
                    <p>Enter custom list as comma separated values</p>
                  </div>
                </div>
              )}

              {infoDiv === " " && (
                <div className="InputInfoDiv">
                  <div className="InputInfoText"></div>
                </div>
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
