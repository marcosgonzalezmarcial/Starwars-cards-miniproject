import { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import filmsMappedData from '../utils/mocked-data/filmsMappedData.json'
import ListOfShips from './ListOfShips'
import { urlStringify } from '../utils/urlStringify'
import { fetchSingleFilm } from '../services/fetchSingleFilm'
import { Spinner } from './Spinner/Spinner'

const SingleFilm = () => {
  const [film, setFilm] = useState({})
  const [isLoading, setIsLoading] = useState(false)
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
        <Spinner />
      ) : (
        <div className="main text-secondary my-3">
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
                <Col className="pt-1">
                  <h3 className="m-0 py-1">Ships</h3>
                  {film.starships?.length > 0 ? (
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
