import { useState } from "react";
import PreviewPdf from "../PreviewPdf.jsx";
import ResumeInputTemplate from "../../../../ResumeFormat.jsx";
import HeaderTemplate from "../Header.jsx";
import LanguageIcon from "@mui/icons-material/Language";
import NavigationButtons from "../NavigationButtons.jsx";
import UserInputs from "../UserInputs.jsx";

const Language = ({ setLogoutClicked, setLogoutUserType, setOverlayType }) => {
  const { resumeData } = ResumeInputTemplate();

  const [languageValue, setLanguageValue] = useState(
    resumeData.languages || ""
  );

  return (
    <>
      <HeaderTemplate
        currentPage={"Languages Known"}
        setLogoutClicked={setLogoutClicked}
        setLogoutUserType={setLogoutUserType}
        setOverlayType={setOverlayType}
        PageIcon={LanguageIcon}
      />
      <div id="dv-MainFormAndPreview">
        <div id="dv-MainForm">
          <div id="dv-LanguagesWrapper" className="WrapperClass">
            <div className="SubWrapper">
              <UserInputs
                inputType={"text"}
                inputLabel={"Languages Known"}
                requirement={"Mandatory"}
                explanation={"List the languages you know, separated by commas"}
                examples={"Tamil, English"}
                inputValue={languageValue}
                inputOnchange={""}
                onChangeType={"Languages"}
                onChangeEntry={setLanguageValue}
                textfieldName={""}
              />
            </div>
          </div>
          <NavigationButtons
            PreviousPageName={"Certifications"}
            PreviousPageLink={`/resume-builder/certifications`}
            NextPageName={"Custom Input"}
            NextPageLink={`/resume-builder/custom-input`}
          />
        </div>
        <PreviewPdf />
      </div>
    </>
  );
};

export default Language;
