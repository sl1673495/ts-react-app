export interface Message {
  user: string
  message: string
  timestamp: number
}

export interface ChatState {
  messages: Message[]
}

export interface SystemState {
  loggedIn: boolean
  session: string
  userName: string
}

export const SEND_MESSAGE = 'SEND_MESSAGE'
export const DELETE_MESSAGE = 'DELETE_MESSAGE'

interface SendMessageAction {
  type: typeof SEND_MESSAGE
  payload: Message
}

interface DeleteMessageAction {
  type: typeof DELETE_MESSAGE
  meta: {
    timestamp: number
  }
}

export type ChatActionTypes = SendMessageAction | DeleteMessageAction

export function sendMessage(newMessage: Message): ChatActionTypes {
  return {
    type: SEND_MESSAGE,
    payload: newMessage
  }
}


// TypeScript infers that this function is returning DeleteMessageAction
export function deleteMessage(timestamp: number): ChatActionTypes {
  return {
    type: DELETE_MESSAGE,
    meta: {
      timestamp
    }
  }
}

export const UPDATE_SESSION = 'UPDATE_SESSION'

interface UpdateSessionAction {
  type: typeof UPDATE_SESSION
  payload: SystemState
}

export type SystemActionTypes = UpdateSessionAction
