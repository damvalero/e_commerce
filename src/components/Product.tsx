import React from 'react'
import { CartItemType } from '../types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { CardActionArea } from '@mui/material';

type Props = {
  item: CartItemType,
  handleAddToCart: (clickedItem: CartItemType) => void
}

const Product: React.FC<Props> = ({ item, handleAddToCart }) => {
  return (
    <>
      <Card
        className='card-height card-flex'
        key={item.id}
        elevation={10}
        sx={{
          '&:hover': {
            opacity: [0.9, 0.8, 0.7],
          },
        }}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            height="250"
            image={item.image}
            alt={item.title}
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              {item.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item.description}
            </Typography>
            <Typography variant="body1" >
              €{(item.price).toFixed(2)}
            </Typography>
          </CardContent>
        </CardActionArea>
        <Button variant="contained"
        sx={{
          
          '& .MuiButtonBase-root': {
            borderRadius: '10px',
          }
        }}
          onClick={() => handleAddToCart(item)}
        > Add to Cart</Button>
      </Card>
    </>
  )
}

export default Product;
