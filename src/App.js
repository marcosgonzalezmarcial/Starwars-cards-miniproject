import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header/Header";
import React, { useState, useEffect } from "react";
import Starships from "./pages/Starships/Starships";
import Home from "./pages/Home";
import LoginForm from "./pages/Login/LoginForm/LoginForm";
import SignUpForm from "./pages/Login/SignUpForm/SignUpForm";
import PriveteRouteStarships from "./pages/PriveteRouteStarships";
import PriveteRoutePeople from "./pages/PriveteRoutePeople";
import People from "./pages/People/People";

function App() {
  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem("users")) || []
  );
  const [loggedIn, setLoggedIn] = useState(
    JSON.parse(localStorage.getItem("loggedIn")) || false
  );
  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("loggedIn", JSON.stringify(loggedIn));
  }, [users, loggedIn]);

  const [ships, setShips] = useState([]);
  const [page, setPage] = useState(1);

  return (
    <div className="App">
      <Container fluid>
        <Router>
          <Header
            setShowCard={setShowCard}
            loggedIn={loggedIn}
            setLoggedIn={setLoggedIn}
          />
          <Switch>
            <PriveteRoutePeople path="/people" loggedIn={loggedIn}>
              <People showCard={showCard} setShowCard={setShowCard} />
            </PriveteRoutePeople>
            <PriveteRouteStarships path="/starships" loggedIn={loggedIn}>
              <Starships
                ships={ships}
                setShips={setShips}
                page={page}
                setPage={setPage}
                showCard={showCard}
                setShowCard={setShowCard}
              />
            </PriveteRouteStarships>
            <Route exact path="/loginform">
              <LoginForm users={users} setLoggedIn={setLoggedIn} />
            </Route>
            <Route exact path="/signupform">
              <SignUpForm setUsers={setUsers} />
            </Route>
            <Route exact path="/home">
              <Home setShowCard={setShowCard} loggedIn={loggedIn} />
            </Route>
            <Route exact path="/">
              <Home loggedIn={loggedIn} />
            </Route>
          </Switch>
        </Router>
      </Container>
    </div>
  );
}

export default App;
