import { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Header from "../Header";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  const isAdmin = location.state?.isAdmin || false;

  const [serverMessage, setServerMessage] = useState("");
  const [showServerMsg, setShowServerMsg] = useState(false);
  const [serverMsgType, setServerMsgType] = useState("error");

  if (!email) {
    return <p>Please restart the process.</p>;
  }

  const resetPassword = async (e) => {
    e.preventDefault();
    if (newPassword != confirmPassword) {
      setServerMessage("Password doesn't match");
      setServerMsgType("error");
      setShowServerMsg(true);
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/userRequest/reset-password",
        { email, newPassword, isAdmin }
      );
      setServerMessage("Password reset successful");
      setServerMsgType("success");
      setShowServerMsg(true);

      setTimeout(() => {
        navigate("/");
      }, 1000); //Redirect to login page after 1 seconds of showing success message
    } catch (error) {
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
        <Header headerTitle={"Reset Password"} />
        <div className="AuthenticationDivWrapper">
          <div id="dv-RPPassword" className="AuthenticationInputWrapper">
            <input
              type="password"
              id="in-rp_password"
              placeholder=" "
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <label
              htmlFor="in-rp_password"
              className="AuthenticationTextFieldLabel"
            >
              Password
            </label>
          </div>
        </div>

        <div className="AuthenticationDivWrapper">
          <div id="dv-RPConfirmPassword" className="AuthenticationInputWrapper">
            <input
              type="password"
              id="in-rp_confirmpassword"
              placeholder=" "
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <label
              htmlFor="in-rp_confirmpassword"
              className="AuthenticationTextFieldLabel"
            >
              Confirm Password
            </label>
          </div>
        </div>

        <button className="AuthenticationButton" onClick={resetPassword}>
          Reset Password
        </button>
      </Stack>
    </>
  );
};

export default ResetPassword;
