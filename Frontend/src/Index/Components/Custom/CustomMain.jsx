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
      <h3>Custom Input</h3>
        <button
          type="button"
          onClick={() => setCustomDiv("Style1")}
          className="ListInputButton"
        >
          List Type
        </button>

        <button
          type="button"
          onClick={() => setCustomDiv("Style2")}
          className="ParaInputButton"
        >
          Para Type
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
