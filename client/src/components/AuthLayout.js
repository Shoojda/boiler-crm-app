import React from 'react';
import logo from '../assets/logo.png'; // adjust path if needed
import './AuthLayout.css';

const AuthLayout = ({ children }) => {
  return (
    <div className="auth-wrapper">
      <div className="auth-box">
        <img src={logo} alt="MojKlijent logo" className="auth-logo" />
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
