import mongoose from "mongoose";
import cartModel, { ICartItem } from "../models/cartModel";
import productModel, { IProduct } from "../models/productModel";
import orderModel, { IOrderItem } from "../models/orderModel";

interface CreateCartForUser {
  userId: string;
}

const createCartForUser = async ({ userId }: CreateCartForUser) => {
  const cart = await cartModel.create({ userId, totalAmount: 0, items: [] });
  await cart.save();
  return cart;
};

interface GetActiveCartForUser {
  userId: string;
  populateProduct?: boolean;
}

export const getActiveCartForUser = async ({
  userId,
  populateProduct = false,
}: GetActiveCartForUser) => {
  let cart;
  if (populateProduct) {
    cart = await cartModel.findOne({ userId, status: "active" }).populate("items.product");
  } else {
    cart = await cartModel.findOne({ userId, status: "active" });
  }

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

  const cart = await getActiveCartForUser({ userId });
  if (!cart) {
    return { data: "Cart Not Found!", statusCode: 404 };
  }

  const existInCart = cart.items.find(
    (p) => p.product.toString() === productId.toString()
  );
  if (existInCart) {
    return { data: "Item already exists in Cart!", statusCode: 400 };
  }

  const product = await productModel.findById(productId) as IProduct;
  if (!product) {
    return { data: "Product Not Found!", statusCode: 404 };
  }

  // Handle Stock
  if (product.stock < quantity) {
    return { data: "Low Stock For Item!", statusCode: 400 };
  }

  const newItem: ICartItem = {
    product: new mongoose.Types.ObjectId(productId),
    unitPrice: product.price,
    quantity,
  };

  cart.items.push(newItem);
  // Update TotalAmount
  cart.totalAmount += product.price * quantity;
  await cart.save();

  const updatedCart = await getActiveCartForUser({ userId, populateProduct: true });
  return { data: updatedCart, statusCode: 201 };
};

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

  const cart = await getActiveCartForUser({ userId });
  if (!cart) {
    return { data: "Cart Not Found!", statusCode: 404 };
  }

  const existInCart = cart.items.find(
    (p) => p.product.toString() === productId.toString()
  );
  if (!existInCart) {
    return { data: "Item does not exist in Cart!", statusCode: 404 };
  }

  const product = await productModel.findById(productId) as IProduct;
  if (!product) {
    return { data: "Product Not Found!", statusCode: 404 };
  }

  // Handle Stock
  if (product.stock < quantity) {
    return { data: "Low Stock For Item!", statusCode: 400 };
  }

  existInCart.quantity = quantity;
  cart.totalAmount = cart.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  await cart.save();

  const updatedCart = await getActiveCartForUser({ userId, populateProduct: true });
  return { data: updatedCart, statusCode: 201 };
};

interface DeleteItemInCart {
  productId: string;
  userId: string;
}

export const deleteItemInCart = async ({
  userId,
  productId,
}: DeleteItemInCart) => {
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return { data: "Invalid Product ID", statusCode: 400 };
  }

  const cart = await getActiveCartForUser({ userId });
  if (!cart) {
    return { data: "Cart Not Found!", statusCode: 404 };
  }

  const existInCart = cart.items.find(
    (p) => p.product.toString() === productId.toString()
  );
  if (!existInCart) {
    return { data: "Item does not exist in Cart!", statusCode: 404 };
  }

  cart.items = cart.items.filter((p) => p.product.toString() !== productId);
  cart.totalAmount = cart.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  await cart.save();

  const updatedCart = await getActiveCartForUser({ userId, populateProduct: true });
  return { data: updatedCart, statusCode: 201 };
};

interface ClearCart {
  userId: string;
}

export const clearCart = async ({ userId }: ClearCart) => {
  const cart = await getActiveCartForUser({ userId });
  cart.items = [];
  cart.totalAmount = 0;
  const updatedCart = await cart.save();

  return { data: updatedCart, statusCode: 200 };
};

interface Checkout {
  userId: string;
  address: string;
}

export const checkout = async ({ userId, address }: Checkout) => {
  if (!address) {
    return { data: "Please Enter Your Address!", statusCode: 400 };
  }

  const cart = await getActiveCartForUser({ userId });
  if (!cart) {
    return { data: "Cart not found!", statusCode: 404 };
  }

  const OrderItemsArr: IOrderItem[] = [];
  for (let item of cart.items) {
    const product = await productModel.findById(item.product);
    if (!product) {
      return { data: "Product Not Found!", statusCode: 404 };
    }

    const orderItem: IOrderItem = {
      productTitle: product.title,
      productImage: product.image,
      unitPrice: item.unitPrice,
      quantity: item.quantity,
    };

    OrderItemsArr.push(orderItem);
  }

  if (OrderItemsArr.length === 0) {
    return { data: "OrderItemsArr is empty after processing cart items!", statusCode: 500 };
  }

  const order = await orderModel.create({
    orderItems: OrderItemsArr,
    userId,
    total: cart.totalAmount,
    address,
  });

  await order.save();

  cart.status = "completed";
  await cart.save();

  return { data: order, statusCode: 200 };
};
