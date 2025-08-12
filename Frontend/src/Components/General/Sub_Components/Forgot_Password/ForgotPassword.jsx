import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Header from "../Header";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const getOtp = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/getFirstOtp/password-reset-otp",
        { email, isAdmin }
      );
      setError(response.data.message);

      navigate("/verify-password-otp", { state: { email, isAdmin } });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP");
    }
  };

  return (
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
      <Header headerTitle={"Verify Email to reset password"} />
      <div className="AuthenticationDivWrapper">
        <div id="dv-ForgotPassword" className="AuthenticationInputWrapper">
          <input
            type="email"
            id="in-fp_email"
            placeholder=" "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="in-fp_email" className="AuthenticationTextFieldLabel">
            Email Id
          </label>
        </div>
      </div>
      <div id="dv-FPAdminCheckbox">
        <span>System Admin</span>
        <input
          type="checkbox"
          id="in-fp_admin"
          checked={isAdmin}
          onChange={(e) => setIsAdmin(e.target.checked)}
        />
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button className="AuthenticationButton" onClick={getOtp}>
        Get Otp
      </button>
    </Stack>
  );
};

export default ForgotPassword;
