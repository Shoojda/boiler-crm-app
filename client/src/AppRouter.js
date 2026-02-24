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
import PrivateRoute from './components/PrivateRoute';
import MainLayout from './layout/MainLayout';
import { LanguageProvider } from './contexts/LanguageContext'; // ✅ Import context
import './App.css';
import AddService from './pages/AddService';


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
    <LanguageProvider>
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
                  <MainLayout toggleTheme={toggleTheme} theme={theme}>
                    <HomePage />
                  </MainLayout>
                </PrivateRoute>
              }
            />
            <Route
              path="/add-client"
              element={
                <PrivateRoute>
                  <MainLayout toggleTheme={toggleTheme} theme={theme}>
                    <AddClient />
                  </MainLayout>
                </PrivateRoute>
              }
            />
            <Route
              path="/clients"
              element={
                <PrivateRoute>
                  <MainLayout toggleTheme={toggleTheme} theme={theme}>
                    <ClientList />
                  </MainLayout>
                </PrivateRoute>
              }
            />
            <Route
              path="/edit-client/:id"
              element={
                <PrivateRoute>
                  <MainLayout toggleTheme={toggleTheme} theme={theme}>
                    <EditClient />
                  </MainLayout>
                </PrivateRoute>
              }
            />
            <Route
              path="/client-details/:id"
              element={
                <PrivateRoute>
                  <MainLayout toggleTheme={toggleTheme} theme={theme}>
                    <ClientDetails />
                  </MainLayout>
                </PrivateRoute>
              }
            />
            <Route
              path="/automation"
              element={
                <PrivateRoute>
                  <MainLayout toggleTheme={toggleTheme} theme={theme}>
                    <Automation />
                  </MainLayout>
                </PrivateRoute>
              }
            />
            <Route path="/client/:id/add-service" element={<AddService />} />

          </Routes>
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default AppRouter;
