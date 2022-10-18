import React, { useEffect, useState } from "react";
import { fetchCharacterData } from "../../api/fetchCharacterData";

const CharacterShips = ({ id }) => {
  const [ships, setShips] = useState([]);

  useEffect(() => {
    fetch(`https://swapi.dev/api/people/${id}/`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        const newStarships = data.starships.map((filmUrl) => {
          return fetchCharacterData(filmUrl);
        });

        Promise.all(newStarships).then((ships) => {
          ships.forEach((ship) => setShips((prev) => [...prev, ship.name]));
        });
      })
      .catch(console.log);
  }, [id]);

  return (
    <>
      {ships.map((film, index) => (
        <div style={{ cursor: "pointer" }} key={index}>
          <span className="people-films-span">{film}</span>
        </div>
      ))}
    </>
  );
};

export default CharacterShips;
