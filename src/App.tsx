import React, { useState } from 'react'
import styled from 'styled-components'
import { createGlobalStyle } from 'styled-components'
import { Container } from 'react-bootstrap'
import MessageBox from './components/MessageBox'
import * as Colyseus from 'colyseus.js'
import { MessageType } from './interfaces/messages'
import { Row, Col } from 'react-bootstrap'
import NameInput from './components/NameInput'
import Title from './components/Title'
import { keyframes, css } from 'styled-components'

const GlobalStyle = createGlobalStyle`
body {
  font-family: 'Wendy One', sans-serif;
  background-color:  #F7CA05
}
`

const UsersConnected = styled.div<{ windowWidth: number }>`
  display: ${(props) => (props.windowWidth < 750 ? 'flex' : 'block')};
  justify-content: space-between;
`

const Glitch = keyframes`
0% {
  transform: translate(0);
}
20% {
  transform: translate(-2px, 2px);
}
40% {
  transform: translate(-2px, -2px);
}
60% {
  transform: translate(2px, 2px);
}
80% {
  transform: translate(2px, -2px);
}
100% {
  transform: translate(0);
}
`

const complexMixin = css`
  animation: ${Glitch} 1s linear infinite;
`

const UserConnected = styled.h3<{ windowWidth: number; user: string; typing: MessageType }>`
  font-size: 3rem;
  z-index: 999;
  white-space: nowrap;
  overflow: hidden;
  line-height: '5rem';
  text-align: center;
  color: #f7ca05;
  text-shadow: 0 10px 7px rgba(0, 0, 0, 0.4), 0 -0.2rem 1px #fff;
  letter-spacing: -3px;
  ${(props) =>
    props.typing && props.typing.message.length !== 0 && props.typing.user === props.user
      ? complexMixin
      : ''};
`

const StyledContainer = styled(Container)`
  height: 90;
  padding: 5vh 0;
`

const StyledRow = styled(Row)`
  height: 90%;
`

const App: React.FC = () => {
  const [room, setRoom] = useState<any>()
  const [messages, setMessages] = useState<MessageType[]>([])
  const [currentMessage, setCurrentMessage] = useState<string>('')
  const [isConnected, setIsConnected] = useState<boolean>(false)
  const [username, setUsername] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [usersState, setUsersState] = useState<string[]>([])
  const [typing, setTyping] = useState<MessageType>()
  const [windowWidth, setWindowWidth] = useState<number>(window.screen.width)

  const client = new Colyseus.Client(process.env.REACT_APP_BACKEND_COLYSEUS)

  const onSubmit = () => {
    if (username.length === 0) {
      setErrorMessage('Username cannot be empty')
    } else {
      client
        .joinOrCreate('chat', { name: username })
        .then((room: any) => {
          setRoom(room)
          console.log(room.sessionId, 'joined', room.name)
          setIsConnected(true)
          room.onMessage('users', (users: any) => {
            console.log('Users: ', users)
            setUsersState(users)
          })

          room.onMessage('messages', (messages: any) => {
            setMessages(messages.reverse())
            console.log('All messages: ', messages)
          })

          room.onMessage('typing', (message: MessageType) => {
            setTyping(message)
          })
        })
        .catch((e) => {
          setErrorMessage('Unable to join')
          console.log('JOIN ERROR', e)
        })
    }
  }

  return (
    <>
      <GlobalStyle />
      <StyledContainer>
        <StyledRow>
          <Col xs={0} sm={0} md={2} lg={3} xl={4}>
            <UsersConnected windowWidth={windowWidth}>
              {usersState.map((user, i) => (
                <UserConnected key={user + i} user={user} typing={typing} windowWidth={windowWidth}>
                  {user}
                </UserConnected>
              ))}
            </UsersConnected>
          </Col>
          <Col xs={12} sm={12} md={8} lg={6} xl={4}>
            {!isConnected && (
              <>
                <Title windowWidth={windowWidth} setWindowWidth={setWindowWidth} />
                <NameInput
                  onSubmit={onSubmit}
                  setUsername={setUsername}
                  setErrorMessage={setErrorMessage}
                  errorMessage={errorMessage}
                />
              </>
            )}
            {isConnected && (
              <MessageBox
                username={username}
                room={room}
                typing={typing}
                setCurrentMessage={setCurrentMessage}
                currentMessage={currentMessage}
                messages={messages}
              />
            )}
          </Col>
          <Col xs={0} sm={0} md={2} lg={3} xl={4}></Col>
        </StyledRow>
      </StyledContainer>
    </>
  )
}

export default App
