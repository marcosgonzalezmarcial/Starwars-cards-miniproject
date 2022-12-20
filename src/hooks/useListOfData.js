import { useEffect, useState } from "react";
import { fetchListOfDataFromUrlsArr } from "../services/fetchListOfDataFromUrlsArr";

export const useLisOfData = ({ listOfUrls }) => {
  const [loading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetchListOfDataFromUrlsArr(listOfUrls)
      .then((newData) => {
        setData(newData);
      })
      .catch(console.log)
      .finally(() => {
        setIsLoading(false);
      });
  }, [listOfUrls]);

  return {
    loading,
    data,
  };
};
