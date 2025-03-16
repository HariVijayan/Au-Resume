import React, {useState} from "react";
import Style1 from './Style 1'
import Style2 from './Style 2'

const CustomDiv = ({ resumeData, setResumeData }) => {

  const [customDivType, setCustomDivType] = useState("Default");
  const [renderedStyles, setRenderedStyles] = useState([]);

  const [hasStyle1Rendered, setHasStyle1Rendered] = useState(false);
  const [hasStyle2Rendered, setHasStyle2Rendered] = useState(false);

  const setCustomDiv = (type) => {
    let updatedStyles = [...renderedStyles];
    if (type === "Style1") {
      if (!hasStyle1Rendered) {
        updatedStyles.push("Style1");
        setCustomDivType("Style1");
        setHasStyle1Rendered(true);
      } else {
        updatedStyles.push("Style1");
        handleAddCustomDivStyle1();
      }
    } else if (type === "Style2") {
      if (!hasStyle2Rendered) {
        updatedStyles.push("Style2");
        setCustomDivType("Style2");
        setHasStyle2Rendered(true);
      } else {
        updatedStyles.push("Style2");
        handleAddCustomDivStyle2();
      }
    }
    setRenderedStyles(updatedStyles);
  };

  const handleAddCustomDivStyle1 = (e) => {
    const updatedCustomDivs = [...resumeData.customdiv];
    updatedCustomDivs.push({
      customtitle: "",
      customdivstyle1: true,
      customlist: [""],
    });

    setResumeData({
      ...resumeData,
      customdiv: updatedCustomDivs,
    });
  };

  const handleAddCustomDivStyle2 = (e) => {
    const updatedCustomDivs = [...resumeData.customdiv];
    updatedCustomDivs.push({
      customtitle: "",
      customdivstyle2: true,
      customparagraph: "",
    });

    setResumeData({
      ...resumeData,
      customdiv: updatedCustomDivs,
    });
  };

  return (
    <div id="dv-CustomDivWrapper" className="WrapperClass">
      <div id="dv-CustomDivStyle1Header" className="CustomDivHeader">
      <h3>Custom Input <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M440-240h80v-120h120v-80H520v-120h-80v120H320v80h120v120ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z"/></svg></h3>
        <button
          type="button"
          onClick={() => setCustomDiv("Style1")}
          className="ListInputButton"
        >
         <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M360-200v-80h480v80H360Zm0-240v-80h480v80H360Zm0-240v-80h480v80H360ZM200-160q-33 0-56.5-23.5T120-240q0-33 23.5-56.5T200-320q33 0 56.5 23.5T280-240q0 33-23.5 56.5T200-160Zm0-240q-33 0-56.5-23.5T120-480q0-33 23.5-56.5T200-560q33 0 56.5 23.5T280-480q0 33-23.5 56.5T200-400Zm0-240q-33 0-56.5-23.5T120-720q0-33 23.5-56.5T200-800q33 0 56.5 23.5T280-720q0 33-23.5 56.5T200-640Z"/></svg> List Type
        </button>

        <button
          type="button"
          onClick={() => setCustomDiv("Style2")}
          className="ParaInputButton"
        >
         <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M120-240v-80h240v80H120Zm0-200v-80h480v80H120Zm0-200v-80h720v80H120Z"/></svg> Para Type
        </button>
      </div>

      {customDivType === "Default" && <p>Please select an experience type to begin.</p>}

      {renderedStyles.includes("Style1") && (
        <Style1 resumeData={resumeData} setResumeData={setResumeData} />
      )}

      {renderedStyles.includes("Style2") && (
        <Style2 resumeData={resumeData} setResumeData={setResumeData} />
      )}
    </div>
  );
};

export default CustomDiv;
