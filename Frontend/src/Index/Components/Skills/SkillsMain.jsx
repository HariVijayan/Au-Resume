import React from "react";
import Style1 from './Style 1'
import Style2 from './Style 2'

const Skills = ({ resumeData, setResumeData }) => {
  return (
    <div id="dv-SkillsWrapper" className="WrapperClass">
      <div id="dv-SkillsStyle1Header" className="SkillsHeader">
      <h3>Skills - Style 1</h3>
      </div>
      <Style1 resumeData={resumeData} setResumeData={setResumeData} />

      <div id="dv-SkillsStyle2Header" className="SkillsHeader">
      <h3>Skills - Style 2</h3>
      </div>
      <Style2 resumeData={resumeData} setResumeData={setResumeData} />
    </div>
  );
};

export default Skills;
