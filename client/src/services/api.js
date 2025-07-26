import axios from 'axios';

const API = axios.create({
  baseURL: 'https://boiler-crm-app.onrender.com/api/contacts',
});

export default API;
