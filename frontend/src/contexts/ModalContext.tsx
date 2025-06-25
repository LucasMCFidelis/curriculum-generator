import { createContext, useState, useContext } from "react";

type ModalType =
  | "profileUser"
  | "loginUser"
  | "cadastreUser"
  | "ConfirmDeleteAccount"
  | "createSkill"
  | "updateSkill"
  | "confirmDeleteSkill"
  | null;

type ModalContextType = {
  currentModal: ModalType;
  openModal: (modal: ModalType) => void;
  closeModal: () => void;
};

const ModalContext = createContext({} as ModalContextType);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [currentModal, setCurrentModal] = useState<ModalType>(null);

  const openModal = (modal: ModalType) => setCurrentModal(modal);
  const closeModal = () => setCurrentModal(null);

  return (
    <ModalContext.Provider value={{ currentModal, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
}

export const useModal = () => useContext(ModalContext);
