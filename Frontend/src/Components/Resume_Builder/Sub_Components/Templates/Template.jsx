import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Template = ({ setTemplate, setResumeData }) => {
  const navigate = useNavigate();

  const choseTemplate = async (templateName) => {
    setTemplate(templateName);
    try {
      const response = await axios.post(
        "http://localhost:5000/getPrevious/resume-details",
        {},
        { withCredentials: true }
      );
      setResumeData(response.data);
    } catch (error) {
      console.error("Error fetching resume details:", error);
    }
    navigate("/resume-builder/bio-summary");
  };

  return (
    <>
      <div id="dv-TemplatesWrapper">
        <div id="dv-TemplatesImages">
          <img
            src="/Templates/Template 1.jpg"
            id="img-Template1"
            className="TemplateImages"
            alt="Template 1"
            onClick={() => choseTemplate("Template 1")}
          ></img>
          <img
            src="/Templates/More Templates.jpg"
            id="img-Template2"
            className="TemplateImages"
            alt="Template 2"
            onClick={() => choseTemplate("Template 2")}
          ></img>
        </div>
        <div id="dv-TemplatesHeading">
          <span id="sp-TemplatesHeading">
            Choose a template to get started.
          </span>
        </div>
      </div>
    </>
  );
};

export default Template;
