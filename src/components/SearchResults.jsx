import { Link } from "react-router-dom";

const SearchResults = ({ searchResultsItems }) => {
  console.log(searchResultsItems);
  return (
    <div className="my-3 my-md-4 grid-container">
      {searchResultsItems.map((item) => (
        <Link
          className="grid-element-card"
          key={item.model ?? item.name}
          to={item.name.replaceAll(" ", "~")}
        >
          <div className="grid-card-hero">
            <img
              className="grid-card-hero-img"
              src={item.imgUrl || item.image}
              alt={item.name}
            />
          </div>
          <div className="text-secondary p-3 grid-card-info bg-dark">
            <h4>{item.name}</h4>
            <p>{item.model ?? item.species}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SearchResults;
