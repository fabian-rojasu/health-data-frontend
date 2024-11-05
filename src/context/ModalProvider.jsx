
import { useState, createContext } from "react";

const ModalContext = createContext();

// eslint-disable-next-line react/prop-types
const ModalProvider = ({ children }) => {
  const [modal, setModal] = useState(false);
  const [toast, setToast] = useState(false);

  const handleToast = () => {
    setToast(!toast);
  };


  const handleModal = () => {
    setModal(!modal);
  };



  return (
    <ModalContext.Provider
      value={{
        modal,
        handleModal,
        toast,
        handleToast,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export { ModalProvider };

export default ModalContext;
