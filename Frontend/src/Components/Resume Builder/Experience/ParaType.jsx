import ResumeInputTemplate from "../../../ResumeFormat.jsx";
import UserInputs from "../UserInputs.jsx";
import Box from "@mui/material/Box";

const ParaType = () => {
  const { resumeData } = ResumeInputTemplate();

  return (
    <>
      {resumeData.experience.map(
        (newExperienceEntry, newExperienceIndex) =>
          newExperienceEntry.style === "ParaType" && (
            <Box
              key={newExperienceIndex}
              id={`ExperienceInput${newExperienceIndex + 1}Para`}
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
                width: "100%",
                flexWrap: "wrap",
                flexDirection: "column",
                margin: "2rem 0rem",
              }}
            >
              <UserInputs
                inputType={"text"}
                inputLabel={"Company Name"}
                requirement={"Mandatory"}
                explanation={"Full name of the organisation you worked"}
                examples={"Zoho Corporation"}
                inputValue={newExperienceEntry.company}
                inputOnchange={""}
                onChangeType={"ExpPara"}
                onChangeEntry={newExperienceIndex}
                textfieldName={"company"}
              />

              <UserInputs
                inputType={"text"}
                inputLabel={"Work Location"}
                requirement={"Recommended"}
                explanation={"The city where you've worked or remote"}
                examples={"Chennai"}
                inputValue={newExperienceEntry.location}
                inputOnchange={""}
                onChangeType={"ExpPara"}
                onChangeEntry={newExperienceIndex}
                textfieldName={"location"}
              />

              <UserInputs
                inputType={"monthYearStart"}
                inputLabel={"Starting Period"}
                requirement={"Mandatory"}
                explanation={
                  "The starting month and year when you started working for this company"
                }
                examples={"May 2023"}
                inputValue={newExperienceEntry.startYear}
                inputOnchange={""}
                onChangeType={"ExpPara"}
                onChangeEntry={newExperienceIndex}
                textfieldName={"startYear"}
              />

              <UserInputs
                inputType={"monthYearEnd"}
                inputLabel={"Ending Period"}
                requirement={"Mandatory"}
                explanation={
                  "The ending month and year when you stopped working for this company"
                }
                examples={"May 2025"}
                inputValue={newExperienceEntry.endYear}
                inputOnchange={""}
                onChangeType={"ExpPara"}
                onChangeEntry={newExperienceIndex}
                textfieldName={"endYear"}
              />

              <UserInputs
                inputType={"text"}
                inputLabel={"Designation"}
                requirement={"Mandatory"}
                explanation={
                  "The designation in which you worked for the company"
                }
                examples={"Software Engineer"}
                inputValue={newExperienceEntry.designation}
                inputOnchange={""}
                onChangeType={"ExpPara"}
                onChangeEntry={newExperienceIndex}
                textfieldName={"designation"}
              />

              <UserInputs
                inputType={"text"}
                inputLabel={"Team Name"}
                requirement={"Optional"}
                explanation={"Your team's name within the company"}
                examples={"Immediate CyberThreat Response Team"}
                inputValue={newExperienceEntry.team}
                inputOnchange={""}
                onChangeType={"ExpPara"}
                onChangeEntry={newExperienceIndex}
                textfieldName={"team"}
              />

              <UserInputs
                inputType={"text"}
                inputLabel={"Description"}
                requirement={"Mandatory"}
                explanation={
                  "Highlight your important day to day tasks while being part of the team as a paragraph"
                }
                examples={
                  "Developed a security management dashboard for the team and designed a new threat detection algorithm"
                }
                inputValue={newExperienceEntry.description}
                inputOnchange={""}
                onChangeType={"ExpPara"}
                onChangeEntry={newExperienceIndex}
                textfieldName={"description"}
              />
            </Box>
          )
      )}
    </>
  );
};

export default ParaType;
