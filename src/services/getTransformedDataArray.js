import { transformDataArray } from "../utils/transformDataArray";
import { fetchDataByType } from "./fetchDataByType";

export const getTransformedDataArray = async ({ page, typeOfData }) => {
  try {
    const fetchedData = await fetchDataByType({ page, typeOfData });
    const modifiedDataArray = transformDataArray({ fetchedData, typeOfData });
    return modifiedDataArray;
  } catch (error) {
    console.log(error);
    return null;
  }
};
