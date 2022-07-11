import React, { useState, useEffect} from 'react';
import { useQuery } from 'react-query';
import LinearProgress from '@mui/material/LinearProgress';
import './App.css';
import Grid from '@mui/material/Grid';
import Drawer from '@mui/material/Drawer';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';

import Product from './components/Product';
import Cart from './components/Cart';
import AlertBlock from './components/AlertBlock'
import "./App.css"

export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};

const getProducts = async (): Promise<CartItemType[]> =>
  await (await fetch('https://fakestoreapi.com/products')).json();

const App = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    'products',
    getProducts
  );
  const [showAlert, setShowAlert] = useState(false);

  const getTotalItems = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount, 0);

  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems(prev => {
      // 1. Is the item already added in the cart?
      const isItemInCart = prev.find(item => item.id === clickedItem.id);

      if (isItemInCart) {
        return prev.map(item =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }
      // First time the item is added
      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems(prev =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.amount === 1) return ack;
          return [...ack, { ...item, amount: item.amount - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as CartItemType[])
    );
  };

  const handlePayment = (items: CartItemType[]) => {
    setCartItems(items)
    setCartOpen(false)
    setShowAlert(true)
  }
 
  useEffect(() => {
    const timeId = setTimeout(() => {
      // After 5 seconds set the showAlert to false
      setShowAlert(false)
    }, 5000)

    return () => {
      clearTimeout(timeId)
    }
  }, [showAlert]);

  if (isLoading) return <LinearProgress />;
  if (error) return <div>Something went wrong ...</div>;

  return (
    <>
      <div className='navbar' >
        <p>The Short Store</p>
        <div className='cart-Button' >
          <Button id="shopcart" variant="outlined" onClick={() => setCartOpen(true)}>
            <Badge badgeContent={getTotalItems(cartItems)} color='error'>
              <AddShoppingCartIcon />
            </Badge>
          </Button>
        </div>
      </div>
      {showAlert
        ? <AlertBlock />
        : null
      }
      <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart
          cartItems={cartItems}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
          handlePayment={handlePayment}
        />
      </Drawer>
      <div className='margin-grid'>
        <Grid container spacing={2} >
          {data?.map(item => (
            <Grid item key={item.id} xs={12} sm={6} md={4} lg={3} xl={3} >
              <Product item={item} handleAddToCart={handleAddToCart} />
            </Grid>
          ))}
        </Grid>
      </div>
    </>

  );
};

export default App;