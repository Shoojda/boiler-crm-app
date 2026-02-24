// src/pages/EditClient.js
import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LanguageContext } from '../contexts/LanguageContext';
import MainLayout from '../layout/MainLayout';
import BackToHomeButton from '../components/BackToHomeButton';

function toMySQLDate(dateString) {
  if (!dateString) return null;
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) return dateString;
  const d = new Date(dateString);
  return isNaN(d) ? null : d.toISOString().slice(0, 10);
}

const EditClient = () => {
  const { language } = useContext(LanguageContext);
  const { id } = useParams();
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
      title: 'Edit Client',
      submit: 'Save Changes',
      back: '← Back to Clients',
    },
    sr: {
      title: 'Izmeni klijenta',
      submit: 'Sačuvaj izmene',
      back: '← Nazad na klijente',
    },
  }[language];

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get(`https://boiler-crm-app.onrender.com/api/clients/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setForm(res.data))
      .catch(err => {
        console.error('Error fetching client data:', err);
        alert('Error fetching client details.');
        navigate('/clients');
      });
  }, [id, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const updatedForm = {
        ...form,
        install_date: toMySQLDate(form.install_date),
        next_service_date: toMySQLDate(form.next_service_date),
      };
      await axios.put(`https://boiler-crm-app.onrender.com/api/clients/${id}`, updatedForm, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert(language === 'en' ? 'Client updated!' : 'Klijent izmenjen!');
      navigate('/clients');
    } catch (err) {
      console.error('Error updating client:', err);
      alert('Error updating client.');
    }
  };

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto bg-card p-6 rounded-2xl shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">{t.title}</h1>
          <BackToHomeButton />
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
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
            <div key={key}>
              <label className="block text-sm font-medium mb-1">{label}</label>
              <input
                name={key}
                value={form[key] || ''}
                onChange={handleChange}
                type={key.includes('date') ? 'date' : 'text'}
                className="input w-full"
              />
            </div>
          ))}

          <div className="mt-6 flex flex-col gap-2">
            <button type="submit" className="btn-primary w-full">
              {t.submit}
            </button>
            <button
              type="button"
              onClick={() => navigate('/clients')}
              className="btn-secondary w-full"
            >
              {t.back}
            </button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
};

export default EditClient;
