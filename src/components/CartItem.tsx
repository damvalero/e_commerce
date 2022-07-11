
import React from 'react'
import { Button } from '@mui/material';

import { CartItemType } from '../types'

type Props = {
    item: CartItemType;
    addToCart: (clickedItem: CartItemType) => void;
    removeFromCart: (id: number) => void;
}

const CartItem: React.FC<Props> = ({ item, addToCart, removeFromCart }) => {
    return (
        <div className='cartItem-container'>
            <div className='wrapper'>
                <h3>{item.title}</h3>
                <div className='price-information'>
                    <p>Price: €{item.price}</p>
                    <p>Acum: €{(item.amount * item.price).toFixed(2)}</p>
                </div>
                <div className='buttons'>
                    <Button
                        size='small'
                        disableElevation
                        variant='contained'
                        onClick={() => removeFromCart(item.id)}
                    >
                        -
                    </Button>
                    <p>{item.amount}</p>
                    <Button
                        size='small'
                        disableElevation
                        variant='contained'
                        onClick={() => addToCart(item)}
                    >
                        +
                    </Button>
                </div>
            </div>

            <img className='img-cart' src={item.image} alt={item.title} />
        </div>
    )
}


export default CartItem;