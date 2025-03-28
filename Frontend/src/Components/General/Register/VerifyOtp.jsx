import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const VerifyOTP = () => {
    const [otp, setOtp] = useState('');
    const [message, setMessage] = useState('');
    const [countdown, setCountdown] = useState(60); // Initial countdown time
    const [isResendDisabled, setIsResendDisabled] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state?.email || '';

    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            setIsResendDisabled(false);
        }
    }, [countdown]);

    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/verifyOtp/newUser/registration', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp }),
            });

            const data = await response.json();
            setMessage(data.message);

            if (response.ok) {
                alert('OTP Verified Successfully!');
                navigate('/'); // Redirect to login page
            } else {
                alert('OTP Verification Failed!');
            }
        } catch (error) {
            console.error('OTP verification error:', error);
            alert('OTP Verification Failed!');
        }
    };

    const handleResendOTP = async () => {
        try {
            const response = await fetch('http://localhost:5000/resendOtp/newUser/registration', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();
            setMessage(data.message);

            if (response.ok) {
                setCountdown(60); // Reset the countdown
                setIsResendDisabled(true);
            } else {
                alert('Failed to resend OTP.');
            }
        } catch (error) {
            console.error('Resend OTP error:', error);
            alert('Failed to resend OTP.');
        }
    };

    return (
        <div>
            <h2>Verify OTP</h2>
            <form onSubmit={handleVerifyOTP}>
                <input 
                    type="text" 
                    placeholder="Enter OTP" 
                    value={otp} 
                    onChange={(e) => setOtp(e.target.value)} 
                    required 
                />
                <button type="submit">Verify</button>
            </form>

            <p>Resend OTP in {countdown} seconds</p>
            <button onClick={handleResendOTP} disabled={isResendDisabled}>
                Resend OTP
            </button>

            {message && <p>{message}</p>}
        </div>
    );
};

export default VerifyOTP;
