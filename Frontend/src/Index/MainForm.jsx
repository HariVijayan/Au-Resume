import React, { useState } from "react";
import BioSummary from "./Components/Basic Details/BioSummary.jsx";
import Education from "./Components/Education/EducationMain.jsx";
import axios from "axios";
import Experience from "./Components/Experience/ExperienceMain.jsx";
import Project from "./Components/Project/Project.jsx";
import Skills from "./Components/Skills/SkillsMain.jsx";
import Cerifications from "./Components/Certifications.jsx/CertificationsMain.jsx";
import Language from "./Components/Language/Language.jsx";
import CustomDiv from "./Components/Custom/CustomMain.jsx";

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
        skillset: [""],
      },
      style2: {
        skillset: "",
      },
    },
    certification: {
      style1: {
        certificationset: [""],
      },
      style2: {
        certificationset: "",
      },
    },
    languages: [""],
    customdiv: [
      {
        customtitle: "",
        customdivstyle1: true,
        customlist: [""],
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
    <>
      <form id="MainForm" onSubmit={handleSubmit}>
        {activeSection === "BasicDetails" && (
          <BioSummary resumeData={resumeData} setResumeData={setResumeData} />
        )}
        {activeButtons === "BasicDetails" && (
          <button type="button" onClick={() => setContent("Experience")}>
            Experience
          </button>
        )}

        {activeSection === "Experience" && (
          <Experience resumeData={resumeData} setResumeData={setResumeData} />
        )}
        {activeButtons === "Experience" && (
          <>
            <button type="button" onClick={() => setContent("BasicDetails")}>
              Basic Details
            </button>
            <button type="button" onClick={() => setContent("Education")}>
              Education
            </button>
          </>
        )}

        {activeSection === "Education" && (
          <Education resumeData={resumeData} setResumeData={setResumeData} />
        )}
        {activeButtons === "Education" && (
          <>
            <button type="button" onClick={() => setContent("Experience")}>
              Experience
            </button>
            <button type="button" onClick={() => setContent("Projects")}>
              Projects
            </button>
          </>
        )}

        {activeSection === "Projects" && (
          <Project resumeData={resumeData} setResumeData={setResumeData} />
        )}
        {activeButtons === "Projects" && (
          <>
            <button type="button" onClick={() => setContent("Education")}>
              Education
            </button>
            <button type="button" onClick={() => setContent("Skills")}>
              Skills
            </button>
          </>
        )}

        {activeSection === "Skills" && (
          <Skills resumeData={resumeData} setResumeData={setResumeData} />
        )}
        {activeButtons === "Skills" && (
          <>
            <button type="button" onClick={() => setContent("Projects")}>
              Projects
            </button>
            <button type="button" onClick={() => setContent("Certifications")}>
              Certifications
            </button>
          </>
        )}

        {activeSection === "Certifications" && (
          <Cerifications
            resumeData={resumeData}
            setResumeData={setResumeData}
          />
        )}
        {activeButtons === "Certifications" && (
          <>
            <button type="button" onClick={() => setContent("Skills")}>
              Skills
            </button>
            <button type="button" onClick={() => setContent("Languages")}>
              Languages
            </button>
          </>
        )}

        {activeSection === "Languages" && (
          <Language resumeData={resumeData} setResumeData={setResumeData} />
        )}
        {activeButtons === "Languages" && (
          <>
            <button type="button" onClick={() => setContent("Certifications")}>
              Certifications
            </button>
            <button type="button" onClick={() => setContent("CustomDiv")}>
              Custom Input
            </button>
          </>
        )}

        {activeSection === "CustomDiv" && (
          <CustomDiv resumeData={resumeData} setResumeData={setResumeData} />
        )}
        {activeButtons === "CustomDiv" && (
          <>
            <button type="button" onClick={() => setContent("Languages")}>
              Languages
            </button>
            <button type="submit">Submit</button>
          </>
        )}
      </form>
    </>
  );
};

export default MainForm;
