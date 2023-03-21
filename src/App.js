import { Routes, Route } from 'react-router-dom'
import Home from 'pages/Home'
import SignUpForm from 'pages/SignUpForm'
import SignInForm from 'pages/SignInForm'
import Header from 'components/Header'
import SearchResults from 'components/SearchResults'
import DetailPageLayout from 'layouts/DetailPageLayout'
import DetailPage from 'pages/DetailPage'
import ErrorPage from 'pages/ErrorPage'
import ProtectedRoute from 'pages/ProtectedRoute'
import NestedRoutes from 'pages/NestedRoutes'
import GridLayoutPage from 'pages/GridLayoutPage'
import HomePageLayout from 'layouts/HomePageLayout'
import Modal from 'components/Modal'
import { DataContextProvider } from 'contexts/DataContext'
import { UsersContextProvider } from 'contexts/UsersContext'

export default function App() {
  return (
    <UsersContextProvider>
      <Header />
      <Routes>
        <Route path="/" element={<NestedRoutes />}>
          <Route
            index
            element={
              <HomePageLayout>
                <Home />
              </HomePageLayout>
            }
          />
          <Route
            path="login"
            element={
              <Modal>
                <SignInForm />
              </Modal>
            }
          />
          <Route
            path="signup"
            element={
              <Modal>
                <SignUpForm />
              </Modal>
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
                element={
                  <DetailPageLayout>
                    <DetailPage currentPath="starships" />
                  </DetailPageLayout>
                }
              />
            </Route>

            <Route path="planets" element={<NestedRoutes />}>
              <Route index element={<GridLayoutPage currentPath="planets" />} />
              <Route
                path=":itemName"
                element={
                  <DetailPageLayout>
                    <DetailPage currentPath="planets" />
                  </DetailPageLayout>
                }
              />
            </Route>

            <Route path="characters" element={<NestedRoutes />}>
              <Route
                index
                element={<GridLayoutPage currentPath="characters" />}
              />
              <Route
                path=":itemName"
                element={
                  <DetailPageLayout>
                    <DetailPage currentPath="characters" />{' '}
                  </DetailPageLayout>
                }
              />
            </Route>

            <Route path="films" element={<NestedRoutes />}>
              <Route
                path=":itemName"
                element={
                  <DetailPageLayout>
                    <DetailPage currentPath="films" />{' '}
                  </DetailPageLayout>
                }
              />
            </Route>
            <Route path="search" element={<SearchResults />} />
          </Route>
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </UsersContextProvider>
  )
}
