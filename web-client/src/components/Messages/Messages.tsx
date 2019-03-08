import * as React from 'react'
import styled from 'styled-components'
import * as moment from 'moment'

import { FirebaseContext } from '../../containers/contexts/FirebaseContext'
import { Message } from 'src/types/Message'
import { ChannelContext } from '~/containers/contexts/ChannelContext'

const MessageWindow = styled.ul`
  padding: 0;
  margin: 0;
  border: 1px solid rgba(228, 228, 228, 0.5);
`

const MessageItem = styled.li`
  text-decoration: none;
  list-style-type: none;
  margin: 10px 0;
  padding: 0;
`

const MessageWriter = styled.span`
  color: ${props => (props.color ? props.color : 'grey')};
  font-weight: 700;
`

const MessageText = styled.span`
  color: ${props => (props.color ? props.color : 'grey')};
`

const Messages: React.SFC = (): JSX.Element => {
  const [messages, setMessages] = React.useState<Message[]>([])
  const firebase = React.useContext(FirebaseContext)
  const channel = React.useContext(ChannelContext)

  React.useEffect(() => {
    setMessages([])
  }, [channel])

  React.useEffect(() => {
    if (firebase && firebase.messages && channel) {
      const channelRef = firebase.messages.child(channel)
      channelRef.on(
        'value',
        (snapshot: firebase.database.DataSnapshot | null) => {
          if (!snapshot) return

          const dataObj = snapshot.val()

          if (!dataObj) {
            setMessages([])
          } else {
            const data = Object.keys(dataObj).map(key => dataObj[key])
            setMessages(data)
          }
        }
      )
    }
  }, [channel, firebase !== null])

  return (
    <MessageWindow>
      {channel &&
        messages.map(message => (
          <MessageItem key={message.time}>
            <span>{moment(message.time).format('DD.MM.YYYY HH:mm:ss')}</span>{' '}
            <MessageWriter>{message.writer}</MessageWriter>{' '}
            <MessageText>{message.text}</MessageText>
          </MessageItem>
        ))}
    </MessageWindow>
  )
}

export default Messages
