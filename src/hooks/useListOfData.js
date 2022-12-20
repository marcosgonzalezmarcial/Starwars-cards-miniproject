import { useEffect, useState } from "react";
import { fetchListOfDataFromUrlsArr } from "../services/fetchListOfDataFromUrlsArr";

export const useLisOfData = ({filmsUrls}) => {
  const [loading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchListOfDataFromUrlsArr(filmsUrls)
      .then((films) => {
        setFilms(films);
      })
      .catch(console.log)
      .finally(() => {
        setIsLoading(false);
      });
  }, [filmsUrls]);
};
