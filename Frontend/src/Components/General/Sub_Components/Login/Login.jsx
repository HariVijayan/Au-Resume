import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Header from "../Header";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const Login = ({ setLoggedInUserType }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const [serverMessage, setServerMessage] = useState("");
  const [showServerMsg, setShowServerMsg] = useState(false);
  const [serverMsgType, setServerMsgType] = useState("error");

  const navigate = useNavigate();

  const navigateToRegister = () => {
    navigate("/register");
  };

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/authenticateUser/login",
        { email, password, rememberMe, isAdmin },
        { withCredentials: true }
      );
      localStorage.removeItem("flagLogout");

      setServerMessage("Login Successful");
      setServerMsgType("success");
      setShowServerMsg(true);

      setTimeout(() => {
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
        } else if (response?.data?.message === "Login successful") {
          setLoggedInUserType("User");
          navigate("/resume-builder/template-choosing");
        }
      }, 1000); //Login after 1 seconds of showing success message
    } catch (error) {
      setServerMessage(error.response?.data?.message || "Login failed");
      setServerMsgType("error");
      setShowServerMsg(true);
    }
  };

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

      <Stack
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          width: "60%",
          minHeight: "100vh",
          flexDirection: "column",
        }}
      >
        <Header headerTitle={"Welcome Back!"} />

        <div className="AuthenticationDivWrapper">
          <div id="dv-LoginEmail" className="AuthenticationInputWrapper">
            <input
              type="email"
              id="in-login_email"
              value={email}
              placeholder=" "
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label
              htmlFor="in-login_email"
              className="AuthenticationTextFieldLabel"
            >
              Email Id
            </label>
          </div>
        </div>
        <div className="AuthenticationDivWrapper">
          <div id="dv-LoginPassword" className="AuthenticationInputWrapper">
            <input
              type="password"
              id="in-login_password"
              value={password}
              placeholder=" "
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label
              htmlFor="in-login_password"
              className="AuthenticationTextFieldLabel"
            >
              Password
            </label>
          </div>
        </div>
        <div id="dv-LoginForgotPassword">
          <div id="dv-LoginAdminCheckbox">
            <span>System Admin</span>
            <input
              type="checkbox"
              id="in-login_admin"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            />
          </div>
          <p onClick={() => navigate("/forgot-password")} id="p-forgotpass">
            Forgot Password?
          </p>
        </div>
        <div className="AuthenticationDivWrapper">
          <div id="dv-LoginCheckbox" className="AuthenticationInputWrapper">
            <span>Remember Me</span>
            <input
              type="checkbox"
              id="in-login_rememberme"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
          </div>
        </div>

        <button className="AuthenticationButton" onClick={loginUser}>
          Login
        </button>

        <p>
          New User?{" "}
          <span onClick={navigateToRegister} className="AuthenticationLink">
            Click here to register
          </span>
        </p>
      </Stack>
    </>
  );
};

export default Login;
