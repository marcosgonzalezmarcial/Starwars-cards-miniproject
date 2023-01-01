import { useEffect, useState } from "react";
import { getTransformedDataArray } from "services/getTransformedDataArray";

export const useFetchData = ({ typeOfData }) => {
  const [page, setPage] = useState(0);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (page === 0) return;
    if (page >= 8) return;
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
    page,
    setPage,
    setIsLoading,
  };
};
