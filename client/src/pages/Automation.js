import React, { useContext } from 'react';
import { LanguageContext } from '../contexts/LanguageContext';

const Automation = () => {
  const { language } = useContext(LanguageContext);

  const t = {
    en: {
      title: 'Email & Automation Center',
      desc: 'This section will allow you to configure automated email and SMS reminders for your clients. Feature coming soon.',
      back: '← Back to Home',
    },
    sr: {
      title: 'Centar za Email i Automatizaciju',
      desc: 'Ova sekcija će vam omogućiti podešavanje automatskih podsetnika putem emaila i SMS-a. Funkcija uskoro dolazi.',
      back: '← Nazad na Početnu',
    },
  }[language];

  return (
    <div className="container">
      <h1 className="mb-4">{t.title}</h1>
      <div className="card">
        <p>{t.desc}</p>
      </div>

      <a href="/" className="button mt-4">
        {t.back}
      </a>
    </div>
  );
};

export default Automation;
