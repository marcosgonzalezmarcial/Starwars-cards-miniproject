import { Routes, Route } from 'react-router-dom'
import Home from 'pages/Home'
import Header from 'components/Header'
import SearchResults from 'components/SearchResults'
import DetailPage from 'pages/DetailPage'
import ErrorPage from 'pages/ErrorPage'
import ProtectedRoute from 'pages/ProtectedRoute'
import NestedRoutes from 'pages/NestedRoutes'
import GridLayoutPage from 'pages/GridLayoutPage'
import Modal from 'components/Modal'
import { DataContextProvider } from 'contexts/DataContext'
import { UsersContextProvider } from 'contexts/UsersContext'
import SignUp from 'pages/SignUp/SignUp'
import SignIn from 'pages/SignIn/SignIn'

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
							<Modal>
								<SignIn />
							</Modal>
						}
					/>
					<Route
						path="signup"
						element={
							<Modal>
								<SignUp />
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
						<Route path="search" element={<SearchResults />} />
					</Route>
				</Route>
				<Route path="*" element={<ErrorPage />} />
			</Routes>
		</UsersContextProvider>
	)
}
