import { useEffect, useState } from "react";
import { getTransformedDataArray } from "services/getTransformedDataArray";

export const useFetchData = ({ mainPath }) => {
  const [data, setData] = useState({
    planets: [],
    planetsPagination: 1,
    starships: [],
    starshipsPagination: 1,
    characters: [],
    charactersPagination: 1,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    if (mainPath === "starships") {
      // no items above pag 5
      if (data.starshipsPagination >= 5) {
        setIsLoading(false);
        return;
      }

      getTransformedDataArray({
        page: data.starshipsPagination,
        typeOfData: mainPath,
      })
        .then((newData) => {
          //checking data is not null
          newData &&
            setData((prev) => ({
              ...prev,
              // array of unique set of items with set
              starships: [
                ...new Set(
                  [...data.starships, ...newData].map((o) => JSON.stringify(o))
                ),
              ].map((s) => JSON.parse(s)),
            }));
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
    if (mainPath === "planets") {
      // if (data.planetsPagination === 1 && data.planets.length === 10) return;
      if (data.planetsPagination >= 8) {
        setIsLoading(false);
        return;
      }
      getTransformedDataArray({
        page: data.planetsPagination,
        typeOfData: mainPath,
      })
        .then((newData) => {
          //checking data is not null
          newData &&
            setData((prev) => ({
              ...prev,
              //
              // unique set of items with set
              planets: [
                ...new Set(
                  [...data.planets, ...newData].map((o) => JSON.stringify(o))
                ),
              ].map((s) => JSON.parse(s)),
            }));
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
    if (mainPath === "people") {
      // if (data.charactersPagination === 1 && data.characters.length === 10)
      //   return;
      if (data.charactersPagination >= 10) {
        setIsLoading(false);
        return;
      }
      getTransformedDataArray({
        page: data.charactersPagination,
        typeOfData: mainPath,
      })
        .then((newData) => {
          //checking data is not null
          newData &&
            setData((prev) => ({
              ...prev,
              // unique set of items with set
              characters: [
                ...new Set(
                  [...data.characters, ...newData].map((o) => JSON.stringify(o))
                ),
              ].map((s) => JSON.parse(s)),
            }));
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [
    mainPath,
    data.charactersPagination,
    data.planetsPagination,
    data.starshipsPagination,
  ]);

  return {
    isLoading,
    data,
    setData,
  };
};
