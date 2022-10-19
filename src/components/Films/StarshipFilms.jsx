import React, { useEffect, useState } from "react";
import { fetchFilm } from "../../api/fetchFilm";
import { fetchFilmsTitles } from "../../api/fetchFilmsTitles";
import FilmCard from "./FilmCard";
import "./filmcard.css";

const StarshipFilms = ({ filmsUrls }) => {
  const [filmsTitles, setFilmsTitles] = useState([]);
  const [showFilmCard, setShowFilmCard] = useState(false);
  const [filmSelected, setFilmSelected] = useState(null);
  const [filmSelectedData, setFilmSelectedData] = useState(null);

  useEffect(() => {
    filmsUrls.forEach((url) => {
      fetchFilmsTitles(url).then((title) =>
        setFilmsTitles((prev) => [...prev, title])
      );
    });
  }, [filmsUrls]);

  useEffect(() => {
    filmsUrls.forEach((url) =>
      fetchFilm(url).then((film) => {
        if (film.title === filmSelected) {
          setFilmSelectedData(film);
        }
      })
    );
  }, [filmSelected, filmsUrls]);

  const selectFilm = (e) => {
    const selectFilm = e.target.textContent;
    setShowFilmCard(true);
    setFilmSelected(selectFilm);
    // e.target.scrollIntoView({ block: "start", behavior: "smooth" });
  };

  return (
    <>
      {filmsTitles.map((title, index) => (
        <div style={{ cursor: "pointer" }} key={index}>
          <span onClick={selectFilm} className="films-span">
            {title}
          </span>
        </div>
      ))}
      {showFilmCard && <FilmCard filmSelectedData={filmSelectedData} />}
    </>
  );
};

export default StarshipFilms;
