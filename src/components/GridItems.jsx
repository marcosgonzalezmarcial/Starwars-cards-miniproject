import { memo } from "react";
import { Spinner } from "components/Spinner";
import GridItemLinkCard from "components/GridItemLinkCard";
import { useData } from "hooks/useData";
import { getPathname } from "utils/getPathname";

const GridItems = () => {
  const { data } = useData();
  let mainPath = getPathname();

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

export default memo(GridItems);
