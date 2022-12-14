import { useCallback, useEffect, useRef, useState } from "react";
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
import "./view-more.scss";

const SingleCharacter = () => {
  const [character, setCharacter] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [dynamicSize, setDynamicSize] = useState({});

  let { characterName } = useParams();
  let navigate = useNavigate();

  const mainRef = useRef(null);

  //obvserving the size of the ListOfFilms container (main)
  useEffect(() => {
    if (!mainRef || isLoading) return; // wait for the elementRef to be available and loading finishes
    const resizeObserver = new ResizeObserver((entries) => {
      setDynamicSize({
        mainWidth: entries[0].contentRect.width,
      });
    });
    resizeObserver.observe(mainRef.current);
    return () => resizeObserver.disconnect(); // clean up
  }, [isLoading]);

  // fetch character
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

  const handleClick = useCallback(
    (e) => {
      const planetSelected = e.target.textContent;
      navigate(`/planets/${planetSelected}`);
    },
    [navigate]
  );

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <main ref={mainRef} className="main text-secondary">
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
                <Col className="py-1">
                  <div className="flex-column cutoff-text">
                    <h3 className="my-2">Appearances</h3>
                    <ListOfFilms filmsUrls={character.films} />
                  </div>
                  {dynamicSize.mainWidth < 518 &&
                    character.films?.length > 3 && (
                      <input type="checkbox" className="expand-btn" />
                    )}
                  {/* {dynamicSize.mainWidth > 517 &&
                    character.films?.length > 6 && (
                      <input type="checkbox" className="expand-btn" />
                    )} */}
                </Col>
                <Col className="pt-1">
                  {character.starships?.length === 0 ? (
                    <>
                      <h3 className="my-2">Starships</h3>
                      <span>No starships registered for this character</span>
                    </>
                  ) : (
                    <div className="flex-column cutoff-text">
                      <h3 className="my-2">Starships</h3>
                      <ListOfShips shipsUrls={character.starships} />
                    </div>
                  )}
                  {dynamicSize.mainWidth < 518 &&
                    character.starships?.length > 3 && (
                      <input type="checkbox" className="expand-btn" />
                    )}
                  {dynamicSize.mainWidth > 517 &&
                    character.starships?.length > 6 && (
                      <input type="checkbox" className="expand-btn" />
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
