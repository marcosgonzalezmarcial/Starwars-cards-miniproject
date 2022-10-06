import { useState } from "react";
import Characters from "./Characters";

const People = () => {
  const [people, setPeople] = useState([]);
  const [page, setPage] = useState(1);

  return (
    <Characters
      people={people}
      setPeople={setPeople}
      page={page}
      setPage={setPage}
    />
  );
};

export default People;
