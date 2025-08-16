import { useState } from "react";
import PreviewPdf from "../PreviewPdf.jsx";
import { useNavigate } from "react-router-dom";
import InfoDiv from "../Info Div/InfoDiv.jsx";
import ResumeInputTemplate from "../../../../ResumeFormat.jsx";
import HeaderTemplate from "../Header.jsx";
import LanguageIcon from "@mui/icons-material/Language";

const Language = ({ setLogoutClicked, setLogoutUserType, setOverlayType }) => {
  const { resumeData, updateField } = ResumeInputTemplate();

  const [languageValue, setLanguageValue] = useState(
    resumeData.languages || ""
  );

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
      navigate("/resume-builder/certifications");
    } else {
      navigate("/resume-builder/custom-input");
    }
  };

  const splitCSValues = (e) => {
    const { value } = e.target;
    let updatedLanguages = { ...resumeData.languages };

    setLanguageValue(value);

    updatedLanguages = value
      .split(",")
      .filter((language) => language.trim().length > 0);

    updatedLanguages = updatedLanguages.map((language) => language.trim());

    setLanguageValue(value);

    updateField("languages", updatedLanguages);
  };

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
              <div id="dv-LanguagesSet" className="InputWrapper">
                <input
                  type="text"
                  id="in-rb_lan_list"
                  name="languages"
                  value={languageValue}
                  onChange={splitCSValues}
                  placeholder=" "
                />
                <label htmlFor="in-rb_lan_list" className="TextFieldLabel">
                  Languages Known
                </label>
                <svg
                  onClick={() => showOrHideInfoDiv("Languages")}
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

              {infoDiv === "Languages" && (
                <InfoDiv
                  requirement={"Mandatory"}
                  explanation={
                    "List the languages you know, separated by commas"
                  }
                  examples={"Tamil, English"}
                  characterLimit={"Upto 50 characters"}
                  allowedCharacters={"No Restrictions"}
                />
              )}
              {infoDiv === " " && (
                <InfoDiv
                  requirement={""}
                  explanation={""}
                  examples={""}
                  characterLimit={""}
                  allowedCharacters={""}
                />
              )}
            </div>
          </div>
          <div id="dv-LanguagesButtons" className="NavigationButtons">
            <button
              type="button"
              onClick={() => changeContent("previous")}
              className="LeftNavigationButtons"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#e3e3e3"
              >
                <path d="M440-240 200-480l240-240 56 56-183 184 183 184-56 56Zm264 0L464-480l240-240 56 56-183 184 183 184-56 56Z" />
              </svg>{" "}
              Certifications
            </button>
            <button
              type="button"
              onClick={() => changeContent("next")}
              className="RightNavigationButtons"
            >
              Custom Input{" "}
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

export default Language;
