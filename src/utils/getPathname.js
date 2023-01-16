export const getPathname = () => {
  let location = window.location.pathname.slice(1).split("/")[0];
  if (location === "characters") {
    location = "people";
  }
  return location;
};
