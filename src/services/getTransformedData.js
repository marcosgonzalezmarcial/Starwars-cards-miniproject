import { transformData } from "utils/transformData";
import { fetchDataByPage } from "./fetchDataByPage";

export const getTransformedData = async ({
  page,
  signal,
  elementType,
}) => {
  try {
    // change query string to apply api's contract
    const resourceType = elementType === "characters" ? "people" : elementType;
    const { results: fetchedData, next } = await fetchDataByPage({
      page,
      signal,
      elementType: resourceType,
    });
    const transformedDataArray = transformData({
      fetchedData,
      typeOfData: resourceType,
    });
    return { transformedDataArray, next };
  } catch (error) {
    console.log(error);
  }
};
