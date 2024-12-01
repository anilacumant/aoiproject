import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ role, component: Component }) => {
  const userRole = localStorage.getItem('role'); // Fetch user role from localStorage
  return userRole === role ? <Component /> : <Navigate to="/login" />;
};

export default PrivateRoute;
