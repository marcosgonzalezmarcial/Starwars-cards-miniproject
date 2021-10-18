import React from "react";
import { Route, Redirect } from "react-router-dom";

const PriveteRouteStarships = ({ loggedIn, children, ...rest }) => (
  <Route
    {...rest}
    render={() => (loggedIn ? children : <Redirect to="/loginform" />)}
  />
);

export default PriveteRouteStarships;
