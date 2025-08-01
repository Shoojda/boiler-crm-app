// src/components/TopRightSettings.js
import React, { useState, useContext } from 'react';
import LogoutButton from './LogoutButton';
import { FaCog, FaMoon, FaSun } from 'react-icons/fa';
import { LanguageContext } from '../contexts/LanguageContext';

const TopRightSettings = ({ toggleTheme, theme }) => {
  const [open, setOpen] = useState(false);
  const { language, toggleLanguage } = useContext(LanguageContext);
  const isSerbian = language === 'sr';

  return (
    <div className="settings-wrapper">
      <button className="cog-button" onClick={() => setOpen(prev => !prev)}>
        <FaCog />
      </button>

      {open && (
        <div className="settings-menu">
          <button className="dropdown-item" onClick={toggleLanguage}>
            🌐 {isSerbian ? 'English' : 'Srpski'}
          </button>

          <button className="dropdown-item" onClick={toggleTheme}>
            {theme === 'dark' ? '🌞 Light Theme' : '🌙 Dark Theme'}
          </button>

          <div className="dropdown-item">
            <LogoutButton />
          </div>
        </div>
      )}
    </div>
  );
};

export default TopRightSettings;
