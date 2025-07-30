import React from 'react';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import logo from '../public/logo website header.svg'; // or your updated logo

const Layout = ({ children }) => {
  const navigate = useNavigate();

  return (
    <div className="layout-container">
      <div className="card">
        <div className="top-bar">
          <ThemeToggle />
        </div>
        <img src={logo} alt="MojKlijent Logo" className="logo" />
        {children}
      </div>
    </div>
  );
};

export default Layout;
