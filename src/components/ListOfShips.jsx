import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "./Spinner/Spinner";
import { useLisOfData } from "../hooks/useListOfData";

const ListOfShips = ({ listOfUrls }) => {
  const { loading, data } = useLisOfData({ listOfUrls });
  let navigate = useNavigate();

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
        data.map((ship) => (
          <p key={ship.model} onClick={selectShip} className="list-element">
            {ship.name}
          </p>
        ))
      )}
    </>
  );
};

export default ListOfShips;
