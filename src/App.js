import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminDashboard from './pages/AdminDashboard';
import Clients from './pages/Clients';
import Invoices from './pages/Invoices';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Status from './pages/Status';
import AgentHome from './pages/AgentHome'; // Подключаем компонент для страницы агента
import { AuthProvider, useAuth } from './auth';
import AgentDash from './pages/AgentDash';
import AgentInvoices from './pages/AgentInvoices';

function ProtectedRoute({ children, role }) {
  const { user } = useAuth();
  const storedRole = localStorage.getItem('role');
  const token = localStorage.getItem('token');

  if (!token || (!user && !storedRole)) {
    return <Navigate to="/login" />;
  }

  return (user?.role === role || storedRole === role) ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Административные маршруты */}
          <Route path="/admin" element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }>
            <Route index element={<Navigate to="dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="clients" element={<Clients />} />
            <Route path="invoices" element={<Invoices />} />
            <Route path="products" element={<Products />} />
            <Route path="status" element={<Status />} />
          </Route>

          {/* Маршрут для страницы агента */}
          <Route path="/agent" element={
            <ProtectedRoute role="agent">
              <AgentHome /> {/* Агентская домашняя страница с боковой панелью */}
            </ProtectedRoute>
          }>
            <Route index element={<Navigate to="AgentDash" />} />
            <Route path="AgentDash" element={<AgentDash />} />
            <Route path="AgentInvoices" element={<AgentInvoices />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
