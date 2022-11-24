import peopleMappedData from '../utils/mocked-data/peopleMappedData'

export const transformPeopleArray = (newPeople) => {
  const modifiedPeoplesArr = newPeople.map((personFromNewPeople) => {
    const [filteredPerson] = peopleMappedData.filter(
      (item) => item.name === personFromNewPeople.name
    )
    return { ...personFromNewPeople, ...filteredPerson }
  })

  return modifiedPeoplesArr
}
