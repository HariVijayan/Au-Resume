import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
          await axios.post('http://localhost:5000/authenticateUser/login', 
              { email, password, rememberMe }, 
              { withCredentials: true } // Ensures cookies are included
          );
  
          alert('Login successful!');
          window.location.href = '/resume_builder.html';
  
      } catch (err) {
          setError(err.response?.data?.message || 'Login failed');
      }
  };
  

    return (
        <div id="dv-LoginWrapper" className='columnFstartCenter'>
            <h2>Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <label> Remember Me</label>
                </div>
                <button type="submit">Login</button>
            </form>
            <p>
                <button onClick={() => navigate('/forgot-password')}>Forgot Password?</button>
            </p>
        </div>
    );
};

export default Login;
