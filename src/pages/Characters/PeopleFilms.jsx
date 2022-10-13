import React, { useEffect, useState } from "react";
import { fetchData } from "../../api/fetchData";
import "./character-card.css";

const PeopleFilms = ({ person }) => {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    person.films.map((url) => {
      const getFilms = async () => {
        const film = await fetchData(url);
        setFilms((prev) => [...prev, film.title]);
      };
      getFilms();
      return null;
    });
  }, [person.films]);

  return (
    <>
      {films.map((film) => (
        <div style={{ cursor: "pointer" }} key={Date.now() * Math.random()}>
          <span className="people-films-span" key={Date.now() * Math.random()}>
            {film}
          </span>
        </div>
      ))}
    </>
  );
};

export default PeopleFilms;
