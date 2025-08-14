import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../Header";
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
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material";
import ReplayIcon from "@mui/icons-material/Replay";
import DoneAllIcon from "@mui/icons-material/DoneAll";

const VerifyOTP = () => {
  const theme = useTheme();

  const [otp, setOtp] = useState("");
  const [countdown, setCountdown] = useState(60); // Initial countdown time
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const [serverMessage, setServerMessage] = useState("");
  const [showServerMsg, setShowServerMsg] = useState(false);
  const [serverMsgType, setServerMsgType] = useState("error");

  const [loadingAnim, setLoadingAnim] = useState(false);

  if (!email) {
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
        "http://localhost:5000/verifyOtp/newUser/registration",
        { email, otp }
      );
      setLoadingAnim(false);
      setServerMessage("Successfully created account");
      setServerMsgType("success");
      setShowServerMsg(true);

      setTimeout(() => {
        navigate("/");
      }, 1000); //Redirect to login page after 1 seconds of showing success message
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
        "http://localhost:5000/resendOtp/newUser/registration",
        { email }
      );
      setLoadingAnim(false);
      setServerMessage("Successfully resent Otp");
      setServerMsgType("success");
      setShowServerMsg(true);

      setCountdown(60); // Reset the countdown
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
        <Header headerTitle={"Verify Otp to create account"} />

        <InputWrapper>
          <InputBox>
            <TextField
              sx={{ width: "80%", margin: "2rem 0rem" }}
              required
              id="inp-Otp"
              label="Otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
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
            color="success"
            onClick={verifyOtp}
            disabled={!otp}
            size="large"
            endIcon={<DoneAllIcon />}
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
