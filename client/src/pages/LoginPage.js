import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { LanguageContext } from '../contexts/LanguageContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { language } = useContext(LanguageContext);
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await axios.post('https://boiler-crm-app.onrender.com/api/auth/login', {
        email,
        password,
      });

      const { token, user } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user)); // ✅ Store user info

      navigate('/clients');
    } catch (err) {
      alert(
        language === 'sr'
          ? 'Prijava nije uspela. Proverite podatke.'
          : 'Login failed. Please check your credentials.'
      );
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1 className="text-2xl font-bold mb-6">
          {language === 'sr' ? 'Prijava' : 'Login'}
        </h1>

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={language === 'sr' ? 'Email adresa' : 'Email'}
          className="input"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={language === 'sr' ? 'Lozinka' : 'Password'}
          className="input"
        />

        <button onClick={login} className="button">
          {language === 'sr' ? 'Prijavi se' : 'Login'}
        </button>

        <p className="mt-4 text-sm">
          {language === 'sr'
            ? 'Nemate nalog?'
            : 'Don’t have an account?'}{' '}
          <a href="/register">{language === 'sr' ? 'Registruj se' : 'Register'}</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
