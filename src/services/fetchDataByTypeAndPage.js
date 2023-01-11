import { API_URL } from "../constants";

export const fetchDataByTypeAndPage = async ({ page, typeOfData }) => {
  const apiUrl = `${API_URL}/${typeOfData}/?page=${page}`;
  const { results } = await fetch(apiUrl)
    .then((result) => result.json())
    .catch((error) => console.log(error));
  return results;
};
