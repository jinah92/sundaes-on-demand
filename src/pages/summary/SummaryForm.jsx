import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const SummaryForm = () => {
  const [disabled, setDisabled] = useState(false)

  const checkboxLabel = (
    <span>
      I agree to <span style={{ color: 'blue' }}>Terms and Conditions</span>
    </span>
  )

  return (
    <Form>
      <Form.Group controlId="terms-and-conditions">
        <Form.Check type="checkbox" checked={disabled} onChange={(e) => setDisabled(e.target.checked)} label={checkboxLabel} />
      </Form.Group>
      <Button variant="primary" type="submit" disabled={!disabled}>
        Confirm order
      </Button>
    </Form>
  )
}

export default SummaryForm
