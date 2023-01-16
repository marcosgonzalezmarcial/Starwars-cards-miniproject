import { memo } from "react";
import { Link } from "react-router-dom";

const GridItemLinkCard = ({ item }) => {
  return (
    <Link className="grid-element-card" to={item?.name.replaceAll(" ", "~")}>
      <div className="grid-card-hero">
        <img
          className="grid-card-hero-img"
          src={item?.imgUrl || item?.image}
          alt={item?.name}
        />
      </div>
      <div className="text-secondary bg-dark p-3 grid-card-info">
        <h4>{item?.name}</h4>
        {<p>{item.name ?? item.model ?? item?.terrain}</p>}
      </div>
    </Link>
  );
};

export default memo(GridItemLinkCard);
