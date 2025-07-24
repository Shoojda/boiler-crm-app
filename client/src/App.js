import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [theme, setTheme] = useState('light');
  const [clients, setClients] = useState([]);
  const [formData, setFormData] = useState({
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

  const API = process.env.REACT_APP_API_URL || 'https://boiler-crm-api.onrender.com';

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const res = await fetch(`${API}/api/clients`);
      const data = await res.json();
      setClients(data);
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting client:', formData);

    try {
      const response = await fetch(`${API}/api/clients`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log('Server response:', data);

      if (response.ok) {
        alert('Client saved!');
        setFormData({
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
        fetchClients();
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (err) {
      console.error('Submit error:', err);
      alert('Failed to save client');
    }
  };

  return (
    <div className="container">
      <button className="theme-toggle" onClick={() => setTheme(t => (t === 'light' ? 'dark' : 'light'))}>
        {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
      </button>

      <h1>🔥 Boiler CRM</h1>

      <form onSubmit={handleSubmit}>
        <input name="first_name" placeholder="First Name" value={formData.first_name} onChange={handleChange} required />
        <input name="last_name" placeholder="Last Name" value={formData.last_name} onChange={handleChange} required />
        <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
        <input name="address" placeholder="Address" value={formData.address} onChange={handleChange} />
        <input name="boiler_make" placeholder="Boiler Make" value={formData.boiler_make} onChange={handleChange} />
        <input name="boiler_model" placeholder="Boiler Model" value={formData.boiler_model} onChange={handleChange} />
        <input type="datetime-local" name="install_date" value={formData.install_date} onChange={handleChange} />
        <input type="datetime-local" name="next_service_date" value={formData.next_service_date} onChange={handleChange} />
        <textarea name="notes" placeholder="Additional notes" value={formData.notes} onChange={handleChange} />
        <button type="submit">Save Client</button>
      </form>

      <h2>Clients</h2>
      <ul>
        {clients.map(c => (
          <li key={c.id}>
            <strong>{c.first_name} {c.last_name}</strong><br />
            📧 {c.email} | 📞 {c.phone}<br />
            🏠 {c.address}<br />
            🔧 {c.boiler_make} {c.boiler_model}<br />
            🗓️ Installed: {c.install_date}<br />
            🔁 Next Service: {c.next_service_date}<br />
            📝 {c.notes}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
