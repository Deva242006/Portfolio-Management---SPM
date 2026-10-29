import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('portfolio_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('portfolio_token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('portfolio_token');
      if (storedToken) {
        try {
          const res = await api.get('/api/auth/me');
          if (res.data?.data) {
            setUser(res.data.data);
            localStorage.setItem('portfolio_user', JSON.stringify(res.data.data));
          }
        } catch (err) {
          console.error('Session expired or invalid', err);
          logout();
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    const res = await api.post('/api/auth/login', { email, password });
    const { token: receivedToken, user: receivedUser } = res.data.data;
    setToken(receivedToken);
    setUser(receivedUser);
    localStorage.setItem('portfolio_token', receivedToken);
    localStorage.setItem('portfolio_user', JSON.stringify(receivedUser));
    return receivedUser;
  };

  const register = async (username, email, password, fullName) => {
    const res = await api.post('/api/auth/register', { username, email, password, fullName });
    const { token: receivedToken, user: receivedUser } = res.data.data;
    setToken(receivedToken);
    setUser(receivedUser);
    localStorage.setItem('portfolio_token', receivedToken);
    localStorage.setItem('portfolio_user', JSON.stringify(receivedUser));
    return receivedUser;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('portfolio_token');
    localStorage.removeItem('portfolio_user');
  };

  const updateUser = (updatedFields) => {
    setUser((prev) => {
      const updated = { ...prev, ...updatedFields };
      localStorage.setItem('portfolio_user', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        loading,
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

