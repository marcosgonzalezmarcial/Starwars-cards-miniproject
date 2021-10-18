import Ships from "./Ships";

const Starships = ({
  ships,
  setShips,
  page,
  setPage,
  showCard,
  setShowCard,
}) => {
  return (
    <>
      <Ships
        showCard={showCard}
        setShowCard={setShowCard}
        ships={ships}
        setShips={setShips}
        page={page}
        setPage={setPage}
      />
    </>
  );
};

export default Starships;
