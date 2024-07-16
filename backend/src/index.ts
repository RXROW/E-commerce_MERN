

 
import dotenv  from "dotenv";

import express  from "express";
import   mongoose from "mongoose";
import userRoute from "./routes/userRoute";
import { seedInitialProducts } from "./services/productService";
import productRoute from "./routes/productRoute";
import cartRoute from "./routes/cartRoute";
import cors from "cors";
dotenv.config();

const app =express();
const port = 3001;

app.use(cors());
app.use(express.json())



mongoose.connect(process.env.BD_URL ||"")
.then(()=>console.log("Mongo Connected (^_^) "))
.catch((err)=>console.log("Filed Connection !" , err))


seedInitialProducts();

app.use("/users",userRoute)
app.use("/products",productRoute)
app.use("/cart",cartRoute)
 











app.listen(port , ()=>{
  console.log("Server running in http://localhost:3001 ");
})
