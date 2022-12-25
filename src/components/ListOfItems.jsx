import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "components/Spinner";
import { useLisOfData } from "hooks/useListOfData";

const ListOfItems = ({ itemType, listOfUrls }) => {
  const { loading, data } = useLisOfData({ listOfUrls });
  let navigate = useNavigate();

  const selectItem = useCallback(
    (e) => {
      const selectedValue = e.target.textContent;

      navigate(`/${itemType}/${selectedValue.replaceAll(" ", "~")}`);
    },
    [navigate, itemType]
  );

  return (
    <>
      {loading ? (
        <Spinner small />
      ) : (
        data.map((item) => (
          <p
            key={item.name || item.title}
            onClick={selectItem}
            className="list-element"
          >
            {item.name || item.title}
          </p>
        ))
      )}
    </>
  );
};

export default ListOfItems;
