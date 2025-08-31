import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../Header.jsx";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import dropdownOptions from "./DropdownOptions.js";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { useTheme } from "@mui/material";
import {
  AuthenticationPagesWrapper,
  DualInputWrapper,
  DualInputBox,
} from "../Layouts.jsx";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Register = () => {
  const theme = useTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [department, setDept] = useState("Information Science and Technology");
  const [courseType, setCourseType] = useState("");
  const [programme, setProgramme] = useState("");
  const [branch, setBranch] = useState("");
  const [registerNumber, setRegisterNumber] = useState("");
  const navigate = useNavigate();

  const [serverMessage, setServerMessage] = useState("");
  const [showServerMsg, setShowServerMsg] = useState(false);
  const [serverMsgType, setServerMsgType] = useState("error");

  const [loadingAnim, setLoadingAnim] = useState(false);

  const [showPasswordIcon, setShowPasswordIcon] = useState(false);

  const showPasswordInput = () => setShowPasswordIcon((show) => !show);

  const [showConfirmPasswordIcon, setShowConfirmPasswordIcon] = useState(false);

  const showConfirmPasswordInput = () =>
    setShowConfirmPasswordIcon((show) => !show);

  const getProgrammesList = () => {
    return dropdownOptions.programmes[courseType] || [];
  };

  const getBranchesList = () => {
    return dropdownOptions.branches[programme] || [];
  };

  const chooseCourseType = (e) => {
    setCourseType(e.target.value);
    setProgramme("");
    setBranch("");
  };

  const chooseProgramme = (e) => {
    setProgramme(e.target.value);
    setBranch("");
  };

  const chooseBranch = (e) => {
    setBranch(e.target.value);
  };

  const navigateToLogin = () => {
    navigate("/");
  };

  const registerUser = async () => {
    setLoadingAnim(true);
    setServerMessage("Processing your request...");
    setServerMsgType("info");
    setShowServerMsg(true);
    if (password != confirmPassword) {
      setServerMessage("Passwords doesn't match");
      setServerMsgType("warning");
      setShowServerMsg(true);
      setLoadingAnim(false);
      return;
    }
    if (!password) {
      setServerMessage("Choose your password to continue");
      setServerMsgType("warning");
      setShowServerMsg(true);
      setLoadingAnim(false);
      return;
    }
    if (!confirmPassword) {
      setServerMessage("Confirm your password to continue");
      setServerMsgType("warning");
      setShowServerMsg(true);
      setLoadingAnim(false);
      return;
    }
    if (!courseType) {
      setServerMessage("Choose your course type to continue");
      setServerMsgType("warning");
      setShowServerMsg(true);
      setLoadingAnim(false);
      return;
    }
    if (!programme) {
      setServerMessage("Select your programme to continue");
      setServerMsgType("warning");
      setShowServerMsg(true);
      setLoadingAnim(false);
      return;
    }
    if (!branch) {
      setServerMessage("Select your branch to continue");
      setServerMsgType("warning");
      setShowServerMsg(true);
      setLoadingAnim(false);
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/createUser/register",
        {
          email,
          password,
          registerNumber,
          department,
          courseType,
          programme,
          branch,
        },
        {}
      );

      setLoadingAnim(false);
      setServerMessage("Otp sent to email successfully");
      setServerMsgType("success");
      setShowServerMsg(true);

      setTimeout(() => {
        navigate("/verify-otp", { state: { email } });
      }, 1000); //Redirect to otp verification after 1 seconds of showing success message
    } catch (error) {
      setLoadingAnim(false);
      setServerMessage(
        error.response?.data?.message || "Failed to generate Otp"
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
        <Header headerTitle={"Create your account"} />
        <DualInputWrapper>
          <DualInputBox>
            <TextField
              sx={{ width: "80%", margin: "2rem 0rem" }}
              required
              id="inp-Email"
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </DualInputBox>
          <DualInputBox>
            <TextField
              sx={{ width: "80%", margin: "2rem 0rem" }}
              required
              id="inp-RegNo"
              label="Register Number"
              value={registerNumber}
              onChange={(e) => setRegisterNumber(e.target.value)}
            />
          </DualInputBox>
        </DualInputWrapper>

        <DualInputWrapper>
          <DualInputBox>
            <TextField
              sx={{ width: "80%", margin: "2rem 0rem" }}
              required
              id="se-Dept"
              select
              label="Department"
              defaultValue="Information Science and Technology"
              value={department}
              onChange={(e) => setDept(e.target.value)}
            >
              {dropdownOptions.departments.map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </DualInputBox>
          <DualInputBox>
            <TextField
              sx={{ width: "80%", margin: "2rem 0rem" }}
              required
              id="se-Course"
              select
              label="Course Type"
              defaultValue=""
              value={courseType}
              onChange={chooseCourseType}
            >
              <MenuItem value="">Choose course type</MenuItem>
              {dropdownOptions.courseTypes.map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </DualInputBox>
        </DualInputWrapper>

        <DualInputWrapper>
          <DualInputBox>
            <TextField
              sx={{ width: "80%", margin: "2rem 0rem" }}
              required
              id="se-Programme"
              select
              label="Programme"
              defaultValue=""
              value={programme}
              onChange={chooseProgramme}
              disabled={!courseType}
            >
              <MenuItem value="">Choose Programme</MenuItem>
              {getProgrammesList().map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </DualInputBox>
          <DualInputBox>
            <TextField
              sx={{ width: "80%", margin: "2rem 0rem" }}
              required
              id="se-Branch"
              select
              label="Branch"
              defaultValue=""
              value={branch}
              onChange={chooseBranch}
              disabled={!programme}
            >
              <MenuItem value="">Choose Branch</MenuItem>
              {getBranchesList().map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </DualInputBox>
        </DualInputWrapper>

        <DualInputWrapper>
          <DualInputBox>
            <TextField
              required
              variant="outlined"
              label="Password"
              type={showPasswordIcon ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
          </DualInputBox>
          <DualInputBox>
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
          </DualInputBox>
        </DualInputWrapper>

        <Button
          variant="contained"
          onClick={registerUser}
          disabled={
            !email ||
            !password ||
            !confirmPassword ||
            !registerNumber ||
            !department ||
            !courseType ||
            !programme ||
            !branch
          }
          size="large"
          endIcon={<PersonAddAlt1Icon />}
          loading={loadingAnim}
          loadingPosition="end"
          sx={{ margin: "2rem 0rem", textTransform: "none" }}
          padding={{ xs: "1rem 2rem", sm: "2rem 3rem" }}
        >
          Create
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
          <Typography textAlign={"center"}>Existing User?</Typography>
          <Typography
            onClick={navigateToLogin}
            sx={{
              marginLeft: "1rem",
              cursor: "pointer",
              color: theme.palette.primary.main,
              textAlign: "center",
            }}
          >
            Click here to login
          </Typography>
        </Box>
      </AuthenticationPagesWrapper>
    </>
  );
};

export default Register;
