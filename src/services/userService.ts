import userModel from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

const genrateJWT = (data : any)=>{
return jwt.sign(data ,process.env.JWT_SECRIT || ""  );
}

