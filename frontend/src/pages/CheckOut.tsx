import {
  Container,
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  TextField,
} from '@mui/material';

import { useRef } from 'react';
import { useCart } from '../context/cart/CartContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth/AuthContext';

const CheckOut = () => {
  const navigate = useNavigate();
  const { cartItems, totalAmount } = useCart();
  const { token } = useAuth();
  const addressRef = useRef<HTMLInputElement>(null);

  const handleHomePage = () => {
    navigate("/");
  }

  const handleCheckout = async () => {
    const address = addressRef.current?.value;

    const response = await fetch('http://localhost:3001/cart/checkout', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        address,
      }),
    });

    if (!response.ok) {
      console.log('Network response was not ok');
      return;
    }

    navigate("/order-success");
  }

  return (
    <Container>
      <Typography variant="h3" align='center' component="h1" sx={{ mt: 4, mb: 2 }}>
        CheckOut
      </Typography>
      <Typography align='left' component="h1" sx={{ fontSize: "22px" }}>
        Add Your Address
      </Typography>
      <TextField
        inputRef={addressRef}
        label="Address"
        fullWidth
        margin="normal"
      />

      <Grid container spacing={4}>
        {cartItems.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.productId}>
            <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <CardMedia
                component="img"
                image={item.image}
                alt={item.title}
                sx={{ height: 200 }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6">{item.title}</Typography>
                <Typography>${item.price}</Typography>
                <Typography>Quantity: {item.quantity}</Typography>
              </CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
                {/* Any additional actions can go here */}
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
        <Button variant="contained" onClick={handleHomePage} color="primary" sx={{ fontSize: '1rem' }}>
          Continue Shopping
        </Button>
        <Typography variant="h4">
          Total: ${totalAmount}
        </Typography>
      </Box>
      <Button onClick={handleCheckout} variant="contained" fullWidth color="secondary" sx={{ fontSize: '1rem', marginY: "30px" }}>
        Pay Now
      </Button>
    </Container>
  );
};

export default CheckOut;
