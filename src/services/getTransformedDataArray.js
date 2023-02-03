import { transformDataArray } from "utils/transformDataArray";
import { fetchDataByPage } from "./fetchDataByPage";
import { getPathname } from "utils/getPathname";

export const getTransformedDataArray = async ({ page, signal }) => {
  const newPath = getPathname();
  try {
    const { results: fetchedData, next } = await fetchDataByPage({
      page, signal
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
