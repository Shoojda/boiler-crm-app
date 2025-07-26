import React, { useEffect, useState } from 'react';

const ContactsPage = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://boiler-crm-app.onrender.com/api/contacts')
      .then((res) => res.json())
      .then((data) => {
        setContacts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch contacts:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading contacts...</p>;
  if (!contacts.length) return <p>No contacts found.</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Contact List</h2>
      <table border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.name}</td>
              <td>{c.email}</td>
              <td>{c.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactsPage;
