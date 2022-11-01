import { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import filmsMappedData from '../api/mocked-data/filmsMappedData.json'
import ListOfShips from './ListOfShips'
import { urlStringify } from '../utils/urlStringify'
import { fetchSingleFilm } from '../api/fetchSingleFilm'
import ListOfPilots from './ListOfPilots'

const SingleFilm = () => {
  const [film, setFilm] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [img, setImg] = useState('')

  let { filmTitle } = useParams()

  useEffect(() => {
    setIsLoading(true)

    const filmTitleFromUrl = urlStringify(filmTitle)
    console.log(filmTitleFromUrl)

    const { id } = filmsMappedData.find(
      (film) => film.title === filmTitleFromUrl
    )

    const [filmFiltered] = filmsMappedData.filter(
      (film) => film.id === Number(id)
    )

    setImg(filmFiltered.imgUrl)

    fetchSingleFilm(id)
      .then((film) => {
        setFilm(film)
        setIsLoading(false)
      })
      .catch(console.log)
  }, [filmTitle])

  return (
    <>
      {isLoading ? (
        <Container className="m-3">
          <div className="text-white display-4">Loading...</div>
        </Container>
      ) : (
        <div className="page-wrapper text-secondary my-3">
          <div className="page-img-container">
            <img src={img} alt={film.title} />
          </div>
          <div className="page-description-container bg-dark p-2">
            <h1 className="mb-2 pt-1 px-2">{film.title}</h1>
            <div className="px-2">
              <Row className="py-1">
                <Col>
                  <h3>Episode:</h3>
                  <span>{film.episode_id}</span>
                </Col>
                <Col>
                  <h3>Director</h3>
                  <span>{film.director}</span>
                </Col>
              </Row>
              <Row className="py-1">
                <Col>
                  <h3>Producer:</h3>
                  <span>{film.producer}</span>
                </Col>
                <Col>
                  <h3>Release date</h3>
                  <span>{film.release_date}</span>
                </Col>
              </Row>
              <Row className="py-1">
                {/* <Col md="6" className="pt-1">
                  <h3 className="m-0 py-1">Appearances</h3>
                  <ListOfPilots filmsUrls={film.characters} />
                </Col> */}
                <Col /*md="6"*/ className="pt-1">
                  <h3 className="m-0 py-1">Ships</h3>
                  {film.starships.length > 0 ? (
                    <ListOfShips shipsUrls={film.starships} />
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

export default SingleFilm
