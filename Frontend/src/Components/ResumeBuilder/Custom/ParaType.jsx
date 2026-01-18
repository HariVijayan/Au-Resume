import ResumeInputTemplate from "../../../ResumeFormat.jsx";
import UserInputs from "../UserInputs.jsx";
import Box from "@mui/material/Box";

const ParaType = () => {
  const { resumeData } = ResumeInputTemplate();
  return (
    <>
      {resumeData.customInput.map(
        (customInputEntry, customInputIndex) =>
          customInputEntry.style === "ParaType" && (
            <Box
              key={customInputIndex}
              id={`CustomInput${customInputIndex + 1}Para`}
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
                inputLabel={"Custom Title"}
                requirement={"Mandatory"}
                explanation={"Provide a title for the custom section"}
                examples={"Extra Curricular Activities"}
                inputValue={customInputEntry.title}
                inputOnchange={""}
                onChangeType={"CustomPara"}
                onChangeEntry={customInputIndex}
                textfieldName={"title"}
              />

              <UserInputs
                inputType={"text"}
                inputLabel={"Custom Paragraph"}
                requirement={"Mandatory"}
                explanation={"Your custom paragraph"}
                examples={
                  "High School Football team captain. Part of Bharat Scouts"
                }
                inputValue={customInputEntry.paraValues}
                inputOnchange={""}
                onChangeType={"CustomPara"}
                onChangeEntry={customInputIndex}
                textfieldName={"paraValues"}
              />
            </Box>
          )
      )}
    </>
  );
};

export default ParaType;
