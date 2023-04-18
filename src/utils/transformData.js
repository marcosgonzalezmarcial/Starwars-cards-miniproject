import {
  filmsMockedData,
  planetsMockedData,
  peopleMockedData,
  starshipsMockedData,
} from "./mocked-data";

const mockedDataMap = {
  films: filmsMockedData,
  planets: planetsMockedData,
  starships: starshipsMockedData,
  people: peopleMockedData,
};

export const transformData = ({ fetchedData = [], typeOfData = "" }) => {
  const resourceTypeMockedData = mockedDataMap[typeOfData];

  const transformedArray = fetchedData.map((itemFetched) => {
    const [filteredItemFromMockedData] = resourceTypeMockedData.filter((item) =>
      item.title
        ? item.title === itemFetched.title
        : item.name === itemFetched.name
    );
    return { ...itemFetched, ...filteredItemFromMockedData };
  });
  return transformedArray;
};
