import { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import starshipsMappedData from '../api/mocked-data/starshipsMappedData.json'
import { fetchSingleShip } from '../api/fetchSingleShip'
import ListOfPilots from './ListOfPilots'
import ListOfFilms from './ListOfFilms'

const SingleShip = () => {
  const [ship, setShip] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [img, setImg] = useState(null)

  let { id } = useParams()

  useEffect(() => {
    setIsLoading(true)

    const [shipFiltered] = starshipsMappedData.filter(
      (starship) => starship.id === Number(id)
    )
    setImg(shipFiltered.imgUrl)

    fetchSingleShip(id)
      .then((ship) => {
        setShip(ship)
        setIsLoading(false)
      })
      .catch(console.log)
  }, [id])

  return (
    <>
      {isLoading ? (
        <Container className="m-3">
          <div className="text-white display-4">Loading...</div>
        </Container>
      ) : (
        <div className="container wrapper text-secondary my-3">
          <div className="img-container">
            <img src={img} alt={ship.name} />
          </div>
          <div className="page-description-container bg-dark p-2">
            <h2 className="mb-2 pt-1 px-2">{ship.name}</h2>
            <div className="px-2">
              <Row className="py-1">
                <Col>
                  <h3>Model:</h3>
                  <span>{ship.model}</span>
                </Col>
                <Col>
                  <h3>Manufacturer:</h3>
                  <span>
                    {ship.manufacturer ? ship.manufacturer : 'Unknown'}
                  </span>
                </Col>
              </Row>
              <Row className="py-1">
                <Col>
                  <h3>Cost in credits:</h3>
                  <span>{ship.cost_in_credits}</span>
                </Col>
                <Col>
                  <h3>Atmospheric speed:</h3>
                  <span>{ship.max_atmosphering_speed}</span>
                </Col>
              </Row>
              <Row className="py-1">
                <Col>
                  <h3>Length:</h3>
                  <span>{ship.length}</span>
                </Col>
                <Col>
                  <h3>Crew:</h3>
                  <span>{ship.crew}</span>
                </Col>
              </Row>
              <Col className="pt-1">
                <h3 className="m-0 py-1">Appearances</h3>
                <ListOfFilms filmsUrls={ship.films} />
              </Col>
              <Row className="pt-1">
                <div className="py-1">
                  <h3 className="m-0">Pilots</h3>
                </div>
                {ship.pilots.length > 0 ? (
                  <ListOfPilots pilotsUrls={ship.pilots} />
                ) : (
                  <span>No pilots registered for this ship</span>
                )}
              </Row>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default SingleShip
