import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/authenticateUser/login",
        { email, password, rememberMe },
        { withCredentials: true } // Ensures cookies are included
      );
      navigate("/resume-builder/template-choosing");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div id="dv-LoginWrapper">
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div id="dv-LoginEmail" className="InputWrapper">
        <input
          type="email"
          id="in-login_email"
          value={email}
          placeholder=" "
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="in-login_email" className="TextFieldLabel">
          Email Id
        </label>
      </div>
      <div id="dv-LoginPassword" className="InputWrapper">
        <input
          type="password"
          id="in-login_password"
          value={password}
          placeholder=" "
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label htmlFor="in-login_password" className="TextFieldLabel">
          Password
        </label>
      </div>
      <div id="dv-LoginCheckbox" className="InputWrapper">
        <input
          type="checkbox"
          id="in-login_rememberme"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
        />
        <label htmlFor="in-login_rememberme" className="TextFieldLabel">
          Remember Me
        </label>
      </div>
      <button onClick={handleSubmit}>Login</button>
      <p>
        <button onClick={() => navigate("/forgot-password")}>
          Forgot Password?
        </button>
      </p>
    </div>
  );
};

export default Login;
