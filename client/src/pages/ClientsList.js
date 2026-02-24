// src/pages/ClientsList.js
import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LanguageContext } from '../contexts/LanguageContext';
import BackToHomeButton from '../components/BackToHomeButton';
import logo from '../assets/logo.svg'; // Adjust path if needed

const ClientsList = () => {
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { language } = useContext(LanguageContext);
  const navigate = useNavigate();

  const t = {
    en: {
      title: 'Client List',
      addNew: '➕ Add New Client',
      noClients: 'No clients found.',
      name: 'Name',
      phone: 'Phone',
      email: 'Email',
      actions: 'Actions',
      view: 'View',
      edit: 'Edit',
      delete: 'Delete',
      search: 'Search clients...'
    },
    sr: {
      title: 'Lista Klijenata',
      addNew: '➕ Dodaj Novog Klijenta',
      noClients: 'Nema pronađenih klijenata.',
      name: 'Ime',
      phone: 'Telefon',
      email: 'Email',
      actions: 'Akcije',
      view: 'Pregled',
      edit: 'Izmena',
      delete: 'Obriši',
      search: 'Pretraga klijenata...'
    }
  }[language];

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('https://boiler-crm-app.onrender.com/api/clients', {
          headers: { Authorization: `Bearer ${token}` },
          params: { search: searchTerm }
        });
        setClients(res.data);
      } catch (error) {
        console.error('Failed to fetch clients:', error);
      }
    };

    fetchClients();
  }, [searchTerm]);

  const handleDelete = async (id) => {
    const confirm = window.confirm(language === 'en'
      ? 'Are you sure you want to delete this client?'
      : 'Da li ste sigurni da želite da obrišete klijenta?');
    if (!confirm) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`https://boiler-crm-app.onrender.com/api/clients/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setClients(prev => prev.filter(c => c.id !== id));
    } catch (err) {
      alert('Error deleting client.');
    }
  };

  return (
    <div className="container">
      <img src={logo} alt="Logo" style={{ height: 64, marginBottom: 20 }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: 10 }}>
        <BackToHomeButton />
        <button onClick={() => navigate('/add-client')} className="btn-primary">
          {t.addNew}
        </button>
      </div>

      <input
        type="text"
        placeholder={t.search}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          width: '100%',
          padding: '10px',
          marginBottom: '16px',
          borderRadius: '8px',
          border: '1px solid #ccc'
        }}
      />

      {clients.length === 0 ? (
        <p>{t.noClients}</p>
      ) : (
        <table className="w-full text-left" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f0f0f0' }}>
              <th style={{ padding: '10px' }}><input type="checkbox" /></th>
              <th style={{ padding: '10px' }}>{t.name}</th>
              <th style={{ padding: '10px' }}>{t.phone}</th>
              <th style={{ padding: '10px' }}>{t.email}</th>
              <th style={{ padding: '10px' }}>{t.actions}</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '10px' }}><input type="checkbox" /></td>
                <td style={{ padding: '10px' }}>{client.first_name} {client.last_name}</td>
                <td style={{ padding: '10px' }}>{client.phone}</td>
                <td style={{ padding: '10px' }}>{client.email}</td>
                <td style={{ padding: '10px' }}>
                    <Link to={`/client-details/${client.id}`} className="btn-secondary" style={{ marginRight: 6 }}>
                      {t.view}
                    </Link>
                    <Link to={`/edit-client/${client.id}`} className="btn-primary" style={{ marginRight: 6 }}>
                      {t.edit}
                    </Link>
                    <button
                      onClick={() => handleDelete(client.id)}
                      className="btn-danger"
                      style={{ marginRight: 6 }}
                    >
                      {t.delete}
                    </button>
                  </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ClientsList;
