import {
  createContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";

export const UsersContext = createContext(null);

export const UsersContextProvider = ({ children }) => {
  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem("users")) || []
  );

  const [loggedIn, setLoggedIn] = useState(
    JSON.parse(localStorage.getItem("loggedIn")) || false
  );

  const isUserRegistered = useCallback(
    ({ user }) => {
      const checkUser = users.some(
        (registeredUser) =>
          user.email === registeredUser.email &&
          user.password === registeredUser.password
      );
      return checkUser;
    },
    [users]
  );
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("loggedIn", JSON.stringify(loggedIn));
  }, [users, loggedIn]);

  // momoized value to avoid re renders
  const value = useMemo(
    () => ({ users, setUsers, loggedIn, setLoggedIn, isUserRegistered }),
    [loggedIn, users, isUserRegistered]
  );

  return (
    <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
  );
};
