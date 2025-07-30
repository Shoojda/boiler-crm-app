import React, { useEffect, useState } from 'react';

const ContactsList = ({ clientId }) => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('');

  const fetchContacts = async () => {
    try {
      const res = await fetch(`https://boiler-crm-app.onrender.com/api/contacts?client_id=${clientId}`);
      const data = await res.json();
      setContacts(data);
    } catch (err) {
      console.error(err);
      setStatus('Failed to load contacts.');
    } finally {
      setLoading(false);
    }
  };

  const deleteContact = async (id) => {
    if (!window.confirm('Are you sure you want to delete this contact?')) return;

    try {
      const res = await fetch(`https://boiler-crm-app.onrender.com/api/contacts/${id}`, {
        method: 'DELETE'
      });

      if (!res.ok) throw new Error('Failed to delete');

      setContacts((prev) => prev.filter((c) => c.id !== id));
      setStatus('✅ Contact deleted');
    } catch (err) {
      console.error(err);
      setStatus('❌ Failed to delete contact');
    }
  };

  useEffect(() => {
    if (clientId) {
      fetchContacts();
    }
  }, [clientId]);

  if (loading) return <p>Loading contacts...</p>;

  return (
    <div style={{ marginTop: '2rem' }}>
      <h3>Contacts</h3>
      {status && <p>{status}</p>}
      {contacts.length === 0 ? (
        <p>No contacts found.</p>
      ) : (
        <ul>
          {contacts.map((contact) => (
            <li key={contact.id}>
              <strong>{contact.name}</strong> – {contact.email}, {contact.phone}
              <button onClick={() => deleteContact(contact.id)} style={{ marginLeft: '1rem' }}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ContactsList;
