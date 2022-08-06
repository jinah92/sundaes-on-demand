import { fireEvent, render, screen } from '@testing-library/react'
import SummaryForm from '../SummaryForm'

test('Initial conditions', () => {
  render(<SummaryForm />)
  const checkbox = screen.getByRole('checkbox', { name: /terms and conditions/i })

  expect(checkbox).not.toBeChecked()

  const confirmBtn = screen.getByRole('button', { name: /confirm order/i })
  expect(confirmBtn).toBeDisabled()
})

test('Checkbox enables button on first click and disables on second click', () => {
  render(<SummaryForm />)
  const checkbox = screen.getByRole('checkbox', { name: /terms and conditions/i })
  const confirmBtn = screen.getByRole('button', { name: /confirm order/i })

  fireEvent.click(checkbox)
  expect(confirmBtn).toBeEnabled()

  fireEvent.click(checkbox)
  expect(confirmBtn).toBeDisabled()
})
