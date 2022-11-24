import { useEffect, useState } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import { API_URL } from '../constants'
import { transformDataArray } from '../utils/transformDataArray'
import mockedDataPlanets from '../utils/mocked-data/planetsMappedData'
import mockedDataPeople from '../utils/mocked-data/peopleMappedData'
import mockedDataShips from '../utils/mocked-data/starshipsMappedData'

export const useSearch = () => {
  const [searchItems, setSearchItems] = useState([])
  const [searchParams] = useSearchParams()
  const query = searchParams.get('search')
  let { pathname: category } = useLocation()
  if (category === '/characters/') {
    category = 'people'
  }

  useEffect(() => {
    if (query && category === '/planets/') {
      fetch(`${API_URL}/${category}/?search=${query}`)
        .then((res) => res.json())
        .then(({ results }) => {
          if (!results) {
            return <h1>No results found</h1>
          } else {
            // const newArr = transformPlanetsArray(results)
            const newArr = transformDataArray({
              fetchedData: results,
              mockedData: mockedDataPlanets,
              typeOfData: 'planets'
            })
            setSearchItems(() => [...newArr])
          }
        })
    }
    if (query && category === 'people') {
      fetch(`${API_URL}/${category}/?search=${query}`)
        .then((res) => res.json())
        .then(({ results }) => {
          if (!results) {
            return <h1>No results found</h1>
          } else {
            // const newArr = transformPeopleArray(results)
            const newArr = transformDataArray({
              fetchedData: results,
              mockedData: mockedDataPeople,
              typeOfData: 'people'
            })
            setSearchItems(() => [...newArr])
          }
        })
    }
    if (query && category === '/starships/') {
      fetch(`${API_URL}/${category}/?search=${query}`)
        .then((res) => res.json())
        .then(({ results }) => {
          console.log(results)
          if (!results) {
            return <h1>No results found</h1>
          } else {
            // const newArr = transformShipsArray(results)
            const newArr = transformDataArray({
              fetchedData: results,
              mockedData: mockedDataShips,
              typeOfData: 'starships'
            })
            setSearchItems(() => [...newArr])
          }
        })
    }
    return () => setSearchItems([])
  }, [query, category])

  return {
    searchItems
  }
}
