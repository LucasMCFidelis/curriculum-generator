import { createContext, useEffect, useState, type ReactNode } from "react";

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextType {
  currentUser: string | null;
  loginUser: () => void;
  logoutUser: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState(() => {
    return localStorage.getItem("currentUser") || null;
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", currentUser);
    }
  }, [currentUser]);

  const loginUser = async () => {
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
