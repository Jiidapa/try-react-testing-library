import React from 'react'
import { render, getByLabelText, fireEvent } from '@testing-library/react'
import App from './App'

// Null
const empty = ''

//[8-6 characters]
//success data
const lengthData = 'mypassword'
//error data
const lengthData2 = 'mypwd'

//[At least 1 capital letter]
//success data
const capitalLetter = 'Mypassword'
//error data
const capitalLetter2 = lengthData

//[At least 1 number]
//success data
const oneNumber = 'Mypassword1'
//error data
const oneNumber2 = capitalLetter

//[No Space]
//success data
const noSpace = oneNumber
//error data
const noSpace2 = 'My password2'

const success = `#5BD2A7`
const danger = `#ff8989`
const defaultColor = `#8e8e8e`

const data = ['8-16 Characters.', 'At least 1 capital latter.', 'At least 1 number.', 'No space.']

test('default', () => {
  const { getByText } = render(<App />)
  expect(getByText(data[0])).toHaveStyle(`color: ${defaultColor};`)
  expect(getByText(data[1])).toHaveStyle(`color: ${defaultColor};`)
  expect(getByText(data[2])).toHaveStyle(`color: ${defaultColor};`)
  expect(getByText(data[3])).toHaveStyle(`color: ${defaultColor};`)
})

test('[8-16 Characters] fail case', () => {
  const { container, getByText } = render(<App />)
  const passwordInput = getByLabelText(container, 'Password')
  fireEvent.change(passwordInput, { target: { value: lengthData2 } })

  expect(getByText(data[0])).toBeInTheDocument()
  expect(getByText(data[0])).toHaveStyle(`color: ${danger};`)
})

test('[At least 1 capital latter] success case', () => {
  const { container, getByText } = render(<App />)
  const passwordInput = getByLabelText(container, 'Password')
  fireEvent.change(passwordInput, { target: { value: capitalLetter } })

  expect(getByText(data[1])).toBeInTheDocument()
  expect(getByText(data[1])).toHaveStyle(`color: ${success};`)
})

test('[At least 1 capital latter] faile case', () => {
  const { container, getByText } = render(<App />)
  const passwordInput = getByLabelText(container, 'Password')
  fireEvent.change(passwordInput, { target: { value: capitalLetter2 } })

  expect(getByText(data[1])).toBeInTheDocument()
  expect(getByText(data[1])).toHaveStyle(`color: ${danger};`)
})

test('[At least 1 number] success case', () => {
  const { container, getByText } = render(<App />)
  const passwordInput = getByLabelText(container, 'Password')
  fireEvent.change(passwordInput, { target: { value: oneNumber } })

  expect(getByText(data[2])).toBeInTheDocument()
  expect(getByText(data[2])).toHaveStyle(`color: ${success};`)
})

test('[At least 1 number] fail case', () => {
  const { container, getByText } = render(<App />)
  const passwordInput = getByLabelText(container, 'Password')
  fireEvent.change(passwordInput, { target: { value: oneNumber2 } })

  expect(getByText(data[2])).toBeInTheDocument()
  expect(getByText(data[2])).toHaveStyle(`color: ${danger};`)
})

test('[No space] success case', () => {
  const { container, getByText } = render(<App />)
  const passwordInput = getByLabelText(container, 'Password')
  fireEvent.change(passwordInput, { target: { value: noSpace } })

  expect(getByText(data[3])).toBeInTheDocument()
  expect(getByText(data[3])).toHaveStyle(`color: ${success};`)
})

test('[No space] faile case', () => {
  const { container, getByText } = render(<App />)
  const passwordInput = getByLabelText(container, 'Password')
  fireEvent.change(passwordInput, { target: { value: noSpace2 } })

  expect(getByText(data[3])).toBeInTheDocument()
  expect(getByText(data[3])).toHaveStyle(`color: ${danger};`)
})

test('Remove input case', async () => {
  const { container, findByText, getByText } = render(<App />)
  const passwordInput = getByLabelText(container, 'Password')
  fireEvent.change(passwordInput, { target: { value: capitalLetter2 } })
  fireEvent.change(passwordInput, { target: { value: empty } })

  expect(await findByText(/This field is required./i)).toBeInTheDocument()
  expect(getByText(data[0])).toHaveStyle(`color: ${defaultColor};`)
  expect(getByText(data[1])).toHaveStyle(`color: ${defaultColor};`)
  expect(getByText(data[2])).toHaveStyle(`color: ${defaultColor};`)
  expect(getByText(data[3])).toHaveStyle(`color: ${defaultColor};`)
})
