import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import previousResume from './Pdf/Routing_Endpoint/getPreviousResume.js';
import generateResume from './Pdf/Routing_Endpoint/generatePdf.js';
import previewResume from './Pdf/Routing_Endpoint/previewPdf.js';
import firstTimeOtp from './Login/Routing_Endpoints/Otp/First_Time_Otp/passwordResetOtp.js';
import resendOtpNewUser from './Login/Routing_Endpoints/Otp/Resend_Otp/newRegistration.js';
import resendOtp from './Login/Routing_Endpoints/Otp/Resend_Otp/resendOtp.js';
import verifyOtpNewUser from './Login/Routing_Endpoints/Otp/Verify_Otp/newRegistration.js';
import verifyOtp from './Login/Routing_Endpoints/Otp/Verify_Otp/verifyOtp.js';
import login from './Login/Routing_Endpoints/Authentication/Login/login.js';
import logout from './Login/Routing_Endpoints/Authentication/Logout/logout.js';
import checkAccess from './Login/Routing_Endpoints/Requests/Check_Access/checkAccess.js';
import registerNewUser from './Login/Routing_Endpoints/Requests/New_User/registerNewUser.js';
import passwordReset from './Login/Routing_Endpoints/Requests/Password_Reset/passwordReset.js';
import mongoose from 'mongoose';

const app = express();
const port = 5000;

app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true,
}));

app.use(express.json());

app.use(cookieParser()); 

//Routing
app.use('/getPrevious', previousResume);

app.use('/generate', generateResume);

app.use('/preview', previewResume);

app.use('/getFirstOtp', firstTimeOtp);

app.use('/resendOtp/newUser', resendOtpNewUser);

app.use('/resendOtp/existingUser', resendOtp);

app.use('/verifyOtp/newUser', verifyOtpNewUser);

app.use('/verifyOtp/existingUser', verifyOtp);

app.use('/authenticateUser', login);

app.use('/authenticateUser', logout);

app.use('/createUser', registerNewUser);

app.use('/userRequest', passwordReset);

app.use('/verifySession',checkAccess);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
