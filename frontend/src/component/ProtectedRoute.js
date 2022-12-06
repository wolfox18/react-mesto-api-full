import React from 'react';
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ loggedIn, children, path  }) => {
  return (
    
      loggedIn ? children : <Navigate to="/sign-up" /> 
    
)}

export default ProtectedRoute;