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

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userDept, setUserDept] = useState(
    "Information Science and Technology",
  );
  const [userCourseType, setUserCourseType] = useState("");
  const [userProgramme, setUserProgramme] = useState("");
  const [userBranch, setUserBranch] = useState("");
  const [userRegNo, setUserRegNo] = useState("");
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
    return dropdownOptions.programmes[userCourseType] || [];
  };

  const getBranchesList = () => {
    return dropdownOptions.branches[userProgramme] || [];
  };

  const chooseCourseType = (e) => {
    setUserCourseType(e.target.value);
    setUserProgramme("");
    setUserBranch("");
  };

  const chooseProgramme = (e) => {
    setUserProgramme(e.target.value);
    setUserBranch("");
  };

  const chooseBranch = (e) => {
    setUserBranch(e.target.value);
  };

  const navigateToLogin = () => {
    navigate("/");
  };

  const registerUser = async () => {
    setLoadingAnim(true);
    setServerMessage("Processing your request...");
    setServerMsgType("info");
    setShowServerMsg(true);
    if (userPassword != confirmPassword) {
      setServerMessage("Passwords doesn't match");
      setServerMsgType("warning");
      setShowServerMsg(true);
      setLoadingAnim(false);
      return;
    }
    if (!userPassword) {
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
    if (!userCourseType) {
      setServerMessage("Choose your course type to continue");
      setServerMsgType("warning");
      setShowServerMsg(true);
      setLoadingAnim(false);
      return;
    }
    if (!userProgramme) {
      setServerMessage("Select your programme to continue");
      setServerMsgType("warning");
      setShowServerMsg(true);
      setLoadingAnim(false);
      return;
    }
    if (!userBranch) {
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
          userEmail,
          userPassword,
          userRegNo,
          userDept,
          userCourseType,
          userProgramme,
          userBranch,
        },
        {},
      );

      setLoadingAnim(false);
      setServerMessage("Otp sent to email successfully");
      setServerMsgType("success");
      setShowServerMsg(true);

      setTimeout(() => {
        navigate("/verify-otp", { state: { userEmail } });
      }, 1000); //Redirect to otp verification after 1 seconds of showing success message
    } catch (error) {
      setLoadingAnim(false);
      setServerMessage(
        error.response?.data?.message || "Failed to generate Otp",
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
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
          </DualInputBox>
          <DualInputBox>
            <TextField
              sx={{ width: "80%", margin: "2rem 0rem" }}
              required
              id="inp-RegNo"
              label="Register Number"
              value={userRegNo}
              onChange={(e) => setUserRegNo(e.target.value)}
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
              value={userDept}
              onChange={(e) => setUserDept(e.target.value)}
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
              value={userCourseType}
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
              value={userProgramme}
              onChange={chooseProgramme}
              disabled={!userCourseType}
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
              value={userBranch}
              onChange={chooseBranch}
              disabled={!userProgramme}
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
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
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
            !userEmail ||
            !userPassword ||
            !confirmPassword ||
            !userRegNo ||
            !userDept ||
            !userCourseType ||
            !userProgramme ||
            !userBranch
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
