
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute() {
  const token = sessionStorage.getItem('token'); // or use your auth context
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
