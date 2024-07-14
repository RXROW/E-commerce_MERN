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
  if (product.stock < quantity) {
    return { data: "Low Stock For Item ! ", statusCode: 400 };
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

  return { data: updatedCart, statusCode: 201 };
};

// Update Item In Cart
interface UpdateItemInCart {
  productId: string;
  quantity: number;
  userId: string;
}

export const updateItemInCart = async ({
  userId,
  productId,
  quantity,
}: UpdateItemInCart) => {
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
  if (!existInCart) {
    return { data: "Item does not  exists in Cart!", statusCode: 404 };
  }

  const product = (await productModel.findById(productId)) as IProduct;
  if (!product) {
    return { data: "Product Not Found!", statusCode: 404 };
  }
  // handel Stock
  if (product.stock < quantity) {
    return { data: "Low Stock For Item ! ", statusCode: 400 };
  }

  const otheCartItems = cart.items.filter((p) => {
    p.product.toString() !== productId;
  });

  console.log(otheCartItems);
  let total = otheCartItems.reduce((sum, product) => {
    sum += product.quantity * product.unitPrice;
    return sum;
  }, 0);
  
  existInCart.quantity = quantity;
  total = existInCart.quantity * existInCart.unitPrice;
  cart.totalAmount = total;
  const updatedCart = await cart.save();

  return { data: updatedCart, statusCode: 201 };
};
