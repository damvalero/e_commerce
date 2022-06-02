import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { CartProduct } from './types';
import CircularProgress from '@mui/material/CircularProgress';
import Home from './views/Home';
import './App.css';

function App() {
  const [products, setProducts] = useState<CartProduct[]>([])
  const [chargingData, setChargingData] = useState(true)

  const getProducts = async () => {
    try {
      const data = await (await fetch('https://fakestoreapi.com/products')).json();
      // const categories = data.map(item => {return item.category});
      console.log(data);
      // console.log("categories", categories)
      setProducts(data)
      setChargingData(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getProducts();
  }, [])

  const getTotalItems = () => null;

  const handleAddToCart = () => null;

  const handleRemoveFromCart = () => null;

  if (chargingData) {
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div className=" page-margin">
      <p>Hellooooo</p>
      <Home items={products} />
    </div>
  );
}

export default App;
