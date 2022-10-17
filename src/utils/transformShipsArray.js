import starshipsJsonArr from "../helpers/starshipMappedData";

export const transformShipsArray = (newShips) => {
  const modifiedShipsArr = newShips.map((shipFromNewShips) => {
    const auxStarshipsJsonArr = [...starshipsJsonArr];
    const imgUrl = auxStarshipsJsonArr.filter(
      (item) => item.name === shipFromNewShips.name
    );

    return { ...shipFromNewShips, ...imgUrl[0] };
  });
  return modifiedShipsArr;
};
