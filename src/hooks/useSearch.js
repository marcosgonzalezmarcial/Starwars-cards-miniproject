import { useEffect, useState } from 'react'
import { API_URL } from '../constants'
import { transformData } from '../utils/transformData'
import { TYPE_OF_DATA } from '../constants'

export function useSearch({ searchCategory, searchTerm }) {
  const [searchResultsItems, setSearchResultsItems] = useState([])
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    let myAbortController = new AbortController()
    const signal = myAbortController.signal

    if (searchTerm && searchCategory === TYPE_OF_DATA.PLANETS) {
      fetch(`${API_URL}/${searchCategory}/?search=${searchTerm}`, { signal })
        .then((res) => res.json())
        .then(({ results }) => {
          if (results.length > 0) {
            const newArr = transformData({
              fetchedData: results,
              typeOfData: TYPE_OF_DATA.PLANETS
            })
            setSearchResultsItems((prev) => [...prev, ...newArr])
          } else {
            setSearchResultsItems([])
          }
        }).catch((error) => {
          console.log(error)
        }).finally(() => {
          setLoading(false)
        })
    }
    if (searchTerm && searchCategory === 'characters') {
      let newCategory = TYPE_OF_DATA.PEOPLE
      fetch(`${API_URL}/${newCategory}/?search=${searchTerm}`, { signal })
        .then((res) => res.json())
        .then(({ results }) => {
          if (results.length > 0) {
            const newArr = transformData({
              fetchedData: results,
              typeOfData: TYPE_OF_DATA.PEOPLE
            })
            setSearchResultsItems((prev) => [...prev, ...newArr])
          } else {
            setSearchResultsItems([])
          }
        }).catch((error) => {
          console.log(error)
        }).finally(() => {
          setLoading(false)
        })
    }
    if (searchTerm && searchCategory === TYPE_OF_DATA.STARSHIPS) {
      fetch(`${API_URL}/${searchCategory}/?search=${searchTerm}`, { signal })
        .then((res) => res.json())
        .then(({ results }) => {
          if (results.length > 0) {
            const newArr = transformData({
              fetchedData: results,
              typeOfData: TYPE_OF_DATA.STARSHIPS
            })
            setSearchResultsItems((prev) => [...prev, ...newArr])
          } else {
            setSearchResultsItems([])
          }
        }).catch((error) => {
          console.log(error)
        }).finally(() => {
          setLoading(false)
        })
    }
    return () => {
      myAbortController.abort()
      // delete previous searched items
      setSearchResultsItems([])
    }
  }, [searchTerm, searchCategory])

  return {
    searchResultsItems, loading
  }
}
