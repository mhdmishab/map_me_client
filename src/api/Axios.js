import axios from "axios";
import { useNavigate } from "react-router-dom";

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

export default instance;