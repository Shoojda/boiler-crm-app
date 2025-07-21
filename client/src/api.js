import React from 'react';
import ContactsPage from './pages/ContactsPage';
import AddContactPage from './pages/AddContactPage';

function App() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ textAlign: 'center' }}>Boiler CRM App</h1>

      {/* Show both for now */}
      <ContactsPage />
      <hr />
      <AddContactPage />
    </div>
  );
}

export default App;
