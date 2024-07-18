import userModel from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import orderModel from "../models/orderModel";

interface RegisterParams{
  firstName:string;
  lastName:string;
  email:string;
  password:string;
}

export const register = async ({firstName ,lastName,email,password}:RegisterParams)=>{

  const  findUser = await userModel.findOne({email })
  if(findUser){
    return {  data : "User already exist ! " , statusCode:400}
  }
 
const hashPassword = await bcrypt.hash(password , 10)

  const newUser = new userModel({firstName ,lastName,email,password:hashPassword})
  await newUser.save()
  return { data:genrateJWT( {firstName ,lastName,email}) , statusCode:200}
}


interface LoginParams{
 
  email:string;
  password:string;
}


export const login = async ({email,password}:LoginParams)=>{

  const findUser = await userModel.findOne({email })
  if(!findUser){
    return {  data : " Incorrect email or password ! " , statusCode:400}
 
  }
 
 const passwordMatch = await bcrypt.compare(password , findUser.password)
 if(passwordMatch){
  return {  data  :  genrateJWT( {firstName:findUser.firstName ,lastName:findUser.lastName,email})  , statusCode:200}
}

return {  data : " Incorrect email or password ! " , statusCode:400}

}






interface GetMyOrdersParams {
  userId: string;
}

export const getMyOrders = async ({ userId }: GetMyOrdersParams) => {
  try {
    // Fetch user by userId
    const findUser = await userModel.findById(userId);
    if (!findUser) {
      return { data: "User not found", statusCode: 400 };
    }

    // Fetch orders by userId
    const orders = await orderModel.find({ userId });

    return { data: orders, statusCode: 200 };
  } catch (error) {
    return { data: "An error occurred while fetching orders", statusCode: 500 };
  }
};
const genrateJWT = (data : any)=>{
return jwt.sign(data ,process.env.JWT_SECRIT || ""  );
}

