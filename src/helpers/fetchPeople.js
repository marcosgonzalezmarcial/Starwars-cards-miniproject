import axios from 'axios'

const fetchPeople = async (page) => {
  const apiUrl = `https://swapi.dev/api/people/?page=${page}`
  const people = await axios.get(apiUrl).then((result) => result.data)
  return people.results
}

export { fetchPeople }
