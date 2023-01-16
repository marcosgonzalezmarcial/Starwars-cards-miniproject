import { API_URL } from "../constants";
import { getPathname } from "utils/getPathname";

export const fetchDataByPage = async ({ page }) => {
  let typeOfData = getPathname();
  const apiUrl = `${API_URL}/${typeOfData}/?page=${page}`;
  const { results, next } = await fetch(apiUrl)
    .then((result) => result.json())
    .catch((error) => console.log(error));
  return { results, next };
};
