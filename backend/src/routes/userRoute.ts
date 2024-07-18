import express from "express";
import { getMyOrders, login, register } from "../services/userService";
import validateJWT from "../middelwares/validateJWT";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const {statusCode , data} = await register({ firstName, lastName, email, password });
  res.status(statusCode).json(data);
 
});


router.post("/login", async (req, res) => {
  const {email, password } = req.body;
  const {statusCode , data} = await login({email, password });
  res.status(statusCode).json(data);
 
});

router.get("/my-orders", validateJWT, async (request, response) => {
  try {
    const userId = request?.user?._id;
    const { statusCode, data } = await getMyOrders({ userId });
    response.status(statusCode).send(data);
  } catch (err) {
    response.status(500).send("Something went wrong!");
  }
});


export default router;


