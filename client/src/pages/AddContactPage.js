import React, { useState } from 'react';

const AddContactPage = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Submitting...');

    try {
      const res = await fetch('https://boiler-crm-app.onrender.com/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error('Failed to submit');

      setStatus('Contact added ✅');
      setForm({ name: '', email: '', phone: '' });
    } catch (err) {
      console.error(err);
      setStatus('Failed to add contact ❌');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px' }}>
      <h2>Add New Contact</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input name="name" value={form.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Email: </label>
          <input name="email" value={form.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Phone: </label>
          <input name="phone" value={form.phone} onChange={handleChange} required />
        </div>
        <button type="submit" style={{ marginTop: '1rem' }}>Add Contact</button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
};

export default AddContactPage;
