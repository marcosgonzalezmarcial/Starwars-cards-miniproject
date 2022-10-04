import { useState, useEffect } from "react";
import CharacterCard from "./CharacterCard";
import { fetchPeople } from "../../api/fetchPeople";
import InfiniteScroll from "react-infinite-scroll-component";
import "./character-card.css";

const Characters = ({
  showCard,
  setShowCard,
  people,
  setPeople,
  page,
  setPage
}) => {
  const [isLoading, setIsloading] = useState(true);
  const [peopleSelected, setPeopleSelected] = useState("");

  useEffect(() => {
    const loadPeople = async () => {
      setIsloading(true);
      const newPeople = await fetchPeople(page);
      setPeople((prev) => [...prev, ...newPeople]);
      setIsloading(false);
    };
    loadPeople();
  }, [page, setPeople]);

  const handleClick = (e) => {
    const peopleSelected = e.target.textContent;
    setPeopleSelected(peopleSelected);
    setShowCard(true);
  };

  return (
    <>
      {showCard ? (
        <CharacterCard peopleSelected={peopleSelected} people={people} />
      ) : (
        <InfiniteScroll
          dataLength={people.length}
          next={() => setPage(people.length < 82 && page + 1)}
          hasMore={people.length < 82 ? true : false}
        >
          {people.map((people) => (
            <div
              key={Date.now() * Math.random()}
              className="container  rounded text-center text-secondary bg-dark my-4 p-3 flex-column"
            >
              <h4 className="ship-title" onClick={handleClick}>
                {people.name}
              </h4>
            </div>
          ))}
        </InfiniteScroll>
      )}
      {isLoading && <h1>CARGANDO</h1>}
    </>
  );
};

export default Characters;
