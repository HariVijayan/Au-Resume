import axios from "axios";
import { useNavigate } from "react-router-dom";
import ResumeInputTemplate from "../../../../ResumeFormat.jsx";

const Template = ({ setLogoutClicked }) => {
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
      <div id="dv-TemplatesHeader">
        <div id="dv-TemplatesMenuIcons" className="MenuIcons">
          <svg
            className="MenuIconsSvg"
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e3e3e3"
          >
            <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z" />
          </svg>
          <svg
            className="MenuIconsSvg"
            onClick={() => setLogoutClicked(true)}
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e3e3e3"
          >
            <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
          </svg>
        </div>
        <div id="dv-TemplatesHeading">
          <span id="sp-TemplatesHeading">
            <strong>Choose a template to get started</strong>
          </span>
        </div>
      </div>
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
      </div>
    </>
  );
};

export default Template;
