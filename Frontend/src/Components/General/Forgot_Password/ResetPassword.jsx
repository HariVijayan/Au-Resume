import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email; // Get email from state

  if (!email) {
    return <p>Error: No email provided. Please restart the process.</p>;
  }

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/userRequest/reset-password', { email, newPassword });
      setMessage(response.data.message);

      navigate('/'); // Redirect to login page
    } catch (err) {
      setMessage(err.response?.data?.message || 'Password reset failed');
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleResetPassword}>
        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetPassword;
