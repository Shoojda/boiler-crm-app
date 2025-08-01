import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { LanguageContext } from '../contexts/LanguageContext';
import BackToHomeButton from '../components/BackToHomeButton';

const AddClient = () => {
  const { language } = useContext(LanguageContext);
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
    },
    sr: {
      title: 'Dodaj novog klijenta',
      submit: 'Sačuvaj klijenta',
      back: '← Nazad na klijente',
    },
  }[language];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');

      await axios.post('https://boiler-crm-app.onrender.com/api/clients', form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert(language === 'en' ? 'Client saved!' : 'Klijent sačuvan!');
      navigate('/clients');
    } catch (err) {
      console.error(err);
      alert('Error saving client.');
    }
  };


  return (
    <div className="card">
      <h1>{t.title}</h1>

      <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%', marginBottom: '1rem' }}>
        <BackToHomeButton />
      </div>

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
          type={key.includes('date') ? 'date' : 'text'}
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
