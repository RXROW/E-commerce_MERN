 
import { Container, Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState ,useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
 

const Cart = () => {
  const {token} =useAuth()
  const [cart ,setCart]= useState();
  const [error ,setError]= useState("");


  useEffect(() => {
    if(!token){
      return;
    }
    const fetchCart = async () => {
      try {
        const response = await fetch('http://localhost:3001/cart', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
         setError('Network response was not ok')
        }
        const data = await response.json();
        setCart(data);
      } catch (err) {
        setError('Network response was  error' )
      }
    };

    fetchCart();
  }, [token]);



 

 
 

  console.log({cart});






  const cartItems = [
    { id: 1, name: 'Product 1', price: 10, quantity: 2, image: 'https://via.placeholder.com/50' },
    { id: 2, name: 'Product 2', price: 15, quantity: 1, image: 'https://via.placeholder.com/50' },
    { id: 3, name: 'Product 3', price: 20, quantity: 3, image: 'https://via.placeholder.com/50' },
  ];

  return (
    <Container>
      <Typography variant="h3" align='center' component="h1" sx={{ mt: 4, mb: 2 }}>
        Cart
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Total</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <img src={item.image} alt={item.name} style={{ width: 50, height: 50, marginRight: 10 }} />
                    {item.name}
                  </Box>
                </TableCell>
                <TableCell align="right">${item.price}</TableCell>
                <TableCell align="right">{item.quantity}</TableCell>
                <TableCell align="right">${item.price * item.quantity}</TableCell>
                <TableCell align="center">
                  <IconButton  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
        <Button variant="contained" color="primary">
          Continue Shopping
        </Button>
        <Typography variant="h6">
          Total: $ 22
        </Typography>
        <Button variant="contained" color="secondary">
          Checkout
        </Button>
      </Box>
    </Container>
  );
};

export default Cart;
