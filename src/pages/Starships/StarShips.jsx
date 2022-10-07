import { useState, useEffect } from "react";
import ShipCard from "./ShipCard";
import { fetchShips } from "../../api/fetchShips";
import InfiniteScroll from "react-infinite-scroll-component";
import "./shipcard.css";
import { Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const StarShips = () => {
  const [isLoading, setIsloading] = useState(true);
  const [shipSelected, setShipSelected] = useState("");
  const [showCard, setShowCard] = useState(false);
  const [page, setPage] = useState(1);
  const [ships, setShips] = useState([]);

  useEffect(() => {
    setIsloading(true);
    const loadShips = async () => {
      const newShips = await fetchShips(page);
      setShips((prev) => [...prev, ...newShips]);
      setIsloading(false);
    };
    loadShips();
  }, [page, setShips]);

  const handleClick = (e) => {
    const shipSelected = e.target.textContent;
    setShipSelected(shipSelected);
    setShowCard(true);
  };

  if (showCard) return <ShipCard shipSelected={shipSelected} ships={ships} />;

  return (
    <>
      {isLoading && (
        <Container className="m-3">
          <div className="text-white display-4">Cargando...</div>
        </Container>
      )}
      <InfiniteScroll
        dataLength={ships.length}
        next={() => setPage(ships.length < 36 && page + 1)}
        hasMore={ships.length < 36 ? true : false}
      >
        {ships.map((ship) => (
          <div
            key={Date.now() * Math.random()}
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
