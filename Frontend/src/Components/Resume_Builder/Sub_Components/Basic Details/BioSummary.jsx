import React, { useState } from "react";
import PreviewPdf from "../PreviewPdf.jsx";
import { useNavigate } from "react-router-dom";

const BioSummary = ({ resumeData, setResumeData, templateType }) => {
  const navigate = useNavigate();

  const [infoDiv, setInfoDiv] = useState("");

  const showOrHideInfoDiv = (currentState) => {
    if (infoDiv === currentState) {
      setInfoDiv(" ");
    } else {
      setInfoDiv(currentState);
    }
  };

  const changeContent = (navigationType) => {
    if (navigationType === "previous") {
      navigate("/resume-builder/bio-summary");
    } else {
      navigate("/resume-builder/experience");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setResumeData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  return (
    <div id="dv-MainFormAndPreview">
      <div id="dv-MainForm">
        <div id="dv-BasicDetailsHeader" className="PageDetailsHeader">
          <span className="RBHeaderText">
            <span
              id="sp-rbheading"
              onClick={() => navigate("/resume-builder/template-choosing")}
            >
              Resume Builder
            </span>
            <div className="RBHeaderSvgWrapper">
              <span className="RBHeaderArrow">{" > "}</span>Basic Details
              <svg
                className="RBHeaderSvg"
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#e3e3e3"
              >
                <path d="M160-80q-33 0-56.5-23.5T80-160v-440q0-33 23.5-56.5T160-680h200v-120q0-33 23.5-56.5T440-880h80q33 0 56.5 23.5T600-800v120h200q33 0 56.5 23.5T880-600v440q0 33-23.5 56.5T800-80H160Zm0-80h640v-440H600q0 33-23.5 56.5T520-520h-80q-33 0-56.5-23.5T360-600H160v440Zm80-80h240v-18q0-17-9.5-31.5T444-312q-20-9-40.5-13.5T360-330q-23 0-43.5 4.5T276-312q-17 8-26.5 22.5T240-258v18Zm320-60h160v-60H560v60Zm-200-60q25 0 42.5-17.5T420-420q0-25-17.5-42.5T360-480q-25 0-42.5 17.5T300-420q0 25 17.5 42.5T360-360Zm200-60h160v-60H560v60ZM440-600h80v-200h-80v200Zm40 220Z" />
              </svg>
            </div>
          </span>
        </div>
        <div id="dv-BasicDetailsWrapper" className="WrapperClass">
          <div id="dv-BasicDetailsUsername" className="InputWrapper">
            <input
              type="text"
              id="in-rb_bd_name"
              name="username"
              value={resumeData.username}
              onChange={(e) => handleInputChange(e)}
              placeholder=" "
              required
            />
            <label htmlFor="in-rb_bd_name" className="TextFieldLabel">
              Name
            </label>
            <svg
              onClick={() => showOrHideInfoDiv("Name")}
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

          {infoDiv === "Name" && (
            <div className="InputInfoDiv">
              <div className="InputInfoText">
                <p>Name</p>
              </div>
            </div>
          )}

          <div id="dv-BasicDetailsBio" className="InputWrapper">
            <input
              type="text"
              id="in-rb_bd_bio"
              name="small_bio"
              value={resumeData.small_bio}
              onChange={(e) => handleInputChange(e)}
              placeholder=" "
            />
            <label htmlFor="in-rb_bd_bio" className="TextFieldLabel">
              Bio
            </label>
            <svg
              onClick={() => showOrHideInfoDiv("Bio")}
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

          {infoDiv === "Bio" && (
            <div className="InputInfoDiv">
              <div className="InputInfoText">
                <p>Bio</p>
              </div>
            </div>
          )}

          <div id="dv-BasicDetailsMobileNumber" className="InputWrapper">
            <input
              type="text"
              id="in-rb_bd_mobile"
              name="phone_number"
              value={resumeData.phone_number}
              onChange={(e) => handleInputChange(e)}
              placeholder=" "
            />
            <label htmlFor="in-rb_bd_mobile" className="TextFieldLabel">
              Mobile Number
            </label>
            <svg
              onClick={() => showOrHideInfoDiv("Mobile")}
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

          {infoDiv === "Mobile" && (
            <div className="InputInfoDiv">
              <div className="InputInfoText">
                <p>Mobile</p>
              </div>
            </div>
          )}

          <div id="dv-BasicDetailsEmail" className="InputWrapper">
            <input
              type="email"
              id="in-rb_bd_email"
              name="emailid"
              value={resumeData.emailid}
              onChange={(e) => handleInputChange(e)}
              placeholder=" "
            />
            <label htmlFor="in-rb_bd_email" className="TextFieldLabel">
              Email ID
            </label>
            <svg
              onClick={() => showOrHideInfoDiv("Email")}
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

          {infoDiv === "Email" && (
            <div className="InputInfoDiv">
              <div className="InputInfoText">
                <p>Email</p>
              </div>
            </div>
          )}

          <div id="dv-BasicDetailsLocation" className="InputWrapper">
            <input
              type="text"
              id="in-rb_bd_location"
              name="location"
              value={resumeData.location}
              onChange={(e) => handleInputChange(e)}
              placeholder=" "
            />
            <label htmlFor="in-rb_bd_location" className="TextFieldLabel">
              Location
            </label>
            <svg
              onClick={() => showOrHideInfoDiv("Location")}
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

          {infoDiv === "Location" && (
            <div className="InputInfoDiv">
              <div className="InputInfoText">
                <p>Location</p>
              </div>
            </div>
          )}

          <div id="dv-BasicDetailsLinkedIn" className="InputWrapper">
            <input
              type="text"
              id="in-rb_bd_linkedin"
              name="linkedin"
              value={resumeData.linkedin}
              onChange={(e) => handleInputChange(e)}
              placeholder=" "
            />
            <label htmlFor="in-rb_bd_linkedin" className="TextFieldLabel">
              LinkedIn Username
            </label>
            <svg
              onClick={() => showOrHideInfoDiv("Linkedin Username")}
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

          {infoDiv === "Linkedin Username" && (
            <div className="InputInfoDiv">
              <div className="InputInfoText">
                <p>LinkedIn Username</p>
              </div>
            </div>
          )}

          <div id="dv-BasicDetailsLinkedInUrl" className="InputWrapper">
            <input
              type="url"
              id="in-rb_bd_linkedinurl"
              name="linkedinurl"
              value={resumeData.linkedinurl}
              onChange={(e) => handleInputChange(e)}
              placeholder=" "
            />
            <label htmlFor="in-rb_bd_linkedinurl" className="TextFieldLabel">
              LinkedIn URL
            </label>
            <svg
              onClick={() => showOrHideInfoDiv("Linkedin Url")}
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

          {infoDiv === "Linkedin Url" && (
            <div className="InputInfoDiv">
              <div className="InputInfoText">
                <p>LinkedIn Url</p>
              </div>
            </div>
          )}

          <div id="dv-BasicDetailsGithub" className="InputWrapper">
            <input
              type="text"
              id="in-rb_bd_github"
              name="github"
              value={resumeData.github}
              onChange={(e) => handleInputChange(e)}
              placeholder=" "
            />
            <label htmlFor="in-rb_bd_github" className="TextFieldLabel">
              GitHub Username
            </label>
            <svg
              onClick={() => showOrHideInfoDiv("Github Username")}
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

          {infoDiv === "Github Username" && (
            <div className="InputInfoDiv">
              <div className="InputInfoText">
                <p>Github Username</p>
              </div>
            </div>
          )}

          <div id="dv-BasicDetailsGithubUrl" className="InputWrapper">
            <input
              type="url"
              id="in-rb_bd_githuburl"
              name="githuburl"
              value={resumeData.githuburl}
              onChange={(e) => handleInputChange(e)}
              placeholder=" "
            />
            <label htmlFor="in-rb_bd_githuburl" className="TextFieldLabel">
              GitHub URL
            </label>
            <svg
              onClick={() => showOrHideInfoDiv("Github Url")}
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

          {infoDiv === "Github Url" && (
            <div className="InputInfoDiv">
              <div className="InputInfoText">
                <p>Github Url</p>
              </div>
            </div>
          )}

          <div id="dv-BasicDetailsCustomLink" className="InputWrapper">
            <input
              type="text"
              id="in-rb_bd_customlink"
              name="customlink"
              value={resumeData.customlink}
              onChange={(e) => handleInputChange(e)}
              placeholder=" "
            />
            <label htmlFor="in-rb_bd_customlink" className="TextFieldLabel">
              Custom Link
            </label>
            <svg
              onClick={() => showOrHideInfoDiv("Custom Link")}
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

          {infoDiv === "Custom Link" && (
            <div className="InputInfoDiv">
              <div className="InputInfoText">
                <p>Custom Link</p>
              </div>
            </div>
          )}

          <div id="dv-BasicDetailsCustomLinkUrl" className="InputWrapper">
            <input
              type="url"
              id="in-rb_bd_customlinkurl"
              name="customlinkurl"
              value={resumeData.customlinkurl}
              onChange={(e) => handleInputChange(e)}
              placeholder=" "
            />
            <label htmlFor="in-rb_bd_customlinkurl" className="TextFieldLabel">
              Custom Link URL
            </label>
            <svg
              onClick={() => showOrHideInfoDiv("Custom Link Url")}
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

          {infoDiv === "Custom Link Url" && (
            <div className="InputInfoDiv">
              <div className="InputInfoText">
                <p>Custom Link Url</p>
              </div>
            </div>
          )}

          <div id="dv-BasicDetailsSummary" className="InputWrapper">
            <textarea
              name="summary"
              id="in-rb_bd_summary"
              value={resumeData.summary}
              onChange={(e) => handleInputChange(e)}
              placeholder=" "
            />
            <label htmlFor="in-rb_bd_summary" className="TextFieldLabel">
              Summary
            </label>
            <svg
              onClick={() => showOrHideInfoDiv("Summary")}
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

          {infoDiv === "Summary" && (
            <div className="InputInfoDiv">
              <div className="InputInfoText">
                <p>Summary</p>
              </div>
            </div>
          )}
        </div>

        {infoDiv === " " && (
          <div className="InputInfoDiv">
            <div className="InputInfoText"></div>
          </div>
        )}

        <div id="dv-BasicDetailsButtons" className="NavigationButtons">
          <button
            type="button"
            onClick={() => changeContent("next")}
            className="RightNavigationButtons"
          >
            Experience{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e3e3e3"
            >
              <path d="M383-480 200-664l56-56 240 240-240 240-56-56 183-184Zm264 0L464-664l56-56 240 240-240 240-56-56 183-184Z" />
            </svg>
          </button>
        </div>
      </div>
      <PreviewPdf resumeData={resumeData} templateType={templateType} />
    </div>
  );
};

export default BioSummary;
