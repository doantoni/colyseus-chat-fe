import React, { useState } from 'react'
import styled from 'styled-components'
import { Container, Button } from 'react-bootstrap'
import MessageBox from './components/MessageBox'
import * as Colyseus from 'colyseus.js'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'

const AppContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const ErrorMessage = styled.p`
  color: red;
`

const UsersConnected = styled.div`
  position: absolute;
  left: 0;
  top: 0;
`

const App: React.FC = () => {
  const [room, setRoom] = useState<any>()
  const [messages, setMessages] = useState<string[]>([])
  const [currentMessage, setCurrentMessage] = useState<string>('')
  const [isConnected, setIsConnected] = useState<boolean>(false)
  const [username, setUsername] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [usersState, setUsersState] = useState<string[]>([])

  const client = new Colyseus.Client('ws://localhost:2567')

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
            setUsersState(users)
          })
          room.onMessage('chat', (message: any) => {
            console.log('Message: ', message)
          })

          room.onMessage('messages', (messages: any) => {
            setMessages(messages)
            console.log('All messages: ', messages)
          })
        })
        .catch((e) => {
          setErrorMessage('Unable to join')
          console.log('JOIN ERROR', e)
        })
    }
  }

  return (
    <Container>
      <AppContainer>
        <UsersConnected>
          {usersState.map((user) => (
            <p>{user}</p>
          ))}
        </UsersConnected>
        {!isConnected && (
          <>
            <InputGroup onSubmit={onSubmit} className='mb-3'>
              <InputGroup.Text id='basic-addon1'>@</InputGroup.Text>
              <Form.Control
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
            <Button onClick={onSubmit}>Connect</Button>
          </>
        )}
        {isConnected && (
          <MessageBox
            room={room}
            setCurrentMessage={setCurrentMessage}
            currentMessage={currentMessage}
            messages={messages}
          />
        )}
      </AppContainer>
    </Container>
  )
}

export default App
