import React from "react";
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = () => {
    return localStorage.getItem('token') !== null;
  };

  if (isAuthenticated()) {
    return <>{children}</>;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
