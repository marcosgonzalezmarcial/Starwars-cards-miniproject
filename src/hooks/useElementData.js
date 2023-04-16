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

export const useElementData = ({ elementNameFromUrl, typeOfData }) => {
  const [loading, setIsLoading] = useState(false);
  const [elementData, setElementData] = useState({});

  useEffect(() => {
    let myAbortController = new AbortController();
    const signal = myAbortController.signal;

    setIsLoading(true);

    const elementName = urlStringify(elementNameFromUrl);

    let item;

    switch (typeOfData) {
      case TYPE_OF_DATA.STARSHIPS:
        item = starshipsMockedData.find((ship) => ship.name === elementName);
        fetchItemByTypeAndId({
          id: item.id,
          typeOfData,
          signal,
        })
          .then((item) => {
            const [transformedElementData] = transformDataArray({
              // fetched data must be an array for implementation requirements
              fetchedData: [item],
              typeOfData,
            });
            setElementData((el) => ({ ...el, ...transformedElementData }));
          })
          .catch(console.log)
          .finally(() => setIsLoading(false));
        break;

      case TYPE_OF_DATA.PLANETS:
        item = planetsMockedData.find((planet) => planet.name === elementName);
        fetchItemByTypeAndId({
          id: item.id,
          typeOfData,
          signal,
        })
          .then((item) => {
            const [transformedElementData] = transformDataArray({
              // fetched data must be an array for implementation requirements
              fetchedData: [item],
              typeOfData,
            });
            setElementData((el) => ({ ...el, ...transformedElementData }));
          })
          .catch(console.log)
          .finally(() => setIsLoading(false));
        break;

      case TYPE_OF_DATA.FILMS:
        item = filmsMockedData.find((film) => film.title === elementName);
        fetchItemByTypeAndId({
          id: item.id,
          typeOfData,
          signal,
        })
          .then((item) => {
            const [transformedElementData] = transformDataArray({
              // fetched data must be an array for implementation requirements
              fetchedData: [item],
              typeOfData,
            });
            setElementData((el) => ({ ...el, ...transformedElementData }));
          })
          .catch(console.log)
          .finally(() => setIsLoading(false));
        break;

      case TYPE_OF_DATA.PEOPLE:
        item = peopleMockedData.find(
          (character) => character.name === elementName
        );

        fetchItemByTypeAndId({
          id: item.id,
          typeOfData,
          signal,
        })
          .then((item) => {
            const [transformedElementData] = transformDataArray({
              // fetched data must be an array for implementation requirements
              fetchedData: [item],
              typeOfData,
            });
            setElementData((el) => ({ ...el, ...transformedElementData }));
          })
          .catch(console.log)
          .finally(() => setIsLoading(false));
        break;

      default:
        item = null;
    }
    // Abort fetching when component unmounts
    return () => myAbortController.abort();
  }, [elementNameFromUrl, typeOfData]);

  return {
    loading,
    elementData,
  };
};
