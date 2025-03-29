import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';

const Template = ({ setTemplate }) => {

  const navigate = useNavigate();

  const choseTemplate = (templateName) => {
    setTemplate(templateName);
    navigate('/resume-builder/bio-summary');
  };

  return (
    <>
      <div id="dv-TemplatesWrapper">
        <div id="dv-TemplatesImages">
          <img src="/Templates/Template 1.jpg" id="img-Template1" className="TemplateImages" alt="Template 1" onClick={() => choseTemplate("Template 1")}></img>
          <img src="/Templates/More Templates.jpg" id="img-Template2" className="TemplateImages" alt="Template 2" onClick={() => choseTemplate("Template 2")}></img>
        </div>
        <div id="dv-TemplatesHeading">
          <span id="sp-TemplatesHeading">Choose a template to get started.</span>
        </div>
      </div>
    </>
  );
};

export default Template;
