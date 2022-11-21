import filmsArr from '../utils/mocked-data/filmsMappedData'

export const transformFilmsArray = (newFilms) => {
  const transformedFilmsArray = newFilms.map((filmFromNewFilms) => {
    const [filteredFilm] = filmsArr.filter(
      (item) => item.name === filmFromNewFilms.name
    )
    return { ...filmFromNewFilms, ...filteredFilm }
  })

  return transformedFilmsArray
}
