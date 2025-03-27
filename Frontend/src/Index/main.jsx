import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login.jsx';
import Register from './Register.jsx';
import Otp from './NewRegisterOtp.jsx';
import ForgotPassword from './ForgotPassword';
import VerifyPasswordOtp from './VerifyPasswordOtp';
import ResetPassword from './ResetPassword';

createRoot(document.getElementById('dv-BodyWrapper')).render(
  <StrictMode>
    <Router>
      <Routes>
      <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<Otp />} /> 
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-password-otp" element={<VerifyPasswordOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </Router>
  </StrictMode>,
);
