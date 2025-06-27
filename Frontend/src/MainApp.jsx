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
import BasicDetails from "./Components/Resume_Builder/Sub_Components/Basic Details/BasicDetails.jsx";
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
import SuperAdmin from "./Components/Profile/SuperAdmin.jsx";
import SAAdminMgmt from "./Components/Profile/Super_Admin_Actions/Admin_Mgmt/Dashboard.jsx";
import AddAdmin from "./Components/Profile/Super_Admin_Actions/Admin_Mgmt/AddAdmin.jsx";
import RemoveAdmin from "./Components/Profile/Super_Admin_Actions/Admin_Mgmt/RemoveAdmin.jsx";
import ModifyAdmin from "./Components/Profile/Super_Admin_Actions/Admin_Mgmt/ModifyAdminType.jsx";
import SAUserMgmt from "./Components/Profile/Super_Admin_Actions/UserMgmt.jsx";
import SALogMgmt from "./Components/Profile/Super_Admin_Actions/LogMgmt.jsx";
import Admin from "./Components/Profile/Admin.jsx";
import AdminUserMgmt from "./Components/Profile/Admin_Actions/UserMgmt.jsx";
import AdminLogMgmt from "./Components/Profile/Admin_Actions/LogMgmt.jsx";
import User from "./Components/Profile/GeneralUser.jsx";
import Analytics from "./Components/Profile/Analytics.jsx";
import "./Components/General/General_Styles.css";
import "./Components/Resume_Builder/RB_Styles.css";
import "./Components/Profile/Profile_Styles.css";

import ResumeInputTemplate from "./ResumeFormat.jsx";

function RouteWrapper() {
  const { resumeData, setResumeData } = ResumeInputTemplate();

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
    "/resume-builder/basic-details",
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
    "/user-profile",
  ];

  const superAdminRoutes = [
    "/admin-dashboard/super-admin",
    "/admin-dashboard/super-admin/admin-management",
    "/admin-dashboard/super-admin/user-management",
    "/admin-dashboard/super-admin/log-management",
    "/admin-dashboard/super-admin/admin-management/add-admin",
    "/admin-dashboard/super-admin/admin-management/remove-admin",
    "/admin-dashboard/super-admin/admin-management/modify-admin",
  ];

  const adminRoutes = [
    "/admin-dashboard/admin-general",
    "/admin-dashboard/admin-general/user-management",
    "/admin-dashboard/admin-general/log-management",
  ];

  const analyticsAdminRoutes = ["/admin-dashboard/analytics"];
  const navigate = useNavigate();

  const verifySessionForAdminRoutes = async (routeType) => {
    //Redirect to login page if previous session is invalid or user not an admin. If session is valid and user is admin, no action is taken.
    try {
      const response = await axios.post(
        "http://localhost:5000/verifyAdminSession/check-admin-access",
        { routeType },
        { withCredentials: true }
      );

      if (response.statusText != "OK") {
        throw new Error("Session invalid");
      }
    } catch (error) {
      console.error("Session verification failed:", error);
      navigate("/");
    }
  };

  const verifySessionForProtectedRoutes = async () => {
    //Redirect to login page if previous session is invalid. If session is valid, no action is taken.
    try {
      const response = await axios.post(
        "http://localhost:5000/verifySession/protectedRoutes/check-access",
        {},
        { withCredentials: true }
      );
    } catch (error) {
      console.error("Session verification failed:", error);
      navigate("/");
    }
  };

  const verifySessionForUnProtectedRoutes = async () => {
    //Redirect to dashboard if there is a previous valid session available. If session is invalid, no action is taken.
    try {
      const response = await axios.post(
        "http://localhost:5000/verifySession/authenticationRoutes/check-access",
        {},
        { withCredentials: true }
      );

      if (
        response?.data?.message ===
        "fkjbcvjhefbvjhbghvvjh3jjn23b23huiyuycbjhejbh23"
      ) {
        navigate("/admin-dashboard/super-admin");
      } else if (
        response?.data?.message ===
        "io6jiojjokomioynoiynhpopjijaoindioioahibhbHVgydv"
      ) {
        navigate("/admin-dashboard/admin-general");
      } else if (
        response?.data?.message ===
        "g87uh78875gonkloiyhoi0yh0iob5mi5u5hu899igoi5mo"
      ) {
        navigate("/admin-dashboard/analytics");
      } else if (response?.data?.message === "Valid access token") {
        navigate("/resume-builder/template-choosing");
      }
    } catch (error) {
      return;
    }
  };

  useEffect(() => {
    const setRouteBasedElements = () => {
      const footer = document.getElementById("dv-FooterWrapper");
      if (!footer) return;

      if (protectedRoutes.includes(location.pathname)) {
        footer.style.display = "flex";
      } else {
        footer.style.display = "none";
      }
    };

    const checkAccessAndSetFooter = async () => {
      if (superAdminRoutes.includes(location.pathname)) {
        await verifySessionForAdminRoutes("SuperAdmin");
      } else if (adminRoutes.includes(location.pathname)) {
        await verifySessionForAdminRoutes("Admin");
      } else if (analyticsAdminRoutes.includes(location.pathname)) {
        await verifySessionForAdminRoutes("Analytics");
      } else if (protectedRoutes.includes(location.pathname)) {
        await verifySessionForProtectedRoutes();
      } else {
        await verifySessionForUnProtectedRoutes();
      }

      setRouteBasedElements(); // Only after verification
    };

    checkAccessAndSetFooter(); // Single deterministic call per route change
  }, [location.pathname]); // Only watch for path change, not DOM changes

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

  const [logoutClicked, setLogoutClicked] = useState(false);
  const [logoutUserType, setLogoutUserType] = useState("");

  const logoutUser = async (userType) => {
    try {
      await axios.post(
        "http://localhost:5000/authenticateUser/logout",
        { userType },
        {
          withCredentials: true,
        }
      );

      localStorage.setItem("flagLogout", Date.now());
      setTimeout(() => localStorage.removeItem("flagLogout"), 100);
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    if (logoutClicked === true) {
      setLogoutClicked(false);
      logoutUser(logoutUserType);
      setLogoutUserType("");
    }
  }, [logoutClicked]);

  const [overlayType, setOverlayType] = useState("");
  const [overlayMessage, setOverlayMessage] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const fetchPreviousResume = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/getPrevious/resume-details",
        { userPassword },
        { withCredentials: true }
      );
      if (response.status === 200) {
        setResumeData(response.data);
        resetOverlay();
      }
    } catch (error) {
      setUserPassword("");
      setOverlayMessage(
        error.response?.data?.message || "Error occured. Please try again."
      );
    }
  };

  const saveCurrentResume = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/saveResume/current-resume",
        { userPassword, resumeData },
        { withCredentials: true }
      );
      setUserPassword("");
      if (response.status === 200) {
        setOverlayMessage(
          "Resume saved to the database successfully after encryption."
        );
      }
    } catch (error) {
      setUserPassword("");
      setOverlayMessage(
        error.response?.data?.message || "Error occured. Please try again."
      );
    }
  };

  const resetOverlay = () => {
    setUserPassword("");
    setOverlayType("");
    setOverlayMessage("");
  };

  return (
    <>
      <Routes>
        <Route path="*" element={<Error404 />} />
        <Route
          path="/admin-dashboard/super-admin"
          element={
            <SuperAdmin
              setLogoutClicked={setLogoutClicked}
              setLogoutUserType={setLogoutUserType}
            />
          }
        />
        <Route
          path="/admin-dashboard/super-admin/admin-management"
          element={
            <SAAdminMgmt
              setLogoutClicked={setLogoutClicked}
              setLogoutUserType={setLogoutUserType}
            />
          }
        />
        <Route
          path="/admin-dashboard/super-admin/admin-management/add-admin"
          element={
            <AddAdmin
              setLogoutClicked={setLogoutClicked}
              setLogoutUserType={setLogoutUserType}
            />
          }
        />

        <Route
          path="/admin-dashboard/super-admin/admin-management/remove-admin"
          element={
            <RemoveAdmin
              setLogoutClicked={setLogoutClicked}
              setLogoutUserType={setLogoutUserType}
            />
          }
        />

        <Route
          path="/admin-dashboard/super-admin/admin-management/modify-admin"
          element={
            <ModifyAdmin
              setLogoutClicked={setLogoutClicked}
              setLogoutUserType={setLogoutUserType}
            />
          }
        />
        <Route
          path="/admin-dashboard/super-admin/user-management"
          element={
            <SAUserMgmt
              setLogoutClicked={setLogoutClicked}
              setLogoutUserType={setLogoutUserType}
            />
          }
        />
        <Route
          path="/admin-dashboard/super-admin/log-management"
          element={
            <SALogMgmt
              setLogoutClicked={setLogoutClicked}
              setLogoutUserType={setLogoutUserType}
            />
          }
        />
        <Route
          path="/admin-dashboard/admin-general"
          element={
            <Admin
              setLogoutClicked={setLogoutClicked}
              setLogoutUserType={setLogoutUserType}
            />
          }
        />
        <Route
          path="/admin-dashboard/admin-general/user-management"
          element={
            <AdminUserMgmt
              setLogoutClicked={setLogoutClicked}
              setLogoutUserType={setLogoutUserType}
            />
          }
        />
        <Route
          path="/admin-dashboard/admin-general/log-management"
          element={
            <AdminLogMgmt
              setLogoutClicked={setLogoutClicked}
              setLogoutUserType={setLogoutUserType}
            />
          }
        />
        <Route
          path="/admin-dashboard/analytics"
          element={
            <Analytics
              setLogoutClicked={setLogoutClicked}
              setLogoutUserType={setLogoutUserType}
            />
          }
        />
        <Route
          path="/user-profile"
          element={
            <User
              setLogoutClicked={setLogoutClicked}
              setLogoutUserType={setLogoutUserType}
            />
          }
        />
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
              setLogoutClicked={setLogoutClicked}
              setLogoutUserType={setLogoutUserType}
            />
          }
        />
        <Route
          path="/resume-builder/basic-details"
          element={
            <BasicDetails
              setOverlayType={setOverlayType}
              setLogoutClicked={setLogoutClicked}
              setLogoutUserType={setLogoutUserType}
            />
          }
        />
        <Route
          path="/resume-builder/experience"
          element={
            <Experience
              setOverlayType={setOverlayType}
              setLogoutClicked={setLogoutClicked}
              setLogoutUserType={setLogoutUserType}
            />
          }
        />
        <Route
          path="/resume-builder/education/phd"
          element={
            <EducationPhd
              setOverlayType={setOverlayType}
              setLogoutClicked={setLogoutClicked}
              setLogoutUserType={setLogoutUserType}
            />
          }
        />
        <Route
          path="/resume-builder/education/pg"
          element={
            <EducationPg
              setOverlayType={setOverlayType}
              setLogoutClicked={setLogoutClicked}
              setLogoutUserType={setLogoutUserType}
            />
          }
        />
        <Route
          path="/resume-builder/education/ug"
          element={
            <EducationUg
              setOverlayType={setOverlayType}
              setLogoutClicked={setLogoutClicked}
              setLogoutUserType={setLogoutUserType}
            />
          }
        />
        <Route
          path="/resume-builder/education/diploma"
          element={
            <EducationDiploma
              setOverlayType={setOverlayType}
              setLogoutClicked={setLogoutClicked}
              setLogoutUserType={setLogoutUserType}
            />
          }
        />
        <Route
          path="/resume-builder/education/school"
          element={
            <EducationSchool
              setOverlayType={setOverlayType}
              setLogoutClicked={setLogoutClicked}
              setLogoutUserType={setLogoutUserType}
            />
          }
        />
        <Route
          path="/resume-builder/projects"
          element={
            <Projects
              setOverlayType={setOverlayType}
              setLogoutClicked={setLogoutClicked}
              setLogoutUserType={setLogoutUserType}
            />
          }
        />
        <Route
          path="/resume-builder/skills"
          element={
            <Skills
              setOverlayType={setOverlayType}
              setLogoutClicked={setLogoutClicked}
              setLogoutUserType={setLogoutUserType}
            />
          }
        />
        <Route
          path="/resume-builder/certifications"
          element={
            <Certifications
              setOverlayType={setOverlayType}
              setLogoutClicked={setLogoutClicked}
              setLogoutUserType={setLogoutUserType}
            />
          }
        />
        <Route
          path="/resume-builder/languages-known"
          element={
            <LanguagesKnown
              setOverlayType={setOverlayType}
              setLogoutClicked={setLogoutClicked}
              setLogoutUserType={setLogoutUserType}
            />
          }
        />
        <Route
          path="/resume-builder/custom-input"
          element={
            <CustomInput
              setOverlayType={setOverlayType}
              setLogoutClicked={setLogoutClicked}
              setLogoutUserType={setLogoutUserType}
              setSubmitClicked={setSubmitClicked}
            />
          }
        />
      </Routes>
      {overlayType === "FetchResume" && (
        <div className="OverlayWrapper" style={{ display: "flex" }}>
          <div className="OverlayResumeData" style={{ display: "flex" }}>
            <div className="ResumeDataActions">
              <div className="OverlayCloseBtn">
                <svg
                  onClick={resetOverlay}
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#e3e3e3"
                >
                  <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                </svg>
              </div>
              <h2>Fetch previously stored Resume Data</h2>
              <div className="AuthenticationInputWrapper">
                <input
                  type="password"
                  id="in-fetch_resume_password"
                  value={userPassword}
                  placeholder=" "
                  onChange={(e) => setUserPassword(e.target.value)}
                  required
                />
                <label
                  htmlFor="in-fetch_resume_password"
                  className="AuthenticationTextFieldLabel"
                >
                  Password
                </label>
              </div>
              {overlayMessage && (
                <p style={{ color: "red" }}>{overlayMessage}</p>
              )}
              <button
                className="AuthenticationButton"
                onClick={fetchPreviousResume}
              >
                Fetch
              </button>
            </div>
          </div>
        </div>
      )}
      {overlayType === "SaveResume" && (
        <div className="OverlayWrapper" style={{ display: "flex" }}>
          <div className="OverlayResumeData" style={{ display: "flex" }}>
            <div className="ResumeDataActions">
              <div className="OverlayCloseBtn">
                <svg
                  onClick={resetOverlay}
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#e3e3e3"
                >
                  <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                </svg>
              </div>
              <h2>Save current Resume Data</h2>
              <div className="AuthenticationInputWrapper">
                <input
                  type="password"
                  id="in-fetch_resume_password"
                  value={userPassword}
                  placeholder=" "
                  onChange={(e) => setUserPassword(e.target.value)}
                  required
                />
                <label
                  htmlFor="in-fetch_resume_password"
                  className="AuthenticationTextFieldLabel"
                >
                  Password
                </label>
              </div>
              {overlayMessage && (
                <p style={{ color: "red" }}>{overlayMessage}</p>
              )}
              <button
                className="AuthenticationButton"
                onClick={saveCurrentResume}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      {overlayType === "" && (
        <div className="OverlayWrapper" style={{ display: "none" }}>
          <div className="OverlayResumeData" style={{ display: "none" }}>
            <div className="ResumeDataActions"></div>
          </div>
        </div>
      )}
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
