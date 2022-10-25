import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import peopleJsonArr from "../api/mocked-data/peopleMappedData.json";
import "./grid-styles.css";
import { getTransformedCharactersArray } from "../api/getTransformedCharactersArray";

const Characters = () => {
  const [page, setPage] = useState(1);
  const [characters, setCharacters] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    getTransformedCharactersArray(page).then((data) =>
      setCharacters((prev) => [...prev, ...data])
    );
  }, [page]);

  const handleClick = (e) => {
    const personSelected = e.target.textContent;
    const [person] = peopleJsonArr.filter(
      (item) => item.name === personSelected
    );
    navigate(`/characters/${person.id}`);
  };

  return (
    <>
      <InfiniteScroll
        dataLength={characters.length}
        next={() => setPage((prev) => characters.length < 82 && prev + 1)}
        hasMore={characters.length < 82 && true}
        loader={<div className="text-white display-4">Cargando...</div>}
        className="my-3 my-md-4 grid-container"
      >
        {characters.map((character) => (
          <div key={character.id} className="grid-element-card">
            <div className="grid-card-hero">
              <img
                className="grid-card-hero-img"
                src={character.image}
                alt={character.name}
              />
            </div>
            <div className="text-secondary p-3 grid-card-info bg-dark">
              <h4 onClick={handleClick}>{character.name}</h4>
              <p>{character.species}</p>
            </div>
          </div>
        ))}
      </InfiniteScroll>
    </>
  );
};

export default Characters;
