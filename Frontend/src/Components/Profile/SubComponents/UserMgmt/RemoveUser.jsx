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
import {
  Button,
  Checkbox,
  FormControlLabel,
  MenuItem,
  TextField,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import Paper from "@mui/material/Paper";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import GetAppIcon from "@mui/icons-material/GetApp";

const RemoveUser = () => {
  const requestType = "removeNewUser";

  const [loadingAnim, setLoadingAnim] = useState(false);

  const theme = useTheme();

  const [usersList, setUsersList] = useState([]);
  const [opertationType, setOpertationType] = useState("");

  const [showUsers, setShowUsers] = useState(false);
  const [showGetListButton, setShowGetListButton] = useState(null);
  const [approval, setApproval] = useState(false);
  const [needApprovalSingle, setNeedApprovalSingle] = useState(null);
  const [needApprovalMul, setNeedApprovalMul] = useState(null);

  const [showOtp, setShowOtp] = useState(null);

  const [serverMessage, setServerMessage] = useState("");
  const [showServerMsg, setShowServerMsg] = useState(false);
  const [serverMsgType, setServerMsgType] = useState("error");

  const [otpInput, setOtpInput] = useState("");

  const [remUserEmail, setRemUserEmail] = useState("");
  const [remUserRegNo, setRemUserRegNo] = useState("");

  const [commonEmailSuffix, setCommonEmailSuffix] = useState(
    "@student.annauniv.edu"
  );
  const [commonRegNoPrefix, setCommonRegNoPrefix] = useState("");
  const [commonRegNoStart, setCommonRegNoStart] = useState("");
  const [commonRegNoEnd, setCommonRegNoEnd] = useState("");
  const [skipRegNo, setSkipRegNoEnd] = useState("");

  useEffect(() => {
    if (
      opertationType === "Multiple" &&
      commonEmailSuffix &&
      commonRegNoPrefix &&
      commonRegNoStart &&
      commonRegNoEnd
    ) {
      setShowGetListButton(true);
      setServerMessage("Click on 'Get user list' button to fetch user list");
      setServerMsgType("info");
      setShowServerMsg(true);
    } else if (opertationType === "Single" && remUserEmail && remUserRegNo) {
      setShowGetListButton(true);
      setServerMessage("Click on 'Get user list' button to fetch user list");
      setServerMsgType("info");
      setShowServerMsg(true);
    } else if (opertationType != "Single" && opertationType != "Multiple") {
      setShowUsers(false);
      setNeedApprovalSingle(false);
      setNeedApprovalMul(false);
      setShowGetListButton(false);
    } else if (
      (opertationType === "Single" && !remUserEmail) ||
      (opertationType === "Single" && !remUserRegNo)
    ) {
      setShowUsers(false);
      setNeedApprovalSingle(false);
      setNeedApprovalMul(false);
      setShowGetListButton(false);
    } else if (
      (opertationType === "Multiple" && !commonEmailSuffix) ||
      (opertationType === "Multiple" && !commonRegNoPrefix) ||
      (opertationType === "Multiple" && !commonRegNoStart) ||
      (opertationType === "Multiple" && !commonRegNoEnd)
    ) {
      setShowUsers(false);
      setNeedApprovalSingle(false);
      setNeedApprovalMul(false);
      setShowGetListButton(false);
    }
  }, [
    commonEmailSuffix,
    commonRegNoPrefix,
    commonRegNoStart,
    commonRegNoEnd,
    remUserEmail,
    remUserRegNo,
  ]);

  const modifyAddUserOperation = (newOperationType) => {
    if (newOperationType === "Single") {
      setCommonEmailSuffix("@student.annauniv.edu");
      setCommonRegNoPrefix("");
      setCommonRegNoStart("");
      setCommonRegNoEnd("");
      setOpertationType("Single");
    }
    if (newOperationType === "Multiple") {
      setRemUserEmail("");
      setRemUserRegNo("");
      setOpertationType("Multiple");
    }
  };

  const getFinalUserList = async () => {
    setLoadingAnim(true);
    setServerMessage("Processing your request...");
    setServerMsgType("info");
    setShowServerMsg(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/admin/userMgmt/removeUser/get-final-users",
        {
          opertationType,
          commonEmailSuffix,
          commonRegNoPrefix,
          commonRegNoStart,
          commonRegNoEnd,
          skipRegNo,
          remUserEmail,
          remUserRegNo,
        },
        { withCredentials: true }
      );
      setUsersList(response.data.usersList);
      setShowUsers(true);
      setLoadingAnim(false);
      setServerMessage("Successfully fetched the user list");
      setServerMsgType("success");
      setShowServerMsg(true);

      if (opertationType === "Single") {
        setNeedApprovalSingle(true);
        setNeedApprovalMul(false);
      }
      if (opertationType === "Multiple") {
        setNeedApprovalMul(true);
        setNeedApprovalSingle(false);
      }
    } catch (error) {
      setLoadingAnim(false);
      setServerMessage(
        error.response.data.message || "Failed to fetch user list"
      );
      setServerMsgType("error");
      setShowServerMsg(true);
    }
  };

  const getVerificationOtp = async () => {
    if (opertationType === "Multiple") {
      if (parseInt(commonRegNoEnd) - parseInt(commonRegNoStart) > 100) {
        setServerMessage(
          "You can only add upto 100 users at a time. Please reduce the user range and complete in multiple requests if needed."
        );
        setServerMsgType("error");
        setShowServerMsg(true);
        return;
      }
      if (parseInt(commonRegNoEnd) < parseInt(commonRegNoStart)) {
        setServerMessage(
          "The end register number cannot be less than the start register number. Please correct the range."
        );
        setServerMsgType("error");
        setShowServerMsg(true);
        return;
      }
    }
    setLoadingAnim(true);
    setServerMessage("Processing your request...");
    setServerMsgType("info");
    setShowServerMsg(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/admin/approvals/get-approval-otp",
        { requestType },
        { withCredentials: true }
      );
      setShowOtp(true);
      setNeedApprovalMul(false);
      setNeedApprovalSingle(false);
      setLoadingAnim(false);
      setServerMessage("Otp sent to email successfully");
      setServerMsgType("success");
      setShowServerMsg(true);
    } catch (error) {
      setLoadingAnim(false);
      setServerMessage(
        error.response?.data?.message || "Failed to generate Otp"
      );
      setServerMsgType("error");
      setShowServerMsg(true);
    }
  };

  const removeUserFromDB = async () => {
    setLoadingAnim(true);
    setServerMessage("Processing your request...");
    setServerMsgType("info");
    setShowServerMsg(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/admin/actions/userMgmt/existingUser/removeUser",
        {
          opertationType,
          commonEmailSuffix,
          commonRegNoPrefix,
          commonRegNoStart,
          commonRegNoEnd,
          skipRegNo,
          remUserEmail,
          remUserRegNo,
          otpInput,
        },
        { withCredentials: true }
      );
      setLoadingAnim(false);
      setServerMessage(
        `User(s) have been removed from the site successfully. Refreshing the page in 5 seconds.`
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
          "Failed to remove user(s). Refreshing the page in 5 seconds."
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
          Remove Existing Users
        </Typography>
        <Typography sx={{ textAlign: "center" }}>
          (Cross verify each user's details [email, register number]
          individually before removing them from the site.)
        </Typography>
        <Box
          id="UserAdditionType"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            margin: "2rem 0rem",
            gap: "1rem",
            flexWrap: "wrap",
          }}
        >
          <Button
            variant="contained"
            onClick={() => modifyAddUserOperation("Single")}
            size="large"
            endIcon={<PersonIcon />}
            sx={{
              margin: "2rem 0rem",
              textTransform: "none",
              backgroundColor: `${theme.palette.brown.main}`,
            }}
            padding={{ xs: "1rem 2rem", sm: "2rem 3rem" }}
          >
            Single User
          </Button>
          <Button
            variant="contained"
            onClick={() => modifyAddUserOperation("Multiple")}
            size="large"
            endIcon={<GroupIcon />}
            sx={{
              margin: "2rem 0rem",
              textTransform: "none",
              backgroundColor: `${theme.palette.black.main}`,
            }}
            padding={{ xs: "1rem 2rem", sm: "2rem 3rem" }}
          >
            Multiple User
          </Button>
        </Box>

        {opertationType === "Single" && (
          <Box
            id="SingleUserInputsWrapper"
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
                  value={remUserEmail}
                  onChange={(e) => setRemUserEmail(e.target.value)}
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
                  value={remUserRegNo}
                  onChange={(e) => setRemUserRegNo(e.target.value)}
                />
              </Box>
            </Box>
          </Box>
        )}

        {opertationType === "Multiple" && (
          <Box
            id="MultipleUserInputsWrapper"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              flexDirection: "column",
            }}
          >
            <Box
              id="RegNoPrefixInput"
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
                id="inp-regnoprefix"
                label="Reg. No. Prefix"
                value={commonRegNoPrefix}
                onChange={(e) => setCommonRegNoPrefix(e.target.value)}
              />
            </Box>
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
                id="RegNoStartInput"
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
                  id="inp-regnostart"
                  label="Reg. No. Start"
                  value={commonRegNoStart}
                  onChange={(e) => setCommonRegNoStart(e.target.value)}
                />
              </Box>

              <Box
                id="RegNoEndInput"
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
                  id="inp-regnoend"
                  label="Reg. No. End"
                  value={commonRegNoEnd}
                  onChange={(e) => setCommonRegNoEnd(e.target.value)}
                />
              </Box>
            </Box>

            <Box
              id="InputRow2"
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
                id="SkipRegNoInput"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                width={{ xs: "100%", md: "30%" }}
              >
                <TextField
                  sx={{ width: "80%", margin: "2rem 0rem" }}
                  id="inp-skipregno"
                  label="Skip Reg. No."
                  value={skipRegNo}
                  onChange={(e) => setSkipRegNoEnd(e.target.value)}
                />
              </Box>

              <Box
                id="EmailSuffixInput"
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
                  id="inp-emailsuffix"
                  label="Email Suffix"
                  value={commonEmailSuffix}
                  onChange={(e) => setCommonEmailSuffix(e.target.value)}
                />
              </Box>
            </Box>
          </Box>
        )}

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
                The below users will be removed
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
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Box>
        )}

        {needApprovalSingle && (
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
                label="I affirm and authorize the above mentioned person to be removed
                from this site"
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
                disabled={!approval || !remUserEmail || !remUserRegNo}
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

        {needApprovalMul && (
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
                label="I affirm and authorize the above mentioned persons to be removed
                from this site"
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
                  !commonEmailSuffix ||
                  !commonRegNoStart ||
                  !commonRegNoEnd
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
                onClick={removeUserFromDB}
                disabled={!otpInput}
                size="large"
                endIcon={<PersonRemoveIcon />}
                loading={loadingAnim}
                loadingPosition="end"
                sx={{ margin: "2rem 0rem", textTransform: "none" }}
                padding={{ xs: "1rem 2rem", sm: "2rem 3rem" }}
              >
                Remove Users
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
};

export default RemoveUser;
