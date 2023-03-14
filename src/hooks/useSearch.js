import { useEffect, useState } from 'react'
import { API_URL } from '../constants'
import { transformDataArray } from '../utils/transformDataArray'
import { TYPE_OF_DATA } from '../constants'

export const useSearch = ({ searchCategory, searchTerm }) => {
  const [searchResultsItems, setSearchResultsItems] = useState([])
  // const [category, setCategory] = useState()

  useEffect(() => {
    let myAbortController = new AbortController()
    const signal = myAbortController.signal

    if (searchTerm && searchCategory === TYPE_OF_DATA.PLANETS) {
      fetch(`${API_URL}/${searchCategory}/?search=${searchTerm}`, { signal })
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
    if (searchTerm && searchCategory === 'characters') {
      let newCategory = TYPE_OF_DATA.PEOPLE
      fetch(`${API_URL}/${newCategory}/?search=${searchTerm}`)
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
    if (searchTerm && searchCategory === TYPE_OF_DATA.STARSHIPS) {
      fetch(`${API_URL}/${searchCategory}/?search=${searchTerm}`)
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
  }, [searchTerm, searchCategory])

  return {
    searchResultsItems
  }
}
