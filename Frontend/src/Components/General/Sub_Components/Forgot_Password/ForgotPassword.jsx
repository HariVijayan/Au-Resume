import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const getOtp = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/getFirstOtp/password-reset-otp",
        { email }
      );
      setError(response.data.message);

      navigate("/verify-password-otp", { state: { email } });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP");
    }
  };

  return (
    <div id="dv-ForgotPasswordWrapper" className="AuthenticationWrapper">
      <div id="dv-FPLogoWrapper" className="LogoWrapper">
        <img src="/Au Logo.png" id="img-aulogo" alt="AU Logo"></img>
        <p>Department of IST</p>
      </div>
      <h2>Verify Email to reset password</h2>
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
          <label htmlFor="in-fp_email" className="AuthenticationTextFieldLabel">
            Email Id
          </label>
        </div>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button className="AuthenticationButton" onClick={getOtp}>
        Get Otp
      </button>
    </div>
  );
};

export default ForgotPassword;
