// import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const SearchResults = ({ searchResultsItems }) => {
  return (
    <div className="my-3 my-md-4 grid-container">
      {searchResultsItems.map((character) => (
        <Link
          className="grid-element-card"
          key={character.name}
          to={character.name.replaceAll(" ", "~")}
        >
          <div className="grid-card-hero">
            <img
              className="grid-card-hero-img"
              src={character.image}
              alt={character.name}
            />
          </div>
          <div className="text-secondary p-3 grid-card-info bg-dark">
            <h4>{character.name}</h4>
            <p>{character.species}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SearchResults;
