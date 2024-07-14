import mongoose, { ObjectId } from "mongoose";
import cartModel, { ICartItem } from "../models/cartModel";
import productModel, { IProduct } from "../models/productModel";

interface CreateCartForUser {
  userId: string;
}

const createCartForUser = async ({ userId }: CreateCartForUser) => {
  const cart = await cartModel.create({ userId, totalAmount: 0 });
  await cart.save();
  return cart;
};

interface GetAcitveCartForUser {
  userId: string;
}
export const getAcitveCartForUser = async ({
  userId,
}: GetAcitveCartForUser) => {
  let cart = await cartModel.findOne({ userId, status: "active" });
  if (!cart) {
    cart = await createCartForUser({ userId });
  }
  return cart;
};

interface AddItemToCart {
  productId: string;
  quantity: number;
  userId: string;
}

export const addItemToCart = async ({
  userId,
  productId,
  quantity,
}: AddItemToCart) => {
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return { data: "Invalid Product ID", statusCode: 400 };
  }

  const cart = await getAcitveCartForUser({ userId });
  if (!cart) {
    return { data: "Cart Not Found!", statusCode: 404 };
  }

  const existInCart = cart.items.find(
    (p) => p.product.toString() === productId.toString()
  );
  if (existInCart) {
    return { data: "Item already exists in Cart!", statusCode: 400 };
  }

  const product = (await productModel.findById(productId)) as IProduct;
  if (!product) {
    return { data: "Product Not Found!", statusCode: 404 };
  }

  // handel Stock
  if(product.stock < quantity){
    return {data:"Low Stock For Item ! " ,statusCode: 400 }
  }

  const newItem: ICartItem = {
    product: new mongoose.Types.ObjectId(productId),
    unitPrice: product.price,
    quantity,
  };
  cart.items.push(newItem);
  // Update TotalAmount 
  cart.totalAmount += product.price * quantity;

  const updatedCart = await cart.save();

  console.log("Updated Cart:", updatedCart);

  return { data: updatedCart, statusCode: 201 };
};
