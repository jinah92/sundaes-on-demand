import { render, screen } from '../../../test-utils/testing-library-utils'
import userEvent from '@testing-library/user-event'
import Options from '../Options'
import OrderEntry from '../OrderEntry'

test('update scoop subtotal when scoops change', async () => {
  render(<Options optionType="scoops" />)

  // make sure total starts out $0.00
  const scoopsSubtotal = screen.getByText('Scoops total: $', { exact: false })
  expect(scoopsSubtotal).toHaveTextContent('0.00')

  // update vanilla scoops to 1 and check the subtotal
  const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' })
  userEvent.clear(vanillaInput)
  await userEvent.type(vanillaInput, '1')
  expect(scoopsSubtotal).toHaveTextContent('2.00')

  // update chocolate scoops to 2 and check subtotal
  const chocolateInput = await screen.findByRole('spinbutton', { name: 'Chocolate' })
  userEvent.clear(chocolateInput)
  await userEvent.type(chocolateInput, '2')
  expect(scoopsSubtotal).toHaveTextContent('6.00')
})

test('update toppings subtotal when toppings change', async () => {
  render(<Options optionType="toppings" />)

  // make sure total starts out $0.00
  const toppingsSubtotal = screen.getByText('Toppings total: $', { exact: false })
  expect(toppingsSubtotal).toHaveTextContent('0.00')

  // add cherries toppings and check the subtotal
  const cherryCheckbox = await screen.findByRole('checkbox', { name: 'Cherries' })
  await userEvent.click(cherryCheckbox)
  expect(toppingsSubtotal).toHaveTextContent('1.50')

  // add hot fudge toppings and check the subtotal
  const hotFudgeCheckbox = await screen.findByRole('checkbox', { name: 'Hot fudge' })
  await userEvent.click(hotFudgeCheckbox)
  expect(toppingsSubtotal).toHaveTextContent('3.00')

  // remove hot fudge toppings and check the subtotal
  await userEvent.click(hotFudgeCheckbox)
  expect(toppingsSubtotal).toHaveTextContent('1.50')
})

describe('grand total', () => {
  test('grand total starts at $0.00', () => {
    render(<OrderEntry />)
    const grandTotal = screen.getByRole('heading', { name: /grand total: \$/i })
    expect(grandTotal).toHaveTextContent('0.00')
  })
  test('grand total updates properly if scoop is added first', async () => {
    render(<OrderEntry />)
    const grandTotal = screen.getByRole('heading', { name: /grand total: \$/i })

    // update Vanilla scoop and check grand total
    const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' })
    userEvent.clear(vanillaInput)
    await userEvent.type(vanillaInput, '2')
    expect(grandTotal).toHaveTextContent('4.00')

    // update cherries topping and check grand total
    const cherriesCheckbox = await screen.findByRole('checkbox', { name: 'Cherries' })
    await userEvent.click(cherriesCheckbox)
    expect(grandTotal).toHaveTextContent('5.50')
  })
  test('grand total updates properly if topping is added first', async () => {
    render(<OrderEntry />)
    const grandTotal = screen.getByRole('heading', { name: /grand total: \$/i })

    // update cherries topping and check grand total
    const cherriesCheckbox = await screen.findByRole('checkbox', { name: 'Cherries' })
    await userEvent.click(cherriesCheckbox)
    expect(grandTotal).toHaveTextContent('1.50')

    // update Vanilla scoop to 2; and check grand total
    const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' })
    userEvent.clear(vanillaInput)
    await userEvent.type(vanillaInput, '2')
    expect(grandTotal).toHaveTextContent('5.50')
  })
  test('grand total updates properly if them is removed', async () => {
    render(<OrderEntry />)
    // update cherries topping and check grand total
    const cherriesCheckbox = await screen.findByRole('checkbox', { name: 'Cherries' })
    await userEvent.click(cherriesCheckbox)

    // update Vanilla scoop to 2; and check grand total
    const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' })
    userEvent.clear(vanillaInput)
    await userEvent.type(vanillaInput, '2')

    // remove 1 vanilla scoop
    userEvent.clear(vanillaInput)
    await userEvent.type(vanillaInput, '1')

    // check grand total
    const grandTotal = screen.getByRole('heading', { name: /grand total: \$/i })
    expect(grandTotal).toHaveTextContent('3.50')

    // remove cherries and check grand total
    await userEvent.click(cherriesCheckbox)
    expect(grandTotal).toHaveTextContent('2.00')
  })
})
