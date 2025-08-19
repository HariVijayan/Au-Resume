import ResumeInputTemplate from "../../../../ResumeFormat.jsx";
import UserInputs from "../UserInputs.jsx";

const ParaType = () => {
  const { resumeData } = ResumeInputTemplate();
  return (
    <>
      {resumeData.customInput.map(
        (customInputEntry, customInputIndex) =>
          customInputEntry.style === "ParaType" && (
            <div
              key={customInputIndex}
              id={`dv-CustomParaCopy${customInputIndex + 1}`}
              className="SubWrapper"
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
            </div>
          )
      )}
    </>
  );
};

export default ParaType;
