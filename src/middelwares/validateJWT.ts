import { NextFunction, Request, Response } from "express";
import  jwt  from "jsonwebtoken";
import userModel from "../models/userModel";

interface ExtendsRequest extends Request{
  user?: any;
}

const validateJWT =   (req: ExtendsRequest, res: Response, next: NextFunction) => {
  const authorizationHeader = req.get("authorization");

  if (!authorizationHeader) {
    res.status(403).send("Authorization header was not provided !");
    return;
  }

  const token = authorizationHeader?.split(" ")[1];
  if (!token) {
    res.status(403).send("Bearer Token not found!");
    return;
  }
  jwt.verify(token , process.env.JWT_SECRIT || "" , async( err , payload)=>{
    if(err){
      res.status(403).send("Invalid Token !");
      return;
    }
    if(!payload){
      res.status(403).send("Invalid Token payload!");
      return;
    }

    const userPayload = payload as {email: string , firstName:string , lastName:string };
    // Fetch user from db based on the payload  
    const user = await userModel.findOne({email : userPayload.email}) 
    req.user =user;
    next();
  })
};
export default validateJWT;
