import type { formLoginDTO } from "@/schemas/formLoginSchema";
import { createContext, useEffect, useState, type ReactNode } from "react";

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextType {
  currentUser: string | null;
  loginUser: (data: formLoginDTO) => void;
  logoutUser: () => void;
  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState(() => {
    return localStorage.getItem("currentUser") || null;
  });

  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);

  function openLoginModal() {
    setIsLoginModalOpen(true);
  }
  function closeLoginModal() {
    setIsLoginModalOpen(false);
  }

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", currentUser);
    }
  }, [currentUser]);

  const loginUser = async (data: formLoginDTO) => {
    console.log("Dados enviados:", data);
    setCurrentUser("teste");
  };

  const logoutUser = (): void => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        loginUser,
        logoutUser,
        currentUser,
        isLoginModalOpen,
        openLoginModal,
        closeLoginModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
