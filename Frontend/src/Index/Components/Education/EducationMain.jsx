import React from "react";
import Phd from "./Phd/Phd.jsx";
import Pg from "./Pg/Pg.jsx";
import Ug from "./Ug/Ug.jsx";
import Diploma from "./Diploma/Diploma.jsx";
import School from "./School/School.jsx";

const Education = ({ resumeData, setResumeData }) => {
  return (
    <div id="dv-EducationWrapper" className="WrapperClass">
      <Phd resumeData={resumeData} setResumeData={setResumeData} />
      <Pg resumeData={resumeData} setResumeData={setResumeData} />
      <Ug resumeData={resumeData} setResumeData={setResumeData} />
      <Diploma resumeData={resumeData} setResumeData={setResumeData} />
      <School resumeData={resumeData} setResumeData={setResumeData} />
    </div>
  );
};

export default Education;
