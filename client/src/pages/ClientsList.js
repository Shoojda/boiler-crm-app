import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LanguageContext } from '../contexts/LanguageContext';
import BackToHomeButton from '../components/BackToHomeButton';

const ClientsList = () => {
  const [clients, setClients] = useState([]);
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
    },
  }[language];

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user'));
        const res = await axios.get('https://boiler-crm-app.onrender.com/api/clients', {
          headers: { Authorization: `Bearer ${token}` },
          params: { user_id: user?.user_code },
        });
        setClients(res.data);
      } catch (error) {
        console.error('Failed to fetch clients:', error);
      }
    };

    fetchClients();
  }, []);

  return (
    <div className="card">
      <h1>{t.title}</h1>

      <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
        <BackToHomeButton />
      </div>

      <button onClick={() => navigate('/add-client')} className="btn-primary mt-2">
        {t.addNew}
      </button>

      {clients.length === 0 ? (
        <p className="mt-4">{t.noClients}</p>
      ) : (
        <table className="w-full text-left mt-4">
          <thead>
            <tr>
              <th>{t.name}</th>
              <th>{t.phone}</th>
              <th>{t.email}</th>
              <th>{t.actions}</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id}>
                <td>{client.first_name} {client.last_name}</td>
                <td>{client.phone}</td>
                <td>{client.email}</td>
                <td className="space-x-2">
                  <Link to={`/client-details/${client.id}`} className="text-blue-600 hover:underline">{t.view}</Link>
                  <Link to={`/edit-client/${client.id}`} className="text-green-600 hover:underline">{t.edit}</Link>
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
