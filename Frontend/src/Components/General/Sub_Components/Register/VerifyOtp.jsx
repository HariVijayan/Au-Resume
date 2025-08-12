import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Header from "../Header";

const VerifyOTP = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(60); // Initial countdown time
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

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
      const response = await fetch(
        "http://localhost:5000/verifyOtp/newUser/registration",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp }),
        }
      );

      const data = await response.json();
      setError(data.message);

      if (response.ok) {
        navigate("/"); // Redirect to login page
      } else {
        setError(data.message || "OTP Verification Failed!");
      }
    } catch (error) {
      setError(error.response.data.message || "OTP Verification Failed!");
    }
  };

  const resendOtp = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/resendOtp/newUser/registration",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();
      setError(data.message);

      if (response.ok) {
        setCountdown(60); // Reset the countdown
        setIsResendDisabled(true);
      } else {
        setError(data.message || "Failed to resend OTP.");
      }
    } catch (error) {
      setError(error.response.data.message || "Failed to resend OTP.");
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
      <Header headerTitle={"Verify Otp to create account"} />
      <div className="AuthenticationDivWrapper">
        <div id="dv-RegisterOtpCheckbox" className="AuthenticationInputWrapper">
          <input
            type="text"
            id="in-register_otp"
            placeholder=" "
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <label
            htmlFor="in-register_otp"
            className="AuthenticationTextFieldLabel"
          >
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
