import { createContext, useContext,   } from 'react';

interface AuthContextType {
  username: string | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (username: string, token: string) => void;
  logout:()=>void;
}

// Create AuthContext with default values that match the interface
export const AuthContext = createContext<AuthContextType>({
  username: null,
  token: null,
  login: () => {},
  logout:()=>{},
  isAuthenticated: false,
});

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};