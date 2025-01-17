import mongoose ,{Schema , Document, ObjectId } from "mongoose";
import { IProduct } from "./productModel";

const cartStatusEnum=["active","completed"]



export interface ICartItem  {
 product: any| ObjectId | IProduct;
 unitPrice:number;
 quantity:number;
}


export interface ICart extends Document{
  userId: ObjectId | string;
  items:ICartItem[];
  totalAmount:number;
  status:"active"|"completed";
 }

 
const cartItemShema= new Schema<ICartItem>({
  product:{type : Schema.Types.ObjectId , ref:"Product" ,required:true},
  quantity:{type :  Number ,required:true , default : 1},
  unitPrice:{type :  Number ,required:true  },

 
}) 

const cartShema= new Schema<ICart>({
  userId:{type : Schema.Types.ObjectId , ref:"User" ,required:true},
  items:[cartItemShema],
  totalAmount:{type :  Number ,required:true  },
  status:{type :  String ,enum:cartStatusEnum ,default :"active"} 

 
}) 


  const cartModel = mongoose.model<ICart>("Cart" ,  cartShema);

export default cartModel;