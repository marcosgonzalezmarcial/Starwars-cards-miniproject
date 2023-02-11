export async function fetchListOfDataFromUrlsArr({ listOfUrls = [], signal }) {
  const filmsPromises = listOfUrls?.map((url) =>
    fetch(url, { signal })
      .then((result) => result.json())
      .catch(console.log)
  );
  return Promise.all(filmsPromises);
}
