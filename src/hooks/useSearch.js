import { useEffect, useState } from 'react'
import { API_URL } from '../constants'
import { transformDataArray } from '../utils/transformDataArray'
import { TYPE_OF_DATA } from '../constants'

export function useSearch({ searchCategory, searchTerm }) {
  const [searchResultsItems, setSearchResultsItems] = useState([])

  useEffect(() => {
    let myAbortController = new AbortController()
    const signal = myAbortController.signal

    if (searchTerm && searchCategory === TYPE_OF_DATA.PLANETS) {
      fetch(`${API_URL}/${searchCategory}/?search=${searchTerm}`, { signal })
        .then((res) => res.json())
        .then(({ results }) => {
          if (results.length > 0) {
            const newArr = transformDataArray({
              fetchedData: results,
              typeOfData: TYPE_OF_DATA.PLANETS
            })
            setSearchResultsItems((prev) => [...prev, ...newArr])
          } else {
            setSearchResultsItems(null)
          }
        })
    }
    if (searchTerm && searchCategory === 'characters') {
      let newCategory = TYPE_OF_DATA.PEOPLE
      fetch(`${API_URL}/${newCategory}/?search=${searchTerm}`, { signal })
        .then((res) => res.json())
        .then(({ results }) => {
          if (results.length > 0) {
            const newArr = transformDataArray({
              fetchedData: results,
              typeOfData: TYPE_OF_DATA.PEOPLE
            })
            setSearchResultsItems((prev) => [...prev, ...newArr])
          } else {
            setSearchResultsItems(null)
          }
        })
    }
    if (searchTerm && searchCategory === TYPE_OF_DATA.STARSHIPS) {
      fetch(`${API_URL}/${searchCategory}/?search=${searchTerm}`, { signal })
        .then((res) => res.json())
        .then(({ results }) => {
          if (results.length > 0) {
            const newArr = transformDataArray({
              fetchedData: results,
              typeOfData: TYPE_OF_DATA.STARSHIPS
            })
            setSearchResultsItems((prev) => [...prev, ...newArr])
          } else {
            setSearchResultsItems(null)
          }
        })
    }
    return () => {
      myAbortController.abort()
      // delete previous serched items
      setSearchResultsItems([])
    }
  }, [searchTerm, searchCategory])

  return {
    searchResultsItems
  }
}
