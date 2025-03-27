import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login/Login.jsx';
import Register from './Components/Register/Register.jsx';
import Otp from './Components/Register/VerifyOtp.jsx';
import ForgotPassword from './Components/Forgot_Password/ForgotPassword.jsx';
import VerifyPasswordOtp from './Components/Forgot_Password/VerifyOtp.jsx';
import ResetPassword from './Components/Forgot_Password/ResetPassword.jsx';
import './MainStyleSheet.css'

createRoot(document.getElementById('dv-AuthenticationWrapper')).render(
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
