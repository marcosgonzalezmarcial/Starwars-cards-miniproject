import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRouteStarships = ({ loggedIn, children }) => {
  if (!loggedIn) {
    console.log(loggedIn);
    return <Navigate to="/loginform" replace />;
  }
  return children;
};

export default PrivateRouteStarships;
