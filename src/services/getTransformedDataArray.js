import { transformDataArray } from "../utils/transformDataArray";
import { fetchDataByTypeAndPage } from "./fetchDataByTypeAndPage";

export const getTransformedDataArray = async ({ page, typeOfData }) => {
  try {
    const fetchedData = await fetchDataByTypeAndPage({ page, typeOfData });
    const modifiedDataArray = transformDataArray({ fetchedData, typeOfData });
    return modifiedDataArray;
  } catch (error) {
    console.log(error);
    return null;
  }
};
