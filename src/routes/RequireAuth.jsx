import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const RequireAuth = ({ children }) => {
  const { isAuthenticated } = useAuth0();
  return isAuthenticated ? children : <Navigate to="/feed" />;
};

export default RequireAuth;