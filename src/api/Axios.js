import axios from "axios";

const BASE_URL = 'http://localhost:3000/api';

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

// Add a response interceptor
instance.interceptors.response.use(
  (response) => {
    // If the response is successful, just return it
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 403) {
     
      window.location.href = '/verifyemail';
    }
    return Promise.reject(error);
  }
);

export default instance;