// src/AppRouter.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddClient from './pages/AddClient';
import ClientList from './pages/ClientsList';
import EditClient from './pages/EditClient';
import ClientDetails from './pages/ClientDetails';
import Automation from './pages/Automation';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PrivateRoute from './components/PrivateRoute'; // ✅ Add this import
import './App.css';

function AppRouter() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <Router>
      <div className="container">
        <Routes>
          {/* 🔓 Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* 🔐 Protected Routes */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <HomePage toggleTheme={toggleTheme} theme={theme} />
              </PrivateRoute>
            }
          />
          <Route
            path="/add-client"
            element={
              <PrivateRoute>
                <AddClient />
              </PrivateRoute>
            }
          />
          <Route
            path="/clients"
            element={
              <PrivateRoute>
                <ClientList />
              </PrivateRoute>
            }
          />
          <Route
            path="/edit-client/:id"
            element={
              <PrivateRoute>
                <EditClient />
              </PrivateRoute>
            }
          />
          <Route
            path="/client-details/:id"
            element={
              <PrivateRoute>
                <ClientDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="/automation"
            element={
              <PrivateRoute>
                <Automation />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default AppRouter;
