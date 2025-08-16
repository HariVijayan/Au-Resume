import { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
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
import DoneAllIcon from "@mui/icons-material/DoneAll";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const ResetPassword = () => {
  const theme = useTheme();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  const isAdmin = location.state?.isAdmin || false;

  const [serverMessage, setServerMessage] = useState("");
  const [showServerMsg, setShowServerMsg] = useState(false);
  const [serverMsgType, setServerMsgType] = useState("error");

  const [loadingAnim, setLoadingAnim] = useState(false);

  const [showPasswordIcon, setShowPasswordIcon] = useState(false);

  const showPasswordInput = () => setShowPasswordIcon((show) => !show);

  const [showConfirmPasswordIcon, setShowConfirmPasswordIcon] = useState(false);

  const showConfirmPasswordInput = () =>
    setShowConfirmPasswordIcon((show) => !show);

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

  const resetPassword = async () => {
    setLoadingAnim(true);
    setServerMessage("Processing your request...");
    setServerMsgType("info");
    setShowServerMsg(true);
    if (newPassword != confirmPassword) {
      setServerMessage("Passwords doesn't match");
      setServerMsgType("warning");
      setShowServerMsg(true);
      setLoadingAnim(false);
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/userRequest/reset-password",
        { email, newPassword, isAdmin }
      );
      setLoadingAnim(false);
      setServerMessage("Password reset successful");
      setServerMsgType("success");
      setShowServerMsg(true);

      setTimeout(() => {
        navigate("/");
      }, 1000); //Redirect to login page after 1 seconds of showing success message
    } catch (error) {
      setLoadingAnim(false);
      setServerMessage(
        error.response?.data?.message || "Password reset failed"
      );
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
        <Header headerTitle={"Reset Password"} />

        <InputWrapper>
          <InputBox>
            <TextField
              required
              variant="outlined"
              label="Password"
              type={showPasswordIcon ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={
                          showPasswordIcon
                            ? "hide the password"
                            : "display the password"
                        }
                        onClick={showPasswordInput}
                      >
                        {showPasswordIcon ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
              sx={{ width: "80%", margin: "2rem 0rem" }}
            />
          </InputBox>
        </InputWrapper>

        <InputWrapper>
          <InputBox>
            <TextField
              required
              variant="outlined"
              label="Password"
              type={showConfirmPasswordIcon ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={
                          showConfirmPasswordIcon
                            ? "hide the password"
                            : "display the password"
                        }
                        onClick={showConfirmPasswordInput}
                      >
                        {showConfirmPasswordIcon ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
              sx={{ width: "80%", margin: "2rem 0rem" }}
            />
          </InputBox>
        </InputWrapper>

        <Button
          variant="contained"
          color="success"
          onClick={resetPassword}
          disabled={!newPassword || !confirmPassword}
          size="large"
          endIcon={<DoneAllIcon />}
          loading={loadingAnim}
          loadingPosition="end"
          sx={{ margin: "2rem 0rem", textTransform: "none" }}
          padding={{ xs: "1rem 2rem", sm: "2rem 3rem" }}
        >
          Reset Password
        </Button>
      </AuthenticationPagesWrapper>
    </>
  );
};

export default ResetPassword;
