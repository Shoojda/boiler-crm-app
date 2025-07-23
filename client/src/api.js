import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="container">
      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
      </button>

      <h1>🔥 Boiler CRM</h1>
      <p style={{ textAlign: 'center', fontStyle: 'italic' }}>
        Current theme: <strong>{theme}</strong>
      </p>

      {/* Replace below with your client form or list */}
      <h2>Add New Client</h2>
        <form onSubmit={handleSubmit}>
          <input name="first_name" placeholder="First Name" value={formData.first_name} onChange={handleChange} />
          <input name="last_name" placeholder="Last Name" value={formData.last_name} onChange={handleChange} />
          <input name="email" placeholder="Email" type="email" value={formData.email} onChange={handleChange} />
          <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
          <input name="address" placeholder="Address" value={formData.address} onChange={handleChange} />
          <input name="boiler_make" placeholder="Boiler Make" value={formData.boiler_make} onChange={handleChange} />
          <input name="boiler_model" placeholder="Boiler Model" value={formData.boiler_model} onChange={handleChange} />
          <label>Install Date: <input name="install_date" type="date" value={formData.install_date} onChange={handleChange} /></label>
          <label>Next Service Date: <input name="next_service_date" type="date" value={formData.next_service_date} onChange={handleChange} /></label>
          <textarea name="notes" placeholder="Notes" value={formData.notes} onChange={handleChange}></textarea>
          <button type="submit">Save Client</button>
        </form>

    </div>
  );
}

export default App;
