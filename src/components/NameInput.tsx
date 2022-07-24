import React from 'react'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import { Button } from 'react-bootstrap'
import styled from 'styled-components'

const ErrorMessage = styled.p`
  color: red;
`

const StyledButton = styled(Button)`
  width: 100%;
  background-color: #c4b400;
  border-color: black;
`

const NameInput: React.FC<{
  onSubmit: () => void
  setUsername: React.Dispatch<React.SetStateAction<string>>
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>
  errorMessage: string
}> = ({ onSubmit, setUsername, setErrorMessage, errorMessage }) => {
  return (
    <>
      <InputGroup onSubmit={onSubmit} className='mb-3'>
        <InputGroup.Text id='basic-addon1'>@</InputGroup.Text>
        <Form.Control
          onKeyDown={(e: any) => (e.keyCode === 13 ? onSubmit() : null)}
          onChange={(e: any) => {
            setUsername(e.target.value)
            setErrorMessage('')
          }}
          required
          placeholder='Username'
          aria-label='Username'
          aria-describedby='basic-addon1'
        />
      </InputGroup>
      <ErrorMessage>{errorMessage}</ErrorMessage>
      <StyledButton onClick={onSubmit}>Connect</StyledButton>
    </>
  )
}

export default NameInput
