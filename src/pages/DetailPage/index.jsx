import { Suspense, lazy, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Spinner } from "components/Spinner";
import { useElementData } from "hooks/useElementData";
import "./DetailPage.scss";

const componentMap = {
  starships: lazy(() => import("components/Starship")),
  characters: lazy(() => import("components/Character")),
  planets: lazy(() => import("components/Planet")),
  films: lazy(() => import("components/Film")),
};

const LazyDetailElementPage = ({ resourceType, elementData }) => {
  let fromRef = useRef();
  // conditionally render component according to resource type
  const Component = componentMap[resourceType];
  return (
    <main ref={fromRef} className="detail-page">
      <Component containerRef={fromRef} elementData={elementData} />
    </main>
  );
};

export default function DetailPage() {
  let { elementNameFromUrl } = useParams();
  const location = useLocation();
  const resourceType = location.pathname.split("/")[1];

  const { elementData } = useElementData({
    elementNameFromUrl,
    typeOfData: resourceType === "characters" ? "people" : resourceType,
  });

  return (
    <Suspense fallback={<Spinner />}>
      <LazyDetailElementPage
        resourceType={resourceType}
        elementData={elementData}
      />
    </Suspense>
  );
}
