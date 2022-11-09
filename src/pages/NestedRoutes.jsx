import React from 'react'
import { Outlet, useLocation, useSearchParams } from 'react-router-dom'

const NestedRoutes = () => {
  // const [searchParams] = useSearchParams()
  // const { pathname } = useLocation()
  // if (searchParams && pathname) {
  //   fetch(
  //     `https://swapi.dev/api/${pathname.slice(1)}/?search=${searchParams.get(
  //       'search'
  //     )}`
  //   )
  //     .then((res) => res.json())
  //     .then((data) => console.log(data.results))
  // }

  return <Outlet />
}

export default NestedRoutes
