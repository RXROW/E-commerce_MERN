import React, { useState, PropsWithChildren } from 'react';
import { AuthContext } from './AuthContext';

const AuthProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const [username, setUserName] = useState<string | null>(localStorage.getItem("username"));
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

  const login = (username: string, token: string) => {
    setUserName(username);
    setToken(token);
    localStorage.setItem("username",JSON.stringify(username))
    localStorage.setItem("token",JSON.stringify(token))
  };
const isAuthenticated =!!token;
  return (
    <AuthContext.Provider value={{ username, token, login ,isAuthenticated}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
