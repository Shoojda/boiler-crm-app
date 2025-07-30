// src/pages/EditClient.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';
import { LanguageContext } from '../contexts/LanguageContext';
import LogoutButton from '../components/LogoutButton';



const EditClient = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [clientData, setClientData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    address: '',
    boiler_make: '',
    boiler_model: '',
    install_date: '',
    next_service_date: '',
    notes: ''
  });

  useEffect(() => {
    axios.get(`https://boiler-crm-app.onrender.com/api/clients/${id}`)
      .then(res => setClientData(res.data))
      .catch(err => console.error('Error fetching client data:', err));
  }, [id]);

  const handleChange = (e) => {
    setClientData({ ...clientData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`https://boiler-crm-app.onrender.com/api/clients/${id}`, clientData)
      .then(() => navigate('/clients'))
      .catch(err => console.error('Error updating client:', err));
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Edit Client</h2>
        <form onSubmit={handleSubmit}>
          {Object.keys(clientData).map((field) => (
            <input
              key={field}
              type={field.includes('date') ? 'date' : 'text'}
              name={field}
              value={clientData[field]}
              onChange={handleChange}
              placeholder={field.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
            />
          ))}
          <button type="submit">Update Client</button>
        </form>
        <LogoutButton />

      </div>
    </div>
  );
};

export default EditClient;
