import { useEffect, useState } from "react";
import { TYPE_OF_DATA } from "../constants";
import {
  starshipsMockedData,
  planetsMockedData,
  filmsMockedData,
  peopleMockedData,
} from "utils/mocked-data";
import { urlStringify } from "utils/urlStringify";
import { fetchItemByTypeAndId } from "services/fetchItemByTypeAndId";
import { transformDataArray } from "utils/transformDataArray";

export const useSingleElementData = ({ paramFromUrl, typeOfData }) => {
  const [loading, setIsLoading] = useState(false);
  const [elementData, setElementData] = useState({});

  useEffect(() => {
    setIsLoading(true);

    const elementNameFromUrl = urlStringify(paramFromUrl);

    let item;

    switch (typeOfData) {
      case TYPE_OF_DATA.STARSHIPS:
        item = starshipsMockedData.find(
          (ship) => ship.name === elementNameFromUrl
        );
        fetchItemByTypeAndId({
          id: item.id,
          typeOfData: TYPE_OF_DATA.STARSHIPS,
        })
          .then((item) => {
            const [transformedElementData] = transformDataArray({
              // fetched data must be an array for implementation requirements
              fetchedData: [item],
              typeOfData: TYPE_OF_DATA.STARSHIPS,
            });
            setElementData((el) => ({ ...el, ...transformedElementData }));
          })
          .catch(console.log)
          .finally(() => setIsLoading(false));
        break;

      case TYPE_OF_DATA.PLANETS:
        item = planetsMockedData.find(
          (planet) => planet.name === elementNameFromUrl
        );
        fetchItemByTypeAndId({ id: item.id, typeOfData: TYPE_OF_DATA.PLANETS })
          .then((item) => {
            const [transformedElementData] = transformDataArray({
              // fetched data must be an array for implementation requirements
              fetchedData: [item],
              typeOfData: TYPE_OF_DATA.PLANETS,
            });
            setElementData((el) => ({ ...el, ...transformedElementData }));
          })
          .catch(console.log)
          .finally(() => setIsLoading(false));
        break;

      case TYPE_OF_DATA.FILMS:
        item = filmsMockedData.find(
          (film) => film.title === elementNameFromUrl
        );
        fetchItemByTypeAndId({ id: item.id, typeOfData: TYPE_OF_DATA.FILMS })
          .then((item) => {
            const [transformedElementData] = transformDataArray({
              // fetched data must be an array for implementation requirements
              fetchedData: [item],
              typeOfData: TYPE_OF_DATA.FILMS,
            });
            setElementData((el) => ({ ...el, ...transformedElementData }));
          })
          .catch(console.log)
          .finally(() => setIsLoading(false));
        break;

      case TYPE_OF_DATA.PEOPLE:
        item = peopleMockedData.find(
          (character) => character.name === elementNameFromUrl
        );

        fetchItemByTypeAndId({ id: item.id, typeOfData: TYPE_OF_DATA.PEOPLE })
          .then((item) => {
            const [transformedElementData] = transformDataArray({
              // fetched data must be an array for implementation requirements
              fetchedData: [item],
              typeOfData: TYPE_OF_DATA.PEOPLE,
            });
            setElementData((el) => ({ ...el, ...transformedElementData }));
          })
          .catch(console.log)
          .finally(() => setIsLoading(false));
        break;

      default:
        item = null;
    }
  }, [paramFromUrl, typeOfData]);

  return {
    loading,
    elementData,
  };
};
