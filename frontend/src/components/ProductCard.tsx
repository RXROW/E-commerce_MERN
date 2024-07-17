import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useCart } from '../context/cart/CartContext';

interface Props {
  _id: string;
  title: string;
  image: string;
  price: number;
}

export default function ProductCard({_id,   title, image, price }: Props) {
  const  {addItemToCart} = useCart()
  return ( 
    <Card sx={{ maxWidth: { xs: '100%', sm: 345 }, mx: 'auto' }}>
      <CardMedia
        sx={{ height: { xs: 200, sm: 240 } }}
        image={image}
        title={title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {price} EGP
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" size="small" onClick={()=>addItemToCart(_id)}>Add To Cart</Button>
      </CardActions>
    </Card>
  );
}
