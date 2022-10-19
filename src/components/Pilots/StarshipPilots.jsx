import React, { useEffect, useState } from "react";
import { fetchData } from "../../api/fetchData";
import PilotCard from "./PilotCard";

const StarshipPilots = ({ ship }) => {
  const [pilots, setpilots] = useState([]);
  const [showPilotCard, setShowPilotCard] = useState(false);
  const [pilotSelected, setPilotSelected] = useState(null);

  useEffect(() => {
    ship.pilots.map((pilotUrl) => {
      const getpilots = async () => {
        const pilot = await fetchData(pilotUrl);
        setpilots((prev) => [...prev, pilot.name]);
      };
      getpilots();
      return null;
    });
  }, [ship.pilots]);

  const selectPilot = (e) => {
    const newPilot = e.target.textContent;
    setShowPilotCard(true);
    setPilotSelected(newPilot);
  };

  return (
    <>
      {pilots.length > 0 ? (
        pilots.map((pilot) => (
          <div style={{ cursor: "pointer" }} key={Date.now() * Math.random()}>
            <span
              onClick={selectPilot}
              className="pilots-span"
              key={Date.now() * Math.random()}
            >
              {pilot}
            </span>
          </div>
        ))
      ) : (
        <span>No hay pilotos registrados</span>
      )}
      {showPilotCard && <PilotCard ship={ship} pilotSelected={pilotSelected} />}
    </>
  );
};

export default StarshipPilots;
