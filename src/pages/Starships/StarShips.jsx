import { useState, useEffect } from "react";
import { fetchShips } from "../../api/fetchShips";
import InfiniteScroll from "react-infinite-scroll-component";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import starshipsJsonArr from "../../helpers/starshipMappedData.json";

const StarShips = () => {
  const [page, setPage] = useState(1);
  const [ships, setShips] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    const loadShips = async () => {
      const newShips = await fetchShips(page);
      setShips((prev) => {
        return [...prev, ...newShips];
      });
    };
    loadShips();
  }, [page, setShips]);

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
        {ships.map((ship, index) => (
          <div
            key={index}
            className="container text-secondary bg-dark my-4 p-3 flex-column"
          >
            <h4 className="ship-title" onClick={handleClick}>
              {ship.name}
            </h4>
            <p>{ship.model}</p>
          </div>
        ))}
      </InfiniteScroll>
    </>
  );
};

export default StarShips;
