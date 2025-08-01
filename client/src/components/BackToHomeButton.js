// src/components/BackToHomeButton.js
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LanguageContext } from '../contexts/LanguageContext';

const BackToHomeButton = () => {
  const navigate = useNavigate();
  const { language } = useContext(LanguageContext);

  return (
    <button
      className="back-home-btn"
      onClick={() => navigate('/')}
    >
      ← {language === 'sr' ? 'Početna' : 'Home'}
    </button>
  );
};

export default BackToHomeButton;
