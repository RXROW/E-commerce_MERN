import { createContext, useContext,   } from 'react';

export interface CartItems{
  productId:string;
  title:string;
  qauntity:string;
  unitprice:number;
  productIamge:string;

}
interface CartContextType {
  cartItems:CartItems[];
  totalAmount:number;
  addItemToCart:(productId:string)=>void;

 
}

// Create AuthContext with default values that match the interface
export const CartContext = createContext<CartContextType>({
 cartItems:[],
 totalAmount:0,
 addItemToCart:()=>{},
});

// Custom hook to use the AuthContext
export const useCart= () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
