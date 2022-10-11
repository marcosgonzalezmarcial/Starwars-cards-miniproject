import React from "react";
import { Route, Navigate } from "react-router-dom";

const PrivateRouteSingleShip = ({ loggedIn, children, path }) => (
  <Route
    path={path}
    render={() => (loggedIn ? children : <Navigate to="/loginform" />)}
  />
);

export default PrivateRouteSingleShip;
