import { Spinner } from "components/Spinner";
import GridItemLinkCard from "components/GridItemLinkCard";
import { useData } from "hooks/useData";

export const GridItems = ({ mainPath }) => {
  const { data } = useData();

  return (
    <>
      {/* show Spinner if no data loaded yet */}
      {data[mainPath]?.data?.length === 0 && <Spinner />}
      <div className="my-3 my-md-4 grid-container">
        {data[mainPath]?.data?.map((item) => (
          <GridItemLinkCard key={item.model ?? item.name} item={item} />
        ))}
        {data.isLoading && data[mainPath]?.data.length > 0 && <Spinner />}
      </div>
      )}
    </>
  );
};
