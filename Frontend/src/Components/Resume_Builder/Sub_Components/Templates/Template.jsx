import axios from "axios";
import { useNavigate } from "react-router-dom";
import ResumeInputTemplate from "../../../../ResumeFormat.jsx";

const Template = () => {
  const navigate = useNavigate();

  let { updateField, setResumeData } = ResumeInputTemplate();

  const choseTemplate = async (templateName) => {
    updateField("metaData.template", templateName);
    try {
      const response = await axios.post(
        "http://localhost:5000/getPrevious/resume-details",
        {},
        { withCredentials: true }
      );
      setResumeData(response.data);
      if (response.status === 500) {
        navigate("/resume-builder/bio-summary");
      }
    } catch (error) {
      console.error("Error fetching resume details:", error);
      navigate("/resume-builder/bio-summary");
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
