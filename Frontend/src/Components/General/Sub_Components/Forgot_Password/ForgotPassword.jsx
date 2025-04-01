import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRequestOTP = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/getFirstOtp/password-reset-otp",
        { email }
      );
      setMessage(response.data.message);

      navigate("/verify-password-otp", { state: { email } });
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to send OTP");
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <div id="dv-ForgotPassword" className="InputWrapper">
        <input
          type="email"
          id="in-fp_email"
          placeholder=" "
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="in-fp_email" className="TextFieldLabel">
          Email Id
        </label>
      </div>
      <button onClick={handleRequestOTP}>Send OTP</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ForgotPassword;
