import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { LanguageContext } from '../contexts/LanguageContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await axios.post('https://boiler-crm-app.onrender.com/api/auth/login', {
        email,
        password,
      });

      const { token, user } = res.data;

      // Store token, role, and email
      localStorage.setItem('token', token);
      localStorage.setItem('role', user.role);
      localStorage.setItem('email', user.email);

      // Redirect after login
      navigate('/clients');
    } catch (err) {
      alert('Login failed. ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1 className="text-2xl font-bold mb-6">Login</h1>

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="input"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="input"
        />

        <button
          onClick={login}
          className="button"
        >
          Login
        </button>

        <p className="mt-4 text-sm text-center">
          Don’t have an account?{' '}
          <a href="/register" className="text-blue-600 hover:underline">Register</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
