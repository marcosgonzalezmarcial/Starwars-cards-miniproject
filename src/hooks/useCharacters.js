import { useEffect, useState } from "react";
import { getTransformedDataArray } from "services/getTransformedDataArray";
// import useIsNearScreen from "./useIsNearScreen";

export const useCharacters = ({ typeOfData }) => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (typeOfData === "starships" && page >= 5) return;
    if (typeOfData === "planets" && page >= 8) return;
    if (typeOfData === "people" && page >= 10) return;
    setIsLoading(true);

    getTransformedDataArray({ page, typeOfData })
      .then((data) => {
        //checking data is not null
        data && setData((prev) => [...prev, ...data]);
        // sorting items may be applied in future iterations
        // data && setPlanets((prev) => sortObjItems([...prev, ...data]));
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [page, typeOfData]);

  return {
    isLoading,
    data,
    setPage,
    setData,
  };
};
