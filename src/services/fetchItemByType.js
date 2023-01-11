import { API_URL } from "../constants";

export const fetchItemByType = async ({ id, typeOfData }) => {
  const data = await fetch(`${API_URL}/${typeOfData}/${id}/`);
  const item = await data.json();
  return item;
};
