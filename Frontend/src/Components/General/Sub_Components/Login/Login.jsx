import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState("");
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
      } else if (response?.data?.message === "Login successful") {
        navigate("/resume-builder/template-choosing");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div id="dv-LoginWrapper" className="AuthenticationWrapper">
      <div id="dv-LoginLogoWrapper" className="LogoWrapper">
        <img src="/Au Logo.png" id="img-aulogo" alt="AU Logo"></img>
        <p>Department of IST</p>
      </div>
      <h2>Welcome Back!</h2>

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

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button className="AuthenticationButton" onClick={loginUser}>
        Login
      </button>

      <p>
        New User?{" "}
        <span onClick={navigateToRegister} className="AuthenticationLink">
          Click here to register
        </span>
      </p>
    </div>
  );
};

export default Login;
