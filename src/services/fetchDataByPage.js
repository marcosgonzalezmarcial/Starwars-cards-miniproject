import { API_URL } from "../constants";

export const fetchDataByPage = async ({ page, signal, elementType }) => {
  const compoundUrl = `${API_URL}/${elementType}/?page=${page}`;
  try {
    const { results, next } = await fetch(compoundUrl, { signal }).then(
      (result) => result.json()
    );
    return { results, next };
  } catch (error) {
    console.log(error);
  }
};
