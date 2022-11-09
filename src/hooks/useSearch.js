import { useEffect, useState } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
// import { getTransformedCharactersArray } from '../services/getTransformedCharactersArray'
import { transformPeopleArray } from '../utils/transformPeopleArray'
import { transformPlanetsArray } from '../utils/transformPlanetsArray'
import { transformShipsArray } from '../utils/transformShipsArray'

export const useSearch = (/*searchParams, query*/) => {
  const [searchItems, setSearchItems] = useState([])
  const [searchParams] = useSearchParams()
  const query = searchParams.get('search')
  let { pathname: category } = useLocation()
  if (category === '/characters/') {
    category = 'people'
  }

  useEffect(() => {
    if (query && category === '/planets/') {
      fetch(`https://swapi.dev/api/${category}/?search=${query}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data.results)
          if (!data.results) {
            return <h1>No results found</h1>
          } else {
            const newArr = transformPlanetsArray(data.results)
            setSearchItems(() => [...newArr])
          }
        })
    }
    if (query && category === 'people') {
      fetch(`https://swapi.dev/api/${category}/?search=${query}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data.results)
          if (!data.results) {
            return <h1>No results found</h1>
          } else {
            const newArr = transformPeopleArray(data.results)
            console.log(newArr)

            setSearchItems(() => [...newArr])
          }
        })
    }
    if (query && category === '/starships/') {
      fetch(`https://swapi.dev/api/${category}/?search=${query}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data.results)
          if (!data.results) {
            return <h1>No results found</h1>
          } else {
            const newArr = transformShipsArray(data.results)
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
