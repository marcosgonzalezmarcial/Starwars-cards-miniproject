import { useParams } from "react-router-dom";
import Character from "components/Character";
import Starship from "components/Starship";
import Planet from "components/Planet";
import Film from "components/Film";
import { Spinner } from "components/Spinner";
import { useElementData } from "hooks/useElementData";
import "./DetailPage.scss";
import { useRef } from "react";

const componentMap = {
  starships: Starship,
  characters: Character,
  planets: Planet,
  films: Film,
};

export default function DetailPage({ currentPath: resourceType }) {
  let { itemName } = useParams();

  let fromRef = useRef();

  const { loading, elementData } = useElementData({
    paramFromUrl: itemName,
    typeOfData: resourceType === "characters" ? "people" : resourceType,
  });

  // conditionally render component according to resource type
  const Component = componentMap[resourceType];

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <main ref={fromRef} className="detail-page">
          <Component containerRef={fromRef} elementData={elementData} />
        </main>
      )}
    </>
  );
}
