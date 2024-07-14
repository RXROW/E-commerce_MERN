import productModel from "../models/productModel";

export const getAllProducts = async () => {
  return await productModel.find();
};

export const seedInitialProducts = async () => {
  const products = [
    {
   
      title: "Essence Mascara Lash Princess",
 
      price: 22000,
      image: "https://asset.cloudinary.com/dyv3dluov/db640f8eff2a11599f6c9b4ab45d9786",
      stock: 1000,
    },
   
  ];

  const exisistProduct = await getAllProducts();
  if (exisistProduct.length === 0) {
    await productModel.insertMany(products);
  }
};
