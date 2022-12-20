import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "./Spinner/Spinner";
import { useLisOfData } from "../hooks/useListOfData";

const ListOfFilms = ({ listOfUrls }) => {
  const { loading, data } = useLisOfData({ listOfUrls });
  let navigate = useNavigate();

  const selectFilm = useCallback(
    (e) => {
      const selectFilm = e.target.textContent;
      navigate(`/films/${selectFilm.replaceAll(" ", "~")}`);
    },
    [navigate]
  );

  return (
    <>
      {loading ? (
        <Spinner small />
      ) : (
        data?.map((film) => (
          <p key={film?.title} onClick={selectFilm} className="list-element">
            {film.title}
          </p>
        ))
      )}
    </>
  );
};

export default ListOfFilms;
