import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import Home from "./pages/Home";
import LoginForm from "./pages/Login/LoginForm/LoginForm";
import SignUpForm from "./pages/Login/SignUpForm/SignUpForm";
import PriveteRouteStarships from "./pages/PriveteRouteStarships";
import PriveteRoutePeople from "./pages/PriveteRoutePeople";
import People from "./pages/People/People";
import ErrorPage from "./pages/ErrorPage";
import StarShips from "./pages/Starships/StarShips";
import Header from "./components/Header";

function App() {
  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem("users")) || []
  );
  const [loggedIn, setLoggedIn] = useState(
    JSON.parse(localStorage.getItem("loggedIn")) || false
  );

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("loggedIn", JSON.stringify(loggedIn));
  }, [users, loggedIn]);

  const [ships, setShips] = useState([]);
  const [page, setPage] = useState(1);

  return (
    <Router>
      <Container fluid className="py-2">
        <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        <Switch>
          <PriveteRoutePeople exact path="/people" loggedIn={loggedIn}>
            <People />
          </PriveteRoutePeople>
          <PriveteRouteStarships exact path="/starships" loggedIn={loggedIn}>
            <StarShips
              ships={ships}
              setShips={setShips}
              page={page}
              setPage={setPage}
            />
          </PriveteRouteStarships>
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
