import { useState, useEffect } from "react";
import { fetchPeople } from "../../api/fetchPeople";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import peopleJsonArr from "../../helpers/peopleMappedData.json";
import { transformPeopleArray } from "../../utils/transformPeopleArray";
import "./Characters.css";

const Characters = () => {
  const [page, setPage] = useState(1);
  const [people, setPeople] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    const loadTransfordedPeople = async () => {
      const newPeople = await fetchPeople(page);
      const newModifiedArr = transformPeopleArray(newPeople);
      setPeople((prev) => {
        return [...prev, ...newModifiedArr];
      });
    };
    loadTransfordedPeople();
  }, [page]);

  const handleClick = (e) => {
    const personSelected = e.target.textContent;
    const person = peopleJsonArr.filter((item) => item.name === personSelected);
    navigate(`/people/${person[0].id}`);
  };

  return (
    <>
      <InfiniteScroll
        dataLength={people.length}
        next={() => setPage(people.length < 82 && page + 1)}
        hasMore={people.length < 82 ? true : false}
        loader={
          <div className="m-3">
            <div className="text-white display-4">Cargando...</div>
          </div>
        }
      >
        <div className="my-3 my-md-5 peopleGrid">
          {people.map((person, index) => (
            <div key={person.id} className="people-card">
              <div className="card-hero">
                <img
                  className="card-hero-img"
                  src={person.image}
                  alt="starship"
                />
              </div>
              <div className="text-secondary bg-dark p-3 card-info">
                <h4 className="card-ship-title" onClick={handleClick}>
                  {person.name}
                </h4>
                <p>{person.species}</p>
              </div>
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </>
  );
};

export default Characters;
