import React from "react";
import fetchWithAuth from './fetchWithAuth.js'

const Header = () => {

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
    <>
      <div id="dv-HeaderWrapper">
        <img src="/Au Logo.png" id="img-HeaderImage" alt="AU Logo"></img>
        <h1 id="h1-HeaderTitle">AU Resume Builder</h1>
        <h3 id="h3-HeaderDept">Department of IST</h3>
        <button onClick={() => handleLogout()}>Logout</button>
      </div>
    </>
  );
};

export default Header;
