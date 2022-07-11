import React from 'react'
import Alert from '@mui/material/Alert';

const AlertBlock = () => {
  return (
    <div className='alert-container'>
      <Alert variant="filled" severity="success">
        Congratulations! You complete your purchase.
      </Alert>
    </div>
  )
}

export default AlertBlock;