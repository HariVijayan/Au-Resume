import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Stack from "@mui/material/Stack";
import Header from "../Header";

const VerifyOTP = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(60);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;
  const isAdmin = location.state?.isAdmin || false;

  if (!email) {
    return <p>Please restart the process.</p>;
  }

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsResendDisabled(false);
    }
  }, [countdown]);

  const verifyOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/verifyOtp/existingUser/forgot-password",
        { email, isAdmin, otp }
      );
      setError(response.data.message);

      if (response.statusText === "OK") {
        navigate("/reset-password", { state: { email, isAdmin } });
      } else {
        setError(response.data.message || "OTP Verification Failed!");
      }
    } catch (error) {
      setError(error.response.data.message || "OTP Verification Failed!");
    }
  };

  const resendOtp = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/resendOtp/existingUser/forgot-password",
        { email, isAdmin }
      );
      setError(response.data.message);
      console.log(response);

      if (response.statusText === "OK") {
        setCountdown(60);
        setIsResendDisabled(true);
      }
    } catch (error) {
      console.log("Error: ", error);
      setError("Failed to resend OTP.");
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
      <Header headerTitle={"Verify Otp to change password"} />
      <div className="AuthenticationDivWrapper">
        <div id="dv-ForgotPasswordOtp" className="AuthenticationInputWrapper">
          <input
            type="text"
            id="in-fp_otp"
            placeholder=" "
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <label htmlFor="in-fp_otp" className="AuthenticationTextFieldLabel">
            Otp
          </label>
        </div>
      </div>

      {isResendDisabled && (
        <p>Wait {countdown} seconds to request another otp.</p>
      )}

      {!isResendDisabled && (
        <p
          onClick={resendOtp}
          style={{ color: "red", cursor: "pointer", padding: "20px" }}
        >
          Resend Otp
        </p>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button className="AuthenticationButton" onClick={verifyOtp}>
        Verify Otp
      </button>
    </Stack>
  );
};

export default VerifyOTP;
