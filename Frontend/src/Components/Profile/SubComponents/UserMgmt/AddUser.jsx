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
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import Paper from "@mui/material/Paper";
import dropdownOptions from "../../../General/Sub_Components/Register/DropdownOptions.js";
import WarningIcon from "@mui/icons-material/Warning";
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';

const AddNewUser = () => {
  const requestType = "addNewUser";

  const [loadingAnim, setLoadingAnim] = useState(false);

  const theme = useTheme();

  const [usersList, setUsersList] = useState([]);
  const [newAdditionType, setNewAdditionType] = useState("");

  const [showUsers, setShowUsers] = useState(false);
  const [approval, setApproval] = useState(false);
  const [needApprovalSingle, setNeedApprovalSingle] = useState(null);
  const [needApprovalMul, setNeedApprovalMul] = useState(null);

  const [showOtp, setShowOtp] = useState(null);

  const [serverMessage, setServerMessage] = useState("");
  const [showServerMsg, setShowServerMsg] = useState(false);
  const [serverMsgType, setServerMsgType] = useState("error");

  const [otpInput, setOtpInput] = useState("");

  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserDept, setNewUserDept] = useState(
    "Information Science and Technology"
  );
  const [newUserCourseType, setNewUserCourseType] = useState("");
  const [newUserProgramme, setNewUserProgramme] = useState("");
  const [newUserBranch, setNewUserBranch] = useState("");
  const [newUserRegNo, setNewUserRegNo] = useState("");

  const [commonEmailSuffix, setCommonEmailSuffix] = useState(
    "@student.annauniv.edu"
  );
  const [commonRegNoPrefix, setCommonRegNoPrefix] = useState("");
  const [commonUserDept, setCommonUserDept] = useState(
    "Information Science and Technology"
  );
  const [commonUserCourseType, setCommonUserCourseType] = useState("");
  const [commonUserProgramme, setCommonUserProgramme] = useState("");
  const [commonUserBranch, setCommonUserBranch] = useState("");
  const [commonRegNoStart, setCommonRegNoStart] = useState("");
  const [commonRegNoEnd, setCommonRegNoEnd] = useState("");
  const [skipRegNo, setSkipRegNoEnd] = useState("");

  const getProgrammesList = (actionType) => {
    if (actionType === "Single") {
      return dropdownOptions.programmes[newUserCourseType] || [];
    }
    if (actionType === "Multiple") {
      return dropdownOptions.programmes[commonUserCourseType] || [];
    }
  };

  const getBranchesList = (actionType) => {
    if (actionType === "Single") {
      return dropdownOptions.branches[newUserProgramme] || [];
    }
    if (actionType === "Multiple") {
      return dropdownOptions.branches[commonUserProgramme] || [];
    }
  };

  const chooseCourseType = (e, actionType) => {
    if (actionType === "Single") {
      setNewUserCourseType(e);
      setNewUserProgramme("");
      setNewUserBranch("");
    }
    if (actionType === "Multiple") {
      setCommonUserCourseType(e);
      setCommonUserProgramme("");
      setCommonUserBranch("");
    }
  };

  const chooseProgramme = (e, actionType) => {
    if (actionType === "Single") {
      setNewUserProgramme(e);
      setNewUserBranch("");
    }
    if (actionType === "Multiple") {
      setCommonUserProgramme(e);
      setCommonUserBranch("");
    }
  };

  const chooseBranch = (e, actionType) => {
    if (actionType === "Single") {
      setNewUserBranch(e);
    }
    if (actionType === "Multiple") {
      setCommonUserBranch(e);
    }
  };

  useEffect(() => {
    if (
      newAdditionType === "Multiple" &&
      commonEmailSuffix &&
      commonRegNoPrefix &&
      commonRegNoStart &&
      commonRegNoEnd &&
      commonUserDept &&
      commonUserCourseType &&
      commonUserProgramme &&
      commonUserBranch
    ) {
      setNeedApprovalSingle(false);
      setNeedApprovalMul(true);
      getFinalUserList();
    }
    if (
      newAdditionType === "Single" &&
      newUserEmail &&
      newUserRegNo &&
      newUserDept &&
      newUserCourseType &&
      newUserProgramme &&
      newUserBranch
    ) {
      setNeedApprovalMul(false);
      setNeedApprovalSingle(true);
      getFinalUserList();
    } else if (newAdditionType != "Single" && newAdditionType != "Multiple") {
      setShowUsers(false);
      setNeedApprovalSingle(false);
      setNeedApprovalMul(false);
    }
  }, [
    commonEmailSuffix,
    commonRegNoPrefix,
    commonRegNoStart,
    commonRegNoEnd,
    commonUserDept,
    commonUserCourseType,
    commonUserProgramme,
    commonUserBranch,
    newUserEmail,
    newUserRegNo,
    newUserDept,
    newUserCourseType,
    newUserProgramme,
    newUserBranch,
  ]);

  const modifyAddUserOperation = (newOperationType) => {
    if (newOperationType === "Single") {
      setCommonEmailSuffix("@student.annauniv.edu");
      setCommonRegNoPrefix("");
      setCommonRegNoStart("");
      setCommonRegNoEnd("");
      setCommonUserDept("Information Science and Technology");
      setCommonUserCourseType("");
      setCommonUserProgramme("");
      setCommonUserBranch("");
      setNewAdditionType("Single");
    }
    if (newOperationType === "Multiple") {
      setNewUserEmail("");
      setNewUserRegNo("");
      setNewUserDept("Information Science and Technology");
      setNewUserCourseType("");
      setNewUserProgramme("");
      setNewUserBranch("");
      setNewAdditionType("Multiple");
    }
  };

  const getFinalUserList = async () => {
    setLoadingAnim(true);
    setServerMessage("Processing your request...");
    setServerMsgType("info");
    setShowServerMsg(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/admin/userMgmt/addUser/get-final-users",
        {
          newAdditionType,
          commonEmailSuffix,
          commonRegNoPrefix,
          commonRegNoStart,
          commonRegNoEnd,
          skipRegNo,
          commonUserDept,
          commonUserCourseType,
          commonUserProgramme,
          commonUserBranch,
          newUserEmail,
          newUserRegNo,
          newUserDept,
          newUserCourseType,
          newUserProgramme,
          newUserBranch,
        },
        { withCredentials: true }
      );
      setUsersList(response.data.usersList);
      setShowUsers(true);
      setLoadingAnim(false);
      setServerMessage("Successfully fetched the user list");
      setServerMsgType("success");
      setShowServerMsg(true);
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
    setLoadingAnim(true);
    setServerMessage("Processing your request...");
    setServerMsgType("info");
    setShowServerMsg(true);
    if (newAdditionType === "Multiple") {
      if (parseInt(commonRegNoEnd) - parseInt(commonRegNoStart) > 100) {
        setLoadingAnim(false);
        setServerMessage(
          "You can only add upto 100 users at a time. Please reduce the user range and complete in multiple requests if needed."
        );
        setServerMsgType("error");
        setShowServerMsg(true);
        return;
      }
      if (parseInt(commonRegNoEnd) < parseInt(commonRegNoStart)) {
        setLoadingAnim(false);
        setServerMessage(
          "The end register number cannot be less than the start register number. Please correct the range."
        );
        setServerMsgType("error");
        setShowServerMsg(true);
        return;
      }
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/admin/approvals/get-approval-otp",
        { requestType },
        { withCredentials: true }
      );
      setShowOtp(true);
      setLoadingAnim(false);
      setNeedApprovalSingle(false);
      setNeedApprovalMul(false);
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

  const addUserToDB = async () => {
    setLoadingAnim(true);
    setServerMessage("Processing your request...");
    setServerMsgType("info");
    setShowServerMsg(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/admin/actions/userMgmt/newUser/addNewUser",
        {
          newAdditionType,
          commonEmailSuffix,
          commonRegNoPrefix,
          commonRegNoStart,
          commonRegNoEnd,
          skipRegNo,
          commonUserDept,
          commonUserCourseType,
          commonUserProgramme,
          commonUserBranch,
          newUserEmail,
          newUserRegNo,
          newUserDept,
          newUserCourseType,
          newUserProgramme,
          newUserBranch,
          otpInput,
        },
        { withCredentials: true }
      );
      setLoadingAnim(false);
      setServerMessage(
        `New user(s) have been added to the site successfully. Refreshing the page in 5 seconds.`
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
          "Failed to add new user(s). Refreshing the page in 5 seconds."
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
          Add New Users
        </Typography>
        <Typography sx={{ textAlign: "center" }}>
          (Cross verify each user's details [email, register number]
          individually before adding them as new users)
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

        {newAdditionType === "Single" && (
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
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
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
                  value={newUserRegNo}
                  onChange={(e) => setNewUserRegNo(e.target.value)}
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
                id="UserDeptInput"
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
                  id="se-Dept"
                  select
                  label="Department"
                  defaultValue="Information Science and Technology"
                  value={newUserDept}
                  onChange={(e) => setNewUserDept(e.target.value)}
                >
                  {dropdownOptions.departments.map((option, index) => (
                    <MenuItem key={index} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>

              <Box
                id="UserCourseInput"
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
                  id="se-course"
                  select
                  label="Course Type"
                  defaultValue=""
                  value={newUserCourseType}
                  onChange={(e) => chooseCourseType(e.target.value, "Single")}
                >
                  {dropdownOptions.courseTypes.map((option, index) => (
                    <MenuItem key={index} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
            </Box>

            <Box
              id="InputRow3"
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
                id="UserProgrammeInput"
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
                  id="se-programme"
                  select
                  label="Programme"
                  defaultValue=""
                  value={newUserProgramme}
                  onChange={(e) => chooseProgramme(e.target.value, "Single")}
                  disabled={!newUserCourseType}
                >
                  <MenuItem value="">Choose Programme</MenuItem>
                  {getProgrammesList("Single").map((option, index) => (
                    <MenuItem key={index} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>

              <Box
                id="UserBranchInput"
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
                  id="se-branch"
                  select
                  label="Branch"
                  defaultValue=""
                  value={newUserBranch}
                  onChange={(e) => chooseBranch(e.target.value, "Single")}
                  disabled={!newUserProgramme}
                >
                  <MenuItem value="">Choose Branch</MenuItem>
                  {getBranchesList("Single").map((option, index) => (
                    <MenuItem key={index} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
            </Box>
          </Box>
        )}

        {newAdditionType === "Multiple" && (
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
            <Typography
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: theme.palette.error.main,
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              <WarningIcon
                sx={{ marginRight: "0.5rem", fill: theme.palette.error.main }}
              />{" "}
              For multiple user addition, passwords won't be released to users
              personally, to reduce load on backend server. Users have to
              manually reset password. Notify users to reset password through
              "Forgot Password" option in login page.
            </Typography>
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

            <Box
              id="InputRow3"
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
                id="DepartmentInput"
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
                  id="se-dept"
                  select
                  label="Department"
                  defaultValue="Information Science and Technology"
                  value={commonUserDept}
                  onChange={(e) => setCommonUserDept(e.target.value)}
                >
                  {dropdownOptions.departments.map((option, index) => (
                    <MenuItem key={index} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>

              <Box
                id="CourseTypeInput"
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
                  id="se-courseType"
                  select
                  label="Course Type"
                  defaultValue=""
                  value={commonUserCourseType}
                  onChange={(e) => chooseCourseType(e.target.value, "Multiple")}
                >
                  <MenuItem value="">Choose course type</MenuItem>
                  {dropdownOptions.courseTypes.map((option, index) => (
                    <MenuItem key={index} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
            </Box>

            <Box
              id="InputRow4"
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
                id="ProgrammeInput"
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
                  id="se-programme"
                  select
                  label="Programme"
                  defaultValue=""
                  value={commonUserProgramme}
                  onChange={(e) => chooseProgramme(e.target.value, "Multiple")}
                  disabled={!commonUserCourseType}
                >
                  <MenuItem value="">Choose Programme</MenuItem>
                  {getProgrammesList("Multiple").map((option, index) => (
                    <MenuItem key={index} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>

              <Box
                id="BranchInput"
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
                  id="se-branch"
                  select
                  label="Branch"
                  defaultValue=""
                  value={commonUserBranch}
                  onChange={(e) => chooseBranch(e.target.value, "Multiple")}
                  disabled={!commonUserProgramme}
                >
                  <MenuItem value="">Choose Branch</MenuItem>
                  {getBranchesList("Multiple").map((option, index) => (
                    <MenuItem key={index} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
            </Box>
          </Box>
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
                The below users will be added
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
                label="I affirm and authorize the above mentioned person to be a new
                user of this site"
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
                  !newUserEmail ||
                  !newUserRegNo ||
                  !newUserDept ||
                  !newUserCourseType ||
                  !newUserProgramme ||
                  !newUserBranch
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
                label="I affirm and authorize the above mentioned persons to be a new
                user of this site"
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
                  !commonRegNoEnd ||
                  !commonUserDept ||
                  !commonUserCourseType ||
                  !commonUserProgramme ||
                  !commonUserBranch
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
                onClick={addUserToDB}
                disabled={!otpInput}
                size="large"
                endIcon={<PersonAddAlt1Icon />}
                loading={loadingAnim}
                loadingPosition="end"
                sx={{ margin: "2rem 0rem", textTransform: "none" }}
                padding={{ xs: "1rem 2rem", sm: "2rem 3rem" }}
              >
                Add Users
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
};

export default AddNewUser;
