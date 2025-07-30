import React, { useState } from 'react';
import { LanguageContext } from '../contexts/LanguageContext';


const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://boiler-crm-app.onrender.com/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      localStorage.setItem('token', data.token);
      localStorage.setItem('user_id', data.userId);
      setMessage('Signup successful!');
      window.location.href = '/home';
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Sign Up</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSignup}>
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" required />
        <button type="submit">Sign Up</button>
      </form>
      <p>Already have an account? <a href="/">Log in</a></p>
    </div>
  );
};

export default SignupPage;
