import React from "react";
import { Navigate } from 'react-router-dom';

const ProtectedRouteLogin = ({ children }) => {
  const isAuthenticated = () => {
    return localStorage.getItem('token') !== null;
  };

  if (!isAuthenticated()) {
    return <>{children}</>;
  } else {
    return <Navigate to="/map" />;
  }
};

export default ProtectedRouteLogin;
