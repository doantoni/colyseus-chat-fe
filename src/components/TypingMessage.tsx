import React from 'react'
import styled from 'styled-components'
import { IMessage } from '../interfaces/messages'

const TypingMessageBox = styled.p`
  margin: 0;
`

const TypingMessage: React.FC<{ username: string; typing: IMessage }> = ({ username, typing }) => {
  return <TypingMessageBox>{typing.user} typing...</TypingMessageBox>
}

export default TypingMessage
