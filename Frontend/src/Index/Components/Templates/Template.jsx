import React, {useState} from "react";

const Template = ({setActiveSection, setTemplate, setActiveButtons}) => {

  const choseTemplate = (templateName) => {
    setTemplate(templateName);
    setActiveSection("BasicDetails");
    setActiveButtons("BasicDetails");
  };

  return (
    <>
      <div id="dv-TemplatesWrapper">
        <img src="/Au Logo.png" id="img-HeaderImage" alt="AU Logo" onClick={() => choseTemplate("Template 1")}></img>
        <img src="/Au Logo.png" id="img-HeaderImage" alt="AU Logo" onClick={() => choseTemplate("Template 2")}></img>
      </div>
    </>
  );
};

export default Template;
