import React, { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LanguageContext } from '../contexts/LanguageContext';

const labels = {
  en: {
    title: 'Add Service',
    date: 'Date of Service',
    notes: 'Service Notes',
    submit: 'Save Service',
    back: '← Back to Client',
    success: 'Service added successfully.',
    error: 'Failed to add service.',
  },
  sr: {
    title: 'Dodaj Servis',
    date: 'Datum Servisa',
    notes: 'Beleške o Servisu',
    submit: 'Sačuvaj Servis',
    back: '← Nazad na Klijenta',
    success: 'Servis uspešno dodat.',
    error: 'Greška prilikom dodavanja servisa.',
  }
};

const AddService = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language } = useContext(LanguageContext);
  const t = labels[language];

  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `https://boiler-crm-app.onrender.com/api/clients/${id}/add-service`,
        { date, notes, images: [] },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(t.success);
      navigate(`/client-details/${id}`);
    } catch (err) {
      console.error(err);
      setError(t.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="card" style={{ maxWidth: 460, width: '100%', padding: '2.5rem 2rem' }}>
        <h2 style={{ textAlign: 'center', marginBottom: 24 }}>{t.title}</h2>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16 }}>
            <label>{t.date}</label>
            <input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              required
              className="input"
              style={{ width: '100%', padding: 8, fontSize: 14 }}
            />
          </div>

          <div style={{ marginBottom: 16 }}>
            <label>{t.notes}</label>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              rows={4}
              className="input"
              style={{ width: '100%', padding: 8, fontSize: 14 }}
              placeholder="Service notes..."
            />
          </div>

          {error && <p style={{ color: 'red' }}>{error}</p>}

          <button type="submit" className="btn-primary" style={{ width: '100%', padding: '10px 0', fontSize: 16 }} disabled={loading}>
            {loading ? 'Saving...' : t.submit}
          </button>
        </form>

        <button
          onClick={() => navigate(`/client-details/${id}`)}
          className="btn-secondary"
          style={{ width: '100%', marginTop: 12, padding: '10px 0', fontSize: 16 }}
        >
          {t.back}
        </button>
      </div>
    </div>
  );
};

export default AddService;
