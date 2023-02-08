import { useEffect, useState } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import { API_URL } from '../constants'
import { transformDataArray } from '../utils/transformDataArray'
import { TYPE_OF_DATA } from '../constants'
import { useData } from 'hooks/useData'

export const useSearch = () => {
  const [searchResultsItems, setSearchResultsItems] = useState([])
  const [searchParams] = useSearchParams()
  const query = searchParams.get('search')
  const { setData } = useData()
  let { pathname: category } = useLocation()

  useEffect(() => {
    let myAbortController = new AbortController()
    const signal = myAbortController.signal

    if (query && category === `/${TYPE_OF_DATA.PLANETS}/`) {
      fetch(`${API_URL}${category}?search=${query}`, { signal })
        .then((res) => res.json())
        .then(({ results }) => {
          if (!results) {
            return <h1>No results found</h1>
          } else {
            const newArr = transformDataArray({
              fetchedData: results,
              typeOfData: TYPE_OF_DATA.PLANETS
            })
            setSearchResultsItems((prev) => [...prev, ...newArr])
          }
        })
    }
    if (query && category === '/characters/') {
      let newCategory = TYPE_OF_DATA.PEOPLE

      fetch(`${API_URL}/${newCategory}/?search=${query}`)
        .then((res) => res.json())
        .then(({ results }) => {
          if (!results) {
            return <h1>No results found</h1>
          } else {
            const newArr = transformDataArray({
              fetchedData: results,
              typeOfData: TYPE_OF_DATA.PEOPLE
            })
            setSearchResultsItems((prev) => [...prev, ...newArr])
          }
        })
    }
    if (query && category === `/${TYPE_OF_DATA.STARSHIPS}/`) {
      fetch(`${API_URL}/${category}/?search=${query}`)
        .then((res) => res.json())
        .then(({ results }) => {
          if (!results) {
            return <h1>No results found</h1>
          } else {
            const newArr = transformDataArray({
              fetchedData: results,
              typeOfData: TYPE_OF_DATA.STARSHIPS
            })
            setSearchResultsItems((prev) => [...prev, ...newArr])
          }
          // }
        })
    }
    return () => {
      myAbortController.abort()
      // delete previous serched items
      setSearchResultsItems([])
      // remove items from DataContext to avoid showing previous stored GridItems data when searching
      let myCategory = category.slice(1).split('/')[0]
      setData((prev) => ({
        ...prev,
        [myCategory]: { data: [], page: 1 }
      }))
    }
  }, [query, setData, category])

  return {
    searchResultsItems
  }
}
