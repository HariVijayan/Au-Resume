import express from 'express';
import previousResume from '../Database Models/resumeData.js';
import User from '../../Login/Database_Models/User.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/resume-details', async (req, res) => {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) return res.json({ message: 'No access token provided' });
    
    let decoded = "";
    try{
        decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);
        if (!user) return res.json({ message: 'No user' });
        const resumeData = await previousResume.findOne({login_email: user.email});
        if (!resumeData) return res.status(500).json({ message: 'No previous records found' });
        res.json(resumeData);
    }catch(err){
        res.json({ message: 'Unable to fetch previous records' });
    }
});

export default router;