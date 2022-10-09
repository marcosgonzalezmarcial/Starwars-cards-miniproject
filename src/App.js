import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import Home from "./pages/Home";
import LoginForm from "./pages/Login/LoginForm/LoginForm";
import SignUpForm from "./pages/Login/SignUpForm/SignUpForm";
import PrivateRouteStarships from "./pages/PrivateRouteStarships";
import PrivateRoutePeople from "./pages/PrivateRoutePeople";
// import People from "./pages/People/People";
import SingleCharacter from "./pages/People/SingleCharacter";
import Characters from "./pages/People/Characters";
import ErrorPage from "./pages/ErrorPage";
import StarShips from "./pages/Starships/StarShips";
import Header from "./components/Header";
import PrivateRouteSingleShip from "./pages/PrivateRouteSingleShip";
import PrivateRouteSingleCharacter from "./pages/PrivateRouteSingleCharacter";
import SingleShip from "./pages/Starships/SingleShip";

function App() {
  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem("users")) || []
  );
  const [loggedIn, setLoggedIn] = useState(
    JSON.parse(localStorage.getItem("loggedIn")) || false
  );
  useEffect(() => {
    console.log("test ahora");
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("loggedIn", JSON.stringify(loggedIn));
  }, [users, loggedIn]);

  return (
    <Router>
      <Container fluid className="py-2">
        <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        <Switch>
          <PrivateRoutePeople exact path="/people" loggedIn={loggedIn}>
            <Characters />
          </PrivateRoutePeople>
          <PrivateRouteStarships exact path="/starships" loggedIn={loggedIn}>
            <StarShips />
          </PrivateRouteStarships>
          <PrivateRouteSingleShip exact path="/starships/:id" loggedIn={loggedIn}>
          <SingleShip />
          </PrivateRouteSingleShip>
          <PrivateRouteSingleCharacter exact path="/people/:id" loggedIn={loggedIn}>
          <SingleCharacter />
          </PrivateRouteSingleCharacter>
          <Route exact path="/loginform">
            <LoginForm users={users} setLoggedIn={setLoggedIn} />
          </Route>
          <Route exact path="/signupform">
            <SignUpForm setUsers={setUsers} />
          </Route>
          <Route exact path="/home">
            <Home loggedIn={loggedIn} />
          </Route>
          <Route exact path="/">
            <Home loggedIn={loggedIn} />
          </Route>
          <Route path="*">
            <ErrorPage />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
