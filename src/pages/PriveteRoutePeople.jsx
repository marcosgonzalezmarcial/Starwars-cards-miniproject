import React from "react";
import { Route, Redirect } from "react-router-dom";

const PriveteRoutePeople = ({ loggedIn, children, ...rest }) => (
  <Route
    {...rest}
    render={() => (loggedIn ? children : <Redirect to="/loginform" />)}
  />
);

export default PriveteRoutePeople;
