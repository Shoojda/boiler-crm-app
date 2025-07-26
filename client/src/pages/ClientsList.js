import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ClientsList = () => {
  const [clients, setClients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://boiler-crm-app.onrender.com/api/clients') 
      .then((res) => res.json())
      .then((data) => setClients(data))
      .catch((err) => console.error('Failed to fetch contacts:', err));
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this client?");
    if (!confirmed) return;

    try {
      const res = await fetch(`https://boiler-crm-app.onrender.com/api/clients/${id}?user_id=1`, {
        method: 'DELETE',
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || 'Unknown error');
      }

      alert('Client deleted successfully.');
      setClients((prev) => prev.filter((c) => c.id !== id));
  } catch (err) {
    console.error('Delete failed:', err);
    alert(`Error deleting client: ${err.message}`);
  }
};


  return (
    <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '1rem' }}>Client List</h2>
      {clients.length === 0 ? (
        <p>No clients found.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#fff' }}>
          <thead>
            <tr style={{ backgroundColor: '#f5f5f5' }}>
              <th style={cellStyle}>Name</th>
              <th style={cellStyle}>Email</th>
              <th style={cellStyle}>Phone</th>
              <th style={cellStyle}>Boiler</th>
              <th style={cellStyle}>Next Service</th>
              <th style={cellStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id}>
                <td style={cellStyle}>{client.first_name} {client.last_name}</td>
                <td style={cellStyle}>{client.email}</td>
                <td style={cellStyle}>{client.phone}</td>
                <td style={cellStyle}>{client.boiler_make} {client.boiler_model}</td>
                <td style={cellStyle}>{client.next_service_date}</td>
                <td style={cellStyle}>
                  <button onClick={() => navigate(`/edit-client/${client.id}`)} style={{ marginLeft: '10px', color: 'white' }}>Edit</button>
                  <button onClick={() => handleDelete(client.id)} style={{ marginLeft: '10px', color: 'red' }}>
                  
                    🗑 Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const cellStyle = {
  padding: '0.75rem',
  border: '1px solid #ccc',
  textAlign: 'left',
};

export default ClientsList;
