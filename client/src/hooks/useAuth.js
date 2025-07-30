// src/hooks/useAuth.js
export const useAuth = () => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const email = localStorage.getItem('email');
  return { token, role, email, isLoggedIn: !!token };
};