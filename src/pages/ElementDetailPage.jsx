import { useParams, useLocation } from "react-router-dom";
import Character from "components/Character";
import Starship from "components/Starship";
import Planet from "components/Planet";
import Film from "components/Film";
import { Spinner } from "components/Spinner";
import { useSingleElementData } from "hooks/useSingleElementData";
import "./ElementDetailPage.scss";


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

const ElementDetailPage = ({ children }) => {
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

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <main className="main text-secondary">
          <Element mainPath={mainPath} elementData={elementData} />
          {children}
        </main>
      )}
    </>
  );
};

export default ElementDetailPage;
