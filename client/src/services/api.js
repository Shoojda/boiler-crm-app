import axios from 'axios';

const API = axios.create({
  baseURL 'httpsboiler-crm-app.onrender.comapi',
});

export default API;