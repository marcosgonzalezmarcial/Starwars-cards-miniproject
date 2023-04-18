export async function fetchListOfDataFromUrlsArr({ listOfUrls, signal }) {
  try {
    const filmsPromises = listOfUrls?.map((url) =>
      fetch(url, { signal }).then((result) => result.json())
    );
    // return the full list of items when all promises are resolved
    return filmsPromises ? Promise.all(filmsPromises) : [];
  } catch (error) {
    console.log(error);
  }
}
