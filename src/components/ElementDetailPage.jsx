import { useCallback } from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import ListOfItemsWrapper from "components/ListOfItemsWrapper";
import Character from "components/Character";
import Starship from "components/Starship";
import Planet from "components/Planet";
import Film from "components/Film";
import { Spinner } from "components/Spinner";
import { TYPE_OF_DATA } from "../constants";
import { useSingleElementData } from "hooks/useSingleElementData";

const ElementDetailPage = () => {
  let { itemName } = useParams();
  let location = useLocation();
  let navigate = useNavigate();

  let mainPath = location.pathname.slice(1).split("/")[0];
  if (mainPath === "characters") {
    mainPath = "people";
  }

  const { loading, elementData } = useSingleElementData({
    paramFromUrl: itemName,
    typeOfData: mainPath,
  });

  const handleItemClick = useCallback(
    (e) => {
      const planetSelected = e.target.textContent;
      navigate(`/planets/${planetSelected}`);
    },
    [navigate]
  );

  const renderElement = () => {
    switch (mainPath) {
      case "starships":
        return (
          <Starship
            elementData={elementData}
            handleItemClick={handleItemClick}
          />
        );
      case "people":
        return (
          <Character
            elementData={elementData}
            handleItemClick={handleItemClick}
          />
        );
      case "planets":
        return (
          <Planet elementData={elementData} handleItemClick={handleItemClick} />
        );
      case "films":
        return (
          <Film elementData={elementData} handleItemClick={handleItemClick} />
        );
      default:
        console.log(`Sorry, we are out of `);
    }
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <main className="main text-secondary">
          {/* <Character
            elementData={elementData}
            handleItemClick={handleItemClick}
          /> */}
          {renderElement()}
        </main>
      )}
    </>
  );
};

export default ElementDetailPage;
