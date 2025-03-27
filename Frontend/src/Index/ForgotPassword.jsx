import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRequestOTP = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/getFirstOtp/password-reset-otp', { email });
      setMessage(response.data.message);

      // Navigate to ForgotPasswordOtp with email as state
      navigate('/verify-password-otp', { state: { email } });
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to send OTP');
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <form onSubmit={handleRequestOTP}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send OTP</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ForgotPassword;
