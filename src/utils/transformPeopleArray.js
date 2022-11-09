import peopleJsonArr from '../utils/mocked-data/peopleMappedData'

export const transformPeopleArray = (newPeople) => {
  const modifiedPeoplesArr = newPeople.map((personFromNewPeople) => {
    const auxPeopleArr = [...peopleJsonArr]
    const [filteredPerson] = auxPeopleArr.filter(
      (item) => item.name === personFromNewPeople.name
    )

    return { ...personFromNewPeople, ...filteredPerson }
  })

  return modifiedPeoplesArr
}
