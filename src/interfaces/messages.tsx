export interface IMessage {
  user: string
  message: string
}

export type MessageType = IMessage | undefined
