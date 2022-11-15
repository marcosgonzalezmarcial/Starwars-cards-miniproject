// export const fetchCharacters = async (page) => {
//   const apiUrl = `https://swapi.dev/api/people/?page=${page}`
//   const { results } = await fetch(apiUrl)
//     .then((result) => result.json())
//     .catch(console.log)
//   return results
// }

export const fetchCharacters = async (page) => {
  const apiUrl = `https://swapi.dev/api/people/?page=${page}`
  const { results } = await fetch(apiUrl)
    .then((result) => {
      result.json()
      return results
    })
    .catch((error) => {
      console.log(error)
    })
}
