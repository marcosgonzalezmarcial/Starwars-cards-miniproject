// const sortObjItems = (objArray) = {
//   const sortedItems = bjArray.sort(function(a, b) {
//     var textA = a.DepartmentName.toUpperCase();
//     var textB = b.DepartmentName.toUpperCase();
//     return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
//   })
//   return 
// }

export const sortObjItems = (objArray) => objArray.sort(function(a, b) {
  const textA = a.name.toUpperCase();
  const textB = b.name.toUpperCase();
  return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
});

