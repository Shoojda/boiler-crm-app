import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditClient = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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

  useEffect(() => {
    axios.get(`https://boiler-crm-app.onrender.com/api/clients/${id}`)
      .then((res) => {
        setFormData(res.data);
      })
      .catch((err) => {
        console.error('Failed to load client:', err);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`https://boiler-crm-app.onrender.com/api/clients/${id}`, formData)
      .then(() => {
        alert('Client updated successfully!');
        navigate('/clients');
      })
      .catch((err) => {
        console.error('Update failed:', err);
        alert('Error updating client.');
      });
  };

  return (
    <div className="page" style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Edit Client</h2>
      <form onSubmit={handleSubmit}>
        <input name="first_name" placeholder="First Name" value={formData.first_name} onChange={handleChange} />
        <input name="last_name" placeholder="Last Name" value={formData.last_name} onChange={handleChange} />
        <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
        <input name="address" placeholder="Address" value={formData.address} onChange={handleChange} />
        <input name="boiler_make" placeholder="Boiler Make" value={formData.boiler_make} onChange={handleChange} />
        <input name="boiler_model" placeholder="Boiler Model" value={formData.boiler_model} onChange={handleChange} />
        
        <label>
          Install Date:
          <input name="install_date" type="date" value={formData.install_date} onChange={handleChange} />
        </label>

        <label>
          Next Service Date:
          <input name="next_service_date" type="date" value={formData.next_service_date} onChange={handleChange} />
        </label>

        <textarea name="notes" placeholder="Notes" value={formData.notes} onChange={handleChange}></textarea>

        <button type="submit" style={{ marginTop: '1rem' }}>Save Changes</button>
      </form>
    </div>
  );
};

export default EditClient;
