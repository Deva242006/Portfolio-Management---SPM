import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('portfolio_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If 401 unauthorized and not on login/register/public page, handle gracefully
    if (error.response && error.response.status === 401) {
      const isAuthUrl = error.config.url.includes('/api/auth/login') || error.config.url.includes('/api/auth/register');
      if (!isAuthUrl && localStorage.getItem('portfolio_token')) {
        localStorage.removeItem('portfolio_token');
        localStorage.removeItem('portfolio_user');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;

