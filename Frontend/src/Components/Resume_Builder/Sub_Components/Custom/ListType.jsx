import ResumeInputTemplate from "../../../../ResumeFormat.jsx";
import UserInputs from "../UserInputs.jsx";
import Box from "@mui/material/Box";

const ListType = () => {
  const { resumeData } = ResumeInputTemplate();

  return (
    <>
      {resumeData.customInput.map(
        (customInputEntry, customInputIndex) =>
          customInputEntry.style === "ListType" && (
            <Box
              key={customInputIndex}
              id={`CustomInput${customInputIndex + 1}List`}
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
                onChangeType={"CustomList"}
                onChangeEntry={customInputIndex}
                textfieldName={"title"}
              />

              <UserInputs
                inputType={"text"}
                inputLabel={"Custom List"}
                requirement={"Mandatory"}
                explanation={"List all the custom values, separated by commas"}
                examples={
                  "High School Football team captain, Part of Bharat Scouts"
                }
                inputValue={customInputEntry.listValues}
                inputOnchange={""}
                onChangeType={"CustomList"}
                onChangeEntry={customInputIndex}
                textfieldName={"listValues"}
              />
            </Box>
          )
      )}
    </>
  );
};

export default ListType;
