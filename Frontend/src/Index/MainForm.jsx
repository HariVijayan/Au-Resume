import React, { useState} from "react";
import axios from "axios";
import BioSummary from "./Components/Basic Details/BioSummary.jsx";
import EducationPhd from "./Components/Education/Phd/Phd.jsx";
import EducationPg from "./Components/Education/Pg/Pg.jsx";
import EducationUg from "./Components/Education/Ug/Ug.jsx";
import EducationDiploma from "./Components/Education/Diploma/Diploma.jsx";
import EducationSchool from "./Components/Education/School/School.jsx";
import Experience from "./Components/Experience/ExperienceMain.jsx";
import Project from "./Components/Project/Project.jsx";
import Skills from "./Components/Skills/SkillsMain.jsx";
import Cerifications from "./Components/Certifications/CertificationsMain.jsx";
import Language from "./Components/Language/Language.jsx";
import CustomDiv from "./Components/Custom/CustomMain.jsx";
import PreviewPdf from "./PreviewPdf.jsx";

const MainForm = () => {
  const [resumeData, setResumeData] = useState({
    username: "",
    small_bio: "",
    phone_number: "",
    emailid: "",
    location: "",
    linkedin: "",
    linkedinurl: "",
    github: "",
    githuburl: "",
    customlink: "",
    customlinkurl: "",
    summary: "",
    education: [
      {
        phd: [
          {
            phd_name: "",
            phd_university: "",
            phd_year: "",
            phd_exp: "",
            phd_additional_info: "",
          },
        ],
        pg_degree: [
          {
            pg_degree_name: "",
            pg_degree_university: "",
            pg_degree_year: "",
            pg_degree_cgpa: "",
            pg_degree_additional_info: "",
          },
        ],
        ug_degree: [
          {
            ug_degree_name: "",
            ug_degree_university: "",
            ug_degree_year: "",
            ug_degree_cgpa: "",
            ug_degree_additional_info: "",
          },
        ],
        diploma: [
          {
            diploma_name: "",
            diploma_university: "",
            diploma_year: "",
            diploma_cgpa: "",
            diploma_additional_info: "",
          },
        ],
        hsc_name: "",
        hsc_year: "",
        hsc_grade: "",
        hsc_additional_info: "",
        sslc_name: "",
        sslc_year: "",
        sslc_grade: "",
        sslc_additional_info: "",
      },
    ],
    experience: [
      {
        style1: [
          {
            experience_company: "",
            experience_location: "",
            experience_year: "",
            experience_designation: "",
            experience_team: "",
            experience_roles: [],
          },
        ],
        style2: [
          {
            experience_company: "",
            experience_location: "",
            experience_year: "",
            experience_designation: "",
            experience_team: "",
            experience_description: "",
          },
        ],
      },
    ],
    projects: {
      project1: {
        project_name: "",
        project_link: "",
        project_description: "",
        project_tech: "",
      },
    },
    skills: {
      style1: {
        skillset: [],
      },
      style2: {
        skillset: "",
      },
    },
    certification: {
      style1: {
        certificationset: [],
      },
      style2: {
        certificationset: "",
      },
    },
    languages: [],
    customdiv: [
      {
        customtitle: "",
        customdivstyle1: true,
        customlist: [],
      },
      {
        customtitle: "",
        customdivstyle2: true,
        customparagraph: "",
      },
    ],
  });

  const [activeSection, setActiveSection] = useState("BasicDetails");

  const setContent = (section) => {
    setActiveSection(section);
    setButtons(section);
  };

  const [activeButtons, setActiveButtons] = useState("BasicDetails");

  const setButtons = (buttonName) => {
    setActiveButtons(buttonName);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    localStorage.setItem(resumeData, JSON.stringify(resumeData));
    try {
      const response = await axios.post(
        "http://localhost:5000/generate-pdf",
        resumeData,
        {
          responseType: "arraybuffer",
        }
      );
      const blob = new Blob([response.data], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "resume.pdf";
      link.click();
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <div id="dv-MainFormAndPreview">
      <form id="MainForm" onSubmit={handleSubmit}>
        {activeSection === "BasicDetails" && (
          <BioSummary resumeData={resumeData} setResumeData={setResumeData} />
        )}
        {activeButtons === "BasicDetails" && (
          <div id="dv-BasicDetailsButtons" className="NavigationButtons">
          <button type="button" onClick={() => setContent("Experience")} className="RightNavigationButtons">
            Experience <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M383-480 200-664l56-56 240 240-240 240-56-56 183-184Zm264 0L464-664l56-56 240 240-240 240-56-56 183-184Z"/></svg>
          </button>
          </div>
        )}

        {activeSection === "Experience" && (
          <Experience resumeData={resumeData} setResumeData={setResumeData} />
        )}
        {activeButtons === "Experience" && (
          <div id="dv-ExperienceButtons" className="NavigationButtons">
            <button type="button" onClick={() => setContent("BasicDetails")} className="LeftNavigationButtons">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M440-240 200-480l240-240 56 56-183 184 183 184-56 56Zm264 0L464-480l240-240 56 56-183 184 183 184-56 56Z"/></svg> Basic Details
            </button>
            <button type="button" onClick={() => setContent("EducationPhd")} className="RightNavigationButtons">
              Ph.D <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M383-480 200-664l56-56 240 240-240 240-56-56 183-184Zm264 0L464-664l56-56 240 240-240 240-56-56 183-184Z"/></svg>
            </button>
          </div>
        )}

        {activeSection === "EducationPhd" && (
          <EducationPhd resumeData={resumeData} setResumeData={setResumeData} />
        )}
        {activeButtons === "EducationPhd" && (
          <div id="dv-EducationPhdButtons" className="NavigationButtons">
            <button type="button" onClick={() => setContent("Experience")} className="LeftNavigationButtons">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M440-240 200-480l240-240 56 56-183 184 183 184-56 56Zm264 0L464-480l240-240 56 56-183 184 183 184-56 56Z"/></svg> Experience
            </button>
            <button type="button" onClick={() => setContent("EducationPg")} className="RightNavigationButtons">
              Post Graduate <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M383-480 200-664l56-56 240 240-240 240-56-56 183-184Zm264 0L464-664l56-56 240 240-240 240-56-56 183-184Z"/></svg>
            </button>
          </div>
        )}

        {activeSection === "EducationPg" && (
          <EducationPg resumeData={resumeData} setResumeData={setResumeData} />
        )}
        {activeButtons === "EducationPg" && (
          <div id="dv-EducationPgButtons" className="NavigationButtons">
            <button type="button" onClick={() => setContent("EducationPhd")} className="LeftNavigationButtons">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M440-240 200-480l240-240 56 56-183 184 183 184-56 56Zm264 0L464-480l240-240 56 56-183 184 183 184-56 56Z"/></svg> Ph.D
            </button>
            <button type="button" onClick={() => setContent("EducationUg")} className="RightNavigationButtons">
              Under Graduate <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M383-480 200-664l56-56 240 240-240 240-56-56 183-184Zm264 0L464-664l56-56 240 240-240 240-56-56 183-184Z"/></svg>
            </button>
          </div>
        )}

        {activeSection === "EducationUg" && (
          <EducationUg resumeData={resumeData} setResumeData={setResumeData} />
        )}
        {activeButtons === "EducationUg" && (
          <div id="dv-EducationUgButtons" className="NavigationButtons">
            <button type="button" onClick={() => setContent("EducationPg")} className="LeftNavigationButtons">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M440-240 200-480l240-240 56 56-183 184 183 184-56 56Zm264 0L464-480l240-240 56 56-183 184 183 184-56 56Z"/></svg> Post Graduate
            </button>
            <button type="button" onClick={() => setContent("EducationDiploma")} className="RightNavigationButtons">
              Diploma <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M383-480 200-664l56-56 240 240-240 240-56-56 183-184Zm264 0L464-664l56-56 240 240-240 240-56-56 183-184Z"/></svg>
            </button>
          </div>
        )}

        {activeSection === "EducationDiploma" && (
          <EducationDiploma resumeData={resumeData} setResumeData={setResumeData} />
        )}
        {activeButtons === "EducationDiploma" && (
          <div id="dv-EducationDiplomaButtons" className="NavigationButtons">
            <button type="button" onClick={() => setContent("EducationUg")} className="LeftNavigationButtons">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M440-240 200-480l240-240 56 56-183 184 183 184-56 56Zm264 0L464-480l240-240 56 56-183 184 183 184-56 56Z"/></svg> Under Graduate
            </button>
            <button type="button" onClick={() => setContent("EducationSchool")} className="RightNavigationButtons">
              School <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M383-480 200-664l56-56 240 240-240 240-56-56 183-184Zm264 0L464-664l56-56 240 240-240 240-56-56 183-184Z"/></svg>
            </button>
          </div>
        )}

        {activeSection === "EducationSchool" && (
          <EducationSchool resumeData={resumeData} setResumeData={setResumeData} />
        )}
        {activeButtons === "EducationSchool" && (
          <div id="dv-EducationSchoolButtons" className="NavigationButtons">
            <button type="button" onClick={() => setContent("EducationDiploma")} className="LeftNavigationButtons">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M440-240 200-480l240-240 56 56-183 184 183 184-56 56Zm264 0L464-480l240-240 56 56-183 184 183 184-56 56Z"/></svg> Diploma
            </button>
            <button type="button" onClick={() => setContent("Projects")} className="RightNavigationButtons">
              Projects <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M383-480 200-664l56-56 240 240-240 240-56-56 183-184Zm264 0L464-664l56-56 240 240-240 240-56-56 183-184Z"/></svg>
            </button>
          </div>
        )}

        {activeSection === "Projects" && (
          <Project resumeData={resumeData} setResumeData={setResumeData} />
        )}
        {activeButtons === "Projects" && (
          <div id="dv-ProjectsButtons" className="NavigationButtons">
            <button type="button" onClick={() => setContent("EducationSchool")} className="LeftNavigationButtons">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M440-240 200-480l240-240 56 56-183 184 183 184-56 56Zm264 0L464-480l240-240 56 56-183 184 183 184-56 56Z"/></svg> School
            </button>
            <button type="button" onClick={() => setContent("Skills")} className="RightNavigationButtons">
              Skills <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M383-480 200-664l56-56 240 240-240 240-56-56 183-184Zm264 0L464-664l56-56 240 240-240 240-56-56 183-184Z"/></svg>
            </button>
          </div>
        )}

        {activeSection === "Skills" && (
          <Skills resumeData={resumeData} setResumeData={setResumeData} />
        )}
        {activeButtons === "Skills" && (
          <div id="dv-SkillsButtons" className="NavigationButtons">
            <button type="button" onClick={() => setContent("Projects")} className="LeftNavigationButtons">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M440-240 200-480l240-240 56 56-183 184 183 184-56 56Zm264 0L464-480l240-240 56 56-183 184 183 184-56 56Z"/></svg> Projects
            </button>
            <button type="button" onClick={() => setContent("Certifications")} className="RightNavigationButtons">
              Certifications <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M383-480 200-664l56-56 240 240-240 240-56-56 183-184Zm264 0L464-664l56-56 240 240-240 240-56-56 183-184Z"/></svg>
            </button>
          </div>
        )}

        {activeSection === "Certifications" && (
          <Cerifications
            resumeData={resumeData}
            setResumeData={setResumeData}
          />
        )}
        {activeButtons === "Certifications" && (
          <div id="dv-CertificationsButtons" className="NavigationButtons">
            <button type="button" onClick={() => setContent("Skills")} className="LeftNavigationButtons">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M440-240 200-480l240-240 56 56-183 184 183 184-56 56Zm264 0L464-480l240-240 56 56-183 184 183 184-56 56Z"/></svg> Skills
            </button>
            <button type="button" onClick={() => setContent("Languages")} className="RightNavigationButtons">
              Languages <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M383-480 200-664l56-56 240 240-240 240-56-56 183-184Zm264 0L464-664l56-56 240 240-240 240-56-56 183-184Z"/></svg>
            </button>
          </div>
        )}

        {activeSection === "Languages" && (
          <Language resumeData={resumeData} setResumeData={setResumeData} />
        )}
        {activeButtons === "Languages" && (
          <div id="dv-LanguagesButtons" className="NavigationButtons">
            <button type="button" onClick={() => setContent("Certifications")} className="LeftNavigationButtons">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M440-240 200-480l240-240 56 56-183 184 183 184-56 56Zm264 0L464-480l240-240 56 56-183 184 183 184-56 56Z"/></svg> Certifications
            </button>
            <button type="button" onClick={() => setContent("CustomDiv")} className="RightNavigationButtons">
              Custom Input <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M383-480 200-664l56-56 240 240-240 240-56-56 183-184Zm264 0L464-664l56-56 240 240-240 240-56-56 183-184Z"/></svg>
            </button>
          </div>
        )}

        {activeSection === "CustomDiv" && (
          <CustomDiv resumeData={resumeData} setResumeData={setResumeData} />
        )}
        {activeButtons === "CustomDiv" && (
          <div id="dv-CustomDivButtons" className="NavigationButtons">
            <button type="button" onClick={() => setContent("Languages")} className="LeftNavigationButtons">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M440-240 200-480l240-240 56 56-183 184 183 184-56 56Zm264 0L464-480l240-240 56 56-183 184 183 184-56 56Z"/></svg> Languages
            </button>
            <button type="submit" className="RightNavigationButtons">Submit <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg></button>
          </div>
        )}
      </form>
      <PreviewPdf resumeData={resumeData}/>
    </div>
  );
};

export default MainForm;
