// src/pages/ClientDetails.js
import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { LanguageContext } from '../contexts/LanguageContext';
import logo from '../assets/logo.svg'; // Adjust path if needed

const fieldLabels = {
  en: {
    first_name: 'First Name',
    last_name: 'Last Name',
    email: 'Email',
    phone: 'Phone',
    address: 'Address',
    boiler_make: 'Boiler Make',
    boiler_model: 'Boiler Model',
    install_date: 'Install Date',
    next_service_date: 'Next Service Date',
    notes: 'Notes',
    edit: 'Edit',
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    title: 'Client Details',
    prevServices: 'Service History',
    noServices: 'No service records yet.',
    back: '← Back to Clients'
  },
  sr: {
    first_name: 'Ime',
    last_name: 'Prezime',
    email: 'Email',
    phone: 'Telefon',
    address: 'Adresa',
    boiler_make: 'Proizvođač bojlera',
    boiler_model: 'Model bojlera',
    install_date: 'Datum instalacije',
    next_service_date: 'Sledeći servis',
    notes: 'Beleške',
    edit: 'Izmeni',
    save: 'Sačuvaj',
    cancel: 'Otkaži',
    delete: 'Obriši nalog',
    title: 'Detalji Klijenta',
    prevServices: 'Istorija servisa',
    noServices: 'Nema servisa.',
    back: '← Nazad na Klijente'
  }
};

function safeDate(val) {
  if (!val) return null;
  const date = new Date(val);
  if (isNaN(date)) return null;
  return date.toISOString().split('T')[0];
}

function buildUpdatePayload(client, update) {
  return {
    ...client,
    ...update,
    install_date: safeDate(update.install_date ?? client.install_date),
    next_service_date: safeDate(update.next_service_date ?? client.next_service_date),
  };
}

const fields = [
  'first_name', 'last_name', 'email', 'phone', 'address',
  'boiler_make', 'boiler_model', 'install_date', 'next_service_date', 'notes'
];

const ClientDetails = () => {
  const { id } = useParams();
  const { language } = useContext(LanguageContext);
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editField, setEditField] = useState('');
  const [editValue, setEditValue] = useState('');
  const [error, setError] = useState('');
  const t = fieldLabels[language];
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(
          `https://boiler-crm-app.onrender.com/api/clients/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setClient(res.data);
      } catch (err) {
        setError('Error fetching client.');
      } finally {
        setLoading(false);
      }
    };
    fetchClient();
  }, [id]);

  const startEdit = (field) => {
    setEditField(field);
    setEditValue(client[field] || '');
  };

  const cancelEdit = () => {
    setEditField('');
    setEditValue('');
  };

  const saveEdit = async () => {
    try {
      const token = localStorage.getItem('token');
      const update = {
        [editField]: editField.includes('date') ? safeDate(editValue) : editValue
      };
      const payload = buildUpdatePayload(client, update);

      await axios.put(
        `https://boiler-crm-app.onrender.com/api/clients/${id}`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setClient(prev => ({ ...prev, ...update }));
      cancelEdit();
    } catch (err) {
      alert('Error saving change.');
    }
  };

  const handleSoftDelete = async () => {
    if (!window.confirm(language === 'en' ? 'Are you sure you want to deactivate this client?' : 'Da li ste sigurni da želite da deaktivirate klijenta?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `https://boiler-crm-app.onrender.com/api/clients/${id}`,
        { is_active: 0 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(language === 'en' ? 'Client deactivated.' : 'Klijent deaktiviran.');
      navigate('/clients');
    } catch (err) {
      alert('Error deactivating client.');
    }
  };

  if (loading) return <div className="container"><p>Loading...</p></div>;
  if (error) return <div className="container" style={{ color: 'red' }}>{error}</div>;
  if (!client) return null;

  return (
      
      <div className="container" style={{
      
        minHeight: '100vh',
        background: '#f7f7f7',
        padding: '1rem',
        boxSizing: 'border-box'
      }}>
      <div className="card" style={{
        
        borderRadius: 24,
        boxShadow: '0 2px 24px #0001',
        padding: '2.5rem 2rem',
        width: '100%',
        maxWidth: '100%',
        background: '#fff'
      }}>
        <img src={logo} alt="MojKlijent" className="logo" />
        
        <div style={{ marginBottom: 16 }}>
          <Link to="/clients" className="btn-primary" style={{
            fontWeight: 600,
            fontSize: 14,
            padding: '10px 14px',
            borderRadius: 6,
            display: 'inline-block',
            textDecoration: 'none'
          }}>
            {t.back}
          </Link>
        </div>
        

        <h1 style={{ fontWeight: 700, fontSize: 26, textAlign: 'center', marginBottom: 28 }}>{t.title}</h1>

        {fields.map(field => (
          <div key={field} style={{ display: 'flex', flexDirection: 'column', marginBottom: 16 }}>
            <label style={{ fontWeight: 500, marginBottom: 4 }}>{t[field]}</label>
            {editField === field ? (
              <input
                type={field.includes('date') ? 'date' : 'text'}
                value={editValue || ''}
                onChange={e => setEditValue(e.target.value)}
                className="input"
                style={{ padding: '6px 8px', fontSize: 14, borderRadius: 7 }}
              />
            ) : (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ maxWidth: '75%' }}>
                  {field.includes('date')
                    ? safeDate(client[field])
                    : (client[field] || <span style={{ color: '#bbb' }}>-</span>)}
                </span>
                <button
                  onClick={() => startEdit(field)}
                  className="btn-secondary"
                  style={{
                    width: 26,
                    height: 26,
                    padding: 0,
                    fontSize: 13,
                    lineHeight: '24px',
                    textAlign: 'center',
                    marginLeft: 8,
                    borderRadius: 5,
                    cursor: 'pointer'
                  }}
                >
                  🖉
                </button>
              </div>
            )}
            {editField === field && (
              <div style={{ marginTop: 6, display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                <button onClick={saveEdit} className="btn-primary" style={{ padding: '4px 12px', fontSize: 13 }}>{t.save}</button>
                <button onClick={cancelEdit} className="btn-secondary" style={{ padding: '4px 10px', fontSize: 13 }}>{t.cancel}</button>
              </div>
            )}
          </div>
        ))}

        <div style={{ margin: '2.5rem 0 1.25rem', borderBottom: '1px solid #eee' }} />

        <h3 style={{ fontWeight: 600, marginBottom: 8, fontSize: 18 }}>{t.prevServices}</h3>
        {Array.isArray(client.service_history) && client.service_history.length > 0 ? (
          <div style={{ marginBottom: 24 }}>
            {client.service_history.map((service, index) => (
              <div
                key={index}
                style={{
                  background: '#f9f9f9',
                  border: '1px solid #ddd',
                  borderRadius: 8,
                  padding: 12,
                  marginBottom: 12
                }}
              >
                <div style={{ fontSize: 14, marginBottom: 4 }}>
                  <strong>Date:</strong> {service.date || 'N/A'}
                </div>
                <div style={{ fontSize: 14, marginBottom: 4 }}>
                  <strong>Notes:</strong> {service.notes || 'N/A'}
                </div>
                {service.images && service.images.length > 0 && (
                  <div style={{ fontSize: 14 }}>
                    <strong>Images:</strong>
                    <ul style={{ marginLeft: 16 }}>
                      {service.images.map((img, i) => (
                        <li key={i}>
                          <a href={img} target="_blank" rel="noopener noreferrer">
                            View Image {i + 1}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div style={{ color: '#666', fontSize: 15, marginBottom: 20 }}>{t.noServices}</div>
        )}

        <Link to={`/client/${id}/add-service`} className="btn-primary" style={{
            fontWeight: 600,
            fontSize: 14,
            padding: '10px 14px',
            borderRadius: 6,
            display: 'inline-block',
            textDecoration: 'none'
          }}>
          ➕ Add Service
        </Link>

        <button onClick={handleSoftDelete} className="btn-secondary" style={{
          backgroundColor: '#ffdddd',
          color: '#a00',
          width: '100%',
          fontWeight: 600,
          fontSize: 16,
          padding: '12px 0',
          borderRadius: 8,
          textDecoration: 'none'
        }}>
          {t.delete}
        </button>
      </div>
    </div>
  );
};

export default ClientDetails;
