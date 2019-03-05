declare const firebase: any;

import * as React from 'react';

const SendMessage: React.SFC = () => {
  const [message, setMessage] = React.useState('');

  function sendMessage() {
    firebase.database().ref('messages').push({
      writer: 'testi',
      text: message,
    }).then(() => setMessage(''));
  }

  return (
    <div>
      <input type="text" onChange={e => setMessage(e.target.value)} value={message} />
      <button onClick={sendMessage}>Send</button>
    </div>
  )
}

export default SendMessage;