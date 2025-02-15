import React from "react";
import Style1 from './Style 1'
import Style2 from './Style 2'

const CustomDiv = ({ resumeData, setResumeData }) => {
  const handleAddCustomDivStyle1 = (e) => {
    e.preventDefault();
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
    e.preventDefault();
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
      <h3>Custom Field - Style 1</h3>
      <button type="button" onClick={handleAddCustomDivStyle1} className="AddCustomDivButton">
        Add Custom Field
      </button>
      </div>
      <Style1 resumeData={resumeData} setResumeData={setResumeData} />

      
      <div id="dv-CustomDivStyle2Header" className="CustomDivHeader">
      <h3>Custom Field - Style 2</h3>
      <button type="button" onClick={handleAddCustomDivStyle2} className="AddCustomDivButton">
        Add Custom Field
      </button>
      </div>
      <Style2 resumeData={resumeData} setResumeData={setResumeData} />
    </div>
  );
};

export default CustomDiv;
