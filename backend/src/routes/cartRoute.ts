import express from "express";
import { addItemToCart, checkout, clearCart, deleteItemInCart, getActiveCartForUser, updateItemInCart } from "../services/cartService";
import validateJWT from "../middelwares/validateJWT";

declare module "express-serve-static-core" {
  interface Request {
    user?: any;
  }
}
const router = express.Router();

router.get("/", validateJWT, async (req, res) => {
  const userId = req.user._id;
  const cart = await getActiveCartForUser({ userId ,populateProduct:true});
  res.status(200).send(cart);
});


// clear cart items 
router.delete("/", validateJWT, async (req, res) => {
  const userId = req.user._id;
  const response = await clearCart({ userId  });
  res.status(response.statusCode).send(response.data);
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

router.delete("/items/:productId", validateJWT, async (req, res) => {
  const userId = req.user._id;
  const {productId } = req.params;
  const response = await deleteItemInCart({ userId , productId });
  res.status(response.statusCode).send(response.data);
});

// checkout
router.post("/checkout", validateJWT, async (req, res) => {
  const userId = req.user._id;
  const {address} = req.body;
  const response = await checkout({ userId ,address });
 res.status(response.statusCode).send(response.data);
});


export default router;
