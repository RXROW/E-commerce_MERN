import express from "express";
import { addItemToCart, getAcitveCartForUser, updateItemInCart } from "../services/cartService";
import validateJWT from "../middelwares/validateJWT";

declare module "express-serve-static-core" {
  interface Request {
    user?: any;
  }
}
const router = express.Router();

router.get("/", validateJWT, async (req, res) => {
  const userId = req.user._id;
  const cart = await getAcitveCartForUser({ userId });
  res.status(200).send(cart);
});


router.post("/items", validateJWT, async (req, res) => {
  const userId = req.user._id;
  const {productId ,quantity } = req.body;
  const response = await addItemToCart({ userId ,productId ,quantity });
  res.status(response.statusCode).send(response.data);
});




router.put("/items", validateJWT, async (req, res) => {
  const userId = req.user._id;
  const {productId ,quantity } = req.body;
  const response = await updateItemInCart({ userId ,productId ,quantity });
  res.status(response.statusCode).send(response.data);
});

export default router;
