import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getTransformedDataArray } from "services/getTransformedDataArray";
// import useIsNearScreen from "./useIsNearScreen";
import { TYPE_OF_DATA } from "../constants";

export const useFetchData = () => {
  // const [page, setPage] = useState(1);
  const [planetsPage, setPlanetsPage] = useState(1);
  const [shipsPage, setShipsPage] = useState(1);
  const [charactersPage, setCharactersPage] = useState(1);
  const [characters, setCharacters] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [starships, setStarships] = useState([]);
  // const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  let location = useLocation();

  let mainPath = location.pathname.slice(1).split("/")[0];
  if (mainPath === "characters") {
    mainPath = "people";
  }

  useEffect(() => {
    setIsLoading(true);
    if (mainPath === "starships") {
      if (shipsPage >= 5) return;
      getTransformedDataArray({
        page: shipsPage,
        typeOfData: TYPE_OF_DATA.STARSHIPS,
      })
        .then((data) => {
          //checking data is not null
          data && setStarships((prev) => [...prev, ...data]);
          // sorting items may be applied in future iterations
          // data && setPlanets((prev) => sortObjItems([...prev, ...data]));
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    if (mainPath === "planets") {
      if (planetsPage >= 8) return;
      getTransformedDataArray({
        page: planetsPage,
        typeOfData: mainPath,
      })
        .then((data) => {
          //checking data is not null
          data && setPlanets((prev) => [...prev, ...data]);
          // sorting items may be applied in future iterations
          // data && setPlanets((prev) => sortObjItems([...prev, ...data]));
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    if (mainPath === "people") {
      if (charactersPage >= 10) return;
      getTransformedDataArray({
        page: charactersPage,
        typeOfData: mainPath,
      })
        .then((data) => {
          //checking data is not null
          data && setCharacters((prev) => [...prev, ...data]);
          // sorting items may be applied in future iterations
          // data && setPlanets((prev) => sortObjItems([...prev, ...data]));
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [charactersPage, shipsPage, planetsPage]);

  return {
    isLoading,
    setPlanetsPage,
    setShipsPage,
    setCharactersPage,
    characters,
    planets,
    starships,
  };
};
