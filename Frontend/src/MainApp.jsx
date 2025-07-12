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
import AdminPanelTemplate from "./Components/Profile/AdminPanelTemplate.jsx";
import SuperAdminDashboard from "./Components/Profile/MainDashboard/SuperAdminDashboard.jsx";
import AdminMgmtDashboard from "./Components/Profile/SubComponents/AdminMgmt/Dashboard.jsx";
import AddAdmin from "./Components/Profile/SubComponents/AdminMgmt/AddAdmin.jsx";
import RemoveAdmin from "./Components/Profile/SubComponents/AdminMgmt/RemoveAdmin.jsx";
import ModifyAdmin from "./Components/Profile/SubComponents/AdminMgmt/ModifyAdmin.jsx";
import AdminDashboard from "./Components/Profile/MainDashboard/AdminDashboard.jsx";
import UserMgmtDashboard from "./Components/Profile/SubComponents/UserMgmt/Dashboard.jsx";
import AddUser from "./Components/Profile/SubComponents/UserMgmt/AddUser.jsx";
import RemoveUser from "./Components/Profile/SubComponents/UserMgmt/RemoveUser.jsx";
import ModifyUser from "./Components/Profile/SubComponents/UserMgmt/ModifyUser.jsx";
import LogMgmtDashboard from "./Components/Profile/SubComponents/LogMgmt/LogMgmt.jsx";
import UserProfile from "./Components/Resume_Builder/Sub_Components/UserProfile.jsx";
import Analytics from "./Components/Profile/MainDashboard/AnalyticsDashboard.jsx";
import "./Components/General/General_Styles.css";
import "./Components/Resume_Builder/RB_Styles.css";
import "./Components/Profile/Profile_Styles.css";

import ResumeInputTemplate from "./ResumeFormat.jsx";

function RouteWrapper() {
  const { resumeData, setResumeData } = ResumeInputTemplate();
  const [loggedInUserType, setLoggedInUserType] = useState("");

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
    "/admin-dashboard/super-admin/admin-management/add-admin",
    "/admin-dashboard/super-admin/admin-management/remove-admin",
    "/admin-dashboard/super-admin/admin-management/modify-admin",
  ];

  const adminRoutes = [
    "/admin-dashboard/admin-general",
    "/admin-dashboard/user-management",
    "/admin-dashboard/user-management/add-user",
    "/admin-dashboard/user-management/remove-user",
    "/admin-dashboard/user-management/modify-user",
  ];

  const analyticsAdminRoutes = ["/admin-dashboard/log-management"];
  const navigate = useNavigate();

  const verifySessionForAdminRoutes = async (routeType) => {
    //Redirect to login page if previous session is invalid or user not an admin. If session is valid and user is admin, no action is taken.
    try {
      const response = await axios.post(
        "http://localhost:5000/verifyAdminSession/check-admin-access",
        { routeType },
        { withCredentials: true }
      );

      if (
        response?.data?.message ===
        "fkjbcvjhefbvjhbghvvjh3jjn23b23huiyuycbjhejbh23"
      ) {
        setLoggedInUserType("Super Admin");
      } else if (
        response?.data?.message ===
        "io6jiojjokomioynoiynhpopjijaoindioioahibhbHVgydv"
      ) {
        setLoggedInUserType("Admin");
      } else if (
        response?.data?.message ===
        "g87uh78875gonkloiyhoi0yh0iob5mi5u5hu899igoi5mo"
      ) {
        setLoggedInUserType("Analytics");
      } else {
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
        setLoggedInUserType("Super Admin");
        navigate("/admin-dashboard/super-admin");
      } else if (
        response?.data?.message ===
        "io6jiojjokomioynoiynhpopjijaoindioioahibhbHVgydv"
      ) {
        setLoggedInUserType("Admin");
        navigate("/admin-dashboard/admin-general");
      } else if (
        response?.data?.message ===
        "g87uh78875gonkloiyhoi0yh0iob5mi5u5hu899igoi5mo"
      ) {
        setLoggedInUserType("Analytics");
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
            <SuperAdminDashboard
              setLogoutClicked={setLogoutClicked}
              setLogoutUserType={setLogoutUserType}
            />
          }
        />
        <Route
          path="/admin-dashboard/super-admin/admin-management"
          element={
            <AdminPanelTemplate
              setLogoutClicked={setLogoutClicked}
              setLogoutUserType={setLogoutUserType}
              backArrowPageName={"Admin Dashboard"}
              headerAdminType={loggedInUserType}
              AdminConsoleContent={AdminMgmtDashboard}
            />
          }
        />
        <Route
          path="/admin-dashboard/super-admin/admin-management/add-admin"
          element={
            <>
              <AdminPanelTemplate
                setLogoutClicked={setLogoutClicked}
                setLogoutUserType={setLogoutUserType}
                backArrowPageName={"Admin Management"}
                headerAdminType={loggedInUserType}
                AdminConsoleContent={AddAdmin}
              />
            </>
          }
        />

        <Route
          path="/admin-dashboard/super-admin/admin-management/remove-admin"
          element={
            <AdminPanelTemplate
              setLogoutClicked={setLogoutClicked}
              setLogoutUserType={setLogoutUserType}
              backArrowPageName={"Admin Management"}
              headerAdminType={loggedInUserType}
              AdminConsoleContent={RemoveAdmin}
            />
          }
        />

        <Route
          path="/admin-dashboard/super-admin/admin-management/modify-admin"
          element={
            <AdminPanelTemplate
              setLogoutClicked={setLogoutClicked}
              setLogoutUserType={setLogoutUserType}
              backArrowPageName={"Admin Management"}
              headerAdminType={loggedInUserType}
              AdminConsoleContent={ModifyAdmin}
            />
          }
        />
        <Route
          path="/admin-dashboard/admin-general"
          element={
            <AdminDashboard
              setLogoutClicked={setLogoutClicked}
              setLogoutUserType={setLogoutUserType}
            />
          }
        />
        <Route
          path="/admin-dashboard/user-management"
          element={
            <AdminPanelTemplate
              setLogoutClicked={setLogoutClicked}
              setLogoutUserType={setLogoutUserType}
              backArrowPageName={"Admin Dashboard"}
              headerAdminType={loggedInUserType}
              AdminConsoleContent={UserMgmtDashboard}
            />
          }
        />

        <Route
          path="/admin-dashboard/user-management/add-user"
          element={
            <AdminPanelTemplate
              setLogoutClicked={setLogoutClicked}
              setLogoutUserType={setLogoutUserType}
              backArrowPageName={"User Management"}
              headerAdminType={loggedInUserType}
              AdminConsoleContent={AddUser}
            />
          }
        />

        <Route
          path="/admin-dashboard/user-management/remove-user"
          element={
            <AdminPanelTemplate
              setLogoutClicked={setLogoutClicked}
              setLogoutUserType={setLogoutUserType}
              backArrowPageName={"User Management"}
              headerAdminType={loggedInUserType}
              AdminConsoleContent={RemoveUser}
            />
          }
        />

        <Route
          path="/admin-dashboard/user-management/modify-user"
          element={
            <AdminPanelTemplate
              setLogoutClicked={setLogoutClicked}
              setLogoutUserType={setLogoutUserType}
              backArrowPageName={"User Management"}
              headerAdminType={loggedInUserType}
              AdminConsoleContent={ModifyUser}
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
          path="/admin-dashboard/super-admin/log-management"
          element={
            <LogMgmtDashboard
              setLogoutClicked={setLogoutClicked}
              setLogoutUserType={setLogoutUserType}
            />
          }
        />
        <Route
          path="/user-profile"
          element={
            <UserProfile
              setLogoutClicked={setLogoutClicked}
              setLogoutUserType={setLogoutUserType}
            />
          }
        />
        <Route
          path="/"
          element={<Login setLoggedInUserType={setLoggedInUserType} />}
        />
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
          <div className="OverlayData" style={{ display: "flex" }}>
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
          <div className="OverlayData" style={{ display: "flex" }}>
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
          <div className="OverlayData" style={{ display: "none" }}></div>
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
