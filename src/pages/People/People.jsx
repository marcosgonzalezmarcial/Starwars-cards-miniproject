import { useState } from "react";
import Characters from "./Characters";

const People = ({ showCard, setShowCard }) => {
  const [people, setPeople] = useState([]);
  const [page, setPage] = useState(1);

  return (
    <Characters
      showCard={showCard}
      setShowCard={setShowCard}
      people={people}
      setPeople={setPeople}
      page={page}
      setPage={setPage}
    />
  );
};

export default People;
