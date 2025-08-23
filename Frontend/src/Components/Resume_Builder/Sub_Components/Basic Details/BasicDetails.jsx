import PreviewPdf from "../PreviewPdf.jsx";
import ResumeInputTemplate from "../../../../ResumeFormat.jsx";
import HeaderTemplate from "../Header.jsx";
import BadgeIcon from "@mui/icons-material/Badge";
import NavigationButtons from "../NavigationButtons.jsx";
import UserInputs from "../UserInputs.jsx";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

const BioSummary = ({
  setLogoutClicked,
  setLogoutUserType,
  setOverlayType,
}) => {
  const { resumeData } = ResumeInputTemplate();

  return (
    <>
      <HeaderTemplate
        currentPage={"Basic Details"}
        setLogoutClicked={setLogoutClicked}
        setLogoutUserType={setLogoutUserType}
        setOverlayType={setOverlayType}
        PageIcon={BadgeIcon}
      />

      <Stack
        id="ContentWrapper"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "90%",
          flexWrap: "wrap",
        }}
        flexDirection={{ xs: "column", md: "row" }}
      >
        <Box
          id="LeftContent"
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            flexWrap: "wrap",
            flexDirection: "column",
          }}
          width={{ xs: "90%", md: "50%" }}
        >
          <Box
            id="BasicDetailsInputs"
            sx={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              width: "100%",
              flexWrap: "wrap",
              flexDirection: "column",
            }}
          >
            <UserInputs
              inputType={"text"}
              inputLabel={"Name"}
              requirement={"Mandatory"}
              explanation={"Enter your full name"}
              examples={"John Doe"}
              inputValue={resumeData.personal.name}
              inputOnchange={"personal.name"}
              onChangeType={"Regular"}
              onChangeEntry={""}
              textfieldName={""}
            />

            <UserInputs
              inputType={"text"}
              inputLabel={"User Bio"}
              requirement={"Optional"}
              explanation={"Give a short bio about yourself using keywords"}
              examples={"Developer | Designer | Freelancer"}
              inputValue={resumeData.personal.bio}
              inputOnchange={"personal.bio"}
              onChangeType={"Regular"}
              onChangeEntry={""}
              textfieldName={""}
            />

            <UserInputs
              inputType={"text"}
              inputLabel={"Mobile Number"}
              requirement={"Mandatory"}
              explanation={"Provide your primary mobile number"}
              examples={"+91 9876543210"}
              inputValue={resumeData.personal.mobile}
              inputOnchange={"personal.mobile"}
              onChangeType={"Regular"}
              onChangeEntry={""}
              textfieldName={""}
            />

            <UserInputs
              inputType={"email"}
              inputLabel={"Email Id"}
              requirement={"Mandatory"}
              explanation={"Provide your personal email id"}
              examples={"john@gmail.com"}
              inputValue={resumeData.personal.email}
              inputOnchange={"personal.email"}
              onChangeType={"Regular"}
              onChangeEntry={""}
              textfieldName={""}
            />

            <UserInputs
              inputType={"text"}
              inputLabel={"Home Location"}
              requirement={"Optional"}
              explanation={"Your current home's city"}
              examples={"Chennai, India"}
              inputValue={resumeData.personal.location}
              inputOnchange={"personal.location"}
              onChangeType={"Regular"}
              onChangeEntry={""}
              textfieldName={""}
            />

            <UserInputs
              inputType={"text"}
              inputLabel={"LinkedIn Username"}
              requirement={"Recommended"}
              explanation={`Your profile's country code ["in/" for Indian users] followed by the username of your linkedin profile (don't include "linkedin.com" or "https://www.linkedin.com" etc.,)`}
              examples={"in/john_doe"}
              inputValue={resumeData.links.linkedinUserName}
              inputOnchange={"links.linkedinUserName"}
              onChangeType={"Regular"}
              onChangeEntry={""}
              textfieldName={""}
            />

            <UserInputs
              inputType={"text"}
              inputLabel={"GitHub Username"}
              requirement={"Recommended"}
              explanation={`The username of your github profile alone (don't include "github.com" or "https://github.com" etc.,)`}
              examples={"john_doe"}
              inputValue={resumeData.links.githubUserName}
              inputOnchange={"links.githubUserName"}
              onChangeType={"Regular"}
              onChangeEntry={""}
              textfieldName={""}
            />

            <UserInputs
              inputType={"text"}
              inputLabel={"Website DisplayName"}
              requirement={"Optional"}
              explanation={
                "Just a short name for any personal website of yours. Avoid adding links here. Use the next field to add a corresponding link for redirection upon clicking."
              }
              examples={"My Portfolio"}
              inputValue={resumeData.links.websiteDisplayName}
              inputOnchange={"links.websiteDisplayName"}
              onChangeType={"Regular"}
              onChangeEntry={""}
              textfieldName={""}
            />

            <UserInputs
              inputType={"url"}
              inputLabel={"Website URL"}
              requirement={"Optional"}
              explanation={
                "Provide the redirection url for the website which is displayed from the previous field. The link will be embedded on the display name."
              }
              examples={"https://www.myportfolio.com"}
              inputValue={resumeData.links.websiteUrl}
              inputOnchange={"links.websiteUrl"}
              onChangeType={"Regular"}
              onChangeEntry={""}
              textfieldName={""}
            />

            <UserInputs
              inputType={"textarea"}
              inputLabel={"Summary"}
              requirement={"Mandatory"}
              explanation={"Provide a professional summary about yourself"}
              examples={
                "I am a full stack developer with 3 years of experience in web development. I have worked on multiple projects and have a good understanding of web technologies. I specialize in building scalable web applications using modern frameworks and cloud technologies"
              }
              inputValue={resumeData.summary}
              inputOnchange={"summary"}
              onChangeType={"Regular"}
              onChangeEntry={""}
              textfieldName={""}
            />
          </Box>

          <NavigationButtons
            PreviousPageName={""}
            PreviousPageLink={``}
            NextPageName={"Experience"}
            NextPageLink={`/resume-builder/experience`}
          />
        </Box>
        <PreviewPdf />
      </Stack>
    </>
  );
};

export default BioSummary;
