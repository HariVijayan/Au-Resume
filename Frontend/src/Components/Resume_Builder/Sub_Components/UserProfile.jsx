import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LogoutIcon from "@mui/icons-material/Logout";
import TableRowsIcon from "@mui/icons-material/TableRows";
import PasswordIcon from "@mui/icons-material/Password";
import KeyIcon from "@mui/icons-material/Key";
import CheckIcon from "@mui/icons-material/Check";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FilterListAltIcon from "@mui/icons-material/FilterListAlt";
import Footer from "./Footer";

const PAGE_SIZE = 50;

const User = ({ setLogoutClicked, setLogoutUserType }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState("");
  const [userRegNo, setUserRegNo] = useState("");
  const [userDept, setUserDept] = useState("");
  const [userCourseType, setUserCourseType] = useState("");
  const [userProgramme, setUserProgramme] = useState("");
  const [userBranch, setUserBranch] = useState("");
  const [accountCreated, setAccountCreated] = useState("");
  const [loadingAnim, setLoadingAnim] = useState(false);

  const [requestType, setRequestType] = useState("");

  const [mainContent, setMainContent] = useState("");
  const [otpInput, setOtpInput] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPasswordIcon, setShowPasswordIcon] = useState(false);

  const showPasswordInput = () => setShowPasswordIcon((show) => !show);

  const [showConfirmPasswordIcon, setShowConfirmPasswordIcon] = useState(false);

  const showConfirmPasswordInput = () =>
    setShowConfirmPasswordIcon((show) => !show);

  const [serverMessage, setServerMessage] = useState("");
  const [showServerMsg, setShowServerMsg] = useState(false);
  const [serverMsgType, setServerMsgType] = useState("error");

  const [logsData, setLogsData] = useState({
    DateNewest: [],
    DateOldest: [],
  });
  const [visibleLogs, setVisibleLogs] = useState([]);
  const [visibleLogsStart, setVisibleLogsStart] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const [logTypeRequested, setLogTypeRequested] = useState("");
  const [sortBy, setSortBy] = useState("DateNewest");

  const [showFilters, setShowFilters] = useState(false);

  const [createdByFilter, setCreatedByFilter] = useState("");
  const [logFilter, setLogFilter] = useState("");

  useEffect(() => {
    setLoadingAnim(true);
    setServerMessage("Fetching user details");
    setServerMsgType("info");
    setShowServerMsg(true);
    const fetchUserDetails = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/userDetails/getUserDetails",
          { requestType },
          { withCredentials: true }
        );
        setUserEmail(response.data.Email);
        setUserRegNo(response.data.RegNo);
        setUserDept(response.data.Dept);
        setUserCourseType(response.data.Course);
        setUserProgramme(response.data.Programme);
        setUserBranch(response.data.Branch);
        setAccountCreated(response.data.Created);
        setServerMessage("Successfully fetched user's details");
        setServerMsgType("success");
        setShowServerMsg(true);
        setLoading(false);
        setLoadingAnim(false);
      } catch (error) {
        setLoadingAnim(false);
        setServerMessage(
          error.response?.data?.message || "Failed to fetch user's details"
        );
        setServerMsgType("error");
        setShowServerMsg(true);
      }
    };
    fetchUserDetails();
  }, [location.pathname]);

  const generateOtp = async (otpReason) => {
    setLoadingAnim(true);
    setServerMessage("Processing your request...");
    setServerMsgType("info");
    setShowServerMsg(true);

    if (otpReason === "PasswordReset") {
      if (newPassword != confirmPassword) {
        setServerMessage("Passwords doesn't match");
        setServerMsgType("error");
        setShowServerMsg(true);
        setLoadingAnim(false);
        return;
      }
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/user/approvals/getApprovalOtp",
        { requestType: otpReason, newPassword },
        { withCredentials: true }
      );
      setRequestType(otpReason);
      setMainContent("ShowOtp");
      setOtpInput("");
      setServerMessage("Otp sent to email successfully");
      setServerMsgType("success");
      setShowServerMsg(true);
      setLoadingAnim(false);
    } catch (error) {
      setLoadingAnim(false);
      setServerMessage(
        error.response?.data?.message || "Failed to generate Otp"
      );
      setServerMsgType("error");
      setShowServerMsg(true);
    }
  };

  const resetPassword = async () => {
    setLoadingAnim(true);
    setServerMessage("Processing your request...");
    setServerMsgType("info");
    setShowServerMsg(true);

    if (newPassword != confirmPassword) {
      setServerMessage("Passwords doesn't match");
      setServerMsgType("error");
      setShowServerMsg(true);
      setLoadingAnim(false);
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/user/passwordAction/resetPassword",
        { userEmail, newPassword, otpInput },
        { withCredentials: true }
      );
      setServerMessage("Password reset successful");
      setServerMsgType("success");
      setShowServerMsg(true);
      setLoadingAnim(false);
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

  const resetEncryptionKey = async () => {
    setLoadingAnim(true);
    setServerMessage("Processing your request...");
    setServerMsgType("info");
    setShowServerMsg(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/user/encryptionKey/resetEncKey",
        { userEmail, otpInput },
        { withCredentials: true }
      );
      setMainContent("");
      setServerMessage("Encryption Key reset successful");
      setServerMsgType("success");
      setShowServerMsg(true);
      setLoadingAnim(false);
      setTimeout(() => {
        window.location.reload(false); // This will trigger a page reload after 3 seconds delay
      }, 3000);
    } catch (error) {
      setLoadingAnim(false);
      setServerMessage(
        error.response?.data?.message || "Failed to reset encryption key"
      );
      setServerMsgType("error");
      setShowServerMsg(true);
    }
  };

  const fetchLogs = async () => {
    let isMounted = true;
    setLoading(true);
    setVisibleLogs([]);
    setVisibleLogsStart(0);
    setCreatedByFilter("");
    setLogFilter("");

    setLoadingAnim(true);
    setServerMessage("Processing your request...");
    setServerMsgType("info");
    setShowServerMsg(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/user/logAction/getLogs",
        { otpInput },
        { withCredentials: true }
      );
      if (!isMounted) return;
      const {
        timeSortedNewest = [],
        timeSortedOldest = [],
        totalRecords = 0,
      } = response.data;

      setLogsData({
        DateNewest: timeSortedNewest,
        DateOldest: timeSortedOldest,
      });
      setTotalRecords(totalRecords);
      setVisibleLogsStart(0);
      setLoading(false);
      setMainContent("ShowLogs");
      setServerMessage("Fetched logs successfully");
      setServerMsgType("success");
      setShowServerMsg(true);
      setLoadingAnim(false);
    } catch (error) {
      setLoadingAnim(false);
      if (!isMounted) return;
      setLogsData({
        DateNewest: [],
        DateOldest: [],
      });
      setTotalRecords(0);
      setVisibleLogs([]);
      setServerMessage(error.response?.data?.message || "Failed to fetch logs");
      setServerMsgType("error");
      setShowServerMsg(true);
    } finally {
      if (isMounted) setLoading(false);
    }
  };

  const applyFilterAndSort = () => {
    let selectedLogs = logsData[sortBy] || [];

    if (createdByFilter.trim() !== "") {
      selectedLogs = selectedLogs.filter((log) =>
        log.logAddedBy.toLowerCase().includes(createdByFilter.toLowerCase())
      );
    }

    if (logFilter.trim() !== "") {
      selectedLogs = selectedLogs.filter((log) =>
        log.logDetails.toLowerCase().includes(logFilter.toLowerCase())
      );
    }

    setVisibleLogs(
      selectedLogs.slice(visibleLogsStart, visibleLogsStart + PAGE_SIZE)
    );
    setTotalRecords(selectedLogs.length);
  };

  useEffect(() => {
    applyFilterAndSort();
  }, [logsData, sortBy, visibleLogsStart]);

  const handlePrev = () =>
    setVisibleLogsStart((start) => Math.max(0, start - PAGE_SIZE));

  const handleNext = () =>
    setVisibleLogsStart((start) =>
      Math.min(start + PAGE_SIZE, Math.max(0, totalRecords - PAGE_SIZE))
    );

  const toggleFilters = () => setShowFilters((prev) => !prev);

  const implementUserAction = () => {
    if (requestType === "GetLogs") {
      fetchLogs();
    }
    if (requestType === "PasswordReset") {
      resetPassword();
    }
    if (requestType === "EncryptionKeyReset") {
      resetEncryptionKey();
    }
  };

  const logoutUser = () => {
    setLogoutUserType("User");
    setLogoutClicked(true);
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
      {loading && (
        <Typography textAlign={"center"}>Loading please wait...</Typography>
      )}
      {!loading && (
        <>
          <Box
            id="HeaderWrapper"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "90%",
              margin: "2rem 0rem",
              gap: "1rem",
            }}
            flexDirection={{ xs: "column", sm: "row" }}
          >
            <Typography
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                ":hover": { color: theme.palette.primary.main },
              }}
              variant="h5"
              onClick={() => navigate(-1)}
            >
              <ArrowBackIcon sx={{ fill: theme.palette.primary.main }} />
              Resume Builder
            </Typography>

            <Typography
              sx={{
                color: theme.palette.secondary.main,
              }}
              variant="h4"
            >
              User Profile
            </Typography>

            <IconButton
              aria-label="logout user"
              color="error"
              onClick={logoutUser}
            >
              <LogoutIcon />
            </IconButton>
          </Box>
          <Box
            id="ContentWrapper"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "90%",
              margin: "2rem 0rem",
              flexDirection: "column",
            }}
          >
            <Box
              id="UserDetailsWrapper"
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                flexDirection: "column",
                margin: "2rem 0rem",
              }}
            >
              <Box
                id="DualUserDetails"
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  width: "100%",
                }}
                flexDirection={{ xs: "column", md: "row" }}
              >
                <Box
                  id="UserDetails"
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    margin: "2rem 0em",
                    borderBottom: "2px solid black",
                    flexWrap: "wrap",
                  }}
                  width={{ xs: "100%", sm: "70%", md: "40%", lg: "30%" }}
                >
                  <Typography
                    sx={{
                      color: theme.palette.primary.main,
                      fontWeight: "bold",
                    }}
                  >
                    Email
                  </Typography>
                  <Typography>{userEmail}</Typography>
                </Box>
                <Box
                  id="UserDetails"
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    margin: "2rem 0em",
                    borderBottom: "2px solid black",
                    flexWrap: "wrap",
                  }}
                  width={{ xs: "100%", sm: "70%", md: "40%", lg: "30%" }}
                >
                  <Typography
                    sx={{
                      color: theme.palette.primary.main,
                      fontWeight: "bold",
                    }}
                  >
                    Register Number
                  </Typography>
                  <Typography>{userRegNo}</Typography>
                </Box>
              </Box>
              <Box
                id="DualUserDetails"
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  width: "100%",
                }}
                flexDirection={{ xs: "column", md: "row" }}
              >
                <Box
                  id="UserDetails"
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    margin: "2rem 0em",
                    borderBottom: "2px solid black",
                    flexWrap: "wrap",
                  }}
                  width={{ xs: "100%", sm: "70%", md: "40%", lg: "30%" }}
                >
                  <Typography
                    sx={{
                      color: theme.palette.primary.main,
                      fontWeight: "bold",
                    }}
                  >
                    Department
                  </Typography>
                  <Typography>{userDept}</Typography>
                </Box>
                <Box
                  id="UserDetails"
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    margin: "2rem 0em",
                    borderBottom: "2px solid black",
                    flexWrap: "wrap",
                  }}
                  width={{ xs: "100%", sm: "70%", md: "40%", lg: "30%" }}
                >
                  <Typography
                    sx={{
                      color: theme.palette.primary.main,
                      fontWeight: "bold",
                    }}
                  >
                    Course Type
                  </Typography>
                  <Typography>{userCourseType}</Typography>
                </Box>
              </Box>
              <Box
                id="DualUserDetails"
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  width: "100%",
                }}
                flexDirection={{ xs: "column", md: "row" }}
              >
                <Box
                  id="UserDetails"
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    margin: "2rem 0em",
                    borderBottom: "2px solid black",
                    flexWrap: "wrap",
                  }}
                  width={{ xs: "100%", sm: "70%", md: "40%", lg: "30%" }}
                >
                  <Typography
                    sx={{
                      color: theme.palette.primary.main,
                      fontWeight: "bold",
                    }}
                  >
                    Programme
                  </Typography>
                  <Typography>{userProgramme}</Typography>
                </Box>
                <Box
                  id="UserDetails"
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    margin: "2rem 0em",
                    borderBottom: "2px solid black",
                    flexWrap: "wrap",
                  }}
                  width={{ xs: "100%", sm: "70%", md: "40%", lg: "30%" }}
                >
                  <Typography
                    sx={{
                      color: theme.palette.primary.main,
                      fontWeight: "bold",
                    }}
                  >
                    Branch
                  </Typography>
                  <Typography>{userBranch}</Typography>
                </Box>
              </Box>
              <Box
                id="UserDetails"
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  margin: "2rem 0em",
                  borderBottom: "2px solid black",
                  flexWrap: "wrap",
                }}
                width={{ xs: "100%", sm: "70%", md: "40%", lg: "30%" }}
              >
                <Typography
                  sx={{
                    color: theme.palette.primary.main,
                    fontWeight: "bold",
                  }}
                >
                  Account Created
                </Typography>
                <Typography>{accountCreated}</Typography>
              </Box>
            </Box>

            <Box
              id="UserActionButtonsWrapper"
              sx={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                width: "100%",
                flexWrap: "wrap",
                gap: "1rem",
              }}
            >
              <Button
                variant="contained"
                onClick={() => generateOtp("GetLogs")}
                size="large"
                disabled={
                  requestType === "PasswordReset" ||
                  requestType === "EncryptionKeyReset"
                }
                endIcon={<TableRowsIcon />}
                loading={loadingAnim}
                loadingPosition="end"
                sx={{ margin: "2rem 0rem", textTransform: "none" }}
                padding={{ xs: "1rem 2rem", sm: "2rem 3rem" }}
              >
                Show Logs
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => setMainContent("DisclaimerPassword")}
                size="large"
                disabled={
                  requestType === "GetLogs" ||
                  requestType === "EncryptionKeyReset"
                }
                endIcon={<PasswordIcon />}
                loading={loadingAnim}
                loadingPosition="end"
                sx={{ margin: "2rem 0rem", textTransform: "none" }}
                padding={{ xs: "1rem 2rem", sm: "2rem 3rem" }}
              >
                Reset Password
              </Button>

              <Button
                variant="contained"
                color="secondary"
                onClick={() => setMainContent("DisclaimerEncryption")}
                size="large"
                disabled={
                  requestType === "GetLogs" || requestType === "PasswordReset"
                }
                endIcon={<KeyIcon />}
                loading={loadingAnim}
                loadingPosition="end"
                sx={{
                  margin: "2rem 0rem",
                  textTransform: "none",
                  backgroundColor: theme.palette.brown.main,
                }}
                padding={{ xs: "1rem 2rem", sm: "2rem 3rem" }}
              >
                Reset Encryption Key
              </Button>
            </Box>

            {!loading && mainContent === "DisclaimerPassword" && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "1rem",
                  flexDirection: "column",
                  margin: "2rem 0rem",
                }}
                width={{ xs: "100%", md: "50%", lg: "40%" }}
              >
                <Typography sx={{ textAlign: "center" }}>
                  Resetting your password will also remove your previously saved
                  resume details and will close this current active session. You
                  need to login again.
                </Typography>

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
                            {showPasswordIcon ? (
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

                <TextField
                  required
                  variant="outlined"
                  label="Confirm Password"
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

                <Button
                  variant="outlined"
                  onClick={() => generateOtp("PasswordReset")}
                  size="large"
                  endIcon={<CheckIcon />}
                  loading={loadingAnim}
                  loadingPosition="end"
                  sx={{
                    margin: "2rem 0rem",
                    textTransform: "none",
                  }}
                  padding={{ xs: "1rem 2rem", sm: "2rem 3rem" }}
                >
                  Continue
                </Button>
              </Box>
            )}
            {!loading && mainContent === "DisclaimerEncryption" && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "1rem",
                  flexDirection: "column",
                  margin: "2rem 0rem",
                }}
                width={{ xs: "100%", md: "50%", lg: "40%" }}
              >
                <Typography sx={{ textAlign: "center" }}>
                  Resetting your encryption key will also remove your previously
                  saved resume details. You will need to re-enter your resume
                  details for all fields from scratch.
                </Typography>
                <Button
                  variant="outlined"
                  onClick={() => generateOtp("EncryptionKeyReset")}
                  size="large"
                  endIcon={<CheckIcon />}
                  loading={loadingAnim}
                  loadingPosition="end"
                  sx={{
                    margin: "2rem 0rem",
                    textTransform: "none",
                  }}
                  padding={{ xs: "1rem 2rem", sm: "2rem 3rem" }}
                >
                  Continue
                </Button>
              </Box>
            )}
            {!loading && mainContent === "ShowOtp" && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "1rem",
                  flexDirection: "column",
                  margin: "2rem 0rem",
                }}
                width={{ xs: "100%", md: "50%", lg: "40%" }}
              >
                <TextField
                  sx={{ width: "80%", margin: "2rem 0rem" }}
                  required
                  id="inp-otp"
                  label="Otp"
                  type="text"
                  value={otpInput}
                  onChange={(e) => setOtpInput(e.target.value)}
                />
                <Button
                  variant="contained"
                  color="success"
                  onClick={implementUserAction}
                  disabled={!otpInput || !requestType}
                  size="large"
                  endIcon={<DoneAllIcon />}
                  loading={loadingAnim}
                  loadingPosition="end"
                  sx={{ margin: "2rem 0rem", textTransform: "none" }}
                  padding={{ xs: "1rem 2rem", sm: "2rem 3rem" }}
                >
                  Verify Otp
                </Button>
              </Box>
            )}

            {!loading && mainContent === "ShowLogs" && (
              <>
                <Box
                  id="LogActionsWrapper"
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    width: "100%",
                    flexDirection: "column",
                    margin: "2rem 0rem",
                  }}
                >
                  <Box
                    id="LogActionsHeading"
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <Typography sx={{ fontWeight: "bold" }}>
                      User's Logs
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Typography>Total records currently:</Typography>
                      <Typography sx={{ color: "red", marginLeft: "1rem" }}>
                        {totalRecords}
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      margin: "2rem 0rem",
                    }}
                    width={{ xs: "100%", md: "50%", lg: "40%" }}
                  >
                    <TextField
                      sx={{ width: "80%", margin: "2rem 0rem" }}
                      required
                      id="se-sortby"
                      select
                      label="Sort By"
                      defaultValue="DateNewest"
                      value={sortBy}
                      onChange={(e) => {
                        setSortBy(e.target.value);
                        setVisibleLogsStart(0);
                      }}
                    >
                      <MenuItem value={"DateNewest"}>
                        Date: Newest First
                      </MenuItem>
                      <MenuItem value={"DateOldest"}>
                        Date: Oldest First
                      </MenuItem>
                    </TextField>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      width: "100%",
                      margin: "2rem 0rem",
                    }}
                  >
                    <Button
                      variant="outlined"
                      onClick={toggleFilters}
                      size="large"
                      endIcon={showFilters ? <VisibilityOff /> : <Visibility />}
                      sx={{
                        margin: "2rem 0rem",
                        textTransform: "none",
                      }}
                      padding={{ xs: "1rem 2rem", sm: "2rem 3rem" }}
                    >
                      {showFilters ? "Hide Filters" : "Show Filters"}
                    </Button>
                  </Box>

                  {showFilters && (
                    <>
                      {" "}
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          width: "100%",
                          margin: "2rem 0rem",
                          flexWrap: "wrap",
                        }}
                        justifyContent={{ xs: "center", md: "flex-start" }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexWrap: "wrap",
                          }}
                          width={{ xs: "100%", md: "50%", lg: "40%" }}
                        >
                          <TextField
                            sx={{ width: "80%", margin: "2rem 0rem" }}
                            required
                            id="inp-createdBy"
                            label="Created By"
                            value={createdByFilter}
                            onChange={(e) => setCreatedByFilter(e.target.value)}
                          />
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexWrap: "wrap",
                          }}
                          width={{ xs: "100%", md: "50%", lg: "40%" }}
                        >
                          <TextField
                            sx={{ width: "80%", margin: "2rem 0rem" }}
                            required
                            id="inp-log"
                            label="Log Value"
                            value={logFilter}
                            onChange={(e) => setLogFilter(e.target.value)}
                          />
                        </Box>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={applyFilterAndSort}
                          size="large"
                          endIcon={<FilterListAltIcon />}
                          sx={{ margin: "2rem 0rem", textTransform: "none" }}
                          padding={{ xs: "1rem 2rem", sm: "2rem 3rem" }}
                        >
                          Filter Logs
                        </Button>
                      </Box>
                    </>
                  )}
                </Box>

                {!loading && !visibleLogs.length && logTypeRequested && (
                  <Typography sx={{ margin: "2rem 0rem", textAlign: "center" }}>
                    No logs found for this selection.
                  </Typography>
                )}

                {!loading && visibleLogs.length > 0 && (
                  <>
                    <TableContainer
                      component={Paper}
                      sx={{ width: "100%", overflowX: "auto" }}
                    >
                      <Table
                        stickyHeader
                        sx={{ minWidth: 650 }}
                        aria-label="logs table"
                      >
                        <TableHead>
                          <TableRow>
                            <TableCell
                              align="center"
                              sx={{
                                border: `1px solid ${theme.palette.primary.main}`,
                                fontWeight: "bold",
                              }}
                            >
                              Linked Account
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{
                                border: `1px solid ${theme.palette.primary.main}`,
                                fontWeight: "bold",
                              }}
                            >
                              Created By
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{
                                border: `1px solid ${theme.palette.primary.main}`,
                                fontWeight: "bold",
                              }}
                            >
                              Created At
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{
                                border: `1px solid ${theme.palette.primary.main}`,
                                fontWeight: "bold",
                              }}
                            >
                              Log
                            </TableCell>
                          </TableRow>
                        </TableHead>

                        <TableBody>
                          {visibleLogs.map((log) => (
                            <TableRow
                              key={`${log.createdAt}-${log.logDetails}`}
                              hover
                            >
                              <TableCell
                                align="center"
                                sx={{
                                  border: `1px solid ${theme.palette.primary.main}`,
                                }}
                              >
                                {log.logLinkedAccount}
                              </TableCell>
                              <TableCell
                                align="center"
                                sx={{
                                  border: `1px solid ${theme.palette.primary.main}`,
                                }}
                              >
                                {log.logAddedBy}
                              </TableCell>
                              <TableCell
                                align="center"
                                sx={{
                                  border: `1px solid ${theme.palette.primary.main}`,
                                }}
                              >
                                {log.createdAtFormatted}
                              </TableCell>
                              <TableCell
                                align="center"
                                sx={{
                                  border: `1px solid ${theme.palette.primary.main}`,
                                }}
                              >
                                {log.logDetails}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                        width: "100%",
                        margin: "2rem 0rem",
                        flexWrap: "wrap",
                      }}
                      justifyContent={{ xs: "center", sm: "space-between" }}
                    >
                      <IconButton
                        aria-label="previous logs"
                        sx={{ color: theme.palette.black.main }}
                        onClick={handlePrev}
                        disabled={visibleLogsStart === 0}
                      >
                        <KeyboardDoubleArrowLeftIcon />
                      </IconButton>

                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Typography>
                          {totalRecords === 0 ? 0 : visibleLogsStart + 1} -{" "}
                          {Math.min(visibleLogsStart + PAGE_SIZE, totalRecords)}{" "}
                          of
                        </Typography>

                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Typography
                            sx={{ color: "red", marginLeft: "0.5rem" }}
                          >
                            {totalRecords}
                          </Typography>

                          <Typography sx={{ marginLeft: "0.5rem" }}>
                            records.
                          </Typography>
                        </Box>
                      </Box>

                      <IconButton
                        aria-label="next logs"
                        sx={{ color: theme.palette.black.main }}
                        onClick={handleNext}
                        disabled={
                          visibleLogsStart + PAGE_SIZE >= totalRecords ||
                          totalRecords === 0
                        }
                      >
                        <KeyboardDoubleArrowRightIcon />
                      </IconButton>
                    </Box>
                  </>
                )}
              </>
            )}
          </Box>
          <Footer />
        </>
      )}
    </>
  );
};

export default User;
