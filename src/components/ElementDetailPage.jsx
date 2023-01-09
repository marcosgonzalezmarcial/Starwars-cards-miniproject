import { useParams, useLocation } from "react-router-dom";
import Character from "components/Character";
import Starship from "components/Starship";
import Planet from "components/Planet";
import Film from "components/Film";
import { Spinner } from "components/Spinner";
import { useSingleElementData } from "hooks/useSingleElementData";
// import { useShip } from "hooks/useShip";

export const Element = ({ mainPath, elementData }) => {
  switch (mainPath) {
    case "starships":
      return <Starship elementData={elementData} />;
    case "people":
      return <Character elementData={elementData} />;
    case "planets":
      return <Planet elementData={elementData} />;
    case "films":
      return <Film elementData={elementData} />;
    default:
      console.log(`Sorry, no element found`);
  }
};

const ElementDetailPage = () => {
  let { itemName } = useParams();
  let location = useLocation();

  let mainPath = location.pathname.slice(1).split("/")[0];
  if (mainPath === "characters") {
    mainPath = "people";
  }

  const { loading, elementData } = useSingleElementData({
    paramFromUrl: itemName,
    typeOfData: mainPath,
  });

  // const data = useShip({ mainPath, typeOfData: mainPath, paramFromUrl });

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <main className="main text-secondary">
          <Element mainPath={mainPath} elementData={elementData} />
        </main>
      )}
    </>
  );
};

export default ElementDetailPage;
