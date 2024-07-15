import mongoose ,{Schema , Document, ObjectId } from "mongoose";

export interface IProduct extends Document{
  _id: ObjectId; // Assuming you're using MongoDB ObjectId
  title:string;
  image:string;
  price:number;
  stock:number;
 }

 
const productShema= new Schema<IProduct>({
  title:{type : String , required:true },
  image:{type : String , required:true },
  price:{type : Number , required:true },
  stock:{type : Number , required:true ,default: 0 } 
}) 

const productModel = mongoose.model<IProduct>("Product" , productShema);

export default productModel;