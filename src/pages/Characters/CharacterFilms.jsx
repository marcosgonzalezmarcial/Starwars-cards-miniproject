import React, { useEffect, useState } from "react";
import { fetchCharacterData } from "../../api/fetchCharacterData";

const CharacterFilms = ({ id }) => {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    fetch(`https://swapi.dev/api/people/${id}/`)
      .then((res) => res.json())
      .then((data) => {
        const newFilms = data.films.map((filmUrl) => {
          return fetchCharacterData(filmUrl);
        });

        Promise.all(newFilms).then((films) => {
          films.forEach((film) => setFilms((prev) => [...prev, film.title]));
        });
      })
      .catch(console.log);
  }, [id]);

  return (
    <>
      {films.map((film, index) => (
        <div style={{ cursor: "pointer" }} key={index}>
          <span className="people-films-span">{film}</span>
        </div>
      ))}
    </>
  );
};

export default CharacterFilms;
