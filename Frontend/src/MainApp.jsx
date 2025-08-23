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
import LogMgmtDashboard from "./Components/Profile/SubComponents/LogMgmt/Dashboard.jsx";
import AdminLogs from "./Components/Profile/SubComponents/LogMgmt/AdminLogs.jsx";
import UserLogs from "./Components/Profile/SubComponents/LogMgmt/UserLogs.jsx";
import LogActions from "./Components/Profile/SubComponents/LogMgmt/LogActions.jsx";
import UserProfile from "./Components/Resume_Builder/Sub_Components/UserProfile.jsx";
import Analytics from "./Components/Profile/MainDashboard/AnalyticsDashboard.jsx";
import "./Components/General/General_Styles.css";
import "./Components/Resume_Builder/RB_Styles.css";
import "./Components/Profile/Profile_Styles.css";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import {
  verifySessionForAdminRoutes,
  verifySessionForProtectedRoutes,
  verifySessionForUnProtectedRoutes,
} from "./VerifyUserSession.js";
import {
  protectedRoutes,
  superAdminRoutes,
  adminRoutes,
  analyticsAdminRoutes,
} from "./Routes.js";

import ResumeInputTemplate from "./ResumeFormat.jsx";
import Overlay from "./Overlay.jsx";

function RouteWrapper() {
  const navigate = useNavigate();

  const { resumeData } = ResumeInputTemplate();
  const [loggedInUserType, setLoggedInUserType] = useState("");

  const [serverMessage, setServerMessage] = useState("");
  const [showServerMsg, setShowServerMsg] = useState(false);
  const [serverMsgType, setServerMsgType] = useState("error");

  const forceMultiTabClosureOnLogout = () => {
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

  useEffect(() => {
    const checkUserAccess = async () => {
      if (superAdminRoutes.includes(location.pathname)) {
        const sessionResponse = await verifySessionForAdminRoutes("SuperAdmin");
        if (sessionResponse.serverResponse === "") {
          setLoggedInUserType(sessionResponse.userType);
        } else {
          setServerMessage(sessionResponse.serverResponse);
          setServerMsgType("error");
          setShowServerMsg(true);
          navigate("/");
        }
      } else if (adminRoutes.includes(location.pathname)) {
        const sessionResponse = await verifySessionForAdminRoutes("Admin");
        if (sessionResponse.serverResponse === "") {
          setLoggedInUserType(sessionResponse.userType);
        } else {
          setServerMessage(sessionResponse.serverResponse);
          setServerMsgType("error");
          setShowServerMsg(true);
          navigate("/");
        }
      } else if (analyticsAdminRoutes.includes(location.pathname)) {
        const sessionResponse = await verifySessionForAdminRoutes("Analytics");
        if (sessionResponse.serverResponse === "") {
          setLoggedInUserType(sessionResponse.userType);
        } else {
          setServerMessage(sessionResponse.serverResponse);
          setServerMsgType("error");
          setShowServerMsg(true);
          navigate("/");
        }
      } else if (protectedRoutes.includes(location.pathname)) {
        const sessionResponse = await verifySessionForProtectedRoutes();
        if (sessionResponse.serverResponse != "") {
          setServerMessage(sessionResponse.serverResponse);
          setServerMsgType("error");
          setShowServerMsg(true);
          navigate("/");
        }
      } else {
        const sessionResponse = await verifySessionForUnProtectedRoutes();
        if (sessionResponse.serverResponse === "") {
          setLoggedInUserType(sessionResponse.userType);
          navigate(sessionResponse.redirectRoute);
        }
      }
    };

    checkUserAccess();
  }, [location.pathname]);

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
      setServerMessage("Successfully downloaded resume");
      setServerMsgType("success");
      setShowServerMsg(true);
    } catch (error) {
      setServerMessage(
        error.response?.data?.message || "Failed to generate resume"
      );
      setServerMsgType("error");
      setShowServerMsg(true);
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
      setServerMessage("Logout successful");
      setServerMsgType("success");
      setShowServerMsg(true);

      setTimeout(() => navigate("/"), 100);
    } catch (error) {
      setServerMessage(
        error.response?.data?.message || "Failed to logout user"
      );
      setServerMsgType("error");
      setShowServerMsg(true);
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

  return (
    <>
      <Snackbar
        open={showServerMsg}
        autoHideDuration={5000}
        onClose={() => setShowServerMsg(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Alert
          onClose={() => setShowServerMsg(false)}
          severity={serverMsgType}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {serverMessage}
        </Alert>
      </Snackbar>
      <Routes>
        <Route path="*" element={<Error404 />} />
        <Route
          path="/admin-dashboard/super-admin"
          element={
            <AdminPanelTemplate
              setLogoutClicked={setLogoutClicked}
              setLogoutUserType={setLogoutUserType}
              backArrowPageName={"Admin Dashboard"}
              headerAdminType={loggedInUserType}
              AdminConsoleContent={SuperAdminDashboard}
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
            <AdminPanelTemplate
              setLogoutClicked={setLogoutClicked}
              setLogoutUserType={setLogoutUserType}
              backArrowPageName={"Admin Dashboard"}
              headerAdminType={loggedInUserType}
              AdminConsoleContent={AdminDashboard}
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
          path="/admin-dashboard/log-management"
          element={
            <AdminPanelTemplate
              setLogoutClicked={setLogoutClicked}
              setLogoutUserType={setLogoutUserType}
              backArrowPageName={"Admin Dashboard"}
              headerAdminType={loggedInUserType}
              AdminConsoleContent={LogMgmtDashboard}
            />
          }
        />

        <Route
          path="/admin-dashboard/log-management/admin-logs"
          element={
            <AdminPanelTemplate
              setLogoutClicked={setLogoutClicked}
              setLogoutUserType={setLogoutUserType}
              backArrowPageName={"Log Management"}
              headerAdminType={loggedInUserType}
              AdminConsoleContent={AdminLogs}
            />
          }
        />

        <Route
          path="/admin-dashboard/log-management/user-logs"
          element={
            <AdminPanelTemplate
              setLogoutClicked={setLogoutClicked}
              setLogoutUserType={setLogoutUserType}
              backArrowPageName={"Log Management"}
              headerAdminType={loggedInUserType}
              AdminConsoleContent={UserLogs}
            />
          }
        />

        <Route
          path="/admin-dashboard/log-management/log-actions"
          element={
            <AdminPanelTemplate
              setLogoutClicked={setLogoutClicked}
              setLogoutUserType={setLogoutUserType}
              backArrowPageName={"Log Management"}
              headerAdminType={loggedInUserType}
              AdminConsoleContent={LogActions}
            />
          }
        />

        <Route
          path="/admin-dashboard/analytics"
          element={
            <AdminPanelTemplate
              setLogoutClicked={setLogoutClicked}
              setLogoutUserType={setLogoutUserType}
              backArrowPageName={"Admin Dashboard"}
              headerAdminType={loggedInUserType}
              AdminConsoleContent={Analytics}
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
        <Overlay
          overlayTitle={"Fetch previously stored Resume Data"}
          overlayAction={"Fetch"}
          setOverlayType={setOverlayType}
        />
      )}

      {overlayType === "SaveResume" && (
        <Overlay
          overlayTitle={"Save current Resume Data"}
          overlayAction={"Save"}
          setOverlayType={setOverlayType}
        />
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
