import { Link } from "react-router-dom";

const SearchResults = ({ searchResultsItems }) => {
  console.log(searchResultsItems);
  return (
    <div className="grid-items">
      {searchResultsItems.map((item) => (
        <Link
          className="grid-item"
          key={item.model ?? item.name}
          to={item.name.replaceAll(" ", "~")}
        >
          <div className="grid-item__hero">
            <img
              className="grid-item__img"
              src={item.imgUrl || item.image}
              alt={item.name}
            />
          </div>
          <div className="grid-item__info">
            <h4>{item.name}</h4>
            <p>{item.model ?? item.species}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SearchResults;
