import axios from "axios";

// const BASE_URL = 'http://localhost:3000/api';
const BASE_URL = 'https://map-me-server.onrender.com/api';

const instance = axios.create({
  baseURL: BASE_URL,
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 403) {
      const email = error.response.data.email || error.response.config.data.email;
      console.log(email)
      localStorage.clear();
      if (email) {
        localStorage.setItem('email', email);
      }
      window.location.href = '/verifyemail';
    }
    return Promise.reject(error);
  }
);

export default instance;