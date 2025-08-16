import { useState, useEffect } from "react";
import ListType from "./ListType.jsx";
import ParaType from "./ParaType.jsx";
import PreviewPdf from "../PreviewPdf.jsx";
import { useNavigate } from "react-router-dom";
import ResumeInputTemplate from "../../../../ResumeFormat.jsx";
import AddTaskIcon from "@mui/icons-material/AddTask";
import HeaderTemplate from "../Header.jsx";

const CustomDiv = ({
  setSubmitClicked,
  setLogoutClicked,
  setLogoutUserType,
  setOverlayType,
}) => {
  const navigate = useNavigate();

  const { resumeData, updateField } = ResumeInputTemplate();

  const changeContent = (navigationType) => {
    if (navigationType === "previous") {
      navigate("/resume-builder/languages-known");
    }
  };

  const [hasChosenAStyle, setHasChosenAStyle] = useState(
    resumeData.customInput[0].title != "" ? true : false
  );

  const [renderedStyles, setRenderedStyles] = useState([]);

  useEffect(() => {
    const styles = resumeData.customInput
      .filter((exp) => exp.style !== "")
      .map((exp) => exp.style);
    setRenderedStyles(styles);
  }, [resumeData.customInput]);

  const addCustomInput = (styleType) => {
    let updatedStyles = [...renderedStyles];

    updatedStyles.push(styleType);

    setRenderedStyles(updatedStyles);

    const newEntry = {
      style: styleType,
      title: "",
      listValues: styleType === "ListType" ? [] : undefined,
      paraValues: styleType === "ParaType" ? "" : undefined,
    };

    const updatedCustomInput = hasChosenAStyle
      ? [...resumeData.customInput, newEntry]
      : [newEntry];

    setHasChosenAStyle(true);
    updateField("customInput", updatedCustomInput);
  };

  return (
    <>
      <HeaderTemplate
        currentPage={"Custom Input"}
        setLogoutClicked={setLogoutClicked}
        setLogoutUserType={setLogoutUserType}
        setOverlayType={setOverlayType}
        PageIcon={AddTaskIcon}
      />
      <div id="dv-MainFormAndPreview">
        <div id="dv-MainForm">
          <div id="dv-CustomInputWrapper" className="WrapperClass">
            <div id="dv-CustomInputStyles" className="StyleChoosingButtons">
              <button
                type="button"
                onClick={() => addCustomInput("ListType")}
                className="ListInputButton"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#e3e3e3"
                >
                  <path d="M360-200v-80h480v80H360Zm0-240v-80h480v80H360Zm0-240v-80h480v80H360ZM200-160q-33 0-56.5-23.5T120-240q0-33 23.5-56.5T200-320q33 0 56.5 23.5T280-240q0 33-23.5 56.5T200-160Zm0-240q-33 0-56.5-23.5T120-480q0-33 23.5-56.5T200-560q33 0 56.5 23.5T280-480q0 33-23.5 56.5T200-400Zm0-240q-33 0-56.5-23.5T120-720q0-33 23.5-56.5T200-800q33 0 56.5 23.5T280-720q0 33-23.5 56.5T200-640Z" />
                </svg>{" "}
                List Type
              </button>

              <button
                type="button"
                onClick={() => addCustomInput("ParaType")}
                className="ParaInputButton"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#e3e3e3"
                >
                  <path d="M120-240v-80h240v80H120Zm0-200v-80h480v80H120Zm0-200v-80h720v80H120Z" />
                </svg>{" "}
                Para Type
              </button>
            </div>

            {!hasChosenAStyle && (
              <p>Please select a custom input type to begin.</p>
            )}

            {renderedStyles.includes("ListType") && <ListType />}

            {renderedStyles.includes("ParaType") && <ParaType />}
          </div>
          <div id="dv-CustomDivButtons" className="NavigationButtons">
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
              Languages
            </button>
            <button
              type="submit"
              onClick={() => setSubmitClicked(true)}
              className="DownloadButton"
            >
              Download{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#e3e3e3"
              >
                <path d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z" />
              </svg>
            </button>
          </div>
        </div>
        <PreviewPdf />
      </div>
    </>
  );
};

export default CustomDiv;
