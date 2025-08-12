import { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Header from "../Header";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email; // Get email from state
  const isAdmin = location.state?.isAdmin || false; // Get isAdmin from state

  if (!email) {
    return <p>Please restart the process.</p>;
  }

  const resetPassword = async (e) => {
    e.preventDefault();
    if (newPassword != confirmPassword) {
      setError("Passwords doesn't match.");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/userRequest/reset-password",
        { email, newPassword, isAdmin }
      );
      setError(response.data.message);

      navigate("/"); // Redirect to login page
    } catch (err) {
      setError(err.response?.data?.message || "Password reset failed");
    }
  };

  return (
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

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button className="AuthenticationButton" onClick={resetPassword}>
        Reset Password
      </button>
    </Stack>
  );
};

export default ResetPassword;
