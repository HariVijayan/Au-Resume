import { useState } from "react";
import PreviewPdf from "../PreviewPdf.jsx";
import { useNavigate } from "react-router-dom";
import InfoDiv from "../Info Div/InfoDiv.jsx";
import ResumeInputTemplate from "../../../../ResumeFormat.jsx";

const BioSummary = ({
  setLogoutClicked,
  setLogoutUserType,
  setOverlayType,
}) => {
  const { resumeData, updateField } = ResumeInputTemplate();

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
      navigate("/resume-builder/basic-details");
    } else {
      navigate("/resume-builder/experience");
    }
  };

  const logoutUser = () => {
    setLogoutUserType("User");
    setLogoutClicked(true);
  };

  return (
    <>
      <div id="dv-MainContent" className="MainContent">
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
        <div id="dv-MenuIcons" className="MenuIcons">
          <svg
            className="MenuIconsSvg"
            onClick={() => setOverlayType("FetchResume")}
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e3e3e3"
          >
            <path d="M260-160q-91 0-155.5-63T40-377q0-78 47-139t123-78q17-72 85-137t145-65q33 0 56.5 23.5T520-716v242l64-62 56 56-160 160-160-160 56-56 64 62v-242q-76 14-118 73.5T280-520h-20q-58 0-99 41t-41 99q0 58 41 99t99 41h480q42 0 71-29t29-71q0-42-29-71t-71-29h-60v-80q0-48-22-89.5T600-680v-93q74 35 117 103.5T760-520q69 8 114.5 59.5T920-340q0 75-52.5 127.5T740-160H260Zm220-358Z" />
          </svg>
          <svg
            className="MenuIconsSvg"
            onClick={() => setOverlayType("SaveResume")}
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e3e3e3"
          >
            <path d="M260-160q-91 0-155.5-63T40-377q0-78 47-139t123-78q25-92 100-149t170-57q117 0 198.5 81.5T760-520q69 8 114.5 59.5T920-340q0 75-52.5 127.5T740-160H520q-33 0-56.5-23.5T440-240v-206l-64 62-56-56 160-160 160 160-56 56-64-62v206h220q42 0 71-29t29-71q0-42-29-71t-71-29h-60v-80q0-83-58.5-141.5T480-720q-83 0-141.5 58.5T280-520h-20q-58 0-99 41t-41 99q0 58 41 99t99 41h100v80H260Zm220-280Z" />
          </svg>
          <svg
            className="MenuIconsSvg"
            onClick={() => navigate("/user-profile")}
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e3e3e3"
          >
            <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z" />
          </svg>
          <svg
            className="MenuIconsSvg"
            onClick={logoutUser}
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e3e3e3"
          >
            <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
          </svg>
        </div>
      </div>
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
        <PreviewPdf />
      </div>
    </>
  );
};

export default BioSummary;
