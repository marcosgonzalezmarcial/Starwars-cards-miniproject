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
        {<p>{item?.model}</p>}
        {<p>{item?.terrain}</p>}
        {<p>{item?.species}</p>}
      </div>
    </Link>
  );
};

export default memo(GridItemLinkCard);

// import { memo } from "react";
// import { Link } from "react-router-dom";

// const GridItemLinkCard = (props) => {
//   const { ship, character, planet } = props;

//   return (
//     <Link
//       className="grid-element-card"
//       to={
//         ship
//           ? ship.name.replaceAll(" ", "~")
//           : character
//           ? character.name.replaceAll(" ", "~")
//           : planet.name.replaceAll(" ", "~")
//       }
//     >
//       <div className="grid-card-hero">
//         <img
//           className="grid-card-hero-img"
//           src={ship ? ship.imgUrl : character ? character.image : planet.imgUrl}
//           alt={ship ? ship.name : character ? character.name : planet.name}
//         />
//       </div>
//       <div className="text-secondary bg-dark p-3 grid-card-info">
//         <h4>{ship ? ship.name : character ? character.name : planet.name}</h4>
//         {ship && <p>{ship?.model}</p>}
//         {planet && <p>{planet?.name}</p>}
//         {character && <p>{character?.species}</p>}
//       </div>
//     </Link>
//   );
// };

// export default memo(GridItemLinkCard);
