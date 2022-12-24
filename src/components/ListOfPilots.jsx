import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "components/Spinner";
import { useLisOfData } from "hooks/useListOfData";

const ListOfPilots = ({ listOfUrls }) => {
  const { loading, data } = useLisOfData({ listOfUrls });
  let navigate = useNavigate();

  const selectPilot = useCallback(
    (e) => {
      const selectedValue = e.target.textContent;

      navigate(`/characters/${selectedValue.replaceAll(" ", "~")}`);
    },
    [navigate]
  );

  return (
    <>
      {loading ? (
        <Spinner small />
      ) : (
        data.map((pilot) => (
          <p key={pilot.name} onClick={selectPilot} className="list-element">
            {pilot.name}
          </p>
        ))
      )}
    </>
  );
};

export default ListOfPilots;
