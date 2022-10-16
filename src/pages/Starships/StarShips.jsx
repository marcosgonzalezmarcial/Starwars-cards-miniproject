import { useState, useEffect } from "react";
import { fetchShips } from "../../api/fetchShips";
import InfiniteScroll from "react-infinite-scroll-component";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import starshipsJsonArr from "../../helpers/starshipMappedData.json";
import "./Starships.css";

const StarShips = () => {
  const [page, setPage] = useState(1);
  const [ships, setShips] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    const loadShips = async () => {
      const newShips = await fetchShips(page);
      setShips((prev) => {
        const modifiedShipsArr = newShips.map((shipFromNewShips) => {
          const auxStarshipsJsonArr = [...starshipsJsonArr];
          const imgUrl = auxStarshipsJsonArr.filter(
            (item) => item.name === shipFromNewShips.name
          );

          return { ...shipFromNewShips, ...imgUrl[0] };
        });
        return [...prev, ...modifiedShipsArr];
      });
    };
    loadShips();
  }, [page]);

  const handleClick = (e) => {
    const shipSelected = e.target.textContent;
    const [ship] = starshipsJsonArr.filter(
      (item) => item.name === shipSelected
    );
    navigate(`${ship.id}`);
  };

  return (
    <>
      <InfiniteScroll
        dataLength={ships.length}
        next={() => setPage(ships.length < 36 && page + 1)}
        hasMore={ships.length < 36 ? true : false}
        loader={
          <Container className="m-3">
            <div className="text-white display-4">Cargando...</div>
          </Container>
        }
      >
        <div className="container mt-3 shipsGrid">
          {ships.map((ship, index) => (
            <>
              <div key={index} className="starship-card">
                <div className="card-hero">
                  <img
                    className="card-hero-img"
                    src={ship.url}
                    alt="starship"
                  />
                </div>
                <div className="text-secondary bg-dark p-2 card-info">
                  <h4 className="ship-title" onClick={handleClick}>
                    {ship.name}
                  </h4>
                  <p>{ship.model}</p>
                </div>
              </div>
            </>
          ))}
        </div>
      </InfiniteScroll>
    </>
  );
};

export default StarShips;
