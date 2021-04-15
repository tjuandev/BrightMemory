import { createContext, useState } from "react";

export const ModalContext = createContext({});

export const ModalContextProvider = ({ children }) => {
  const [isCreateDeckModalOpen, setIsCreateDeckModalOpen] = useState(false);
  const [isDeckModalOpen, setIsDeckModalOpen] = useState(false);
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const [isCreateCardModalOpen, setIsCreateCardModalOpen] = useState(false);

  const [currentDeckActive, setCurrentDeckActive] = useState({});

  function activateModal(
    modal,
    name = "",
    description = "",
    id = "",
    reviewInfo = {}
  ) {
    if (modal === "CreateDeckModal") {
      setIsCreateDeckModalOpen(true);
    } else if (modal === "DeckModal") {
      setIsDeckModalOpen(true);
      setCurrentDeckActive({ name, description, id, reviewInfo }); // FIXME Posso dar um fetch decks só quando eu clicar!
    } else if (modal === "CardModal") {
      setIsCardModalOpen(true);
    } else if (modal === "CreateCardModal") {
      setIsCreateCardModalOpen(true);
    }
  }

  function deactivateModal(modal) {
    if (modal === "CreateDeckModal") {
      setIsCreateDeckModalOpen(false);
    } else if (modal === "DeckModal") {
      setIsDeckModalOpen(false);
    } else if (modal === "CardModal") {
      setIsCardModalOpen(false);
    } else if (modal === "CreateCardModal") {
      setIsCreateCardModalOpen(false);
    }
  }

  return (
    <ModalContext.Provider
      value={{
        isCardModalOpen,
        isDeckModalOpen,
        isCreateDeckModalOpen,
        isCreateCardModalOpen,
        currentDeckActive,
        activateModal,
        deactivateModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
