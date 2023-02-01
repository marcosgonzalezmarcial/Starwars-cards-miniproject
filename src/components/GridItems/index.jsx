import { memo } from "react";
import { Spinner } from "components/Spinner";
import GridItemLinkCard from "components/GridItemLinkCard";
import { useData } from "hooks/useData";
import "./GridItems.scss";

const GridItems = ({ mainPath }) => {
  const { data } = useData();

  return (
    <>
      {/* show Spinner if no data loaded yet */}
      {data[mainPath]?.data?.length === 0 && <Spinner />}
      <main className="my-2 grid-items">
        {data[mainPath]?.data?.map((item) => (
          <GridItemLinkCard key={item.model ?? item.name} item={item} />
        ))}
        {/* show small Spinner when loading more items  */}
        {data.isLoading && data[mainPath]?.data.length > 0 && <Spinner />}
      </main>
    </>
  );
};

export default memo(GridItems);
