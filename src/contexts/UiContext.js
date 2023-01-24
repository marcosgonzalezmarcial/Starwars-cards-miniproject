import {
  createContext,
  useState,
  useCallback,
  useMemo,
  useRef,
  useEffect,
} from "react";

// it might be a project-level reusable hook

// const useToggle = (initialState) => {
//   const [isToggled, setIsToggled] = useState(initialState);
//   const isToggledRef = useRef(isToggled);

//   // put [isToggledRef, setIsToggled] into the useCallback's dependencies array
//   // these values never change so the calllback is not going to be ever re-created
//   const toggle = useCallback(
//     () => setIsToggled(!isToggledRef.current),
//     [isToggledRef, setIsToggled]
//   );

//   // keep the value in isToggledRef actual
//   // when isToggled changes, isToggledRef is updated accordingly
//   useEffect(() => {
//     isToggledRef.current = isToggled;
//   }, [isToggled]);

//   return [isToggled, toggle];
// };

const useToggle = (initialState = {}) => {
  const [isToggled, setIsToggled] = useState(initialState);
  const isToggledLoginMenuRef = useRef(isToggled.isToggledLoginMenu);
  const isToggleSearchModaldRef = useRef(isToggled.showSearchModal);

  const toggleLoginMenu = useCallback(
    () =>
      setIsToggled((prev) => {
        return {
          ...prev,
          isToggledLoginMenu: !isToggledLoginMenuRef.current,
        };
      }),
    [isToggledLoginMenuRef, setIsToggled]
  );

  const toggleSearchModal = useCallback(
    () =>
      setIsToggled((prev) => ({
        ...prev,
        showSearchModal: !isToggleSearchModaldRef.current,
      })),
    [isToggleSearchModaldRef, setIsToggled]
  );

  // keep the value in isToggledRef actual
  // when isToggled changes, isToggledRef is updated accordingly
  useEffect(() => {
    isToggledLoginMenuRef.current = isToggled.isToggledLoginMenu;
  }, [isToggled.isToggledLoginMenu]);
  useEffect(() => {
    isToggleSearchModaldRef.current = isToggled.showSearchModal;
  }, [isToggled.showSearchModal]);

  return { isToggled, toggleSearchModal, toggleLoginMenu };
};

///// WORKING

const initialState = {
  isToggledLoginMenu: false,
  showSearchModal: false,
};

const UiContext = createContext(null);

function UiContextProvider({ children }) {
  const { isToggled, toggleSearchModal, toggleLoginMenu } =
    useToggle(initialState);

  console.log(isToggled);

  const value = useMemo(
    () => ({
      toggleMenu: isToggled.isToggledLoginMenu,
      handleToggleMenu: toggleLoginMenu,
      showModal: isToggled.showSearchModal,
      handleToggleModal: toggleSearchModal,
    }),
    [isToggled.isToggledLoginMenu, isToggled.showSearchModal]
  );

  return <UiContext.Provider value={value}>{children}</UiContext.Provider>;
}
// const UiContext = createContext(null);

// function UiContextProvider({ children }) {
//   // const [toggleMenu, setToggleMenu] = useState(false);
//   // const [showModal, setShowModal] = useState(false);
//   // const [isToggled, toggle] = useToggle(false);

//   const [uiState, setUiState] = useState({
//     toggleMenu: false,
//     showModal: false,
//   });

//   console.log("UiContextProvider render");

//   const handleToggleMenu = useCallback(
//     () =>
//       setUiState((uiPrevState) => ({
//         ...uiPrevState,
//         toggleMenu: !uiPrevState.toggleMenu,
//       })),
//     []
//   );
//   const handleToggleModal = useCallback(
//     () =>
//       setUiState((uiPrevState) => ({
//         ...uiPrevState,
//         showModal: !uiPrevState.showModal,
//       })),
//     []
//   );
//   // const handleToggleMenu = useCallback(
//   //   () => setToggleMenu((prev) => !prev),
//   //   []
//   // );
//   // const handleToggleModal = useCallback(
//   //   () => setShowModal((prev) => !prev),
//   //   []
//   // );

//   const value = useMemo(
//     () => ({
//       toggleMenu: uiState.toggleMenu,
//       handleToggleMenu,
//       showModal: uiState.showModal,
//       handleToggleModal,
//     }),
//     [uiState.toggleMenu, uiState.showModal]
//   );

//   return (
//     <UiContext.Provider
//       value={value}
//       // value={{
//       //   toggleMenu,
//       //   handleToggle,
//       //   closeModal,
//       //   showModal,
//       //   handleToggleModal,
//       // }}
//     >
//       {children}
//     </UiContext.Provider>
//   );
// }

export { UiContext, UiContextProvider };
