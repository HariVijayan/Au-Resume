import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../Header.jsx";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import {
  AuthenticationPagesWrapper,
  InputWrapper,
  InputBox,
} from "../Layouts.jsx";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ReplayIcon from "@mui/icons-material/Replay";
import CheckIcon from "@mui/icons-material/Check";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material";

const VerifyOTP = () => {
  const theme = useTheme();

  const [otpInput, setOtpInput] = useState("");
  const [countdown, setCountdown] = useState(60);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const userEmail = location.state?.userEmail;
  const isAdmin = location.state?.isAdmin || false;

  const [serverMessage, setServerMessage] = useState("");
  const [showServerMsg, setShowServerMsg] = useState(false);
  const [serverMsgType, setServerMsgType] = useState("error");

  const [loadingAnim, setLoadingAnim] = useState(false);

  if (!userEmail) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          margin: "2rem 0rem",
        }}
      >
        <Typography textAlign={"center"}>
          Error occurred, please restrart the process.
        </Typography>
        <Typography
          onClick={() => navigate("/")}
          sx={{
            marginLeft: "1rem",
            cursor: "pointer",
            color: theme.palette.primary.main,
            textAlign: "center",
          }}
        >
          Click here to go back.
        </Typography>
      </Box>
    );
  }

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsResendDisabled(false);
    }
  }, [countdown]);

  const verifyOtp = async () => {
    setLoadingAnim(true);
    setServerMessage("Processing your request...");
    setServerMsgType("info");
    setShowServerMsg(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/verifyOtp/existingUser/forgot-password",
        { userEmail, isAdmin, otpInput },
      );
      setLoadingAnim(false);
      setServerMessage("Successfully verified email");
      setServerMsgType("success");
      setShowServerMsg(true);

      setTimeout(() => {
        navigate("/reset-password", { state: { userEmail, isAdmin } });
      }, 1000); //Redirect to password reset page after 1 seconds of showing success message
    } catch (error) {
      setLoadingAnim(false);
      setServerMessage(error.response?.data?.message || "Failed to verify Otp");
      setServerMsgType("error");
      setShowServerMsg(true);
    }
  };

  const resendOtp = async () => {
    setLoadingAnim(true);
    setServerMessage("Processing your request...");
    setServerMsgType("info");
    setShowServerMsg(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/resendOtp/existingUser/forgot-password",
        { userEmail, isAdmin },
      );
      setLoadingAnim(false);
      setServerMessage("Successfully resent Otp");
      setServerMsgType("success");
      setShowServerMsg(true);
      setCountdown(60);
      setIsResendDisabled(true);
    } catch (error) {
      setLoadingAnim(false);
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
      <AuthenticationPagesWrapper>
        <Header headerTitle={"Verify Otp to change password"} />

        <InputWrapper>
          <InputBox>
            <TextField
              sx={{ width: "80%", margin: "2rem 0rem" }}
              required
              id="inp-Otp"
              label="Otp"
              value={otpInput}
              onChange={(e) => setOtpInput(e.target.value)}
            />
          </InputBox>
        </InputWrapper>

        {isResendDisabled && (
          <Typography sx={{ margin: "2rem 0rem", textAlign: "center" }}>
            Wait {countdown} seconds to request another otp.
          </Typography>
        )}

        <InputBox>
          {!isResendDisabled && (
            <Button
              variant="outlined"
              onClick={resendOtp}
              disabled={isResendDisabled}
              size="large"
              endIcon={<ReplayIcon />}
              loading={loadingAnim}
              loadingPosition="end"
              sx={{ textTransform: "none", marginTop: "1rem" }}
              padding={{ xs: "1rem 2rem", sm: "2rem 3rem" }}
            >
              Resend Otp
            </Button>
          )}
          <Button
            variant="contained"
            onClick={verifyOtp}
            disabled={!otpInput}
            size="large"
            endIcon={<CheckIcon />}
            loading={loadingAnim}
            loadingPosition="end"
            sx={{
              marginLeft: "1rem",
              marginTop: "1rem",
              textTransform: "none",
            }}
            padding={{ xs: "1rem 2rem", sm: "2rem 3rem" }}
          >
            Verify Otp
          </Button>
        </InputBox>
      </AuthenticationPagesWrapper>
    </>
  );
};

export default VerifyOTP;
