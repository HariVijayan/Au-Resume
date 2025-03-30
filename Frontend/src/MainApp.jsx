import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Header from "./Header.jsx";
import Login from "./Components/General/Sub_Components/Login/Login.jsx";
import Register from "./Components/General/Sub_Components/Register/Register.jsx";
import Otp from "./Components/General/Sub_Components/Register/VerifyOtp.jsx";
import ForgotPassword from "./Components/General/Sub_Components/Forgot_Password/ForgotPassword.jsx";
import VerifyPasswordOtp from "./Components/General/Sub_Components/Forgot_Password/VerifyOtp.jsx";
import ResetPassword from "./Components/General/Sub_Components/Forgot_Password/ResetPassword.jsx";
import TemplateChoosing from "./Components/Resume_Builder/Sub_Components/Templates/Template.jsx";
import BioSummary from "./Components/Resume_Builder/Sub_Components/Basic Details/BioSummary.jsx";
import Experience from "./Components/Resume_Builder/Sub_Components/Experience/ExperienceMain.jsx";
import EducationPhd from "./Components/Resume_Builder/Sub_Components/Education/Phd/Phd.jsx";
import EducationPg from "./Components/Resume_Builder/Sub_Components/Education/Pg/Pg.jsx";
import EducationUg from "./Components/Resume_Builder/Sub_Components/Education/Ug/Ug.jsx";
import EducationDiploma from "./Components/Resume_Builder/Sub_Components/Education/Diploma/Diploma.jsx";
import EducationSchool from "./Components/Resume_Builder/Sub_Components/Education/School/School.jsx";
import Projects from "./Components/Resume_Builder/Sub_Components/Project/Project.jsx";
import Skills from "./Components/Resume_Builder/Sub_Components/Skills/SkillsMain.jsx";
import Certifications from "./Components/Resume_Builder/Sub_Components/Certifications/CertificationsMain.jsx";
import LanguagesKnown from "./Components/Resume_Builder/Sub_Components/Language/Language.jsx";
import CustomInput from "./Components/Resume_Builder/Sub_Components/Custom/CustomMain.jsx";
import JdSuccessScore from "./Components/JD_SucessScore/App.jsx";
import RoleSuccessScore from "./Components/Role_SuccessScore/App.jsx";
import "./Components/Resume_Builder/MainStyleSheet.css";
import "./Components/JD_SucessScore/MainStyleSheet.css";
import "./Components/Role_SuccessScore/MainStyleSheet.css";

function RouteWrapper() {
  const [templateType, setTemplate] = useState("Template 1");

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

  const location = useLocation();
  const protectedRoutes = [
    "/resume-builder/template-choosing",
    "/resume-builder/bio-summary",
    "/resume-builder/experience",
    "/resume-builder/education/phd",
    "/resume-builder/education/pg",
    "/resume-builder/education/ug",
    "/resume-builder/education/diploma",
    "/resume-builder/education/school",
    "/resume-builder/projects",
    "/resume-builder/skills",
    "/resume-builder/certifications",
    "/resume-builder/languages-known",
    "/resume-builder/custom-input",
    "/success-score/jd",
    "/success-score/role",
  ];
  const navigate = useNavigate();
  const verifySession = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/verifySession/check-access",
        {
          method: "POST",
          credentials: "include", // Ensures cookies are sent
        }
      );

      if (!response.ok) {
        throw new Error("Session invalid");
      }

      const data = await response.json();
      console.log("Session verified:", data.message);
    } catch (error) {
      console.error("Session verification failed:", error);
      navigate("/"); // Redirect to login if session is invalid
    }
  };

  useEffect(() => {
    const sidebarState = () => {
      const element = document.querySelector(".Sidebar");
      if (element) {
        if (protectedRoutes.includes(location.pathname)) {
          element.style.display = "flex";
        } else {
          element.style.display = "none";
        }
      }
    };

    const checkAccessAndSetSidebar = async () => {
      if (protectedRoutes.includes(location.pathname)) {
        await verifySession(); // Verify session before allowing protected routes
        sidebarState();
      } else {
        sidebarState();
      }
    };

    const observer = new MutationObserver(() => {
      checkAccessAndSetSidebar();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    checkAccessAndSetSidebar(); // Run on initial mount

    return () => {
      observer.disconnect();
    };
  }, [location]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<Otp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-password-otp" element={<VerifyPasswordOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/resume-builder/template-choosing"
          element={
            <>
              {" "}
              <Header /> <TemplateChoosing setTemplate={setTemplate} />{" "}
            </>
          }
        />
        <Route
          path="/resume-builder/bio-summary"
          element={
            <>
              {" "}
              <Header />{" "}
              <BioSummary
                resumeData={resumeData}
                setResumeData={setResumeData}
                templateType={templateType}
              />{" "}
            </>
          }
        />
        <Route
          path="/resume-builder/experience"
          element={
            <>
              {" "}
              <Header />{" "}
              <Experience
                resumeData={resumeData}
                setResumeData={setResumeData}
                templateType={templateType}
              />{" "}
            </>
          }
        />
        <Route
          path="/resume-builder/education/phd"
          element={
            <>
              {" "}
              <Header />{" "}
              <EducationPhd
                resumeData={resumeData}
                setResumeData={setResumeData}
                templateType={templateType}
              />{" "}
            </>
          }
        />
        <Route
          path="/resume-builder/education/pg"
          element={
            <>
              {" "}
              <Header />{" "}
              <EducationPg
                resumeData={resumeData}
                setResumeData={setResumeData}
                templateType={templateType}
              />{" "}
            </>
          }
        />
        <Route
          path="/resume-builder/education/ug"
          element={
            <>
              {" "}
              <Header />{" "}
              <EducationUg
                resumeData={resumeData}
                setResumeData={setResumeData}
                templateType={templateType}
              />{" "}
            </>
          }
        />
        <Route
          path="/resume-builder/education/diploma"
          element={
            <>
              {" "}
              <Header />{" "}
              <EducationDiploma
                resumeData={resumeData}
                setResumeData={setResumeData}
                templateType={templateType}
              />{" "}
            </>
          }
        />
        <Route
          path="/resume-builder/education/school"
          element={
            <>
              {" "}
              <Header />{" "}
              <EducationSchool
                resumeData={resumeData}
                setResumeData={setResumeData}
                templateType={templateType}
              />{" "}
            </>
          }
        />
        <Route
          path="/resume-builder/projects"
          element={
            <>
              {" "}
              <Header />{" "}
              <Projects
                resumeData={resumeData}
                setResumeData={setResumeData}
                templateType={templateType}
              />{" "}
            </>
          }
        />
        <Route
          path="/resume-builder/skills"
          element={
            <>
              {" "}
              <Header />{" "}
              <Skills
                resumeData={resumeData}
                setResumeData={setResumeData}
                templateType={templateType}
              />{" "}
            </>
          }
        />
        <Route
          path="/resume-builder/certifications"
          element={
            <>
              {" "}
              <Header />{" "}
              <Certifications
                resumeData={resumeData}
                setResumeData={setResumeData}
                templateType={templateType}
              />{" "}
            </>
          }
        />
        <Route
          path="/resume-builder/languages-known"
          element={
            <>
              {" "}
              <Header />{" "}
              <LanguagesKnown
                resumeData={resumeData}
                setResumeData={setResumeData}
                templateType={templateType}
              />{" "}
            </>
          }
        />
        <Route
          path="/resume-builder/custom-input"
          element={
            <>
              {" "}
              <Header />{" "}
              <CustomInput
                resumeData={resumeData}
                setResumeData={setResumeData}
                templateType={templateType}
              />{" "}
            </>
          }
        />
        <Route
          path="/success-score/jd"
          element={
            <>
              {" "}
              <Header /> <JdSuccessScore />{" "}
            </>
          }
        />
        <Route
          path="/success-score/role"
          element={
            <>
              {" "}
              <Header /> <RoleSuccessScore />{" "}
            </>
          }
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <RouteWrapper />
    </Router>
  );
}

export default App;
