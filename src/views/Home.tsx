import React from 'react';
import Grid from '@mui/material/Grid';
import { CartItemType } from '../types';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

interface ListProductsProps {
  items: CartItemType[],
}

const ProductList: React.FC<ListProductsProps> = (props) => {
  console.log(props)
  return (
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} >
      {/* <ul> */}
      {props.items.map(product => {
        return (
          <Card key={product.id} sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="250"
                image={product.image}
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {product.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.description}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        )
      })}
      {/* </ul> */}
    </Grid>
  )
}

export default ProductList;