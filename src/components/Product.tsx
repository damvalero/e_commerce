import React from 'react'
import { CartProduct } from '../types';

type Props = {
  item: CartProduct,
  handleAddToCart: (clickedItem: CartProduct) => void
}

const Product: React.FC<Props> = ({item, handleAddToCart}) => {
  return (
    <div>product</div>
  )
}

export default Product;
