import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import axios from "axios";
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
import JdSuccessScore from "./Components/JD_SucessScore/JdSS.jsx";
import RoleSuccessScore from "./Components/Role_SuccessScore/RoleSS.jsx";
import "./Components/General/General_Styles.css";
import "./Components/Resume_Builder/RB_Styles.css";
import "./Components/JD_SucessScore/Jd_SS_Styles.css";
import "./Components/Role_SuccessScore/Role_SS_Styles.css";

import ResumeInputTemplate from "./ResumeFormat.jsx";

function RouteWrapper() {
  const { resumeData } = ResumeInputTemplate();

  useEffect(() => {
    console.log(resumeData);
  }, [resumeData]);

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

  const downloadResume = async () => {
    const formData = {
      resumeData,
    };
    try {
      const response = await axios.post(
        "http://localhost:5000/generate/Resume",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
          responseType: "arraybuffer",
        }
      );
      const blob = new Blob([response.data], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "Resume.pdf";
      link.click();
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  const [submitClicked, setSubmitClicked] = useState(false);

  useEffect(() => {
    if (submitClicked === true) {
      setSubmitClicked(false);
      downloadResume();
    }
  }, [submitClicked]);

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
          element={<TemplateChoosing />}
        />
        <Route path="/resume-builder/bio-summary" element={<BioSummary />} />
        <Route path="/resume-builder/experience" element={<Experience />} />
        <Route
          path="/resume-builder/education/phd"
          element={<EducationPhd />}
        />
        <Route path="/resume-builder/education/pg" element={<EducationPg />} />
        <Route path="/resume-builder/education/ug" element={<EducationUg />} />
        <Route
          path="/resume-builder/education/diploma"
          element={<EducationDiploma />}
        />
        <Route
          path="/resume-builder/education/school"
          element={<EducationSchool />}
        />
        <Route path="/resume-builder/projects" element={<Projects />} />
        <Route path="/resume-builder/skills" element={<Skills />} />
        <Route
          path="/resume-builder/certifications"
          element={<Certifications />}
        />
        <Route
          path="/resume-builder/languages-known"
          element={<LanguagesKnown />}
        />
        <Route
          path="/resume-builder/custom-input"
          element={<CustomInput setSubmitClicked={setSubmitClicked} />}
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
