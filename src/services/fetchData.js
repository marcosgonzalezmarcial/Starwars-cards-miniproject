export const fetchData = async (url) => {
  const data = await fetch(url)
    .then((result) => result.json())
    .catch(console.log);
  return data;
};
