import { useSearch } from "hooks/useSearch";
import { Link, useSearchParams } from "react-router-dom";
import { Spinner } from "./Spinner";

function ResultsListItems({ searchResultsItems, searchCategory }) {
  return (
    <div className="grid-items">
      {searchResultsItems.map((item) => (
        <Link
          className="grid-item"
          key={item.model ?? item.name}
          to={`/${searchCategory}/${item.name.replaceAll(" ", "~")}`}
        >
          <div className="grid-item__hero">
            <img
              className="grid-item__img"
              src={item.img_small || item.image || item.imgUrl}
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
}

function NoSearchResults() {
  return (
    <div
      style={{
        marginTop: "5vh",
        textAlign: "center",
        color: "var(--primary-white)",
      }}
    >
      <h1>No results found</h1>
    </div>
  );
}


export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const searchCategory = searchParams.get("category");
  const searchTerm = searchParams.get("searchTerm");
  const { searchResultsItems, loading } = useSearch({ searchCategory, searchTerm });

  if (loading) {
    return <Spinner />
  }

  const hasResults = searchResultsItems.length > 0;

  return hasResults ? (
    <ResultsListItems
      searchResultsItems={searchResultsItems}
      searchCategory={searchCategory}
    />
  ) : (
    <NoSearchResults />
  );
}