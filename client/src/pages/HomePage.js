import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LanguageContext } from '../contexts/LanguageContext';
import logo from '../assets/logo.png';
import LogoutButton from '../components/LogoutButton';


const HomePage = ({ toggleTheme, theme }) => {
  const navigate = useNavigate();
  const { language, toggleLanguage } = useContext(LanguageContext);

  const isSerbian = language === 'sr';

  return (
    <div className="layout-container">
      {/* Top Bar */}
      <div className="top-bar">
        <button onClick={toggleLanguage} className="lang-toggle">
          🌐 {isSerbian ? 'English' : 'Srpski'}
        </button>
        
      </div>

      {/* Main Card */}
      <div className="card">
        <img src={logo} alt="MojKlijent" className="logo" />
        <h1>{isSerbian ? 'Dobrodošli u MojKlijent' : 'Welcome to MojKlijent'}</h1>
        <p>{isSerbian ? 'Izaberite opciju:' : 'Please choose an option below:'}</p>

        <button onClick={() => navigate('/add-client')}>
          ➕ {isSerbian ? 'Dodaj klijenta' : 'Add a Client'}
        </button>
        <button onClick={() => navigate('/clients')}>
          📋 {isSerbian ? 'Lista klijenata' : 'View Clients'}
        </button>
        <button onClick={() => navigate('/automation')}>
          📨 {isSerbian ? 'Email i automatizacija' : 'Emails & Automation'}
        </button>
        <LogoutButton />

        
      </div>

    </div>
  );
};

export default HomePage;
