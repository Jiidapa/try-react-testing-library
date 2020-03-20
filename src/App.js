import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { ReactComponent as Check } from './assets/tick.svg'

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  justify-content: center;
  align-items: center;

  input {
    width: 100%;
    height: 40px;
    border: 1.5px solid ${props => (props.isError ? '#ff8989' : '#beb6de')};
    color: #8e8e8e;
    border-radius: 5px;
    font-size: 0.9rem;
    padding-left: 0.7rem;
    font-weight: 400;
    margin-top: 0.5rem;
    font-family: Roboto;
  }
  input::placeholder {
    color: ${props => (props.isError ? '#ff8989' : '#8e8e8e')};
  }
  label {
    font-weight: 600;
  }
`
const Card = styled.div`
  width: 23rem;
  background: #ffffff;
  border: 3px solid #beb6de;
  box-sizing: border-box;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 3.5rem 3rem;
`
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 0.1rem auto;
  grid-column-gap: 1.5rem;
  grid-row-gap: 0.5rem;
  align-items: center;
  color: #8e8e8e;
`
const FieldLayout = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`
const Detail = styled.div`
  color: #8e8e8e;
  margin-bottom: 0.5rem;
`
const TextColor = styled.div`
  margin-left: 0.5rem;
  color: ${props => {
    let color = ''
    if (props.status === true) {
      color = '#5BD2A7'
    } else if (props.status === false) {
      color = '#ff8989'
    } else {
      color = 'rgba(0,0,0,0.45)'
    }
    return color
  }};
`
const CheckIcon = styled(Check)`
  fill: #8e8e8e;
  width: 15px;
  fill: ${props => {
    let color = ''
    if (props.status === true) {
      color = '#5BD2A7'
    } else if (props.status === false) {
      color = '#ff8989'
    } else {
      color = 'rgba(0,0,0,0.45)'
    }
    return color
  }};
`
const Error = styled.div`
  color: #ff8989;
  font-size: 14px;
  margin-top: 0.3rem;
  margin-bottom: 0.7rem;
  font-weight: 500;
`

function App() {
  const [password, setPassword] = useState()
  const [isError, setError] = useState()
  const [isLength, setLength] = useState()
  const [isCaptial, setCapital] = useState()
  const [isNumber, setNumber] = useState()
  const [isSpace, setSpace] = useState()

  useEffect(() => {
    checkPassword(password)
  })

  const checkPassword = pwd => {
    const capitalLetterRexEx = /[A-Z]/gm
    const numberRegEx = /[0-9]/gm
    const spaceRegEx = /^\S*$/gm

    console.log(pwd)
    if (password) {
      setError(false)
      if (password.length > 7) {
        setLength(true)
      } else {
        setLength(false)
      }
      if (capitalLetterRexEx.test(password)) {
        setCapital(true)
      } else {
        setCapital(false)
      }

      if (numberRegEx.test(password)) {
        setNumber(true)
      } else {
        setNumber(false)
      }

      if (spaceRegEx.test(password)) {
        setSpace(true)
      } else {
        setSpace(false)
      }
    } else if (pwd === '') {
      setError(true)
      setLength()
      setCapital()
      setNumber()
      setSpace()
    } else {
      setError(undefined)
    }
  }
  return (
    <Container isError={isError}>
      <Card>
        <FieldLayout>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Enter Password" onChange={e => setPassword(e.target.value)} />
        </FieldLayout>
        <Error>{isError && <>This field is required.</>}</Error>
        <Detail>Password must include:</Detail>
        <GridContainer>
          <TextColor>
            <CheckIcon status={isLength} />
          </TextColor>
          <TextColor status={isLength}>8-16 Characters.</TextColor>
          <TextColor>
            <CheckIcon status={isCaptial} />
          </TextColor>
          <TextColor status={isCaptial}>At least 1 capital latter.</TextColor>
          <TextColor>
            <CheckIcon status={isNumber} />
          </TextColor>
          <TextColor status={isNumber}>At least 1 number.</TextColor>
          <TextColor>
            <CheckIcon status={isSpace} />
          </TextColor>
          <TextColor status={isSpace}>No space.</TextColor>
        </GridContainer>
      </Card>
    </Container>
  )
}

export default App
