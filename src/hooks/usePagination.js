// import { useEffect, useState } from "react";
// import { TYPE_OF_DATA } from "../constants";
// import { getTransformedDataArray } from "../services/getTransformedDataArray";

// export const usePagination = ({ listOfUrls }) => {
//   // const [loading, setIsLoading] = useState(false);
//   const [data, setData] = useState([]);
//   const [page, setPage] = useState(1);

//   useEffect(() => {
//     getTransformedDataArray({ page, typeOfData: TYPE_OF_DATA.PLANETS })
//       .then((data) => {
//         //checking data is not null

//         data && setData((prev) => [...prev, ...data]);
//         // sorting items may be applied in future iterations
//         // data && setPlanets((prev) => sortObjItems([...prev, ...data]));
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, [page]);

//   return {
//     // loading
//     data,
//   };
// };
