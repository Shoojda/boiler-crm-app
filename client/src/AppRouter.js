import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import AddClient from './pages/AddContacts';
import ClientsList from './pages/ClientsList';
import EmailsAutomation from './pages/EmailsAutomation';

const AppRouter = () => {
  const isLoggedIn = true; // TODO: Replace with real auth logic

  return (
    <Router>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Navigate to="/home" /> : <LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/add-client" element={<AddClient />} />
        <Route path="/clients" element={<ClientsList />} />
        <Route path="/emails-automation" element={<EmailsAutomation />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
