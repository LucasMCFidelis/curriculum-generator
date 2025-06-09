import type { formLoginDTO } from "@/schemas/formLoginSchema";
import { createContext, useEffect, useState, type ReactNode } from "react";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { formLoginSchema } from "@/schemas/formLoginSchema";
import { useForm, type UseFormReturn } from "react-hook-form";
import { useModal } from "./ModalContext";

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextType {
  currentUser: object | null;
  loginUser: (data: formLoginDTO) => Promise<void>;
  form: UseFormReturn<{
    userEmail: string;
    userPassword: string;
  }>;
  logoutUser: () => void;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  isLoginLoading: boolean;
  isLoginError: string;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<object | null>(() => {
    try {
      const storedUser = localStorage.getItem("currentUser");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Erro ao fazer parse do usuário salvo:", error);
      localStorage.removeItem("currentUser");
      return null;
    }
  });

  const { openModal, closeModal } = useModal();
  const [isLoginLoading, setIsLoginLoading] = useState<boolean>(false);
  const [isLoginError, setIsLoginError] = useState<string>("");

  const form = useForm<formLoginDTO>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      userEmail: "",
      userPassword: "",
    },
  });

  function openLoginModal() {
    openModal("loginUser");
  }
  function closeLoginModal() {
    form.reset();
    setIsLoginError("");
    closeModal();
  }

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    }
  }, [currentUser]);

  const loginUser = async (data: formLoginDTO) => {
    setIsLoginLoading(true);
    let loginResponse;
    try {
      loginResponse = await axios.post(
        "http://localhost:3333/users/login",
        data
      );
    } catch (error) {
      console.log("erro", error);
      let errorMessage;
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data.message;
        console.log(errorMessage);
      }
      setIsLoginError(errorMessage || "Erro ao realizar Login");
      setCurrentUser(null);
    }

    if (loginResponse) {
      const userData = {
        userToken: loginResponse.data.userToken,
        ...loginResponse.data.userData,
      };
      setCurrentUser(userData);
      closeLoginModal();
    }
    setIsLoginLoading(false);
  };

  const logoutUser = (): void => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        form,
        loginUser,
        logoutUser,
        currentUser,
        openLoginModal,
        closeLoginModal,
        isLoginLoading,
        isLoginError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
