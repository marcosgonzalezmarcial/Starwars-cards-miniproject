// regex to validate search term no special characters but -
export const validateSearchTerm = ({ searchTerm }) => {
  const inputValidationRegex = /^[a-zA-Z0-9-]*$/;
  return inputValidationRegex.test(searchTerm.trim());
};
