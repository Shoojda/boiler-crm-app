import React from 'react';
import './AuthLayout.css';
import logo from '../assets/logo.png'; // adjust path if needed

const AuthLayout = ({ children }) => {
  return (
    <div className="auth-layout">
      <div className="auth-card">
        <img src={logo} alt="MojKlijent" className="auth-logo" />
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
