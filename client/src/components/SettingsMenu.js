// src/components/SettingsMenu.js
import React, { useState, useContext } from 'react';
import { FaCog } from 'react-icons/fa';
import { LanguageContext } from '../contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';

const SettingsMenu = ({ toggleTheme }) => {
  const [open, setOpen] = useState(false);
  const { language, toggleLanguage } = useContext(LanguageContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="settings-wrapper">
      <button className="cog-button" onClick={() => setOpen(!open)}>
        <FaCog />
      </button>
      {open && (
        <div className="settings-menu">
          <button className="dropdown-item" onClick={toggleLanguage}>
            🌐 {language === 'sr' ? 'English' : 'Srpski'}
          </button>
          <button className="dropdown-item" onClick={toggleTheme}>
            🌓 Toggle Theme
          </button>
          <button className="dropdown-item" onClick={handleLogout}>
            🔒 Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default SettingsMenu;
