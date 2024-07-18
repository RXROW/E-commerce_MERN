import React, { useState, PropsWithChildren } from 'react';
import { AuthContext } from './AuthContext';

interface OrderItem {
  _id: string;
  address: string;
  total: number;
  orderItems: {
    productTitle: string;
    unitPrice: number;
    quantity: number;
  }[];
}

 
const AuthProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const [username, setUserName] = useState<string | null>(localStorage.getItem("username"));
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [myOrders, setMyOrders] = useState<OrderItem[]>([]);

  const logout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    setUserName(null);
    setToken(null);
  };

  const login = (username: string, token: string) => {
    setUserName(username);
    setToken(token);
    localStorage.setItem("username", username);
    localStorage.setItem("token", token);
  };

  const getMyOrders = async () => {
    if (!token) return;

    try {
      const response = await fetch('http://localhost:3001/users/my-orders', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }

      const data: OrderItem[] = await response.json();
      setMyOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ username, token, myOrders, login, isAuthenticated, logout, getMyOrders }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
