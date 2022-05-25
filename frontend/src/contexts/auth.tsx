import { createContext, Dispatch, useContext, useState } from 'react';

export const AuthContext = createContext<{
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<boolean> | null;
}>({
  isAuthenticated: false,
  setIsAuthenticated: null,
});

interface AuthProviderProps {
  children: JSX.Element;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthProvider = () => useContext(AuthContext);
