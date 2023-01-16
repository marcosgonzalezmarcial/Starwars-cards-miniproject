export async function fetchListOfDataFromUrlsArr(filmsUrls = []) {
  const filmsPromises = filmsUrls?.map((url) =>
    fetch(url)
      .then((result) => result.json())
      .catch(console.log)
  );
  return Promise.all(filmsPromises);
}
