import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Header from "../Header.jsx";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import Box from "@mui/material/Box";
import {
  AuthenticationPagesWrapper,
  InputWrapper,
  InputBox,
} from "../Layouts.jsx";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Login = ({ setLoggedInUserType }) => {
  const theme = useTheme();

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const [serverMessage, setServerMessage] = useState("");
  const [showServerMsg, setShowServerMsg] = useState(false);
  const [serverMsgType, setServerMsgType] = useState("error");

  const [loadingAnim, setLoadingAnim] = useState(false);

  const [showPasswordIcon, setShowPasswordIcon] = useState(false);

  const showPasswordInput = () => setShowPasswordIcon((show) => !show);

  const navigate = useNavigate();

  const navigateToRegister = () => {
    navigate("/register");
  };

  const loginUser = async () => {
    setLoadingAnim(true);
    setServerMessage("Processing your request...");
    setServerMsgType("info");
    setShowServerMsg(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/authenticateUser/login",
        { loginEmail, loginPassword, rememberMe, isAdmin },
        { withCredentials: true },
      );
      setLoadingAnim(false);
      localStorage.removeItem("flagLogout");

      setServerMessage("Login Successful");
      setServerMsgType("success");
      setShowServerMsg(true);

      setTimeout(() => {
        if (
          response?.data?.message ===
          "fkjbcvjhefbvjhbghvvjh3jjn23b23huiyuycbjhejbh23"
        ) {
          setLoggedInUserType("Super Admin");
          navigate("/admin-dashboard/super-admin");
        } else if (
          response?.data?.message ===
          "io6jiojjokomioynoiynhpopjijaoindioioahibhbHVgydv"
        ) {
          setLoggedInUserType("Admin");
          navigate("/admin-dashboard/admin-general");
        } else if (
          response?.data?.message ===
          "g87uh78875gonkloiyhoi0yh0iob5mi5u5hu899igoi5mo"
        ) {
          setLoggedInUserType("Analytics");
          navigate("/admin-dashboard/analytics");
        } else if (response?.data?.message === "Login successful") {
          setLoggedInUserType("User");
          navigate("/resume-builder/template-choosing");
        }
      }, 1000); //Login after 1 seconds of showing success message
    } catch (error) {
      console.log(error.response);
      setLoadingAnim(false);
      setServerMessage(error.response?.data?.message || "Login failed");
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
        <Header headerTitle={"Welcome Back!"} />

        <InputWrapper>
          <InputBox>
            <TextField
              sx={{ width: "80%", margin: "2rem 0rem" }}
              required
              id="inp-Email"
              label="Email"
              type="email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />
          </InputBox>
          <InputBox>
            <TextField
              required
              variant="outlined"
              label="Password"
              type={showPasswordIcon ? "text" : "password"}
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
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

        <InputBox>
          <InputBox>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                  color="primary"
                />
              }
              label="System Admin"
              labelPlacement="start"
            />
          </InputBox>
          <InputBox>
            <Typography
              onClick={() => navigate("/forgot-password")}
              sx={{
                marginLeft: "1rem",
                cursor: "pointer",
                color: theme.palette.primary.main,
                textAlign: "center",
              }}
            >
              Forgot Password?
            </Typography>
          </InputBox>
        </InputBox>

        <InputWrapper>
          <InputBox>
            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  color="primary"
                />
              }
              label="Remember Me"
              labelPlacement="start"
            />
          </InputBox>
        </InputWrapper>

        <Button
          variant="contained"
          onClick={loginUser}
          disabled={!loginEmail || !loginPassword}
          size="large"
          endIcon={<LoginIcon />}
          loading={loadingAnim}
          loadingPosition="end"
          sx={{ margin: "2rem 0rem", textTransform: "none" }}
          padding={{ xs: "1rem 2rem", sm: "2rem 3rem" }}
        >
          Login
        </Button>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            margin: "2rem 0rem",
          }}
        >
          <Typography textAlign={"center"}>New User?</Typography>
          <Typography
            onClick={navigateToRegister}
            sx={{
              marginLeft: "1rem",
              cursor: "pointer",
              color: theme.palette.primary.main,
              textAlign: "center",
            }}
          >
            Click here to register
          </Typography>
        </Box>
      </AuthenticationPagesWrapper>
    </>
  );
};

export default Login;
