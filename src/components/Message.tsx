import React from 'react'
import styled from 'styled-components'

const MessageComponent = styled.div<{ typing?: boolean }>`
  width: fit-content;
  height: fit-content;
  padding: 0.2rem 0.5rem;
  background-color: ${(props) => (props && props.typing ? 'yellow' : 'blue')};
  color: ${(props) => (props && props.typing ? 'black' : 'white')};
  border-radius: 1000px;
`

const Message: React.FC<{ message: string; typing?: boolean }> = ({ message, typing }) => {
  return <MessageComponent typing={typing}>{message}</MessageComponent>
}

export default Message
