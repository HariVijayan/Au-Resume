import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Stack from "@mui/material/Stack";
import Header from "../Header";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const VerifyOTP = () => {
  const [otp, setOtp] = useState("");
  const [countdown, setCountdown] = useState(60);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;
  const isAdmin = location.state?.isAdmin || false;

  const [serverMessage, setServerMessage] = useState("");
  const [showServerMsg, setShowServerMsg] = useState(false);
  const [serverMsgType, setServerMsgType] = useState("error");

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

      setServerMessage("Successfully verified email");
      setServerMsgType("success");
      setShowServerMsg(true);

      setTimeout(() => {
        navigate("/reset-password", { state: { email, isAdmin } });
      }, 1000); //Redirect to password reset page after 1 seconds of showing success message
    } catch (error) {
      setServerMessage(error.response?.data?.message || "Failed to verify Otp");
      setServerMsgType("error");
      setShowServerMsg(true);
    }
  };

  const resendOtp = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/resendOtp/existingUser/forgot-password",
        { email, isAdmin }
      );
      setServerMessage("Successfully resent Otp");
      setServerMsgType("success");
      setShowServerMsg(true);
      setCountdown(60);
      setIsResendDisabled(true);
    } catch (error) {
      setServerMessage(error.response?.data?.message || "Failed to resend Otp");
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

        <button className="AuthenticationButton" onClick={verifyOtp}>
          Verify Otp
        </button>
      </Stack>
    </>
  );
};

export default VerifyOTP;
