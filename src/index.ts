import express  from "express";
import   mongoose from "mongoose";
import userRoute from "./routes/userRoute";

const app =express();
const port = 3001;


app.use(express.json())


mongoose.connect("mongodb://localhost:27017/ecommerce")
.then(()=>console.log("Mongo Connected (^_^) "))
.catch((err)=>console.log("Filed Connection !" , err))



app.use("/users",userRoute)











app.listen(port , ()=>{
  console.log("Server running in http://localhost:3001 ");
})
