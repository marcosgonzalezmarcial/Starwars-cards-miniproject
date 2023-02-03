import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { API_URL } from "../constants";
import { transformDataArray } from "../utils/transformDataArray";
import { TYPE_OF_DATA } from "../constants";

export const useSearch = () => {
  const [searchResultsItems, setSearchResultsItems] = useState([]);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("search");
  let { pathname: category } = useLocation();
  if (category === "/characters/") {
    category = `${TYPE_OF_DATA.PEOPLE}`;
  }

  useEffect(() => {

    let myAbortController = new AbortController()
    const signal = myAbortController.signal

    if (query && category === `/${TYPE_OF_DATA.PLANETS}/`) {
      fetch(`${API_URL}/${category}/?search=${query}`, { signal })
        .then((res) => res.json())
        .then(({ results }) => {

          if (!results) {
            return <h1>No results found</h1>;
          } else {
            const newArr = transformDataArray({
              fetchedData: results,
              typeOfData: TYPE_OF_DATA.PLANETS,
            });
            setSearchResultsItems((prev) => [...prev, ...newArr]);
          }

        });
    }
    if (query && category === "people") {
      fetch(`${API_URL}/${category}/?search=${query}`)
        .then((res) => res.json())
        .then(({ results }) => {
          if (!results) {
            return <h1>No results found</h1>;
          } else {
            const newArr = transformDataArray({
              fetchedData: results,
              typeOfData: TYPE_OF_DATA.PEOPLE,
            });
            setSearchResultsItems((prev) => [...prev, ...newArr]);
          }
        });
    }
    if (query && category === `/${TYPE_OF_DATA.STARSHIPS}/`) {
      fetch(`${API_URL}/${category}/?search=${query}`)
        .then((res) => res.json())
        .then(({ results }) => {

          if (!results) {
            return <h1>No results found</h1>;
          } else {
            const newArr = transformDataArray({
              fetchedData: results,
              typeOfData: TYPE_OF_DATA.STARSHIPS,
            });
            setSearchResultsItems((prev) => [...prev, ...newArr]);
          }
          // }
        });
    }
    return () => {
      myAbortController.abort()
      // delete previous serched items
      setSearchResultsItems([]);
    };
  }, [query, category]);

  return {
    searchResultsItems,
  };
};
