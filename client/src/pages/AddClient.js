import React, { useState } from 'react';

const AddClient = () => {
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
    notes: ''
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Submitting...');

    try {
      const res = await fetch('https://boiler-crm-app.onrender.com/api/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.error || 'Failed to submit');

      setStatus('✅ Client saved successfully');
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
        notes: ''
      });
    } catch (err) {
      console.error(err);
      setStatus(`❌ ${err.message}`);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px' }}>
      <h2>Add New Client</h2>
      <form onSubmit={handleSubmit}>
        <input name="first_name" placeholder="First Name" value={formData.first_name} onChange={handleChange} required />
        <input name="last_name" placeholder="Last Name" value={formData.last_name} onChange={handleChange} required />
        <input name="email" placeholder="Email" type="email" value={formData.email} onChange={handleChange} required />
        <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
        <input name="address" placeholder="Address" value={formData.address} onChange={handleChange} />
        <input name="boiler_make" placeholder="Boiler Make" value={formData.boiler_make} onChange={handleChange} />
        <input name="boiler_model" placeholder="Boiler Model" value={formData.boiler_model} onChange={handleChange} />
        <label>Install Date:
          <input name="install_date" type="date" value={formData.install_date} onChange={handleChange} />
        </label>
        <label>Next Service Date:
          <input name="next_service_date" type="date" value={formData.next_service_date} onChange={handleChange} />
        </label>
        <textarea name="notes" placeholder="Notes" value={formData.notes} onChange={handleChange}></textarea>
        <button type="submit" style={{ marginTop: '1rem' }}>Save Client</button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
};

export default AddClient;
