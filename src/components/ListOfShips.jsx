import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchListOfDataFromUrlsArr } from "../services/fetchListOfDataFromUrlsArr";
import { Spinner } from "./Spinner/Spinner";

const ListOfShips = ({ shipsUrls }) => {
  const [ships, setShips] = useState([]);
  const [loading, setIsLoading] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    fetchListOfDataFromUrlsArr(shipsUrls)
      .then((ships) => {
        setShips(ships);
      })
      .catch(console.log)
      .finally(() => {
        setIsLoading(false);
      });
  }, [shipsUrls]);

  const selectShip = useCallback(
    (e) => {
      const selectedValue = e.target.textContent;

      navigate(`/starships/${selectedValue.replaceAll(" ", "~")}`);
    },
    [navigate]
  );

  return (
    <>
      {loading ? (
        <Spinner small />
      ) : (
        ships.map((ship) => (
          <p key={ship.model} onClick={selectShip} className="list-element">
            {ship.name}
          </p>
        ))
      )}
    </>
  );
};

export default ListOfShips;
