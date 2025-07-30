import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { LanguageContext } from '../contexts/LanguageContext';

const AddClient = () => {
  const { language, toggleLanguage } = useContext(LanguageContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    address: '',
    boiler_make: '',
    boiler_model: '',
    install_date: '',
    next_service_date: '',
    notes: '',
  });

  const t = {
    en: {
      title: 'Add New Client',
      submit: 'Save Client',
      back: '← Back to Clients',
      toggleLang: '🌐 Српски',
    },
    sr: {
      title: 'Dodaj novog klijenta',
      submit: 'Sačuvaj klijenta',
      back: '← Nazad na klijente',
      toggleLang: '🌐 English',
    },
  }[language];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await axios.post('https://boiler-crm-app.onrender.com/api/clients', form);
      alert(language === 'en' ? 'Client saved!' : 'Klijent sačuvan!');
      navigate('/clients');
    } catch (err) {
      alert('Error saving client.');
    }
  };

  return (
    <div className="container">
      <div className="top-right-buttons">
        <button onClick={toggleLanguage} className="top-btn">{t.toggleLang}</button>
      </div>

      <h1 className="mb-4">{t.title}</h1>

      {Object.entries({
        first_name: 'First Name / Ime',
        last_name: 'Last Name / Prezime',
        email: 'Email',
        phone: 'Phone / Telefon',
        address: 'Address / Adresa',
        boiler_make: 'Boiler Make / Proizvođač bojlera',
        boiler_model: 'Boiler Model / Model bojlera',
        install_date: 'Install Date / Datum instalacije',
        next_service_date: 'Next Service Date / Sledeći servis',
        notes: 'Notes / Beleške',
      }).map(([key, label]) => (
        <input
          key={key}
          name={key}
          value={form[key]}
          onChange={handleChange}
          placeholder={label}
          className="input"
        />
      ))}

      <button onClick={handleSubmit} className="btn-primary mt-4">
        {t.submit}
      </button>

      <button onClick={() => navigate('/clients')} className="btn-secondary mt-2">
        {t.back}
      </button>
    </div>
  );
};

export default AddClient;
