import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchListOfDataFromUrlsArr } from "../services/fetchListOfDataFromUrlsArr";
import { Spinner } from "./Spinner/Spinner";

const ListOfPilots = ({ pilotsUrls }) => {
  const [pilots, setPilots] = useState([]);
  const [loading, setIsLoading] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    fetchListOfDataFromUrlsArr(pilotsUrls)
      .then((pilots) => {
        setPilots(pilots);
      })
      .catch(console.log)
      .finally(() => {
        setIsLoading(false);
      });
  }, [pilotsUrls]);

  const selectPilot = useCallback(
    (e) => {
      const selectedValue = e.target.textContent;

      navigate(`/characters/${selectedValue.replaceAll(" ", "~")}`);
    },
    [navigate]
  );

  return (
    <>
      {loading ? (
        <Spinner small />
      ) : (
        pilots.map((pilot) => (
          <p key={pilot.name} onClick={selectPilot} className="list-element">
            {pilot.name}
          </p>
        ))
      )}
    </>
  );
};

export default ListOfPilots;
