import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import ListOfFilms from "./ListOfFilms";
import ListOfShips from "./ListOfShips";
import { urlStringify } from "../utils/urlStringify";
import { Spinner } from "./Spinner/Spinner";
import { transformDataArray } from "../utils/transformDataArray";
import { peopleMockedData } from "../utils/mocked-data";
import { fetchItem } from "../services/fetchItem";
import { TYPE_OF_DATA } from "../constants";
import "./single-item-page-styles.scss";
// import { useRefWidth } from "../hooks/useRefWidth";

const SingleCharacter = () => {
  const [character, setCharacter] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [containerWidth, setContainerWidth] = useState();
  let { characterName } = useParams();
  let navigate = useNavigate();

  const mainCointanierRef = useRef(null);

  useEffect(() => {
    const mainRef = mainCointanierRef.current;
    if (!mainCointanierRef.current || isLoading) return; // wait for the elementRef to be available and loading finishes
    const resizeObserver = new ResizeObserver((entries) => {
      setContainerWidth(entries[0].contentRect.width);
    });
    resizeObserver.observe(mainRef);
    return () => resizeObserver.unobserve(mainRef); // clean up
  }, [isLoading]);

  useEffect(() => {
    setIsLoading(true);
    const newPerson = urlStringify(characterName);
    const { id } = peopleMockedData.find((person) => person.name === newPerson);

    fetchItem({ id, typeOfData: TYPE_OF_DATA.PEOPLE })
      .then((item) => {
        const [transformedCharacterData] = transformDataArray({
          // fetched data must be an array for implementation requirements
          fetchedData: [item],
          typeOfData: TYPE_OF_DATA.PEOPLE,
        });
        setCharacter(transformedCharacterData);
      })
      .catch(console.log)
      .finally(() => setIsLoading(false));
  }, [characterName]);

  const handleClick = (e) => {
    const planetSelected = e.target.textContent;
    navigate(`/planets/${planetSelected}`);
  };

  const renderCharacterFilms =
    character.films?.length > 0 && character.films?.length <= 3 ? (
      <>
        <div className="flex-column">
          <h3 className="my-2">Appearances</h3>
          <ListOfFilms filmsUrls={character.films} />
        </div>
      </>
    ) : (character.films?.length > 3) & (window.innerWidth > 576) ? (
      <>
        <div className="flex-column cutoff-text">
          <h3 className="my-2">Appearances</h3>
          <ListOfFilms filmsUrls={character.films} />
        </div>
        {/* <input type="checkbox" className="expand-btn" /> */}
      </>
    ) : (character.films?.length > 3) & (window.innerWidth < 576) ? (
      <>
        <div className="flex-column cutoff-text">
          <h3 className="my-2">Appearances</h3>
          <ListOfFilms filmsUrls={character.films} />
        </div>
        <input type="checkbox" className="expand-btn" />
      </>
    ) : (
      <>
        <h3 className="my-2">Appearances</h3>
        <span>No films registered for this planet</span>
      </>
    );

  const renderCharacterShips =
    (character.starships?.length > 0) & (character.starships?.length < 5) ? (
      <>
        <div className="flex-column">
          <h3 className="my-2">Starships</h3>
          <ListOfShips shipsUrls={character.starships} />
        </div>
      </>
    ) : character.starships?.length >= 5 ? (
      <>
        <div className="flex-column cutoff-text">
          <h3 className="my-2">Starships</h3>
          <ListOfShips shipsUrls={character.starships} />
        </div>
        <input type="checkbox" className="expand-btn" />
      </>
    ) : (
      <>
        <h3 className="my-2">Starships</h3>
        <span>No starships registered for this character</span>
      </>
    );

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <main ref={mainCointanierRef} className="main text-secondary">
          <div className="page-img-container">
            <img src={character.image} alt={character.name} />
          </div>
          <div className="page-description-container bg-dark p-2">
            <h1 className="mb-2 mb-sm-3 pt-1 px-2">{character.name}</h1>
            <div className="px-2">
              <Row className="py-1">
                <Col>
                  <h3>Height:</h3>
                  <span>{character.height}</span>
                </Col>
                <Col>
                  <h3>Birth Year</h3>
                  <span>{character.birth_year}</span>
                </Col>
              </Row>
              <Row className="pt-1">
                <Col>
                  <h3>Species</h3>
                  <span>{character.species}</span>
                </Col>
                <Col>
                  <h3>Homeworld</h3>
                  <p className="list-element" onClick={handleClick}>
                    {character.homeworld?.toUpperCase().at(0)}
                    {character.homeworld?.substring(1)}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col className="pt-1 ">
                  <div className="flex-column cutoff-text">
                    <h3 className="my-2">Appearances</h3>
                    <ListOfFilms filmsUrls={character.films} />
                  </div>
                  {containerWidth < 517 && (
                    <input type="checkbox" className="expand-btn" />
                  )}
                </Col>
                <Col className="pt-1">
                  {character.starships?.length > 0 ? (
                    <div className="flex-column cutoff-text">
                      <h3 className="my-2">Starships</h3>
                      <ListOfShips shipsUrls={character.starships} />
                    </div>
                  ) : (
                    <>
                      <h3 className="my-2">Starships</h3>
                      <span>No starships registered for this character</span>
                    </>
                  )}
                </Col>
              </Row>
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default SingleCharacter;
