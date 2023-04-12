// validation criteria
// It must contain at least one lowercase letter.
// It must contain at least one uppercase letter.
// It must contain at least one digit.
// It must contain at least one special character (i.e. one of @, $, !, %, *, ?, or &).
// It must be at least 8 characters long.
export const validatePassword = ({ password }) => {
  const passwordValidationRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordValidationRegex.test(password.trim());
};
