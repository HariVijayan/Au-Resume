import React from "react";
import Style1 from './Style 1'
import Style2 from './Style 2'

const CustomDiv = ({ resumeData, setResumeData }) => {
  return (
    <div id="dv-CustomDivWrapper" className="WrapperClass">
      <Style1 resumeData={resumeData} setResumeData={setResumeData} />
      <Style2 resumeData={resumeData} setResumeData={setResumeData} />
    </div>
  );
};

export default CustomDiv;
