export const inputs = [
  {
    id: 1,
    name: "email",
    type: "email",
    placeholder: "email",
    errorMessage: "It should be a valid email address!",
    label: "Email",
    required: true,
  },
  {
    id: 2,
    name: "password",
    type: "password",
    placeholder: "password",
    errorMessage:
      "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character (!@#$%^&*) !",
    label: "Password",
    required: true,
    pattern:
      "^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$",
  },
];
