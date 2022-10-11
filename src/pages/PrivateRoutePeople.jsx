import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoutePeople = ({ loggedIn, children }) => {
  if (!loggedIn) {
    console.log(loggedIn);
    return <Navigate to="/loginform" replace />;
  }
  return children;
};

export default PrivateRoutePeople;
