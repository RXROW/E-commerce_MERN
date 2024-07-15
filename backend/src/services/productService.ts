import productModel from "../models/productModel";

export const getAllProducts = async () => {
  return await productModel.find();
};

export const seedInitialProducts = async () => {
  try {
    
  const products = [
    {
   
      title: "Dell LapTop",
      image: "https://m.media-amazon.com/images/I/71d6k4iQT0L.__AC_SX300_SY300_QL70_ML2_.jpg",
      price: 12000,
      stock: 30,
    },
    {
   
      title: "Asus LapTop",
      image: "https://m.media-amazon.com/images/I/51TkyORDVtL.__AC_SX300_SY300_QL70_ML2_.jpg",
      price: 20000,
      stock: 40,
    },
    {
   
      title: "Hp LapTop",
      image: "https://m.media-amazon.com/images/I/41cB8D8IbZL.__AC_SY300_SX300_QL70_ML2_.jpg",
      price: 7000,
      stock: 90,
    },
     
     
   
  ];
  const exisistProduct = await getAllProducts();
  if (exisistProduct.length === 0) {
    await productModel.insertMany(products);
  }

  } catch (error) {
    console.log( "Can not See Database!!" , error);
  }

};
