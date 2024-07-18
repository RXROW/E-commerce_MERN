import React, { PropsWithChildren, useState } from 'react';
import { CartContext, CartItem } from './CartContext';
import { useAuth } from '../auth/AuthContext';

const CartProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const { token } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const addItemToCart = async (productId: string) => {
    try {
      const response = await fetch("http://localhost:3001/cart/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          productId,
          quantity: 1,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add to cart");
      }

      const cart = await response.json();
      if (!cart) {
        throw new Error("Failed to parse cart");
      }

      const cartItemsMapped: CartItem[] = cart.items.map(({ product, quantity }: any) => ({
        productId: product._id,
        title: product.title,
        image: product.image,
        quantity,
        unitPrice: product.unitPrice,
      }));

      setCartItems(cartItemsMapped);
      setTotalAmount(cart.totalAmount);
      setError(null);
    } catch (error: any) {
      console.log(error);
      setError(error.message || "An error occurred");
    }
  };

  const fetchCart = async () => {
    try {
      const response = await fetch('http://localhost:3001/cart', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch cart');
      }

      const cart = await response.json();
      if (!cart) {
        throw new Error('Failed to parse cart');
      }

      const cartItemsMapped: CartItem[] = cart.items.map(({ product, quantity }: any) => ({
        productId: product._id,
        title: product.title,
        image: product.image,
        quantity,
        unitPrice: product.unitPrice,
      }));

      setCartItems(cartItemsMapped);
      setTotalAmount(cart.totalAmount);
      setError(null);
    } catch (error: any) {
      console.log(error);
      setError(error.message || "An error occurred");
    }
  };

 
  return (
    <CartContext.Provider value={{ cartItems, totalAmount, addItemToCart ,setCartItems ,setTotalAmount  }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
