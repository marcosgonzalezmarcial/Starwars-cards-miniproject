export const getPathname = () => {
  let location = window.location.pathname.slice(1);
  if (location === "characters") {
    location = "people";
  }
  return location;
};
