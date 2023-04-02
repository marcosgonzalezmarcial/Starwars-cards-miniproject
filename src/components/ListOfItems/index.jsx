import { memo } from "react";
import { Link } from "react-router-dom";
import { Spinner } from "components/Spinner";
import { useLisOfData } from "hooks/useListOfData";
import "./ListOfItems.scss";

function ListOfItems({ itemType, listOfUrls }) {
  const { loading, data } = useLisOfData({ listOfUrls });

  return (
    <>
      {loading ? (
        <Spinner small />
      ) : (
        data?.map((item) => (
          <Link
            key={item.name || item.title}
            to={`/${itemType}/${(item.name || item.title).replaceAll(
              " ",
              "~"
            )}`}
            className="list-item"
          >
            {item.name || item.title}
          </Link>
        ))
      )}
    </>
  );
}

export default memo(ListOfItems);
