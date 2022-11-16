import { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import charactersMappedData from '../utils/mocked-data/peopleMappedData.json'
import { fetchSingleCharacter } from '../services/fetchSingleCharacter'
import ListOfFilms from './ListOfFilms'
import ListOfShips from './ListOfShips'
import { urlStringify } from '../utils/urlStringify'
import { Spinner } from './Spinner'

const SingleCharacter = () => {
  const [character, setCharacter] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [img, setImg] = useState('')

  let { characterName } = useParams()

  useEffect(() => {
    setIsLoading(true)

    const newPerson = urlStringify(characterName)

    const { id } = charactersMappedData.find(
      (person) => person.name === newPerson
    )

    const [characterFiltered] = charactersMappedData.filter(
      (character) => character.id === Number(id)
    )
    setImg(characterFiltered.image)

    fetchSingleCharacter(id)
      .then((character) => {
        setCharacter(character)
        setIsLoading(false)
      })
      .catch(console.log)
  }, [characterName])

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="page-wrapper text-secondary my-3">
          <div className="page-img-container">
            <img src={img} alt={character.name} />
          </div>
          <div className="page-description-container bg-dark p-2">
            <h1 className="mb-2 pt-1 px-2">{character.name}</h1>
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
              <Row className="py-1">
                <Col>
                  <h3>Gender:</h3>
                  <span>{character.gender}</span>
                </Col>
                <Col>
                  <h3>Mass</h3>
                  <span>{character.mass}</span>
                </Col>
              </Row>
              <Row className="py-1">
                <Col>
                  <h3>Skin Color</h3>
                  <span>{character.skin_color}</span>
                </Col>
                <Col>
                  <h3>Eye Color</h3>
                  <span>{character.eye_color}</span>
                </Col>
              </Row>
              <Row className="py-1">
                <Col className="pt-1">
                  <h3 className="m-0 py-1">Appearances</h3>
                  <ListOfFilms filmsUrls={character.films} />
                </Col>
                <Col className="pt-1">
                  <h3 className="m-0 py-1">Ships</h3>
                  {character.starships.length > 0 ? (
                    <ListOfShips shipsUrls={character.starships} />
                  ) : (
                    <span>There aren't ships for this character</span>
                  )}
                </Col>
              </Row>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default SingleCharacter
