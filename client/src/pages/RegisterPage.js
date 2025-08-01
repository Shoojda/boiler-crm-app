import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { LanguageContext } from '../contexts/LanguageContext';


const RegisterPage = () => {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const navigate = useNavigate();
const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');
const toggleTheme = () => {
const current = document.documentElement.getAttribute('data-theme');
const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  };

  const register = async () => {
    try {
      await axios.post('https://boiler-crm-app.onrender.com/api/auth/signup', {
        email,
        password,
        first_name: firstName,
        last_name: lastName
      });

      alert('Registration successful! Please log in.');
      navigate('/login');
    } catch (err) {
      alert('Registration failed. ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="container">
      <div className="card">
        
        <h1 className="text-2xl font-bold mb-6">Register</h1>

        <input
          type="email"
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

        <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
            className="input"
        />
            <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
            className="input"
        />


        <button
          onClick={register}
          className="button"
        >
          Register
        </button>

        <p className="mt-4 text-sm">
          Already have an account?{' '}
          <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
