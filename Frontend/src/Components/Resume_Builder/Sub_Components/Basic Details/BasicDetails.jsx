import { useState } from "react";
import PreviewPdf from "../PreviewPdf.jsx";
import InfoDiv from "../Info Div/InfoDiv.jsx";
import ResumeInputTemplate from "../../../../ResumeFormat.jsx";
import HeaderTemplate from "../Header.jsx";
import BadgeIcon from "@mui/icons-material/Badge";
import NavigationButtons from "../NavigationButtons.jsx";

const BioSummary = ({
  setLogoutClicked,
  setLogoutUserType,
  setOverlayType,
}) => {
  const { resumeData, updateField } = ResumeInputTemplate();

  const [infoDiv, setInfoDiv] = useState("");

  const showOrHideInfoDiv = (currentState) => {
    if (infoDiv === currentState) {
      setInfoDiv(" ");
    } else {
      setInfoDiv(currentState);
    }
  };

  return (
    <>
      <HeaderTemplate
        currentPage={"Basic Details"}
        setLogoutClicked={setLogoutClicked}
        setLogoutUserType={setLogoutUserType}
        setOverlayType={setOverlayType}
        PageIcon={BadgeIcon}
      />

      <div id="dv-MainFormAndPreview">
        <div id="dv-MainForm">
          <div id="dv-BasicDetailsWrapper" className="WrapperClass">
            <div id="dv-BasicDetailsUsername" className="InputWrapper">
              <input
                type="text"
                id="in-rb_bd_name"
                name="name"
                value={resumeData.personal.name}
                onChange={(e) => updateField("personal.name", e.target.value)}
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
                name="bio"
                value={resumeData.personal.bio}
                onChange={(e) => updateField("personal.bio", e.target.value)}
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
                name="mobile"
                value={resumeData.personal.mobile}
                onChange={(e) => updateField("personal.mobile", e.target.value)}
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
                name="email"
                value={resumeData.personal.email}
                onChange={(e) => updateField("personal.email", e.target.value)}
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
                value={resumeData.personal.location}
                onChange={(e) =>
                  updateField("personal.location", e.target.value)
                }
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
                name="linkedinDisplayName"
                value={resumeData.links.linkedinDisplayName}
                onChange={(e) =>
                  updateField("links.linkedinDisplayName", e.target.value)
                }
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
                name="linkedinUrl"
                value={resumeData.links.linkedinUrl}
                onChange={(e) =>
                  updateField("links.linkedinUrl", e.target.value)
                }
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
                name="githubDisplayName"
                value={resumeData.links.githubDisplayName}
                onChange={(e) =>
                  updateField("links.githubDisplayName", e.target.value)
                }
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
                name="githubUrl"
                value={resumeData.links.githubUrl}
                onChange={(e) => updateField("links.githubUrl", e.target.value)}
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
                name="websiteDisplayName"
                value={resumeData.links.websiteDisplayName}
                onChange={(e) =>
                  updateField("links.websiteDisplayName", e.target.value)
                }
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
                name="websiteUrl"
                value={resumeData.links.websiteUrl}
                onChange={(e) =>
                  updateField("links.websiteUrl", e.target.value)
                }
                placeholder=" "
              />
              <label
                htmlFor="in-rb_bd_customlinkurl"
                className="TextFieldLabel"
              >
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
                id="in-rb_bd_summary"
                name="summary"
                value={resumeData.summary}
                onChange={(e) => updateField("summary", e.target.value)}
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

          <NavigationButtons
            PreviousPageName={""}
            PreviousPageLink={``}
            NextPageName={"Experience"}
            NextPageLink={`/resume-builder/experience`}
          />
        </div>
        <PreviewPdf />
      </div>
    </>
  );
};

export default BioSummary;
