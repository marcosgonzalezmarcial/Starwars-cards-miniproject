import { Routes, Route } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import Home from './pages/Home'
import LoginForm from './pages/Login/LoginForm/LoginForm'
import SignUpForm from './pages/Login/SignUpForm/SignUpForm'
import SingleCharacter from './components/SingleCharacter'
import Characters from './pages/Characters'
import ErrorPage from './pages/ErrorPage'
import StarShips from './pages/StarShips'
import Header from './components/Header'
import SingleShip from './components/SingleShip'
import ProtectedRoute from './pages/ProtectedRoute'
import NestedRoutes from './pages/NestedRoutes'
import SingleFilm from './components/SingleFilm'
import Planets from './pages/Planets'
import SinglePlanet from './components/SinglePlanet'

function App() {
  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem('users')) || []
  )
  const [loggedIn, setLoggedIn] = useState(
    JSON.parse(localStorage.getItem('loggedIn')) || false
  )
  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users))
    localStorage.setItem('loggedIn', JSON.stringify(loggedIn))
  }, [users, loggedIn])

  return (
    <>
      <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Routes>
        <Route path="/" element={<NestedRoutes />}>
          <Route index element={<Home loggedIn={loggedIn} />} />
          <Route path="home" element={<Home loggedIn={loggedIn} />} />
          <Route
            path="loginform"
            element={<LoginForm users={users} setLoggedIn={setLoggedIn} />}
          />
          <Route
            path="signupform"
            element={<SignUpForm setUsers={setUsers} />}
          />
          <Route element={<ProtectedRoute loggedIn={loggedIn} />}>
            <Route path="starships" element={<NestedRoutes />}>
              <Route index element={<StarShips />} />
              <Route path=":starshipName" element={<SingleShip />} />
            </Route>
            <Route path="planets" element={<NestedRoutes />}>
              <Route index element={<Planets />} />
              <Route path=":planetName" element={<SinglePlanet />} />
            </Route>
            <Route path="characters" element={<NestedRoutes />}>
              <Route index element={<Characters />} />
              <Route path=":characterName" element={<SingleCharacter />} />
              {/* <Route path=":search" element={<h1>Hello </h1>} /> */}
            </Route>
            <Route path="films" element={<NestedRoutes />}>
              <Route path=":filmTitle" element={<SingleFilm />} />
            </Route>
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
