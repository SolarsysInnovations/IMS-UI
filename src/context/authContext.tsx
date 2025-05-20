import { ReactElement, createContext, useContext, useMemo } from 'react';
import { selectCurrentToken } from '../redux-store/auth/authSlice';
import { useSelector } from 'react-redux';

interface AuthContextType {
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({ isAuthenticated: false });

interface AuthContextProviderProps {
  children: ReactElement;
}

export const AuthProvider = ({ children }: AuthContextProviderProps) => {
  let token = useSelector(selectCurrentToken);
  const isAuthenticated = !!token;

  const contextValue = useMemo(() => ({ isAuthenticated }), [isAuthenticated]);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
