import { useEffect, useState } from "react";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
} from "@mui/material";
import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import Paper from "@mui/material/Paper";
import GetAppIcon from "@mui/icons-material/GetApp";
import DoneAllIcon from "@mui/icons-material/DoneAll";

const ModifyUser = () => {
  const requestType = "modifyUser";

  const [loadingAnim, setLoadingAnim] = useState(false);

  const theme = useTheme();

  const [userEmail, setUserEmail] = useState("");
  const [userRegNo, setUserRegNo] = useState("");
  const [passwordResetNeeded, setPasswordResetNeeded] = useState(false);
  const [accountUnlockNeeded, setAccountUnlockNeeded] = useState(false);

  const [accountActions, setAccountActions] = useState(null);

  const [usersList, setUsersList] = useState([]);

  const [showUsers, setShowUsers] = useState(false);
  const [showGetListButton, setShowGetListButton] = useState(null);
  const [approval, setApproval] = useState(false);
  const [needApproval, setNeedApproval] = useState(null);

  const [showOtp, setShowOtp] = useState(null);

  const [serverMessage, setServerMessage] = useState("");
  const [showServerMsg, setShowServerMsg] = useState(false);
  const [serverMsgType, setServerMsgType] = useState("error");

  const [otpInput, setOtpInput] = useState("");

  useEffect(() => {
    if (userEmail && userRegNo) {
      setShowGetListButton(true);
      setServerMessage("Click on 'Get user list' button to fetch user list");
      setServerMsgType("info");
      setShowServerMsg(true);
    } else {
      setShowGetListButton(false);
    }
  }, [userEmail, userRegNo]);

  const getFinalUserList = async () => {
    setLoadingAnim(true);
    setServerMessage("Processing your request...");
    setServerMsgType("info");
    setShowServerMsg(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/admin/userMgmt/modifyUser/get-final-users",
        {
          userEmail,
          userRegNo,
        },
        { withCredentials: true },
      );
      setUsersList(response.data.usersList);
      setShowUsers(true);
      setAccountActions(true);
      setNeedApproval(true);
      setLoadingAnim(false);
      setServerMessage("Successfully fetched the user details");
      setServerMsgType("success");
      setShowServerMsg(true);
    } catch (error) {
      setLoadingAnim(false);
      setServerMessage(
        error.response.data.message || "Failed to fetch user details",
      );
      setServerMsgType("error");
      setShowServerMsg(true);
    }
  };

  const getVerificationOtp = async () => {
    setLoadingAnim(true);
    setServerMessage("Processing your request...");
    setServerMsgType("info");
    setShowServerMsg(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/admin/approvals/get-approval-otp",
        { requestType },
        { withCredentials: true },
      );
      setShowOtp(true);
      setLoadingAnim(false);
      setNeedApproval(false);
      setServerMessage("Otp sent to email successfully");
      setServerMsgType("success");
      setShowServerMsg(true);
    } catch (error) {
      setLoadingAnim(false);
      setServerMessage(
        error.response?.data?.message || "Failed to generate Otp",
      );
      setServerMsgType("error");
      setShowServerMsg(true);
    }
  };

  const modifyUserDetails = async () => {
    setLoadingAnim(true);
    setServerMessage("Processing your request...");
    setServerMsgType("info");
    setShowServerMsg(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/admin/actions/userMgmt/modifyAccount/modifyUser",
        {
          userEmail,
          userRegNo,
          passwordResetNeeded,
          accountUnlockNeeded,
          otpInput,
        },
        { withCredentials: true },
      );
      setLoadingAnim(false);
      setServerMessage(
        `The requested modification(s) have been performed successfully. Refreshing the page in 5 seconds.`,
      );
      setServerMsgType("success");
      setShowServerMsg(true);

      setTimeout(() => {
        window.location.reload(false); // This will trigger a page reload after 5 seconds delay
      }, 5000);
    } catch (error) {
      setLoadingAnim(false);
      setServerMessage(
        `${error.response?.data?.message} Refreshing the page in 5 seconds.` ||
          "Failed to modify user account. Refreshing the page in 5 seconds. Please try again.",
      );
      setServerMsgType("error");
      setShowServerMsg(true);

      setTimeout(() => {
        window.location.reload(false); // This will trigger a page reload after 5 seconds delay
      }, 5000);
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

      <Box
        id="AdminActionsWrapper"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          margin: "2rem 0rem",
        }}
      >
        <Typography sx={{ textAlign: "center", fontWeight: "bold" }}>
          Modify User Account
        </Typography>
        <Typography sx={{ textAlign: "center" }}>
          (Cross verify user's details [email, register number] before making
          changes in the account.)
        </Typography>

        <Box
          id="InputsWrapper"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            flexDirection: "column",
          }}
        >
          <Box
            id="InputRow1"
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              margin: "2rem 0rem",
            }}
            justifyContent={{ xs: "center", md: "space-evenly" }}
            flexDirection={{ xs: "column", md: "row" }}
          >
            <Box
              id="UserEmailInput"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              width={{ xs: "100%", md: "30%" }}
            >
              <TextField
                sx={{ width: "80%", margin: "2rem 0rem" }}
                required
                id="inp-email"
                label="Email"
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
              />
            </Box>

            <Box
              id="UserRegNoInput"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              width={{ xs: "100%", md: "30%" }}
            >
              <TextField
                sx={{ width: "80%", margin: "2rem 0rem" }}
                required
                id="inp-regno"
                label="Register Number"
                value={userRegNo}
                onChange={(e) => setUserRegNo(e.target.value)}
              />
            </Box>
          </Box>
        </Box>

        {showGetListButton && (
          <Button
            variant="contained"
            size="large"
            endIcon={<GetAppIcon />}
            loading={loadingAnim}
            loadingPosition="end"
            sx={{ margin: "2rem 0rem", textTransform: "none" }}
            padding={{ xs: "1rem 2rem", sm: "2rem 3rem" }}
            onClick={getFinalUserList}
          >
            Get User List
          </Button>
        )}

        {showUsers && (
          <Box
            id="TableWrapper"
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              margin: "2rem 0rem",
            }}
          >
            <Box
              id="TableHeading"
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                flexWrap: "wrap",
              }}
            >
              <Typography sx={{ textAlign: "center", fontWeight: "bold" }}>
                The changes will be made in this user's account
              </Typography>
            </Box>
            <Box
              id="TableContent"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                margin: "2rem 0rem",
              }}
            >
              <TableContainer
                component={Paper}
                sx={{ width: "100%", overflowX: "auto" }}
              >
                <Table
                  stickyHeader
                  sx={{ minWidth: 650 }}
                  aria-label="admin list table"
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
                        Reg No.
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          border: `1px solid ${theme.palette.primary.main}`,
                          fontWeight: "bold",
                        }}
                      >
                        Email
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          border: `1px solid ${theme.palette.primary.main}`,
                          fontWeight: "bold",
                        }}
                      >
                        Dept.
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          border: `1px solid ${theme.palette.primary.main}`,
                          fontWeight: "bold",
                        }}
                      >
                        Course Type
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          border: `1px solid ${theme.palette.primary.main}`,
                          fontWeight: "bold",
                        }}
                      >
                        Programme
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          border: `1px solid ${theme.palette.primary.main}`,
                          fontWeight: "bold",
                        }}
                      >
                        Branch
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          border: `1px solid ${theme.palette.primary.main}`,
                          fontWeight: "bold",
                        }}
                      >
                        Failed Logins
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          border: `1px solid ${theme.palette.primary.main}`,
                          fontWeight: "bold",
                        }}
                      >
                        Locked Until
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {usersList.map((user) => (
                      <TableRow
                        key={`${user.registerNumber}-${user.email}`}
                        hover
                      >
                        <TableCell
                          align="center"
                          sx={{
                            border: `1px solid ${theme.palette.primary.main}`,
                          }}
                        >
                          {user.registerNumber}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            border: `1px solid ${theme.palette.primary.main}`,
                          }}
                        >
                          {user.email}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            border: `1px solid ${theme.palette.primary.main}`,
                          }}
                        >
                          {user.department}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            border: `1px solid ${theme.palette.primary.main}`,
                          }}
                        >
                          {user.courseType}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            border: `1px solid ${theme.palette.primary.main}`,
                          }}
                        >
                          {user.programme}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            border: `1px solid ${theme.palette.primary.main}`,
                          }}
                        >
                          {user.branch}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            border: `1px solid ${theme.palette.primary.main}`,
                          }}
                        >
                          {user.failedAttempt}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            border: `1px solid ${theme.palette.primary.main}`,
                          }}
                        >
                          {user.lockUntil}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Box>
        )}

        {accountActions && (
          <>
            <Box
              id="InputsWrapper"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                flexDirection: "column",
              }}
            >
              <Typography sx={{ textAlign: "center", fontWeight: "bold" }}>
                Choose an action to perform on the account
              </Typography>
              <Box
                id="InputRow1"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  margin: "2rem 0rem",
                }}
                justifyContent={{ xs: "center", md: "space-evenly" }}
                flexDirection={{ xs: "column", md: "row" }}
              >
                <Box
                  id="PasswordResetChbx"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  width={{ xs: "100%", md: "30%" }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={passwordResetNeeded}
                        onChange={(e) =>
                          setPasswordResetNeeded(e.target.checked)
                        }
                        color="primary"
                      />
                    }
                    label="Password Reset"
                    labelPlacement="end"
                  />
                </Box>

                <Box
                  id="UnlockAccountChbx"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  width={{ xs: "100%", md: "30%" }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={accountUnlockNeeded}
                        onChange={(e) =>
                          setAccountUnlockNeeded(e.target.checked)
                        }
                        color="primary"
                      />
                    }
                    label="Unlock Account"
                    labelPlacement="end"
                  />
                </Box>
              </Box>
            </Box>
          </>
        )}

        {needApproval && (
          <Box
            id="ApprovalWrapper"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              margin: "2rem 0rem",
              flexDirection: "column",
            }}
          >
            <Box
              id="ApprovalStatement"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                flexWrap: "wrap",
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={approval}
                    onChange={(e) => setApproval(e.target.checked)}
                    color="primary"
                  />
                }
                label="I affirm and authorize the above mentioned changes to be
                  reflected in the user's account"
                labelPlacement="end"
              />
            </Box>
            <Box
              id="ApprovalButton"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Button
                variant="contained"
                onClick={getVerificationOtp}
                disabled={
                  !approval ||
                  !userEmail ||
                  !userRegNo ||
                  !(passwordResetNeeded || accountUnlockNeeded)
                }
                size="large"
                endIcon={<CheckIcon />}
                loading={loadingAnim}
                loadingPosition="end"
                sx={{ margin: "2rem 0rem", textTransform: "none" }}
                padding={{ xs: "1rem 2rem", sm: "2rem 3rem" }}
              >
                Approve
              </Button>
            </Box>
          </Box>
        )}

        {showOtp && (
          <Box
            id="OtpWrapper"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              margin: "2rem 0rem",
              flexDirection: "column",
            }}
          >
            <Box
              id="OtpInput"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              width={{ xs: "100%", md: "50%" }}
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
            </Box>
            <Box
              id="SubmitButton"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Button
                variant="contained"
                color="success"
                onClick={modifyUserDetails}
                disabled={!otpInput}
                size="large"
                endIcon={<DoneAllIcon />}
                loading={loadingAnim}
                loadingPosition="end"
                sx={{ margin: "2rem 0rem", textTransform: "none" }}
                padding={{ xs: "1rem 2rem", sm: "2rem 3rem" }}
              >
                Confirm Changes
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
};

export default ModifyUser;
