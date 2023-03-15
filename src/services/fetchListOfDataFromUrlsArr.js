export async function fetchListOfDataFromUrlsArr({ listOfUrls, signal }) {
  const filmsPromises = listOfUrls?.map((url) =>
    fetch(url, { signal })
      .then((result) => result.json())
      .catch(console.log)
  )
  // return the full list of items whn all promises are resolved
  return Promise.all(filmsPromises)
}
