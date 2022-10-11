import { Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import React, { useState, useEffect } from 'react'
import Home from './pages/Home'
import LoginForm from './pages/Login/LoginForm/LoginForm'
import SignUpForm from './pages/Login/SignUpForm/SignUpForm'
// import PrivateRouteStarships from "./pages/PrivateRouteStarships";
// import PrivateRoutePeople from "./pages/PrivateRoutePeople";
// import People from "./pages/People/People";
import SingleCharacter from './pages/People/SingleCharacter'
import Characters from './pages/People/Characters'
import ErrorPage from './pages/ErrorPage'
import StarShips from './pages/Starships/StarShips'
import Header from './components/Header'
// import PrivateRouteSingleShip from "./pages/PrivateRouteSingleShip";
// import PrivateRouteSingleCharacter from "./pages/PrivateRouteSingleCharacter";
import SingleShip from './pages/Starships/SingleShip'
import ProtectedRoute from './pages/ProtectedRoute'
import NestedRoutes from './pages/NestedRoutes'

function App() {
  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem('users')) || []
  )
  const [loggedIn, setLoggedIn] = useState(
    JSON.parse(localStorage.getItem('loggedIn')) || false
  )
  useEffect(() => {
    console.log('test ahora')
    localStorage.setItem('users', JSON.stringify(users))
    localStorage.setItem('loggedIn', JSON.stringify(loggedIn))
  }, [users, loggedIn])

  return (
    <Container fluid className="py-2">
      <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />

      <Routes>
        <Route element={<ProtectedRoute loggedIn={loggedIn} />}>
          <Route path="starships" element={<NestedRoutes />}>
            <Route index element={<StarShips />} />
            <Route path=":id" element={<SingleShip />} />
          </Route>
          <Route path="people" element={<NestedRoutes />}>
            <Route index element={<Characters />} />
            <Route path=":id" element={<SingleCharacter />} />
          </Route>
        </Route>

        <Route
          element={<LoginForm users={users} setLoggedIn={setLoggedIn} />}
          path="/loginform"
        />
        <Route
          element={<SignUpForm setUsers={setUsers} />}
          path="/signupform"
        />
        <Route path="/" element={<NestedRoutes />}>
          <Route index element={<Home loggedIn={loggedIn} />} />
          <Route path="home" element={<Home loggedIn={loggedIn} />} />
        </Route>

        <Route element={<ErrorPage />} path="*" />
      </Routes>
    </Container>
  )
}

export default App
