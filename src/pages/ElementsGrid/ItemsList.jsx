import ItemCard from "components/ItemCard";
import { Spinner } from "components/Spinner";

export default function ItemsList({ currentData, isLoading }) {
  return (
    <>
      {currentData.map((item) => {
        // avoid rendering specific elements not working
        if (item.name !== "unknown" && item.name !== "Jakku") {
          return <ItemCard key={item.model ?? item.name} item={item} />;
        } else {
          return false;
        }
      })}
      {/* show small Spinner when loading more items  */}
      {isLoading && currentData.length > 0 && <Spinner />}
    </>
  );
}
