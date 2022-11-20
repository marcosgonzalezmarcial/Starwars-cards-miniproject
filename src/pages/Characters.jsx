import { useState, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useNavigate } from 'react-router-dom'
import peopleJsonArr from '../utils/mocked-data/peopleMappedData.json'
import { getTransformedCharactersArray } from '../services/getTransformedCharactersArray'
import { useSearch } from '../hooks/useSearch'
import { Spinner } from '../components/Spinner'
import './styles.scss'

const Characters = () => {
  const [page, setPage] = useState(1)
  const [characters, setCharacters] = useState([])
  const { searchItems } = useSearch()

  let navigate = useNavigate()

  useEffect(() => {
    getTransformedCharactersArray(page)
      .then((data) => {
        //checking data is not null
        if (data) {
          setCharacters((prev) => [...prev, ...data])
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }, [page])

  const handleClick = (e) => {
    const personSelected = e.target.textContent
    const [person] = peopleJsonArr.filter(
      (item) => item.name === personSelected
    )
    navigate(`${person.name.replaceAll(' ', '~')}`)
  }

  return (
    <>
      {searchItems.length > 0 ? (
        <div className="my-3 my-md-4 grid-container">
          {searchItems.map((character) => (
            <div key={character.id} className="grid-element-card">
              <div className="grid-card-hero">
                <img
                  className="grid-card-hero-img"
                  src={character.image}
                  alt={character.name}
                />
              </div>
              <div className="text-secondary p-3 grid-card-info bg-dark">
                <h4 onClick={handleClick}>{character.name}</h4>
                <p>{character.species}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <InfiniteScroll
          dataLength={characters.length}
          next={() => setPage((prev) => characters.length < 82 && prev + 1)}
          hasMore={characters.length < 82 && true}
          loader={<Spinner />}
          className={`my-3 my-md-4 ${
            characters.length > 0 ? 'grid-container' : ''
          }`}
        >
          {characters.map((character) => (
            <div key={character.id} className="grid-element-card">
              <div className="grid-card-hero">
                <img
                  className="grid-card-hero-img"
                  src={character.image}
                  alt={character.name}
                />
              </div>
              <div className="text-secondary p-3 grid-card-info bg-dark">
                <h4 onClick={handleClick}>{character.name}</h4>
                <p>{character.species}</p>
              </div>
            </div>
          ))}
        </InfiniteScroll>
      )}
    </>
  )
}

export default Characters
