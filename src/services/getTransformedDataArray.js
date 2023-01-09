import { transformDataArray } from "../utils/transformDataArray";
import { fetchDataByType } from "./fetchDataByType";
// import { TYPE_OF_DATA } from '../constants'

export const getTransformedDataArray = async ({ page, typeOfData }) => {
  // const typeOfData = TYPE_OF_DATA.PEOPLE
  try {
    const fetchedData = await fetchDataByType({ page, typeOfData });
    const modifiedDataArray = transformDataArray({ fetchedData, typeOfData });
    return modifiedDataArray;
  } catch (error) {
    console.log(error);
    return null;
  }
};
