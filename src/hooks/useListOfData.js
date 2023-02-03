import { useEffect, useState } from "react";
import { fetchListOfDataFromUrlsArr } from "../services/fetchListOfDataFromUrlsArr";

export const useLisOfData = ({ listOfUrls }) => {
  const [loading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    let isCancelled = false;
    setIsLoading(true);
    fetchListOfDataFromUrlsArr(listOfUrls)
      .then((newData) => {
        if (!isCancelled) {
          setData(newData);
        }
      })
      .catch(console.log)
      .finally(() => {
        if (!isCancelled) {
          setIsLoading(false);
        }
      });
    return () => {
      isCancelled = true;
    }
  }, [listOfUrls]);

  return {
    loading,
    data,
  };
};
