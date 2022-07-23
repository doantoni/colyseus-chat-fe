import React, { SyntheticEvent } from 'react'
import styled from 'styled-components'
import { InputGroup, Form, Button } from 'react-bootstrap'
import Message from './Message'

const MessageBoxContainer = styled.div`
  width: 50%;
  height: 90%;
  border-radius: 0.375rem;
  background-color: lightgray;
  display: flex;
  flex-direction: column-reverse;
`

const MessageBox: React.FC<{
  room: any
  setCurrentMessage: React.Dispatch<React.SetStateAction<string>>
  currentMessage: string
  messages: any[]
}> = ({ room, setCurrentMessage, currentMessage, messages }) => {
  const sendMessage = () => {
    room.send('chat', currentMessage)
    setCurrentMessage('')
  }
  return (
    <MessageBoxContainer>
      <InputGroup>
        <Form.Control
          onKeyDown={(e: any) => (e.keyCode === 13 ? sendMessage() : null)}
          onChange={(e: any) => {
            console.log(e)
            setCurrentMessage(e.target.value)
          }}
          placeholder='Type your message'
          aria-label='Type your message'
          aria-describedby='basic-addon2'
          value={currentMessage}
        />
        <Button onClick={sendMessage} variant='outline-secondary' id='button-addon2'>
          Send
        </Button>
      </InputGroup>
      {messages.map((message) => (
        <Message key={message.message} message={message.message} />
      ))}
      {currentMessage.length !== 0 && <Message typing={true} message={currentMessage} />}
    </MessageBoxContainer>
  )
}

export default MessageBox
