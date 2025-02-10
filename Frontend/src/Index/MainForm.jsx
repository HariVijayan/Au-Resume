import React, { useState } from "react";
import BioSummary from "./Components/Basic Details/BioSummary.jsx";
import Education from "./Components/Education/EducationMain.jsx";
import axios from "axios";
import Experience from "./Components/Experience/ExperienceMain.jsx";
import Project from "./Components/Project/Project.jsx";
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
            experience_roles: []
          }
        ],
        style2: [
          {
          experience_company: "",
          experience_location: "",
          experience_year: "",
          experience_designation: "",
          experience_team: "",
          experience_description: ""
          }
        ]
      }
    ],
    projects: {
      project1: {
        project_name: "",
        project_link: "",
        project_description: "",
        project_tech: ""
      }
    },
  });
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
    <div>
      <form onSubmit={handleSubmit}>
        <BioSummary resumeData={resumeData} setResumeData={setResumeData} />
        <Experience resumeData={resumeData} setResumeData={setResumeData} />
        <Education resumeData={resumeData} setResumeData={setResumeData} />
        <Project resumeData={resumeData} setResumeData={setResumeData} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
export default MainForm;
