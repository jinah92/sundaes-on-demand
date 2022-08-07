import axios from 'axios'
import { useEffect, useState } from 'react'
import Row from 'react-bootstrap/Row'
import ScoopOption from './ScoopOption'

export default function Options({ optionType }) {
  const [items, setItems] = useState([])

  // optionType is 'scoops' or 'toppings'
  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((res) => setItems(res.data))
      .catch((error) => {
        // TODO: Handle error respons
      })
  }, [optionType])

  // TODO: replace 'null' with ToppingOptions when available
  const ItemComponent = optionType === 'scoops' ? ScoopOption : null

  const optionItems = items.map((item) => <ItemComponent key={item.name} {...item} />)

  return <Row>{optionItems}</Row>
}
