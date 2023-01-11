import { Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Home from "pages/Home";
import Login from "pages/Login";
import SignUp from "pages/SignUp";
import Header from "components/Header";
import ElementDetailPage from "pages/ElementDetailPage";
import ErrorPage from "pages/ErrorPage";
import ProtectedRoute from "pages/ProtectedRoute";
import NestedRoutes from "pages/NestedRoutes";
import GridLayoutPage from "pages/GridLayoutPage";

import { UiContextProvider } from "contexts/uiContext";

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

  return (
    <>
      <UiContextProvider>
        <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      </UiContextProvider>
      <Routes>
        <Route path="/" element={<NestedRoutes />}>
          <Route index element={<Home loggedIn={loggedIn} />} />
          <Route
            path="login"
            element={
              <UiContextProvider>
                <Login users={users} setLoggedIn={setLoggedIn} />
              </UiContextProvider>
            }
          />
          <Route path="signup" element={<SignUp setUsers={setUsers} />} />
          <Route element={<ProtectedRoute loggedIn={loggedIn} />}>
            <Route path="starships" element={<NestedRoutes />}>
              <Route index element={<GridLayoutPage mainPath="starships" />} />
              <Route path=":itemName" element={<ElementDetailPage />} />
            </Route>

            <Route path="planets" element={<NestedRoutes />}>
              <Route index element={<GridLayoutPage mainPath="planets" />} />
              <Route path=":itemName" element={<ElementDetailPage />} />
            </Route>

            <Route path="characters" element={<NestedRoutes />}>
              <Route index element={<GridLayoutPage mainPath="people" />} />
              <Route path=":itemName" element={<ElementDetailPage />} />
            </Route>

            <Route path="films" element={<NestedRoutes />}>
              <Route path=":itemName" element={<ElementDetailPage />} />
            </Route>
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
