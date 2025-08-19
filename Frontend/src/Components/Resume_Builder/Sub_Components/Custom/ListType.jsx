import ResumeInputTemplate from "../../../../ResumeFormat.jsx";
import UserInputs from "../UserInputs.jsx";

const ListType = () => {
  const { resumeData } = ResumeInputTemplate();

  return (
    <>
      {resumeData.customInput.map(
        (customInputEntry, customInputIndex) =>
          customInputEntry.style === "ListType" && (
            <div
              key={customInputIndex}
              id={`dv-CustomListCopy${customInputIndex + 1}`}
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
            </div>
          )
      )}
    </>
  );
};

export default ListType;
