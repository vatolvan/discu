import * as React from 'react'
import { FirebaseContext } from '../../containers/contexts/FirebaseContext'
import { AuthContext } from '~/containers/contexts/AuthContext'
import { ChannelContext } from '~/containers/contexts/ChannelContext'

const SendMessage: React.SFC = (): JSX.Element => {
  const [message, setMessage] = React.useState('')
  const firebase = React.useContext(FirebaseContext)
  const channel = React.useContext(ChannelContext)
  const { user } = React.useContext(AuthContext)

  function sendMessage(): void {
    if (firebase && firebase.messages && user && channel) {
      const channelRef = firebase.messages.child(channel)
      channelRef.push({
        time: Date.now(),
        writer: user.displayName,
        text: message,
      })
      setMessage('')
    }
  }

  function keyListener(event: KeyboardEvent): void {
    if (event.keyCode === 13) {
      sendMessage()
    }
  }

  React.useEffect(() => {
    document.addEventListener('keydown', keyListener)
    return () => document.removeEventListener('keydown', keyListener)
  })

  return (
    <div>
      <input
        type="text"
        onChange={e => setMessage(e.target.value)}
        value={message}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  )
}

export default SendMessage
