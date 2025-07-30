// src/utils/impersonate.js
export const impersonateAs = (email) => {
  // Simulate a token, or call your backend to get a real one
  localStorage.setItem('token', 'mock-token-for-' + email);
  localStorage.setItem('role', 'admin');
  localStorage.setItem('email', email);
  window.location.href = '/';
};