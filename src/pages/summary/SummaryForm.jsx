import { useState } from 'react'

const SummaryForm = () => {
  const [disabled, setDisabled] = useState(true)

  return (
    <div>
      <label>
        <input type={'checkbox'} onChange={() => setDisabled(!disabled)} />
        check
      </label>
      <button disabled={disabled}>confirm order</button>
    </div>
  )
}

export default SummaryForm
