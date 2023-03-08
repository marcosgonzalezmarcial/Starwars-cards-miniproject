import { Routes, Route } from 'react-router-dom'
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
import { UsersContextProvider } from 'contexts/UsersContext'

export default function App() {
  return (
    <UsersContextProvider>
      <Header />

      <Routes>
        <Route path="/" element={<NestedRoutes />}>
          <Route index element={<Home />} />
          <Route
            path="login"
            element={
              <LoginModal>
                <LoginForm />
              </LoginModal>
            }
          />
          <Route
            path="signup"
            element={
              <LoginModal>
                <SignUpForm />
              </LoginModal>
            }
          />
          <Route
            element={
              <DataContextProvider>
                <ProtectedRoute />
              </DataContextProvider>
            }
          >
            <Route path="starships" element={<NestedRoutes />}>
              <Route
                index
                element={<GridLayoutPage currentPath="starships" />}
              />
              <Route
                path=":itemName"
                element={<DetailPage currentPath="starships" />}
              />
            </Route>

            <Route path="planets" element={<NestedRoutes />}>
              <Route index element={<GridLayoutPage currentPath="planets" />} />
              <Route
                path=":itemName"
                element={<DetailPage currentPath="planets" />}
              />
            </Route>

            <Route path="characters" element={<NestedRoutes />}>
              <Route
                index
                element={<GridLayoutPage currentPath="characters" />}
              />
              <Route
                path=":itemName"
                element={<DetailPage currentPath="characters" />}
              />
            </Route>

            <Route path="films" element={<NestedRoutes />}>
              <Route
                path=":itemName"
                element={<DetailPage currentPath="films" />}
              />
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </UsersContextProvider>
  )
}
