import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Проверка токена при монтировании приложения
  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (token && role) {
      setUser({ token, role });
    }
  }, []);

  // Логин
  const login = async (username, password) => {
    try {
      const response = await axios.post('https://loho-app-5ca1033b0269.herokuapp.com/login', { username, password });
      const token = response.data.token;
      const payload = JSON.parse(atob(token.split('.')[1])); // Декодируем payload токена

      setUser({ username, role: payload.role, token });
      localStorage.setItem('role', payload.role); // Сохраняем роль пользователя в localStorage
      localStorage.setItem('token', token); // Сохраняем токен в localStorage
    } catch (error) {
      console.error('Login failed:', error.response?.data?.message || error.message);
      throw error; // Пробрасываем ошибку для обработки в компонентах
    }
  };

  // Логаут
  const logout = () => {
    setUser(null);
    localStorage.removeItem('role');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
