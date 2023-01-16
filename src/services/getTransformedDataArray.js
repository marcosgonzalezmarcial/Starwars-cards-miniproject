import { transformDataArray } from "../utils/transformDataArray";
import { fetchDataByPage } from "./fetchDataByPage";

export const getTransformedDataArray = async ({ page, typeOfData }) => {
  let newPath = typeOfData;
  if (typeOfData === "characters") {
    newPath = "people";
  }
  try {
    const { results: fetchedData, next } = await fetchDataByPage({
      page,
    });
    const transformedDataArray = transformDataArray({
      fetchedData,
      typeOfData: newPath,
    });
    return { transformedDataArray, next };
  } catch (error) {
    console.log(error);
    return null;
  }
};
