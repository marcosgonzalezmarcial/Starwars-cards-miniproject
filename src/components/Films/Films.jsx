import React, { useEffect, useState } from "react";
import { fetchData } from "../../api/fetchData";
import FilmCard from "./FilmCard";
import "./filmcard.css";

const Films = ({ ship }) => {
  const [filmsTitles, setFilmsTitles] = useState([]);
  const [showFilmCard, setShowFilmCard] = useState(false);
  const [filmSelected, setFilmSelected] = useState(null);

  useEffect(() => {
    ship.films.forEach((filmUrl) => {
      const getFilmsTitles = async () => {
        const film = await fetchData(filmUrl);
        setFilmsTitles((prev) => [...prev, film.title]);
      };
      getFilmsTitles();
      // return null;
    });
  }, [ship]);

  const selectFilm = (e) => {
    const selectFilm = e.target.textContent;
    setShowFilmCard(true);
    setFilmSelected(selectFilm);
    e.target.scrollIntoView({ block: "start", behavior: "smooth" });
  };

  return (
    <>
      {filmsTitles.map((film, index) => (
        <div style={{ cursor: "pointer" }} key={index}>
          <span
            onClick={selectFilm}
            className="films-span"
            // key={Date.now() * Math.random()}
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
