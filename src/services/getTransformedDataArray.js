import { transformDataArray } from "../utils/transformDataArray";
import { fetchDataByTypeAndPage } from "./fetchDataByTypeAndPage";

export const getTransformedDataArray = async ({ page, typeOfData }) => {
  // console.log("transform");
  try {
    const { results: fetchedData, next } = await fetchDataByTypeAndPage({
      page,
    });
    const transformedDataArray = transformDataArray({
      fetchedData,
      typeOfData,
    });
    return { transformedDataArray, next };
  } catch (error) {
    console.log(error);
    return null;
  }
};
