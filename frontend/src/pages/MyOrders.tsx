import React, { useEffect, useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
  CircularProgress,
} from '@mui/material';
import { useAuth } from '../context/auth/AuthContext';

interface OrderItem {
  productTitle: string;
  unitPrice: number;
  quantity: number;
}

interface Order {
  _id: string;
  address: string;
  total: number;
  orderItems: OrderItem[];
}

const MyOrders: React.FC = () => {
  const { myOrders, getMyOrders } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
    const fetchOrders = async () => {
      try {
   
          await getMyOrders(); // Assuming getMyOrders updates myOrders directly
          setOrders(myOrders); 
 
// Update state with fetched orders
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container>
      <Typography variant="h3" align="center" component="h1" sx={{ mt: 4, mb: 2 }}>
        My Orders
      </Typography>
      <Grid container spacing={4}>
        {orders.map((order) => (
          <Grid item xs={12} sm={6} md={4} key={order._id}>
            <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6">Order ID: {order._id}</Typography>
                <Typography>Address: {order.address}</Typography>
                <Typography>Total: ${order.total}</Typography>
                {order.orderItems.length > 0 && (
                  <Box>
                    <Typography variant="subtitle1" sx={{ mt: 2 }}>Items:</Typography>
                    {order.orderItems.map((item, index) => (
                      <Box key={index} sx={{ mt: 1 }}>
                        <Typography>Product: {item.productTitle}</Typography>
                        <Typography>Price: ${item.unitPrice}</Typography>
                        <Typography>Quantity: {item.quantity}</Typography>
                      </Box>
                    ))}
                  </Box>
                )}
              </CardContent>
              <CardActions>
                {/* Add action buttons here if needed */}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default MyOrders;
