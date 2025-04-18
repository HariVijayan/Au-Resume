import React, { useState } from "react";
import PreviewPdf from "../PreviewPdf.jsx";
import { useNavigate } from "react-router-dom";
import InfoDiv from "../Info Div/InfoDiv.jsx";

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

          {infoDiv === "Name" && (
            <InfoDiv
              requirement={"Mandatory"}
              explanation={"Enter your full name"}
              examples={"John Doe"}
              characterLimit={"Upto 35 characters"}
              allowedCharacters={"Alphabets"}
            />
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

          {infoDiv === "Bio" && (
            <InfoDiv
              requirement={"Optional"}
              explanation={"Give a short bio about yourself using keywords"}
              examples={"Developer | Designer | Freelancer"}
              characterLimit={"Upto 20 characters"}
              allowedCharacters={"No Restrictions"}
            />
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

          {infoDiv === "Mobile" && (
            <InfoDiv
              requirement={"Mandatory"}
              explanation={"Provide your primary mobile number"}
              examples={"+91 9876543210"}
              characterLimit={"Upto 15 characters"}
              allowedCharacters={"Numbers, +, -, () characters"}
            />
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

          {infoDiv === "Email" && (
            <InfoDiv
              requirement={"Mandatory"}
              explanation={"Provide your personal email address"}
              examples={"john@gmail.com"}
              characterLimit={"Upto 25 characters"}
              allowedCharacters={"No Restrictions"}
            />
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

          {infoDiv === "Location" && (
            <InfoDiv
              requirement={"Optional"}
              explanation={"Your current home's city"}
              examples={"Chennai, India"}
              characterLimit={"Upto 25 characters"}
              allowedCharacters={"No Restrictions"}
            />
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

          {infoDiv === "Linkedin Username" && (
            <InfoDiv
              requirement={"Recommended"}
              explanation={"The username of your linkedin profile"}
              examples={"linkedin.com/john_doe"}
              characterLimit={"Upto 30 characters"}
              allowedCharacters={"No Restrictions"}
            />
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

          {infoDiv === "Linkedin Url" && (
            <InfoDiv
              requirement={"Recommended"}
              explanation={"The url of your linkedin profile"}
              examples={"https://www.linkedin.com/john_doe"}
              characterLimit={"Upto 50 characters"}
              allowedCharacters={"No Restrictions"}
            />
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

          {infoDiv === "Github Username" && (
            <InfoDiv
              requirement={"Recommended"}
              explanation={"The username of your github profile"}
              examples={"github.com/john_doe"}
              characterLimit={"Upto 30 characters"}
              allowedCharacters={"No Restrictions"}
            />
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

          {infoDiv === "Github Url" && (
            <InfoDiv
              requirement={"Recommended"}
              explanation={"The url of your github profile"}
              examples={"https://www.github.com/john_doe"}
              characterLimit={"Upto 50 characters"}
              allowedCharacters={"No Restrictions"}
            />
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

          {infoDiv === "Custom Link" && (
            <InfoDiv
              requirement={"Optional"}
              explanation={"The display name of your custom link"}
              examples={"exampleportfolio.com"}
              characterLimit={"Upto 50 characters"}
              allowedCharacters={"No Restrictions"}
            />
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

          {infoDiv === "Custom Link Url" && (
            <InfoDiv
              requirement={"Optional"}
              explanation={"The url of your custom link"}
              examples={"https://www.exampleportfolio.com"}
              characterLimit={"Upto 50 characters"}
              allowedCharacters={"No Restrictions"}
            />
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

          {infoDiv === "Summary" && (
            <InfoDiv
              requirement={"Mandatory"}
              explanation={"Provide a professional summary about yourself"}
              examples={
                "I am a full stack developer with 3 years of experience in web development. I have worked on multiple projects and have a good understanding of web technologies. I specialize in building scalable web applications using modern frameworks and cloud technologies."
              }
              characterLimit={"Upto 200 characters"}
              allowedCharacters={"No Restrictions"}
            />
          )}
        </div>

        {infoDiv === " " && (
          <InfoDiv
            requirement={""}
            explanation={""}
            examples={""}
            characterLimit={""}
            allowedCharacters={""}
          />
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
