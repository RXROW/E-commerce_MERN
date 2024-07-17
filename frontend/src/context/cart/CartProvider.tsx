import React, {  PropsWithChildren, useState } from 'react';
import { CartContext, CartItems } from './CartContext';
 
const CartProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const [cartItems ,setCartItems]=useState<CartItems[]>([]);
  const [totalAmount ,setTotamAmount]=useState<number>(0);
  const addItemToCart=(productId:string)=>{
console.log(productId);
  } 
 
 
  return (
    <CartContext.Provider value={{cartItems,totalAmount, addItemToCart}}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
