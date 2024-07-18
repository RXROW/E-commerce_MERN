 
import {
  Container,
  Box,
  Typography,
  Button,
  Card,
  CardContent,
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useNavigate } from 'react-router-dom';

const OrderSuccess = () => {
  const navigate = useNavigate();

  const handleContinueShopping = () => {
    navigate('/');
  };

  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '80vh',
          textAlign: 'center',
        }}
      >
        <Card sx={{ maxWidth: 600, padding: 4 }}>
          <CheckCircleOutlineIcon
            sx={{ fontSize: 100, color: 'green', marginBottom: 3 }}
          />
          <CardContent>
            <Typography variant="h4" gutterBottom>
              Order Placed Successfully!
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 3 }}>
              Thank you for your purchase. Your order has been placed successfully and is being processed. You will receive an email confirmation shortly.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleContinueShopping}
              sx={{ marginRight: 2 }}
            >
              Continue Shopping
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => navigate('/orders')}
            >
              View Orders
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}

export default OrderSuccess;
