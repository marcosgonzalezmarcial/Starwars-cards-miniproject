import React, { useEffect, useState } from "react";
import { fetchData } from "../../../api/fetchData";
import FilmCard from "./FilmCard";
import "./filmcard.css";

const Films = ({ ship }) => {
  const [films, setFilms] = useState([]);
  const [showFilmCard, setShowFilmCard] = useState(false);
  const [filmSelected, setFilmSelected] = useState(null);

  useEffect(() => {
    ship.films.map((filmUrl) => {
      const getFilms = async () => {
        const film = await fetchData(filmUrl);
        setFilms((prev) => [...prev, film.title]);
      };
      getFilms();
      return null;
    });
  }, [ship.films]);

  const selectFilm = (e) => {
    const selectFilm = e.target.textContent;
    setShowFilmCard(true);
    setFilmSelected(selectFilm);
    e.target.scrollIntoView({ block: "start", behavior: "smooth" });
  };

  return (
    <>
      {films.map((film) => (
        <div style={{ cursor: "pointer" }} key={Date.now() * Math.random()}>
          <span
            onClick={selectFilm}
            className="films-span"
            key={Date.now() * Math.random()}
          >
            {film}
          </span>
        </div>
      ))}
      {showFilmCard && <FilmCard ship={ship} filmSelected={filmSelected} />}
    </>
  );
};

export default Films;
