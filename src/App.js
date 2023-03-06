import { Routes, Route } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import Home from 'pages/Home'
import SignUpForm from 'pages/SignUpForm'
import Header from 'components/Header'
import DetailPage from 'pages/DetailPage'
import ErrorPage from 'pages/ErrorPage'
import ProtectedRoute from 'pages/ProtectedRoute'
import NestedRoutes from 'pages/NestedRoutes'
import GridLayoutPage from 'pages/GridLayoutPage'
import LoginForm from 'pages/LoginForm'
import LoginModal from 'components/LoginModal'
import { DataContextProvider } from 'contexts/DataContext'

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
          <Route
            path="login"
            element={
              <LoginModal>
                <LoginForm users={users} setLoggedIn={setLoggedIn} />
              </LoginModal>
            }
          />
          <Route
            path="signup"
            element={
              <LoginModal>
                <SignUpForm setUsers={setUsers} />
              </LoginModal>
            }
          />
          <Route
            element={
              <DataContextProvider>
                <ProtectedRoute loggedIn={loggedIn} />
              </DataContextProvider>
            }
          >
            <Route path="starships" element={<NestedRoutes />}>
              <Route index element={<GridLayoutPage mainPath="starships" />} />
              <Route path=":itemName" element={<DetailPage />} />
            </Route>

            <Route path="planets" element={<NestedRoutes />}>
              <Route index element={<GridLayoutPage mainPath="planets" />} />
              <Route path=":itemName" element={<DetailPage />} />
            </Route>

            <Route path="characters" element={<NestedRoutes />}>
              <Route index element={<GridLayoutPage mainPath="characters" />} />
              <Route path=":itemName" element={<DetailPage />} />
            </Route>

            <Route path="films" element={<NestedRoutes />}>
              <Route path=":itemName" element={<DetailPage />} />
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  )
}

export default App
