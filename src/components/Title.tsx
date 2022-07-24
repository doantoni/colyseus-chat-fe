import React from 'react'
import styled from 'styled-components'
import { keyframes } from 'styled-components'

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

const TitleBox = styled.h3<{ windowWidth: number }>`
  font-size: ${(props) => (props.windowWidth > 800 ? '5rem' : '3rem')};
  z-index: 999;
  white-space: nowrap;
  overflow: hidden;
  line-height: ${(props) => (props.windowWidth > 800 ? '5rem' : '4rem')};
  margin-bottom: 3rem;
  text-align: center;
  color: #f7ca05;
  text-shadow: 0 10px 7px rgba(0, 0, 0, 0.4), 0 -0.5rem 1px #fff;
  letter-spacing: -3px;
  animation: ${Glitch} 1s linear infinite;
`

const Title: React.FC<{
  windowWidth: number
  setWindowWidth: React.Dispatch<React.SetStateAction<number>>
}> = ({ windowWidth, setWindowWidth }) => {
  window.addEventListener('resize', (e: any) => setWindowWidth(e.currentTarget.innerWidth))
  return (
    <TitleBox windowWidth={windowWidth}>
      Tribanan
      <br />
      🍌🍌🍌
      <br />
      LIVE CHAT
    </TitleBox>
  )
}

export default Title
