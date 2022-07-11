import React, { useState } from 'react'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { CartItemType } from '../types'
import CartItem from './CartItem'

type Props = {
  cartItems: CartItemType[];
  addToCart: (clickedItem: CartItemType) => void,
  removeFromCart: (id: number) => void,
  handlePayment: (arg: Array<CartItemType>) => void
}

const Cart: React.FC<Props> = ({ cartItems, addToCart, removeFromCart, handlePayment }) => {
  const totalCalculator = (items: CartItemType[]) => {
    return items.reduce((acum: number, item) => acum + item.amount * item.price, 0)
  }

  const [cvc, setCvc] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>('');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCvc(event.target.value);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (cvc === '837') {
      handlePayment([])
      setCvc('')
      setError(false)
      setErrorText('')
    } else {
      setError(true)
      setErrorText('Error')
    }
  }

  return (
    <div className='cart' >
      <h2 className='color-Title' >Your shopping Cart</h2>
      {cartItems.length === 0 ? <p>No Items in the cart</p> : null}
      {cartItems.map(item => {
        return <CartItem
          key={item.id}
          item={item}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      })}

      {cartItems.length === 0
        ? null
        : (
          <>
            <Typography variant="h5">Total: €{totalCalculator(cartItems).toFixed(2)}</Typography>

            <form id="payment-form" onSubmit={(e) => handleSubmit(e)}>
              <Typography variant="h5">Card</Typography>
              <div className='card-inputs' >
                <TextField
                  id="cNumber" name='cNumber'
                  defaultValue="4005550000000019"
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <div className='card-inputs-second' >
                  <TextField
                    id="date" name='date'
                    defaultValue='04/25'
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <div className='cvc-container'>
                    <TextField
                      id="cvc"
                      label="CVC"
                      helperText={errorText}
                      onChange={handleChange}
                      error={error}
                      value={cvc}
                      type='number'
                    />
                  </div>
                  <Typography variant="body2"><span style={{ color: 'red' }}>*</span>Use CVC code 837 for this dummy card</Typography>
                </div>
              </div>
              <Button type='submit' variant='contained' color='secondary' >Pay</Button>
            </form>
          </>
        )
      }

    </div>
  )
}

export default Cart;
