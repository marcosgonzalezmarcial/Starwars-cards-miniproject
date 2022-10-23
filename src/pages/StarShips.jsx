import { useState, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useNavigate } from 'react-router-dom'
import starshipsMappedData from '../api/mocked-data/starshipsMappedData.json'
import './grid-styles.css'
import { getTransformedShipsArray } from '../api/getTransformedShipsArray'

const StarShips = () => {
  const [page, setPage] = useState(1)
  const [ships, setShips] = useState([])

  let navigate = useNavigate()

  useEffect(() => {
    getTransformedShipsArray(page).then((data) =>
      setShips((prev) => [...prev, ...data])
    )
  }, [page])

  const handleClick = (e) => {
    console.log(e)
    const shipSelected = e.target.textContent
    const [ship] = starshipsMappedData.filter(
      (item) => item.name === shipSelected
    )
    navigate(`${ship.id}`)
  }

  return (
    <InfiniteScroll
      dataLength={ships.length}
      next={() => setPage((prev) => ships.length < 36 && prev + 1)}
      hasMore={ships.length < 36 && true}
      loader={<div className="text-white display-4">Cargando...</div>}
      className="my-3 my-md-4 grid-container"
    >
      {ships.map((ship, index) => (
        <div key={index} className="element-card">
          <div className="card-hero">
            <img className="card-hero-img" src={ship.imgUrl} alt="starship" />
          </div>
          <div className="text-secondary bg-dark p-3 card-info">
            <h4 className="card-ship-title" onClick={handleClick}>
              {ship.name}
            </h4>
            <p>{ship.model}</p>
          </div>
        </div>
      ))}
    </InfiniteScroll>
  )
}

export default StarShips
