import React, { useEffect, useState } from 'react'
import { useProductContext } from '../context/productContext'

function Cart() {
  const { products, currency, cartItems} = useProductContext()
  const [cartData, setCartData] = useState([])

  useEffect(() => {
    const tempData = []
    for(const items in cartItems) {
      for(const item in cartItems[items]) {
        if(cartItems[items][item]) {
          tempData.push({
            _id:items,
            size: item,
            quantity: cartItems[items][item]
          })
        }
      }
    }
    // console.log("temp data: ", tempData)
    setCartData(tempData)
  }, [cartItems])

  return (
    <div>Cart</div>
  )
}

export default Cart