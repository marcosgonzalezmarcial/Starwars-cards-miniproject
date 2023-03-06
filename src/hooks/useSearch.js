// TODO: dont show GridItems when searching

import { useEffect, useState } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import { API_URL } from '../constants'
import { transformDataArray } from '../utils/transformDataArray'
import { TYPE_OF_DATA } from '../constants'

export const useSearch = () => {
  const [searchResultsItems, setSearchResultsItems] = useState([])
  const [searchParams] = useSearchParams()
  const query = searchParams.get('search')
  let { pathname: category } = useLocation()

  useEffect(() => {
    let myAbortController = new AbortController()
    const signal = myAbortController.signal

    if (query && category === `/${TYPE_OF_DATA.PLANETS}/`) {
      fetch(`${API_URL}/${category}/?search=${query}`, { signal })
        .then((res) => res.json())
        .then(({ results }) => {
          if (results.length === 0) {
            let res = setSearchResultsItems(['No results found'])
            return res
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
          if (results.length === 0) {
            let res = setSearchResultsItems(['No results found'])
            return res
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
          // console.log(results)
          if (results.length === 0) {
            let res = setSearchResultsItems(['No results found'])
            return res
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
    }
  }, [query, category])

  return {
    searchResultsItems
  }
}
