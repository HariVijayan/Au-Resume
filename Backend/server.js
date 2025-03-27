import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import pdfEndpoint from './Pdf/Routing_Endpoint/generatePdf.js';
import firstTimeOtp from './Login/Routing_Endpoints/Otp/First_Time_Otp/passwordResetOtp.js';
import resendOtpNewUser from './Login/Routing_Endpoints/Otp/Resend_Otp/newRegistration.js';
import resendOtp from './Login/Routing_Endpoints/Otp/Resend_Otp/resendOtp.js';
import verifyOtpNewUser from './Login/Routing_Endpoints/Otp/Verify_Otp/newRegistration.js';
import verifyOtp from './Login/Routing_Endpoints/Otp/Verify_Otp/verifyOtp.js';
import login from './Login/Routing_Endpoints/Authentication/Login/login.js';
import logout from './Login/Routing_Endpoints/Authentication/Logout/logout.js';
import registerNewUser from './Login/Routing_Endpoints/Requests/New_User/registerNewUser.js';
import passwordReset from './Login/Routing_Endpoints/Requests/Password_Reset/passwordReset.js';
import newRefreshToken from './Login/Routing_Endpoints/Requests/Refresh_Token/refreshToken.js';
import mongoose from 'mongoose';

const app = express();
const port = 5000;

app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true,
}));

app.use(express.json());


app.use('/Pdf', pdfEndpoint);

import cookieParser from 'cookie-parser';
app.use(cookieParser()); 


//Routing
app.use('/getFirstOtp', firstTimeOtp);

app.use('/resendOtp/newUser', resendOtpNewUser);

app.use('/resendOtp/existingUser', resendOtp);

app.use('/verifyOtp/newUser', verifyOtpNewUser);

app.use('/verifyOtp/existingUser', verifyOtp);

app.use('/authenticateUser', login);

app.use('/authenticateUser', logout);

app.use('/createUser', registerNewUser);

app.use('/userRequest', passwordReset);

app.use('/tokenRequest', newRefreshToken);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
