import Container from "@mui/material/Container";
import ProductCard from "../components/ProductCard";
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";

interface Product {
  id: string;
  title: string;
  image: string;
  price: number;
}

const Home = () => {
  const [product, setProduct] = useState<Product[]>([]);
  useEffect(() => {
    fetch("http://localhost:3001/products").then(async (res) => {
      const data = await res.json();
      setProduct(data);
    });
  }, []);

  return (
    <>
      <Container sx={{ mt: 2 }}>
        <Grid container spacing={2}>
          {product.map((p) => (
            <Grid item xs={12} sm={6} md={4} key={p.id}>
              <ProductCard {...p} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Home;
