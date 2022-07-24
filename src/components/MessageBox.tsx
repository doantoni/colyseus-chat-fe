import React from 'react'
import styled from 'styled-components'
import { InputGroup, Form, Button } from 'react-bootstrap'
import Message from './Message'
import TypingMessage from './TypingMessage'
import { MessageType } from '../interfaces/messages'
import Frame from '../assets/Frame.png'
import Bananas from '../assets/Bananas.png'

const MessageBoxImage = styled.div`
background-image: url(${Bananas});
background-size contain;
background-position: center;
background-repeat: no-repeat;
`

const MessageBoxContainer = styled.div`
  height: 80vh;
  border-radius: 0.375rem;
`

const MessagesContainer = styled.div`
  height: 80vh;
  overflow-y: scroll;
  display: flex;
  flex-direction: column-reverse;
`

const MessageBox: React.FC<{
  username: string
  room: any
  typing: MessageType
  setCurrentMessage: React.Dispatch<React.SetStateAction<string>>
  currentMessage: string
  messages: any[]
}> = ({ username, room, typing, setCurrentMessage, currentMessage, messages }) => {
  const sendMessage = () => {
    if (currentMessage.length !== 0) {
      room.send('chat', currentMessage)
      room.send('typing', '')
      setCurrentMessage('')
    }
  }
  return (
    <MessageBoxImage>
      <MessageBoxContainer>
        <MessagesContainer>
          {messages.map(
            (message, i) =>
              message && (
                <Message username={username} key={`${message.message}&${i}`} message={message} />
              ),
          )}
        </MessagesContainer>
        {typing && typing.message.length !== 0 && typing.user !== username && (
          <TypingMessage username={username} typing={typing} />
        )}
        {typing && typing.message.length !== 0 && (
          <Message username={username} typing={true} message={typing} />
        )}
        <InputGroup>
          <Form.Control
            onKeyDown={(e: any) => (e.keyCode === 13 ? sendMessage() : null)}
            onChange={(e: any) => {
              console.log(e)
              room.send('typing', e.target.value)
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
      </MessageBoxContainer>
    </MessageBoxImage>
  )
}

export default MessageBox
