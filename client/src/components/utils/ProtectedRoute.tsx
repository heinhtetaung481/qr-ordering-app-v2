import React, { useContext } from 'react';
import { AuthContext } from './AuthContext';
import { Navigate } from 'react-router-dom';

type AuthProviderProps = {
    children: React.ReactElement;
};

const ProtectedRoute = (props: AuthProviderProps) => {
  const { isLoggedIn } = useContext(AuthContext);
  const { children } = props;
  console.log(isLoggedIn);

  return isLoggedIn ? (
    // Render the route content if authenticated
    children
  ) : (
    <Navigate to="/login" /> // Redirect to login on unauthorized access
  );
};

export default ProtectedRoute;
