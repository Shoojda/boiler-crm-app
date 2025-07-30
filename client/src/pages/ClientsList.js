import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { LanguageContext } from '../contexts/LanguageContext';

const ClientsList = () => {
  const [clients, setClients] = useState([]);
  const { language, toggleLanguage } = useContext(LanguageContext);

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
        const res = await axios.get('https://boiler-crm-app.onrender.com/api/clients');
        setClients(res.data);
      } catch (error) {
        console.error('Failed to fetch clients:', error);
      }
    };

    fetchClients();
  }, []);

  return (
    <div className="container">
      <div className="top-right-buttons">
        <button onClick={toggleLanguage} className="top-btn">
          {language === 'en' ? '🌐 Српски' : '🌐 English'}
        </button>
      </div>

      <h1 className="mb-4">{t.title}</h1>
      <div className="card">
        <Link to="/add-client" className="button mb-4">{t.addNew}</Link>

        {clients.length === 0 ? (
          <p>{t.noClients}</p>
        ) : (
          <table className="w-full text-left">
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
    </div>
  );
};

export default ClientsList;
