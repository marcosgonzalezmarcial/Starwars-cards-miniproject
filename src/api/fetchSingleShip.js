export const fetchSingleShip = async (id) => {
  const data = await fetch(`https://swapi.dev/api/starships/${id}/`);
  const ship = await data.json();
  // setShip(ship);
  // setIsLoading(false);
  return ship;
};
