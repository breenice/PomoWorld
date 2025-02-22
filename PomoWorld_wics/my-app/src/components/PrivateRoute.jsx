// src/components/PrivateRoute.js
import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';  // Import the AuthContext

const PrivateRoute = ({ element, ...rest }) => {
  const { currentUser } = useContext(AuthContext);  // Access current user from context

  // Render the protected route or redirect based on authentication state
  return (
    <Route
      {...rest}
      element={currentUser ? element : <Navigate to="/auth" />}  // Redirect to login if not logged in
    />
  );
};

export default PrivateRoute;
