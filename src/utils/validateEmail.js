export const validateEmail = ({ email }) => {
  const emailValidationRegex =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailValidationRegex.test(email.trim());
};
