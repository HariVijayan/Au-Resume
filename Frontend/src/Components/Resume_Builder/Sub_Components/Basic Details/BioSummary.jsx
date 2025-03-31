import React from "react";
import PreviewPdf from "../PreviewPdf.jsx";
import { useNavigate } from "react-router-dom";

const BioSummary = ({ resumeData, setResumeData, templateType }) => {
  const navigate = useNavigate();

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
        <div id="dv-BasicDetailsWrapper" className="WrapperClass">
          <div id="dv-BasicDetailsHeader" className="BasicDetailsHeader">
            <h3>
              Basic Details{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#e3e3e3"
              >
                <path d="M160-80q-33 0-56.5-23.5T80-160v-440q0-33 23.5-56.5T160-680h200v-120q0-33 23.5-56.5T440-880h80q33 0 56.5 23.5T600-800v120h200q33 0 56.5 23.5T880-600v440q0 33-23.5 56.5T800-80H160Zm0-80h640v-440H600q0 33-23.5 56.5T520-520h-80q-33 0-56.5-23.5T360-600H160v440Zm80-80h240v-18q0-17-9.5-31.5T444-312q-20-9-40.5-13.5T360-330q-23 0-43.5 4.5T276-312q-17 8-26.5 22.5T240-258v18Zm320-60h160v-60H560v60Zm-200-60q25 0 42.5-17.5T420-420q0-25-17.5-42.5T360-480q-25 0-42.5 17.5T300-420q0 25 17.5 42.5T360-360Zm200-60h160v-60H560v60ZM440-600h80v-200h-80v200Zm40 220Z" />
              </svg>
            </h3>
          </div>
          <div id="dv-BasicDetailsUsername" className="InputWrapper">
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={resumeData.username}
              onChange={(e) => handleInputChange(e)}
              placeholder="Enter your name"
              required
            />
          </div>
          <div id="dv-BasicDetailsBio" className="InputWrapper">
            <label>Small Bio:</label>
            <input
              type="text"
              name="small_bio"
              value={resumeData.small_bio}
              onChange={(e) => handleInputChange(e)}
              placeholder="Developer | Designer | Freelancer"
            />
          </div>
          <div id="dv-BasicDetailsPhoneNumber" className="InputWrapper">
            <label>Phone Number:</label>
            <input
              type="text"
              name="phone_number"
              value={resumeData.phone_number}
              onChange={(e) => handleInputChange(e)}
              placeholder="Enter your phone number"
            />
          </div>
          <div id="dv-BasicDetailsEmail" className="InputWrapper">
            <label>Email ID:</label>
            <input
              type="email"
              name="emailid"
              value={resumeData.emailid}
              onChange={(e) => handleInputChange(e)}
              placeholder="Enter your email"
            />
          </div>
          <div id="dv-BasicDetailsLocation" className="InputWrapper">
            <label>Location:</label>
            <input
              type="text"
              name="location"
              value={resumeData.location}
              onChange={(e) => handleInputChange(e)}
              placeholder="Enter your location"
            />
          </div>
          <div id="dv-BasicDetailsLinkedIn" className="InputWrapper">
            <label>LinkedIn Username:</label>
            <input
              type="text"
              name="linkedin"
              value={resumeData.linkedin}
              onChange={(e) => handleInputChange(e)}
              placeholder="Enter your LinkedIn username"
            />
          </div>
          <div id="dv-BasicDetailsLinkedInUrl" className="InputWrapper">
            <label>LinkedIn URL:</label>
            <input
              type="url"
              name="linkedinurl"
              value={resumeData.linkedinurl}
              onChange={(e) => handleInputChange(e)}
              placeholder="Enter your LinkedIn URL"
            />
          </div>
          <div id="dv-BasicDetailsGithub" className="InputWrapper">
            <label>GitHub Username:</label>
            <input
              type="text"
              name="github"
              value={resumeData.github}
              onChange={(e) => handleInputChange(e)}
              placeholder="Enter your GitHub username"
            />
          </div>
          <div id="dv-BasicDetailsGithubUrl" className="InputWrapper">
            <label>GitHub URL:</label>
            <input
              type="url"
              name="githuburl"
              value={resumeData.githuburl}
              onChange={(e) => handleInputChange(e)}
              placeholder="Enter your GitHub URL"
            />
          </div>
          <div id="dv-BasicDetailsCustomLink" className="InputWrapper">
            <label>Custom Link (e.g., Portfolio):</label>
            <input
              type="text"
              name="customlink"
              value={resumeData.customlink}
              onChange={(e) => handleInputChange(e)}
              placeholder="Enter custom link"
            />
          </div>
          <div id="dv-BasicDetailsCustomLinkUrl" className="InputWrapper">
            <label>Custom Link URL:</label>
            <input
              type="url"
              name="customlinkurl"
              value={resumeData.customlinkurl}
              onChange={(e) => handleInputChange(e)}
              placeholder="Enter custom link URL"
            />
          </div>
          <div id="dv-BasicDetailsSummary" className="InputWrapper">
            <label>Summary:</label>
            <textarea
              name="summary"
              value={resumeData.summary}
              onChange={(e) => handleInputChange(e)}
              placeholder="Enter your summary"
            />
          </div>
        </div>
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
