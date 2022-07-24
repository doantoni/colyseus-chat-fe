import React from 'react'
import styled from 'styled-components'
import { MessageType } from '../interfaces/messages'

const MessageComponent = styled.div<{ username: string; message: MessageType; typing?: boolean }>`
  width: fit-content;
  height: fit-content;
  padding: 0.2rem 0.5rem;
  background-color: ${(props) => (props && props.typing ? 'yellow' : 'blue')};
  color: ${(props) => (props && props.typing ? 'black' : 'white')};
  border-radius: ${(props) =>
    props.message && props.username === props.message.user
      ? '16px 16px 0 16px'
      : '16px 16px 16px 0'};
  margin-left: ${(props) => (props.message && props.username === props.message.user ? 'auto' : 0)};
  margin-top: 2px;
  margin-bottom: 2px;
`

const MessageUser = styled.p`
  font-size: small;
  margin: 0;
  padding: 0;
  font-weight: bold;
  font-style: italic;
`

const MessageText = styled.p`
  margin: 0;
  padding: 0;
`

const Message: React.FC<{ username: string; message: MessageType; typing?: boolean }> = ({
  username,
  message,
  typing,
}) => {
  return (
    <MessageComponent username={username} message={message} typing={typing}>
      <MessageUser>{message?.user}</MessageUser>
      <MessageText>{message?.message}</MessageText>
    </MessageComponent>
  )
}

export default Message
