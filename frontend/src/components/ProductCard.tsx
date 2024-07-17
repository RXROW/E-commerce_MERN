import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface Props {
  id: string;
  title: string;
  image: string;
  price: number;
}

export default function ProductCard({ id, title, image, price }: Props) {
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
        <Button variant="contained" size="small">Add To Cart</Button>
      </CardActions>
    </Card>
  );
}
