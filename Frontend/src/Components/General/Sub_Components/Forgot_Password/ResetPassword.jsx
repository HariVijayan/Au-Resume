import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email; // Get email from state

  if (!email) {
    return <p>Error: No email provided. Please restart the process.</p>;
  }

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword != confirmPassword) {
      setMessage("Passwords doesn't match.");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/userRequest/reset-password",
        { email, newPassword }
      );
      setMessage(response.data.message);

      navigate("/"); // Redirect to login page
    } catch (err) {
      setMessage(err.response?.data?.message || "Password reset failed");
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <div id="dv-RPPassword" className="InputWrapper">
        <input
          type="password"
          id="in-rp_password"
          placeholder=" "
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <label htmlFor="in-rp_password" className="TextFieldLabel">
          Password
        </label>
      </div>
      <div id="dv-RPConfirmPassword" className="InputWrapper">
        <input
          type="password"
          id="in-rp_confirmpassword"
          placeholder=" "
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <label htmlFor="in-rp_confirmpassword" className="TextFieldLabel">
          Confirm Password
        </label>
      </div>
      <button onClick={handleResetPassword}>Reset Password</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetPassword;
