import React, { useState } from 'react';
import fetchWithAuth from './fetchWithAuth.js'
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetchWithAuth('http://localhost:5000/authenticateUser/logout', {
        method: 'POST',
    });
    
    window.location.href = '/';
    
    
  } catch (error) {
      console.error('Logout failed:', error);
  }
};



  return (
    <div>
      <h2>Dashboard</h2>
      <p>
        <button onClick={() => handleLogout()}>Logout</button>
      </p>
    </div>
  );
};

export default Dashboard;
