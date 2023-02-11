import { useEffect, useState } from "react";
import { fetchListOfDataFromUrlsArr } from "../services/fetchListOfDataFromUrlsArr";

export const useLisOfData = ({ listOfUrls }) => {
  const [loading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    let myAbortController = new AbortController();
    const signal = myAbortController.signal;

    setIsLoading(true);
    fetchListOfDataFromUrlsArr({ listOfUrls, signal })
      .then((newData) => {
        setData(newData);
      })
      .catch(console.log)
      .finally(() => {
        setIsLoading(false);
      });
    return () => myAbortController.abort();
  }, [listOfUrls]);

  return {
    loading,
    data,
  };
};
