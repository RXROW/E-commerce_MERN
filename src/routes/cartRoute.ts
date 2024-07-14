import express from "express";
import { getAcitveCartForUser } from "../services/cartService";
import validateJWT from "../middelwares/validateJWT";
 

declare module 'express-serve-static-core' {
  interface Request {
    user?: any;  
  }
}
const router = express.Router();


  router.get('/' , validateJWT,  async (req , res )=>{
    const userId = req.user._id;
 const cart =await getAcitveCartForUser({userId})
 res.status(200).send(cart);

})

export default router;
