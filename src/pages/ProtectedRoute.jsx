import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { dataContext } from "contexts/dataContext";

const ProtectedRoute = ({ loggedIn, children }) => {
  if (!loggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
