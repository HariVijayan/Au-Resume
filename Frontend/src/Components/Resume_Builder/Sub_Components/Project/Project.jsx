import PreviewPdf from "../PreviewPdf.jsx";
import ResumeInputTemplate from "../../../../ResumeFormat.jsx";
import HeaderTemplate from "../Header.jsx";
import BuildIcon from "@mui/icons-material/Build";
import NavigationButtons from "../NavigationButtons.jsx";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useTheme } from "@mui/material";

import UserInputs from "../UserInputs.jsx";

const Project = ({ setLogoutClicked, setLogoutUserType, setOverlayType }) => {
  const { resumeData, updateField } = ResumeInputTemplate();

  const theme = useTheme();

  const addNewProject = (e) => {
    e.preventDefault();
    const updatedProjects = [...resumeData.projects];
    updatedProjects.push({
      name: "",
      link: "",
      description: "",
      techStack: "",
    });
    updateField("projects", updatedProjects);
  };

  return (
    <>
      <HeaderTemplate
        currentPage={"Projects"}
        setLogoutClicked={setLogoutClicked}
        setLogoutUserType={setLogoutUserType}
        setOverlayType={setOverlayType}
        PageIcon={BuildIcon}
      />
      <div id="dv-MainFormAndPreview">
        <div id="dv-MainForm">
          <div id="dv-ProjectsWrapper" className="WrapperClass">
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Button
                variant="contained"
                onClick={addNewProject}
                size="large"
                endIcon={<AddBoxIcon />}
                sx={{
                  margin: "2rem 0rem",
                  textTransform: "none",
                  backgroundColor: theme.palette.brown.main,
                }}
                padding={{ xs: "1rem 2rem", sm: "2rem 3rem" }}
              >
                Add Project
              </Button>
            </Box>

            {resumeData.projects.map((newProjectEntry, newProjectIndex) => (
              <div
                key={newProjectIndex}
                id={`dv-ProjectCopy${newProjectIndex + 1}`}
                className="SubWrapper"
              >
                <UserInputs
                  inputType={"text"}
                  inputLabel={"Project Title"}
                  requirement={"Mandatory"}
                  explanation={"Your project's name"}
                  examples={"Blog Website"}
                  inputValue={newProjectEntry.name}
                  inputOnchange={""}
                  onChangeType={"Projects"}
                  onChangeEntry={newProjectIndex}
                  textfieldName={"name"}
                />

                <UserInputs
                  inputType={"text"}
                  inputLabel={"Placeholder Link"}
                  requirement={"Recommended"}
                  explanation={
                    "The shortended link or a placeholder text that redirects to your project's hosted URL"
                  }
                  examples={`For a website "https://www.myexampleportfolio.com" provide "myexampleportfolio.com" or simply provide "My Portfolio". Provide complete URL in next field`}
                  inputValue={newProjectEntry.displayLink}
                  inputOnchange={""}
                  onChangeType={"Projects"}
                  onChangeEntry={newProjectIndex}
                  textfieldName={"displayLink"}
                />

                <UserInputs
                  inputType={"url"}
                  inputLabel={"Redirect Link"}
                  requirement={"Recommended"}
                  explanation={"The full URL which redirects to your project."}
                  examples={`https://www.myexampleportfolio.com`}
                  inputValue={newProjectEntry.linkUrl}
                  inputOnchange={""}
                  onChangeType={"Projects"}
                  onChangeEntry={newProjectIndex}
                  textfieldName={"linkUrl"}
                />

                <UserInputs
                  inputType={"text"}
                  inputLabel={"Description"}
                  requirement={"Mandatory"}
                  explanation={
                    "A brief explanation about your project, what it does, and its features"
                  }
                  examples={
                    "A simple blog website with authentication and user profiles"
                  }
                  inputValue={newProjectEntry.description}
                  inputOnchange={""}
                  onChangeType={"Projects"}
                  onChangeEntry={newProjectIndex}
                  textfieldName={"description"}
                />

                <UserInputs
                  inputType={"text"}
                  inputLabel={"Tech Stack"}
                  requirement={"Recommended"}
                  explanation={
                    "List of technologies used in your project, separated by commas"
                  }
                  examples={"HTML, CSS, JavaScript, ReactJS, NodeJS, MongoDB"}
                  inputValue={newProjectEntry.techStack}
                  inputOnchange={""}
                  onChangeType={"Projects"}
                  onChangeEntry={newProjectIndex}
                  textfieldName={"techStack"}
                />
              </div>
            ))}
          </div>
          <NavigationButtons
            PreviousPageName={"School"}
            PreviousPageLink={`/resume-builder/education/school`}
            NextPageName={"Skills"}
            NextPageLink={`/resume-builder/skills`}
          />
        </div>
        <PreviewPdf />
      </div>
    </>
  );
};

export default Project;
