import { useState, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useNavigate } from 'react-router-dom'
import planetsMappedData from '../utils/mocked-data/planetsMappedData.js'
import { useSearch } from '../hooks/useSearch.js'
import { getTransformedPlanetsArray } from '../services/getTransformedPlanetsArray'
import { Spinner } from '../components/Spinner/Spinner'
import '../styles.scss'

const Planets = () => {
  const [page, setPage] = useState(1)
  const [planets, setPlanets] = useState([])
  const { searchItems } = useSearch()

  let navigate = useNavigate()

  useEffect(() => {
    getTransformedPlanetsArray(page)
      .then((data) => {
        //checking data is not null
        if (data) {
          setPlanets((prev) => [...prev, ...data])
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }, [page])

  const handleClick = (e) => {
    const planetSelected = e.target.textContent
    const [planet] = planetsMappedData.filter(
      (item) => item.name === planetSelected
    )
    navigate(`${planet.name.replaceAll(' ', '~')}`)
  }

  return (
    <>
      {searchItems.length > 0 ? (
        <div className="my-3 my-md-4 grid-container">
          {searchItems.map((planet) => (
            <div key={planet.name} className="grid-element-card">
              <div className="grid-card-hero">
                <img
                  className="grid-card-hero-img"
                  src={planet.imgUrl}
                  alt={planet.name}
                />
              </div>
              <div className="text-secondary bg-dark p-3 grid-card-info">
                <h4 onClick={handleClick}>{planet.name}</h4>
                <p>{planet.climate}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <InfiniteScroll
          dataLength={planets.length}
          next={() => setPage((prev) => planets.length < 59 && prev + 1)}
          hasMore={planets.length < 59 && true}
          loader={<Spinner />}
          className={`my-3 my-md-4 ${
            planets.length > 0 ? 'grid-container' : ''
          }`}
        >
          {planets.map((planet) => (
            <div key={planet.name} className="grid-element-card">
              <div className="grid-card-hero">
                <img
                  className="grid-card-hero-img"
                  src={planet.imgUrl}
                  alt={planet.name}
                />
              </div>
              <div className="text-secondary bg-dark p-3 grid-card-info">
                <h4 onClick={handleClick}>{planet.name}</h4>
                <p>{planet.climate}</p>
              </div>
            </div>
          ))}
        </InfiniteScroll>
      )}
    </>
  )
}

export default Planets
