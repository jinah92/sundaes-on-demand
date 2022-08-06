import { queryByText, render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react'
import SummaryForm from '../SummaryForm'
import userEvent from '@testing-library/user-event'

test('Initial conditions', () => {
  render(<SummaryForm />)
  const checkbox = screen.getByRole('checkbox', { name: /terms and conditions/i })

  expect(checkbox).not.toBeChecked()

  const confirmBtn = screen.getByRole('button', { name: /confirm order/i })
  expect(confirmBtn).toBeDisabled()
})

test('Checkbox enables button on first click and disables on second click', async () => {
  render(<SummaryForm />)
  const checkbox = screen.getByRole('checkbox', { name: /terms and conditions/i })
  const confirmBtn = screen.getByRole('button', { name: /confirm order/i })

  userEvent.click(checkbox)
  await waitFor(() => {
    expect(confirmBtn).toBeEnabled()
  })

  userEvent.click(checkbox)
  await waitFor(() => {
    expect(confirmBtn).toBeDisabled()
  })
})

test('popover responds to hover', async () => {
  render(<SummaryForm />)

  // popover starts out hidden
  const nullPopover = screen.queryByText(/no ice cream will actually be delivered/i)
  expect(nullPopover).not.toBeInTheDocument()

  // popover appears upon mouseover of checkbox label
  const termsAndConditions = screen.getByText(/terms and conditions/i)
  userEvent.hover(termsAndConditions)
  await waitFor(() => {
    const popover = screen.getByText(/no ice cream will actually be delivered/i)
    expect(popover).toBeInTheDocument()
  })

  // popover disappears when we mouse out
  userEvent.unhover(termsAndConditions)
  const nullPopoverAgain = screen.queryByText(/no ice cream will actually be delivered/i)
  await waitForElementToBeRemoved(nullPopoverAgain)
})
