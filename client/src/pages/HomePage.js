import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import logo from '../assets/logo.png'; // ✅ correct relative path from pages/



const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <img src={logo} alt="MojKlijent" className="logo" />
      <h1>Welcome to MojKlijent</h1>
      <p>Please choose an option below:</p>

      <div className="home-buttons">
        <button onClick={() => navigate('/add-client')}>➕ Add a Client</button>
        <button onClick={() => navigate('/clients')}>📋 View Clients</button>
        <button onClick={() => navigate('/automation')}>📨 Emails & Automation</button>
      </div>
    </div>
  );
};

export default HomePage;
