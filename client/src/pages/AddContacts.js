import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { LanguageContext } from '../contexts/LanguageContext';



const AddContacts = () => {
  const { id: clientParamId } = useParams(); // e.g. /add-contact/:id

  const [formData, setFormData] = useState({
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  address: '',
  notes: '',
  client_id: clientParamId || '', // pre-fill if passed
});

  const [clients, setClients] = useState([]);
  const [status, setStatus] = useState('');

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const userId = localStorage.getItem('user_id');
                const res = await fetch(`https://boiler-crm-app.onrender.com/api/clients?user_id=${userId}`);
                const data = await res.json();
                setClients(data);

                // If you're adding a contact *to an existing client* via URL param
                if (clientParamId) {
                    setFormData(prev => ({ ...prev, client_id: clientParamId }));
                }
            } catch (error) {
                console.error('Error fetching clients:', error);
            }
        };

    fetchClients();
    }, []);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Submitting...');

    try {
      const res = await fetch('https://boiler-crm-app.onrender.com/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, user_id: 1 }),
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.error || 'Failed to add contact');

      setStatus('✅ Contact saved successfully');
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        address: '',
        notes: '',
        client_id: '',
      });
    } catch (err) {
      console.error(err);
      setStatus(`❌ ${err.message}`);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px' }}>
      <h2>Add New Contact</h2>
      <form onSubmit={handleSubmit}>
        <input name="first_name" placeholder="First Name" value={formData.first_name} onChange={handleChange} required />
        <input name="last_name" placeholder="Last Name" value={formData.last_name} onChange={handleChange} required />
        <input name="email" placeholder="Email" type="email" value={formData.email} onChange={handleChange} required />
        <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
        <input name="address" placeholder="Address" value={formData.address} onChange={handleChange} />
        <textarea name="notes" placeholder="Notes" value={formData.notes} onChange={handleChange}></textarea>     
        <button type="submit" style={{ marginTop: '1rem' }}>Save Contact</button>
        {!clientParamId ? (
  <label>
    Associated Client:
    <select name="client_id" value={formData.client_id} onChange={handleChange} required>
      <option value="">Select a client</option>
      {clients.map(client => (
        <option key={client.id} value={client.id}>
          {client.first_name} {client.last_name}
        </option>
      ))}
    </select>
  </label>
) : (
  <p>Adding contact to client ID: {clientParamId}</p> // Optional: just for UI clarity
)}

      </form>
      {status && <p>{status}</p>}
    </div>
  );
};

export default AddContacts;
