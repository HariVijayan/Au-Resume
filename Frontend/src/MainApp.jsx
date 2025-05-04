import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Error404 from "./404Error.jsx";
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
import "./Components/General/General_Styles.css";
import "./Components/Resume_Builder/RB_Styles.css";
import "./Components/JD_SucessScore/Jd_SS_Styles.css";
import "./Components/Role_SuccessScore/Role_SS_Styles.css";

import ResumeInputTemplate from "./ResumeFormat.jsx";

function RouteWrapper() {
  const { resumeDataNew } = ResumeInputTemplate();

  useEffect(() => {
    console.log(resumeDataNew);
  }, [resumeDataNew]);

  const forceMultiTabClosureOnLogout = () => {
    const navigate = useNavigate();

    useEffect(() => {
      const checkBrowserLocalStorage = (event) => {
        if (event.key === "flagLogout") {
          navigate("/", { replace: true });
        }
      };

      window.addEventListener("storage", checkBrowserLocalStorage);
      return () =>
        window.removeEventListener("storage", checkBrowserLocalStorage);
    }, [navigate]);
  };

  forceMultiTabClosureOnLogout();

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
  const verifySessionForProtectedRoutes = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/verifySession/check-access",
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Session invalid");
      }
    } catch (error) {
      console.error("Session verification failed:", error);
      navigate("/");
    }
  };

  const verifySessionForAuthenticationRoutes = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/verifySession/check-access",
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (response.ok) {
        console.log("Valid session. Redirecting to dashboard.");
        navigate("/resume-builder/template-choosing");
      }
    } catch (error) {
      return;
    }
  };

  useEffect(() => {
    const setRouteBasedElements = () => {
      const footer = document.getElementById("dv-FooterWrapper");
      const sidebar = document.querySelector(".Sidebar");
      if (footer) {
        if (protectedRoutes.includes(location.pathname)) {
          footer.style.display = "flex";
        } else {
          footer.style.display = "none";
        }
      }
      if (sidebar) {
        if (protectedRoutes.includes(location.pathname)) {
          sidebar.style.display = "flex";
        } else {
          sidebar.style.display = "none";
        }
      }
    };

    const checkAccessAndSetSidebar = async () => {
      if (protectedRoutes.includes(location.pathname)) {
        await verifySessionForProtectedRoutes(); // Verify session before allowing protected routes
        setRouteBasedElements();
      } else {
        await verifySessionForAuthenticationRoutes(); // Verify session for authentication routes
        setRouteBasedElements();
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
        <Route path="*" element={<Error404 />} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<Otp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-password-otp" element={<VerifyPasswordOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/resume-builder/template-choosing"
          element={
            <TemplateChoosing
              setTemplate={setTemplate}
              setResumeData={setResumeData}
            />
          }
        />
        <Route
          path="/resume-builder/bio-summary"
          element={
            <BioSummary
              resumeData={resumeData}
              setResumeData={setResumeData}
              templateType={templateType}
            />
          }
        />
        <Route
          path="/resume-builder/experience"
          element={
            <Experience
              resumeData={resumeData}
              setResumeData={setResumeData}
              templateType={templateType}
            />
          }
        />
        <Route
          path="/resume-builder/education/phd"
          element={
            <EducationPhd
              resumeData={resumeData}
              setResumeData={setResumeData}
              templateType={templateType}
            />
          }
        />
        <Route
          path="/resume-builder/education/pg"
          element={
            <EducationPg
              resumeData={resumeData}
              setResumeData={setResumeData}
              templateType={templateType}
            />
          }
        />
        <Route
          path="/resume-builder/education/ug"
          element={
            <EducationUg
              resumeData={resumeData}
              setResumeData={setResumeData}
              templateType={templateType}
            />
          }
        />
        <Route
          path="/resume-builder/education/diploma"
          element={
            <EducationDiploma
              resumeData={resumeData}
              setResumeData={setResumeData}
              templateType={templateType}
            />
          }
        />
        <Route
          path="/resume-builder/education/school"
          element={
            <EducationSchool
              resumeData={resumeData}
              setResumeData={setResumeData}
              templateType={templateType}
            />
          }
        />
        <Route
          path="/resume-builder/projects"
          element={
            <Projects
              resumeData={resumeData}
              setResumeData={setResumeData}
              templateType={templateType}
            />
          }
        />
        <Route
          path="/resume-builder/skills"
          element={
            <Skills
              resumeData={resumeData}
              setResumeData={setResumeData}
              templateType={templateType}
            />
          }
        />
        <Route
          path="/resume-builder/certifications"
          element={
            <Certifications
              resumeData={resumeData}
              setResumeData={setResumeData}
              templateType={templateType}
            />
          }
        />
        <Route
          path="/resume-builder/languages-known"
          element={
            <LanguagesKnown
              resumeData={resumeData}
              setResumeData={setResumeData}
              templateType={templateType}
            />
          }
        />
        <Route
          path="/resume-builder/custom-input"
          element={
            <CustomInput
              resumeData={resumeData}
              setResumeData={setResumeData}
              templateType={templateType}
            />
          }
        />
        <Route path="/success-score/jd" element={<JdSuccessScore />} />
        <Route path="/success-score/role" element={<RoleSuccessScore />} />
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
