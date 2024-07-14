import productModel from "../models/productModel";

export const getAllProducts = async () => {
  return await productModel.find();
};

export const seedInitialProducts = async () => {
  const products = [
    {
   
      title: "Essence Mascara Lash Princess 1",
 
      price: 1000,
      image: "https://asset.cloudinary.com/dyv3dluov/db640f8eff2a11599f6c9b4ab45d9786",
      stock: 1000,
    },
    {
   
      title: "Essence Mascara Lash Princess 2",
 
      price: 2000,
      image: "https://asset.cloudinary.com/dyv3dluov/db640f8eff2a11599f6c9b4ab45d9786",
      stock: 1000,
    },
    {
   
      title: "Essence Mascara Lash Princess 3",
 
      price: 3000,
      image: "https://asset.cloudinary.com/dyv3dluov/db640f8eff2a11599f6c9b4ab45d9786",
      stock: 1000,
    },
    {
   
      title: "Essence Mascara Lash Princess 4",
 
      price: 4000,
      image: "https://asset.cloudinary.com/dyv3dluov/db640f8eff2a11599f6c9b4ab45d9786",
      stock: 1000,
    },
    {
   
      title: "Essence Mascara Lash Princess 5",
 
      price: 5000,
      image: "https://asset.cloudinary.com/dyv3dluov/db640f8eff2a11599f6c9b4ab45d9786",
      stock: 1000,
    },
    {
   
      title: "Essence Mascara Lash Princess 6",
 
      price: 6000,
      image: "https://asset.cloudinary.com/dyv3dluov/db640f8eff2a11599f6c9b4ab45d9786",
      stock: 1000,
    },
    {
   
      title: "Essence Mascara Lash Princess 7",
 
      price: 7000,
      image: "https://asset.cloudinary.com/dyv3dluov/db640f8eff2a11599f6c9b4ab45d9786",
      stock: 1000,
    },
    {
   
      title: "Essence Mascara Lash Princess 8",
 
      price: 8000,
      image: "https://asset.cloudinary.com/dyv3dluov/db640f8eff2a11599f6c9b4ab45d9786",
      stock: 1000,
    },
   
  ];

  const exisistProduct = await getAllProducts();
  if (exisistProduct.length === 0) {
    await productModel.insertMany(products);
  }
};
