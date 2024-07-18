import {
  Container,
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/auth/AuthContext';
import { useCart } from '../context/cart/CartContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const navigate= useNavigate();
  const { token } = useAuth();
  const { cartItems, setCartItems, totalAmount, setTotalAmount } = useCart();
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) {
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
          setError('Network response was not ok');
          return;
        }
        const data = await response.json();
        const items = data.items.map((item: any) => ({
          productId: item.product._id,
          title: item.product.title,
          image: item.product.image,
          price: item.unitPrice,
          quantity: item.quantity,
        }));
        setCartItems(items);
        setTotalAmount(data.totalAmount);
      } catch (err) {
        setError('Network response was error');
      }
    };

    fetchCart();
  }, [token, setCartItems, setTotalAmount]);

  const handleDeleteItem = async (productId: string) => {
    try {
      const response = await fetch(`http://localhost:3001/cart/items/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        setError('Failed to delete item');
        return;
      }
      const updatedCart = await response.json();
      const items = updatedCart.items.map((item: any) => ({
        productId: item.product._id,
        title: item.product.title,
        image: item.product.image,
        price: item.unitPrice,
        quantity: item.quantity,
      }));
      setCartItems(items);
      setTotalAmount(updatedCart.totalAmount);
    } catch (err) {
      setError('Failed to delete item');
    }
  };

  const handleClearCart = async () => {
    try {
      const response = await fetch('http://localhost:3001/cart', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        setError('Failed to clear cart');
        return;
      }
      setCartItems([]);
      setTotalAmount(0);
    } catch (err) {
      setError('Failed to clear cart');
    }
  };

  const handleUpdateQuantity = async (productId: string, quantity: number) => {
    if (quantity <= 0) {
      setError('Quantity must be greater than zero. To remove the item, use the delete option.');
      return;
    }
    try {
      const response = await fetch('http://localhost:3001/cart/items', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId,
          quantity,
        }),
      });
      if (!response.ok) {
        setError('Failed to update quantity');
        return;
      }
      const updatedCart = await response.json();
      const items = updatedCart.items.map((item: any) => ({
        productId: item.product._id,
        title: item.product.title,
        image: item.product.image,
        price: item.unitPrice,
        quantity: item.quantity,
      }));
     
      setCartItems(items);
      setTotalAmount(updatedCart.totalAmount);
    } catch (err) {
      setError('Failed to update quantity');
    }
  };
  const handleHomePage=()=>{
    navigate("/");
  }
  const handleCheckout=()=>{
    navigate("/checkout");
  }

  return (
    <Container>
      <Typography variant="h3" align='center' component="h1" sx={{ mt: 4, mb: 2 }}>
        Cart
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartItems.map((item) => (
              <TableRow key={item.productId}>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <img src={item.image} alt={item.title} style={{ width: 50, height: 50, marginRight: 10 }} />
                    {item.title}
                  </Box>
                </TableCell>
                <TableCell align="right">${item.price}</TableCell>
                <TableCell align="right">
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <IconButton onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)}>
                      <RemoveIcon />
                    </IconButton>
                    {item.quantity}
                    <IconButton onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}>
                      <AddIcon />
                    </IconButton>
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => handleDeleteItem(item.productId)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
        <Button variant="contained" onClick={handleHomePage} color="primary">
          Continue Shopping
        </Button>
        <Typography variant="h6">
          Total: ${totalAmount}
        </Typography>
        <Button variant="contained" onClick={handleCheckout} color="secondary">
          Checkout
        </Button>
        <Button variant="contained" color="error" onClick={handleClearCart}>
          Clear Cart
        </Button>
      </Box>
    </Container>
  );
};

export default Cart;
