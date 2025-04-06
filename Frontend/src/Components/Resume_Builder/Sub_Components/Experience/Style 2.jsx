import React, { useState } from "react";

const Style2 = ({ resumeData, setResumeData }) => {
  const [infoDiv, setInfoDiv] = useState("");

  const showOrHideInfoDiv = (currentState) => {
    if (infoDiv === currentState) {
      setInfoDiv(" ");
    } else {
      setInfoDiv(currentState);
    }
  };

  const handleInputChange = (e, Index) => {
    const { name, value } = e.target;
    const updatedExperience = [...resumeData.experience];
    updatedExperience[0].style2[Index][name] = value;
    setResumeData({
      ...resumeData,
      experience: updatedExperience,
    });
  };

  return (
    <>
      {resumeData.experience[0].style2.map((style2, index) => (
        <div
          key={index}
          id={`dv-ExperienceParaCopy${index + 1}`}
          className="SubWrapper"
        >
          <div id={`dv-EPCompanyNameCopy${index + 1}`} className="InputWrapper">
            <input
              type="text"
              id={`in-rb_ep_exp_name_copy${index + 1}`}
              name="experience_company"
              value={style2.experience_company}
              onChange={(e) => handleInputChange(e, index)}
              placeholder=" "
            />
            <label
              htmlFor={`in-rb_ep_exp_name_copy${index + 1}`}
              className="TextFieldLabel"
            >
              Company Name
            </label>
            <svg
              onClick={() => showOrHideInfoDiv(`Company Name${index}`)}
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

          {infoDiv === `Company Name${index}` && (
            <div className="InputInfoDiv">
              <div className="InputInfoText">
                <p>Enter your company name</p>
              </div>
            </div>
          )}

          <div id={`dv-EPLocationCopy${index + 1}`} className="InputWrapper">
            <input
              type="text"
              id={`in-rb_ep_exp_location_copy${index + 1}`}
              name="experience_location"
              value={style2.experience_location}
              onChange={(e) => handleInputChange(e, index)}
              placeholder=" "
            />
            <label
              htmlFor={`in-rb_ep_exp_location_copy${index + 1}`}
              className="TextFieldLabel"
            >
              Location
            </label>
            <svg
              onClick={() => showOrHideInfoDiv(`Work Location${index}`)}
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

          {infoDiv === `Work Location${index}` && (
            <div className="InputInfoDiv">
              <div className="InputInfoText">
                <p>Enter your work location</p>
              </div>
            </div>
          )}

          <div id={`dv-EPPeriodCopy${index + 1}`} className="InputWrapper">
            <input
              type="text"
              id={`in-rb_ep_exp_year_copy${index + 1}`}
              name="experience_year"
              value={style2.experience_year}
              onChange={(e) => handleInputChange(e, index)}
              placeholder=" "
            />
            <label
              htmlFor={`in-rb_ep_exp_year_copy${index + 1}`}
              className="TextFieldLabel"
            >
              Period
            </label>
            <svg
              onClick={() => showOrHideInfoDiv(`Work Period${index}`)}
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

          {infoDiv === `Work Period${index}` && (
            <div className="InputInfoDiv">
              <div className="InputInfoText">
                <p>Enter the period of this work experience</p>
              </div>
            </div>
          )}

          <div id={`dv-EPDesignationCopy${index + 1}`} className="InputWrapper">
            <input
              type="text"
              id={`in-rb_ep_exp_desg_copy${index + 1}`}
              name="experience_designation"
              value={style2.experience_designation}
              onChange={(e) => handleInputChange(e, index)}
              placeholder=" "
            />
            <label
              htmlFor={`in-rb_ep_exp_name_copy${index + 1}`}
              className="TextFieldLabel"
            >
              Designation
            </label>
            <svg
              onClick={() => showOrHideInfoDiv(`Designation${index}`)}
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

          {infoDiv === `Designation${index}` && (
            <div className="InputInfoDiv">
              <div className="InputInfoText">
                <p>Enter the Designation which you held</p>
              </div>
            </div>
          )}

          <div id={`dv-EPTeamNameCopy${index + 1}`} className="InputWrapper">
            <input
              type="text"
              id={`in-rb_ep_exp_team_copy${index + 1}`}
              name="experience_team"
              value={style2.experience_team}
              onChange={(e) => handleInputChange(e, index)}
              placeholder=" "
            />
            <label
              htmlFor={`in-rb_ep_exp_name_copy${index + 1}`}
              className="TextFieldLabel"
            >
              Team Name
            </label>
            <svg
              onClick={() => showOrHideInfoDiv(`Team Name${index}`)}
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

          {infoDiv === `Team Name${index}` && (
            <div className="InputInfoDiv">
              <div className="InputInfoText">
                <p>Enter your Team's name</p>
              </div>
            </div>
          )}

          <div id={`dv-EPDescriptionCopy${index + 1}`} className="InputWrapper">
            <input
              type="text"
              id={`in-rb_ep_exp_desc_copy${index + 1}`}
              name="experience_description"
              value={style2.experience_description}
              onChange={(e) => handleInputChange(e, index)}
              placeholder=" "
            />
            <label
              htmlFor={`in-rb_ep_exp_role_copy${index + 1}`}
              className="TextFieldLabel"
            >
              Description
            </label>
            <svg
              onClick={() => showOrHideInfoDiv(`Description${index}`)}
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

          {infoDiv === `Description${index}` && (
            <div className="InputInfoDiv">
              <div className="InputInfoText">
                <p>
                  Enter your Roles in the job as brief paragraph description
                </p>
              </div>
            </div>
          )}

          {infoDiv === " " && (
            <div className="InputInfoDiv">
              <div className="InputInfoText"></div>
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default Style2;
