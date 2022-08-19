import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import { useOrderDetails } from '../../contexts/OrderDetails'
import Button from 'react-bootstrap/Button'

const OrderConfirmation = ({ setOrderPhase }) => {
  const [, , resetOrder] = useOrderDetails()
  const [orderNumber, setOrderNumber] = useState(null)

  useEffect(() => {
    axios
      .post('http://localhost:3030/order')
      .then((res) => setOrderNumber(res.data.orderNumber))
      .catch((err) => {
        // TODO: handle error
      })
  }, [])

  function handleClick() {
    // clear the order details
    resetOrder()

    // send back to order page
    setOrderPhase('inProgress')
  }

  return orderNumber ? (
    <div>
      <h1>Thank You!</h1>
      <p>Your order number is ${orderNumber}</p>
      <p>as per our terms and conditions, nothing will hanppen now</p>
      <Button onClick={handleClick}>Create new order</Button>
    </div>
  ) : (
    <div>Loading</div>
  )
}

export default OrderConfirmation
