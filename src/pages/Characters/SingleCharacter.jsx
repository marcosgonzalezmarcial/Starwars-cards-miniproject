import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import PeopleFilms from './PeopleFilms'
import PeopleShips from './PeopleShips'

const SingleShip = () => {
  const [person, setPerson] = useState({
    birth_year: '19 BBY',
    eye_color: 'Blue',
    films: ['https://swapi.dev/api/films/1/'],
    gender: 'Male',
    hair_color: 'Blond',
    height: '172',
    homeworld: 'https://swapi.dev/api/planets/1/',
    mass: '77',
    name: 'Luke Skywalker',
    skin_color: 'Fair',
    created: '2014-12-09T13:50:51.644000Z',
    edited: '2014-12-10T13:52:43.172000Z',
    species: ['https://swapi.dev/api/species/1/'],
    starships: ['https://swapi.dev/api/starships/12/'],
    url: 'https://swapi.dev/api/people/1/',
    vehicles: ['https://swapi.dev/api/vehicles/14/']
  })
  const [isLoading, setIsLoading] = useState(true)
  const [img, setImg] = useState('')

  let { id } = useParams()

  useEffect(() => {
    setIsLoading(true)
    fetch(`https://swapi.dev/api/people/${id}/`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setPerson(data)
      })
      .catch(console.log)
    fetch(`https://miadil.github.io/starwars-api/api/id/${id}.json`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setImg(data.image)
        setIsLoading(false)
      })
      .catch(console.log)
  }, [id])

  return (
    <>
      {isLoading ? (
        <Container className="m-3">
          <div className="text-white display-4">Cargando...</div>
        </Container>
      ) : (
        <div className="container text-secondary my-3">
          <div className="spaceship-img-container">
            <img src={img} width="100%" alt="spaceShip" />
          </div>
          <div className="ship-description-container p-2">
            <h2 className="mb-3 pt-2 px-2">{person.name}</h2>
            <div className="px-2 my-3">
              <Row className="py-2">
                <Col>
                  <h4>Height:</h4>
                  <span>{person.height}</span>
                </Col>
                <Col>
                  <h4>Birth Year</h4>
                  <span>{person.birth_year}</span>
                </Col>
              </Row>
              <Row className="py-2">
                <Col>
                  <h4>Gender:</h4>
                  <span>{person.gender}</span>
                </Col>
                <Col>
                  <h4>Mass</h4>
                  <span>{person.mass}</span>
                </Col>
              </Row>
              <Row className="py-2">
                <Col>
                  <h4>Skin Color</h4>
                  <span>{person.skin_color}</span>
                </Col>
                <Col>
                  <h4>Eye Color</h4>
                  <span>{person.eye_color}</span>
                </Col>
              </Row>
              <Row className="pt-2">
                <Row className="appearances-row py-2">
                  <h4 className="m-0">Films</h4>
                </Row>
                <Row>
                  <div className="container-films">
                    <PeopleFilms person={person} />
                  </div>
                </Row>
              </Row>
              <Row className="pt-2">
                <Row className="appearances-row py-2">
                  <h4 className="m-0">Ships</h4>
                </Row>
                <Row>
                  <div className="container-films">
                    <PeopleShips person={person} />
                  </div>
                </Row>
              </Row>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default SingleShip
