import { useState, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useNavigate } from 'react-router-dom'
import starshipsMappedData from '../utils/mocked-data/starshipsMappedData.json'
import './grid-styles.css'
import { getTransformedShipsArray } from '../services/getTransformedShipsArray'
import { useSearch } from '../hooks/useSearch'
import { Spinner } from '../components/Spinner'

const StarShips = () => {
  const [page, setPage] = useState(1)
  const [ships, setShips] = useState([])
  const { searchItems } = useSearch()

  let navigate = useNavigate()

  // useEffect(() => {
  //   getTransformedShipsArray(page)
  //     .then((data) => setShips((prev) => [...prev, ...data]))
  //     .catch((error) => console.log(error))
  // }, [page])

  useEffect(() => {
    getTransformedShipsArray(page)
      .then((data) => {
        //checking data is not null
        if (data) {
          setShips((prev) => [...prev, ...data])
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }, [page])

  const handleClick = (e) => {
    const shipSelected = e.target.textContent
    const [ship] = starshipsMappedData.filter(
      (item) => item.name === shipSelected
    )
    navigate(`${ship.name.replaceAll(' ', '~')}`)
  }

  return (
    <>
      {searchItems.length > 0 ? (
        <div className="my-3 my-md-4 grid-container">
          {searchItems?.map((starship) => (
            <div key={starship.name} className="grid-element-card">
              <div className="grid-card-hero">
                <img
                  className="grid-card-hero-img"
                  src={starship.imgUrl}
                  alt={starship.name}
                />
              </div>
              <div className="text-secondary bg-dark p-3 grid-card-info">
                <h4 onClick={handleClick}>{starship.name}</h4>
                <p>{starship.model}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <InfiniteScroll
          dataLength={ships.length}
          next={() => setPage((prev) => ships.length < 36 && prev + 1)}
          hasMore={ships.length < 36 && true}
          // loader={<div className="text-white display-4">Loading...</div>}
          loader={<Spinner />}
          className={`my-3 my-md-4 ${ships.length > 0 ? 'grid-container' : ''}`}
        >
          {ships.map((ship) => (
            <div key={ship.name} className="grid-element-card">
              <div className="grid-card-hero">
                <img
                  className="grid-card-hero-img"
                  src={ship.imgUrl}
                  alt={ship.name}
                />
              </div>
              <div className="text-secondary bg-dark p-3 grid-card-info">
                <h4 onClick={handleClick}>{ship.name}</h4>
                <p>{ship.model}</p>
              </div>
            </div>
          ))}
        </InfiniteScroll>
      )}
    </>
  )
}

export default StarShips
