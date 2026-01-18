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

const AddNewAdmin = () => {
  const [adminUsers, setAdminUsers] = useState([]);
  const [numAdmins, setAdminNum] = useState(0);
  const [adminName, setAdminName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [approval, setApproval] = useState(false);
  const [adminType, setAdminType] = useState("");
  const [otpInput, setOtpInput] = useState("");
  const [needApproval, setNeedApproval] = useState(null);
  const [addAdminOtp, setAddAdminOtp] = useState(null);

  const [serverMessage, setServerMessage] = useState("");
  const [showServerMsg, setShowServerMsg] = useState(false);
  const [serverMsgType, setServerMsgType] = useState("error");

  const [loadingAnim, setLoadingAnim] = useState(false);

  const requestType = "addNewAdmin";
  const theme = useTheme();

  useEffect(() => {
    const fetchAdmins = async () => {
      setLoadingAnim(true);
      setServerMessage("Processing your request...");
      setServerMsgType("info");
      setShowServerMsg(true);
      try {
        const response = await axios.post(
          "http://localhost:5000/superAdmin/fetchAdmin/adminListGrouped",
          {},
          { withCredentials: true },
        );
        setAdminUsers(response.data.userList);
        setAdminNum(response.data.numAdmins);
        setLoadingAnim(false);
        setServerMessage("Successfully fetched current admins list");
        setServerMsgType("success");
        setShowServerMsg(true);
      } catch (error) {
        setLoadingAnim(false);
        setServerMessage(
          error.response?.data?.message ||
            "Failed to fetch current admins list",
        );
        setServerMsgType("error");
        setShowServerMsg(true);
      }
    };
    fetchAdmins();
  }, [location.pathname]);

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
      setAddAdminOtp(true);
      setNeedApproval(false);
      setLoadingAnim(false);
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

  const addNewAdminToDB = async () => {
    setLoadingAnim(true);
    setServerMessage("Processing your request...");
    setServerMsgType("info");
    setShowServerMsg(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/superAdmin/actions/addNewAdmin/newAdmin",
        { adminName, adminEmail, adminType, otpInput },
        { withCredentials: true },
      );
      setLoadingAnim(false);
      setServerMessage(
        "Admin addition successful. Refreshing the page in 5 seconds",
      );
      setServerMsgType("success");
      setShowServerMsg(true);

      setTimeout(() => {
        window.location.reload(false); // This will trigger a page reload after 5 seconds delay
      }, 5000);
    } catch (error) {
      setLoadingAnim(false);
      setServerMessage(
        `${error.response?.data?.message}. Refreshing the page in 5 seconds` ||
          "Failed to add new admin. Refreshing the page in 5 seconds",
      );
      setServerMsgType("error");
      setShowServerMsg(true);
      setTimeout(() => {
        window.location.reload(false); // This will trigger a page reload after 5 seconds delay
      }, 5000);
    }
  };

  useEffect(() => {
    if (adminName && adminEmail && adminType) {
      setNeedApproval(true);
    } else {
      setNeedApproval(false);
    }
  }, [adminType, adminEmail, adminName]);

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
          Add New Admins
        </Typography>
        <Typography sx={{ textAlign: "center" }}>
          (Scroll down to see the list of current admins before adding a new
          one)
        </Typography>
        <Box
          id="InputsWrapper"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            margin: "2rem 0rem",
          }}
          flexDirection={{ xs: "column", md: "row" }}
        >
          <Box
            id="AdminNameInput"
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
              id="inp-name"
              label="Name"
              type="text"
              value={adminName}
              onChange={(e) => setAdminName(e.target.value)}
            />
          </Box>

          <Box
            id="AdminEmailInput"
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
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
            />
          </Box>

          <Box
            id="AdminTypeInput"
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
              id="se-adminType"
              select
              label="Admin Type"
              defaultValue=""
              value={adminType}
              onChange={(e) => setAdminType(e.target.value)}
            >
              <MenuItem value="SuperAdmin">Super Admin</MenuItem>
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="Analytics">Analytics</MenuItem>
            </TextField>
          </Box>
        </Box>

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
                label="I affirm and authorize the above mentioned person to be a new
                admin of this site"
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
                disabled={!approval || !adminName || !adminEmail || !adminType}
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

        {addAdminOtp && (
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
                onClick={addNewAdminToDB}
                disabled={!otpInput}
                size="large"
                endIcon={<PersonAddAlt1Icon />}
                loading={loadingAnim}
                loadingPosition="end"
                sx={{ margin: "2rem 0rem", textTransform: "none" }}
                padding={{ xs: "1rem 2rem", sm: "2rem 3rem" }}
              >
                Add Admin
              </Button>
            </Box>
          </Box>
        )}
      </Box>
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
            Current Admins List
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography sx={{ textAlign: "center" }}>
              Total number of admins currently:
            </Typography>
            <Typography
              sx={{
                textAlign: "center",
                marginLeft: "0.5rem",
                color: theme.palette.error.main,
              }}
            >
              {numAdmins}
            </Typography>
          </Box>
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
                    Name
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
                    Admin Type
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
                    Created By
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
                {adminUsers.map((admin) => (
                  <TableRow key={`${admin.name}-${admin.email}`} hover>
                    <TableCell
                      align="center"
                      sx={{
                        border: `1px solid ${theme.palette.primary.main}`,
                      }}
                    >
                      {admin.name}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        border: `1px solid ${theme.palette.primary.main}`,
                      }}
                    >
                      {admin.email}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        border: `1px solid ${theme.palette.primary.main}`,
                      }}
                    >
                      {admin.accountType}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        border: `1px solid ${theme.palette.primary.main}`,
                      }}
                    >
                      {admin.createdAtFormatted}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        border: `1px solid ${theme.palette.primary.main}`,
                      }}
                    >
                      {admin.createdBy}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        border: `1px solid ${theme.palette.primary.main}`,
                      }}
                    >
                      {admin.failedLoginAttempts}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        border: `1px solid ${theme.palette.primary.main}`,
                      }}
                    >
                      {admin.lockUntilFormatted}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </>
  );
};

export default AddNewAdmin;
