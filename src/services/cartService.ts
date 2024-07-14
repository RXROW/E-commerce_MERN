import cartModel from "../models/cartModel";

interface CreateCartForUser{
 userId:string;
 
}

const createCartForUser = async ({userId}:CreateCartForUser)=>{
  const cart = await cartModel.create({userId ,totalAmount:0});
  await cart.save();
  return cart;

}


interface GetAcitveCartForUser{
  userId:string;
  
 }
export const getAcitveCartForUser=async({userId }:GetAcitveCartForUser)=>{
let cart =await cartModel.findOne({userId , status:"active"});
if(!cart){
  cart = await createCartForUser({userId});
}
return cart;
}
