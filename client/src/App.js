import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EditClient from './pages/EditClient'; // add this import




import HomePage from './pages/HomePage';
import AddClient from './pages/AddClient';
import ClientList from './pages/ClientsList';
import Automation from './pages/Automation'; // optional placeholder


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add-client" element={<AddClient />} />
        <Route path="/clients" element={<ClientList />} />
        <Route path="/automation" element={<Automation />} />
        <Route path="/edit-client/:id" element={<EditClient />} />
      </Routes>
    </Router>
  );
}

export default App;
