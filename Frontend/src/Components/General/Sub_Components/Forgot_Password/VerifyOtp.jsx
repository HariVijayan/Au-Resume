import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

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
    <div id="dv-FPOtpWrapper" className="AuthenticationWrapper">
      <div id="dv-FPOtpLogoWrapper" className="LogoWrapper">
        <img src="/Au Logo.png" id="img-aulogo" alt="AU Logo"></img>
        <p>Department of IST</p>
      </div>
      <h2>Verify Otp to change password</h2>
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
    </div>
  );
};

export default VerifyOTP;
