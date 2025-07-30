import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { LanguageContext } from '../contexts/LanguageContext';


const ClientDetails = () => {
  const { id } = useParams();
  const [client, setClient] = useState(null);
  const { language, toggleLanguage } = useContext(LanguageContext);

  const t = {
    en: {
      title: 'Client Details',
      back: '← Back to Clients',
      name: 'Name',
      phone: 'Phone',
      email: 'Email',
      address: 'Address',
      boiler: 'Boiler Info',
      model: 'Model',
      installDate: 'Install Date',
      nextService: 'Next Service Date',
      notes: 'Notes',
      edit: '✏️ Edit Client',
    },
    sr: {
      title: 'Detalji Klijenta',
      back: '← Nazad na Klijente',
      name: 'Ime',
      phone: 'Telefon',
      email: 'Email',
      address: 'Adresa',
      boiler: 'Informacije o kotlu',
      model: 'Model',
      installDate: 'Datum ugradnje',
      nextService: 'Sledeći servis',
      notes: 'Beleške',
      edit: '✏️ Izmeni Klijenta',
    },
  }[language];

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const res = await axios.get(`https://boiler-crm-app.onrender.com/api/clients/${id}`);
        setClient(res.data);
      } catch (err) {
        console.error('Failed to fetch client:', err);
      }
    };

    fetchClient();
  }, [id]);

  if (!client) return <div className="container"><p>Loading...</p></div>;

  return (
    <div className="container">
      <div className="top-right-buttons">
        <button onClick={toggleLanguage} className="top-btn">
          {language === 'en' ? '🌐 Српски' : '🌐 English'}
        </button>
      </div>

      <h1 className="mb-4">{t.title}</h1>

      <div className="card space-y-4">
        <p><strong>{t.name}:</strong> {client.first_name} {client.last_name}</p>
        <p><strong>{t.phone}:</strong> {client.phone}</p>
        <p><strong>{t.email}:</strong> {client.email}</p>
        <p><strong>{t.address}:</strong> {client.address}</p>
        <p><strong>{t.boiler}:</strong> {client.boiler_make}</p>
        <p><strong>{t.model}:</strong> {client.boiler_model}</p>
        <p><strong>{t.installDate}:</strong> {client.install_date}</p>
        <p><strong>{t.nextService}:</strong> {client.next_service_date}</p>
        <p><strong>{t.notes}:</strong> {client.notes}</p>
      </div>

      <div className="mt-4 space-x-4">
        <Link to="/clients" className="button">{t.back}</Link>
        <Link to={`/edit-client/${client.id}`} className="button bg-green-600 hover:bg-green-700">{t.edit}</Link>
      </div>
    </div>
  );
};

export default ClientDetails;
