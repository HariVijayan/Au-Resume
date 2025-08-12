import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Header from "../Header";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const [serverMessage, setServerMessage] = useState("");
  const [showServerMsg, setShowServerMsg] = useState(false);
  const [serverMsgType, setServerMsgType] = useState("error");

  const getOtp = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/getFirstOtp/password-reset-otp",
        { email, isAdmin }
      );
      setServerMessage("Otp sent to email successfully");
      setServerMsgType("success");
      setShowServerMsg(true);

      setTimeout(() => {
        navigate("/verify-password-otp", { state: { email, isAdmin } });
      }, 1000); //Redirect to otp verification after 1 seconds of showing success message
    } catch (error) {
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
      <Stack
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          width: "60%",
          minHeight: "100vh",
          flexDirection: "column",
        }}
      >
        <Header headerTitle={"Verify Email to reset password"} />
        <div className="AuthenticationDivWrapper">
          <div id="dv-ForgotPassword" className="AuthenticationInputWrapper">
            <input
              type="email"
              id="in-fp_email"
              placeholder=" "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label
              htmlFor="in-fp_email"
              className="AuthenticationTextFieldLabel"
            >
              Email Id
            </label>
          </div>
        </div>
        <div id="dv-FPAdminCheckbox">
          <span>System Admin</span>
          <input
            type="checkbox"
            id="in-fp_admin"
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
          />
        </div>

        <button className="AuthenticationButton" onClick={getOtp}>
          Get Otp
        </button>
      </Stack>
    </>
  );
};

export default ForgotPassword;
