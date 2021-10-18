import React, { useEffect, useState } from "react";
import { fetchData } from "../../helpers/fetchData";

const PeopleShips = ({ person }) => {
  const [ships, setShips] = useState([]);

  useEffect(() => {
    person.starships.map((url) => {
      const getShips = async () => {
        const ship = await fetchData(url);
        setShips((prev) => [...prev, ship.name]);
      };
      getShips();
      return null;
    });
  }, [person.starships]);

  return (
    <>
      {ships.map((film) => (
        <div style={{ cursor: "pointer" }} key={Date.now() * Math.random()}>
          <span
            // onClick={selectFilm}
            className="people-ships-span"
            key={Date.now() * Math.random()}
          >
            {film}
          </span>
        </div>
      ))}
    </>
  );
};

export default PeopleShips;
