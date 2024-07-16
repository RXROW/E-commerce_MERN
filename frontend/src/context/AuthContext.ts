import { createContext, useContext } from 'react';

interface AuthContextType {
  username: string | null;
  token: string | null;
  login :(userName :string , token:string) =>void;

}

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
