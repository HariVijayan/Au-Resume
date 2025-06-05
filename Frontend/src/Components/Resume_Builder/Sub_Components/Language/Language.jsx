import { useState } from "react";
import PreviewPdf from "../PreviewPdf.jsx";
import { useNavigate } from "react-router-dom";
import InfoDiv from "../Info Div/InfoDiv.jsx";
import ResumeInputTemplate from "../../../../ResumeFormat.jsx";

const Language = () => {
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
    <div id="dv-MainFormAndPreview">
      <div id="dv-MainForm">
        <div id="dv-LanguagesHeader" className="PageDetailsHeader">
          <span className="RBHeaderText">
            <span
              id="sp-rbheading"
              onClick={() => navigate("/resume-builder/template-choosing")}
            >
              Resume Builder
            </span>
            <div className="RBHeaderSvgWrapper">
              <span className="RBHeaderArrow">{" > "}</span>Languages Known
              <svg
                className="RBHeaderSvg"
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#e3e3e3"
              >
                <path d="m326-240-30-48q80-8 125-43t45-90q0-30-20.5-55T392-512q-23 57-54.5 102T268-332q3 12 6.5 24t7.5 24l-50 15q-3-10-5-17.5t-4-13.5q-26 14-49 21.5t-45 7.5q-32 0-52-21t-20-56q0-53 40-105t103-82q1-19 2-37.5t3-37.5q-28 1-59-.5T79-615l-1-53q26 5 56 6.5t77 1.5q2-18 4.5-35.5t.5-35.5l60 1q-7 17-10 34.5t-6 34.5q58-3 107-9t92-16l1 52q-53 8-103.5 13.5T255-612q-2 14-2.5 29t-2.5 29q28-8 54.5-11t52.5-1q3-10 4.5-20t2.5-20l57 14q-3 8-6.5 16t-6.5 19q51 14 81.5 52t30.5 85q0 70-51.5 117.5T326-240Zm-188-85q17 0 35-7t38-21q-7-38-10-69t-3-59q-38 24-63 59t-25 66q0 13 8.5 22t19.5 9Zm118-65q29-28 50.5-60.5T342-520q-23 0-46.5 4T248-504q-2 26 .5 54t7.5 60Zm446 56q28 0 54.5-13t48.5-37v-106q-23 3-42.5 7t-36.5 9q-45 14-67.5 35T636-390q0 26 18 41t48 15Zm-23 68q-57 0-90-32.5T556-387q0-52 33-85t106-53q23-6 50.5-11t59.5-9q-2-47-22-68.5T721-635q-26 0-51.5 9.5T604-592l-32-56q33-25 77.5-40.5T740-704q71 0 108 44t37 128v257h-67l-6-45q-28 25-61.5 39.5T679-266Z" />
              </svg>
            </div>
          </span>
        </div>
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
                explanation={"List the languages you know, separated by commas"}
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
  );
};

export default Language;
