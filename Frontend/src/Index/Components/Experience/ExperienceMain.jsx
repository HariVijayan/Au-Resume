import React from "react";
import Style1 from './Style1'
import Style2 from './Style2'

const Experience = ({ resumeData, setResumeData }) => {
  return (
    <div>
      <Style1 resumeData={resumeData} setResumeData={setResumeData} />
      <Style2 resumeData={resumeData} setResumeData={setResumeData} />
    </div>
  );
};

export default Experience;
